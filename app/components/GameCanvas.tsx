"use client";
import React, { useEffect, useRef, useState } from "react";

type SpriteMap = {
  crab?: HTMLImageElement;
  shell?: HTMLImageElement;
  palm?: HTMLImageElement;
  wave?: HTMLImageElement;
};

export default function GameCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [lives, setLives] = useState(4);
  const [shells, setShells] = useState(0);
  const sprites = useRef<SpriteMap>({});
  const keys = useRef<Record<string, boolean>>({});
  // lane change requests from keyboard; consumed in the loop
  const laneChange = useRef(0);
  // swipe tracking
  const touchStart = useRef<{ x: number; y: number; t: number } | null>(null);
  const raf = useRef<number | null>(null);
  const last = useRef<number>(0);
  const needReset = useRef<boolean>(false);
  const invUntil = useRef<number>(0);
  // score & best
  const scoreRef = useRef<number>(0);
  const bestRef = useRef<number>(0);
  const comboRef = useRef<{ count: number; until: number }>({ count: 0, until: 0 });
  // power-ups
  const magnetUntil = useRef<number>(0);
  const shieldCharges = useRef<number>(0);
  // start countdown/grace
  const countdownRef = useRef<number>(0); // seconds remaining; 0 means running

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    // load best score from localStorage
    try {
      const raw = localStorage.getItem('bitcrab_best');
      if (raw) bestRef.current = Math.max(0, Number(raw) || 0);
    } catch {}
    const loadImg = (src: string) => new Promise<HTMLImageElement>((res, rej) => { const img = new Image(); img.src = src; img.onload = () => res(img); img.onerror = rej; });
    Promise.all([
      loadImg("/assets/img/bitcrab.png").then(i => (sprites.current.crab = i)),
      loadImg("/assets/svg/shell.svg").then(i => (sprites.current.shell = i)),
      loadImg("/assets/svg/palm.svg").then(i => (sprites.current.palm = i)),
      loadImg("/assets/svg/wave.svg").then(i => (sprites.current.wave = i)),
    ]).then(() => setLoaded(true)).catch(() => setLoaded(true));
  }, []);

  useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
      const down = e.type === 'keydown';
      keys.current[e.key] = down;
      if (down) {
  if (e.key === 'p' || e.key === 'P') setPaused(p => !p);
    if (e.key === 'r' || e.key === 'R') { needReset.current = true; setLives(4); setShells(0); }
    // 3-lane runner: up/down to change lanes (also allow W/S and arrow keys)
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') laneChange.current -= 1;
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') laneChange.current += 1;
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKey);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('keyup', onKey); };
  }, []);

  useEffect(() => {
    const cv = canvasRef.current, wrap = wrapRef.current; if (!cv || !wrap) return;
    const ctx = cv.getContext('2d'); if (!ctx) return;

    const state = {
      w: 960,
      h: 540,
      t: 0,
      bgGrad: null as CanvasGradient | null,
      // player has lane-based vertical movement (no jump physics)
      player: { x: 180, y: 0, w: 120, h: 96, lane: 1, targetY: 0 },
      ground: 0,
  speed: prefersReducedMotion ? 230 : 260,
  speedUp: 0.015,
      obstacles: [] as { x: number; y: number; r: number; vx: number }[],
      pickups: [] as { x: number; y: number; r: number; vx: number }[],
      powerups: [] as { x: number; y: number; r: number; vx: number; type: 'magnet' | 'shield' }[],
  // parallax background shift and clouds
  bgShift: 0,
  clouds: [] as { x: number; y: number; w: number; h: number; vx: number }[],
      lanes: [] as number[],
      spawnTimer: 0,
      powerSpawnTimer: 6,
      gameOver: false,
      imgAdjusted: false,
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const maxW = Math.min(1100, rect.width);
      const aspect = 16 / 9;
      const w = Math.round(maxW);
      const h = Math.round(w / aspect);
      cv.width = w; cv.height = h;
      state.w = w; state.h = h;
      state.ground = Math.round(h - 96);
      state.bgGrad = null;
      // compute three vertical lanes (top/mid/bottom)
      const top = Math.max(120, state.ground - 140);
      const mid = Math.max(70, state.ground - 70);
      const bot = state.ground;
      state.lanes = [top, mid, bot];
      // initialize or clamp player position to lane
      if (state.player.lane < 0 || state.player.lane > 2) state.player.lane = 1;
      state.player.targetY = state.lanes[state.player.lane];
      if (state.player.y === 0) state.player.y = state.player.targetY;
    };
    resize(); const ro = new ResizeObserver(resize); ro.observe(wrap);

      // seed clouds
      const seedClouds = () => {
        state.clouds = [];
        const count = 5;
        for (let i = 0; i < count; i++) {
          const w = 80 + Math.random() * 140;
          const h = w * 0.6;
          state.clouds.push({
            x: Math.random() * state.w,
            y: 40 + Math.random() * 140,
            w,
            h,
            vx: -(10 + Math.random() * 25),
          });
        }
      };
      seedClouds();

    const drawBackground = () => {
      if (!state.bgGrad) {
        const g = ctx.createLinearGradient(0, 0, 0, state.h);
        g.addColorStop(0, getComputedStyle(document.documentElement).getPropertyValue('--sky-1').trim() || '#9bdcf9');
        g.addColorStop(0.6, getComputedStyle(document.documentElement).getPropertyValue('--sky-2').trim() || '#6cc4f1');
        g.addColorStop(1, getComputedStyle(document.documentElement).getPropertyValue('--sand').trim() || '#f8e3b0');
        state.bgGrad = g;
      }
      ctx.fillStyle = state.bgGrad; ctx.fillRect(0, 0, state.w, state.h);

        // sun
        const sunX = state.w * 0.12, sunY = state.h * 0.18, sunR = 46;
        const sunG = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, sunR * 2.2);
        sunG.addColorStop(0, 'rgba(255, 237, 150, 1)');
        sunG.addColorStop(1, 'rgba(255, 237, 150, 0)');
        ctx.fillStyle = sunG; ctx.beginPath(); ctx.arc(sunX, sunY, sunR * 2.2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffed96'; ctx.beginPath(); ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2); ctx.fill();

        // distant dunes (parallax)
        const duneY = state.h - 170;
        ctx.fillStyle = '#e6d39b';
        ctx.beginPath();
        ctx.moveTo(0, state.h);
        for (let x = 0; x <= state.w; x += 6) {
          const worldX = x + state.bgShift * 0.1;
          const y = duneY + 14 * Math.sin(worldX * 0.01) + 8 * Math.sin(worldX * 0.023);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(state.w, state.h); ctx.closePath(); ctx.fill();
      // sea waves
      const wave = sprites.current.wave;
      if (wave && !prefersReducedMotion) {
        const t = state.t * 0.03;
        for (let i = 0; i < 3; i++) {
          const y = state.h - 60 - i * 14;
          const x = (-(t * (i + 1) * 40)) % wave.width;
          for (let k = -1; k < Math.ceil(state.w / wave.width) + 1; k++) {
            (ctx as CanvasRenderingContext2D).globalAlpha = 0.35 + i * 0.15;
            ctx.drawImage(wave, Math.floor(x + k * wave.width), y);
            (ctx as CanvasRenderingContext2D).globalAlpha = 1;
          }
        }
      }
      // palms

        // drifting clouds
        for (const c of state.clouds) {
          ctx.fillStyle = 'rgba(255,255,255,0.9)';
          ctx.beginPath();
          // three-lobed cloud
          ctx.ellipse(c.x, c.y, c.w * 0.35, c.h * 0.35, 0, 0, Math.PI * 2);
          ctx.ellipse(c.x - c.w * 0.25, c.y + c.h * 0.05, c.w * 0.28, c.h * 0.28, 0, 0, Math.PI * 2);
          ctx.ellipse(c.x + c.w * 0.25, c.y + c.h * 0.08, c.w * 0.3, c.h * 0.3, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      const palm = sprites.current.palm;
      if (palm) {
        const s = state.h / 420;
        ctx.save(); (ctx as CanvasRenderingContext2D).globalAlpha = 0.55;
        ctx.drawImage(palm, 10, state.h - palm.height * s - 10, palm.width * s, palm.height * s);
        ctx.save(); ctx.translate(state.w - 10, 0); ctx.scale(-1, 1);
        ctx.drawImage(palm, 10, state.h - palm.height * s - 10, palm.width * s, palm.height * s);
        ctx.restore(); ctx.restore();
      }
      // sand strip ground
      ctx.fillStyle = '#f1dda9';
      ctx.fillRect(0, state.ground + 24, state.w, state.h - (state.ground + 24));
    };

    const drawPlayer = () => {
      const { x, y, w: pw, h: ph } = state.player;
      const crab = sprites.current.crab;
      if (crab) ctx.drawImage(crab, x - pw / 2, y - ph, pw, ph);
      else { ctx.fillStyle = '#ef6b4a'; ctx.fillRect(x - pw / 2, y - ph, pw, ph); }
    };

    const drawEntities = () => {
      const shell = sprites.current.shell;
      for (const it of state.pickups) {
        if (it.x < -40) continue;
        if (shell) ctx.drawImage(shell, it.x - it.r, it.y - it.r, it.r * 2, it.r * 2);
        else { ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.arc(it.x, it.y, it.r, 0, Math.PI * 2); ctx.fill(); }
      }
      for (const o of state.obstacles) {
        if (o.x < -40) continue;
        ctx.fillStyle = '#2b7a84'; ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#06363f'; ctx.lineWidth = 2;
        for (let a = 0; a < 8; a++) { const ang = (a / 8) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(o.x + Math.cos(ang) * (o.r - 2), o.y + Math.sin(ang) * (o.r - 2)); ctx.lineTo(o.x + Math.cos(ang) * (o.r + 6), o.y + Math.sin(ang) * (o.r + 6)); ctx.stroke(); }
      }
    };

    // helpers
    const collides = (px: number, py: number, pw: number, ph: number, cx: number, cy: number, cr: number) => {
      const nearestX = Math.max(px, Math.min(cx, px + pw));
      const nearestY = Math.max(py, Math.min(cy, py + ph));
      const dx = cx - nearestX, dy = cy - nearestY;
      return dx * dx + dy * dy <= cr * cr;
    };

    const spawn = (speed: number) => {
      const good = Math.random() < 0.7;
      const r = good ? 16 : 14;
      const lane = Math.floor(Math.random() * 3);
      const laneY = state.lanes[lane] || state.ground;
      const y = good ? laneY - 50 : laneY - 16;
      const x = state.w + 30;
      const vx = -speed;
      if (good) state.pickups.push({ x, y, r, vx }); else state.obstacles.push({ x, y, r, vx });
    };

    const spawnPowerup = (speed: number) => {
      const lane = Math.floor(Math.random() * 3);
      const laneY = state.lanes[lane] || state.ground;
      const x = state.w + 40;
      const y = laneY - 44;
      const vx = -speed * 0.95;
      const type: 'magnet' | 'shield' = Math.random() < 0.5 ? 'magnet' : 'shield';
      state.powerups.push({ x, y, r: 18, vx, type });
    };

    // main loop
    const step = (time: number) => {
      if (paused || state.gameOver || document.hidden) { last.current = time; raf.current = requestAnimationFrame(step); return; }
      const dt = Math.min(32, time - (last.current || time)) / 1000; last.current = time; state.t += dt * 60;

      // adjust player sprite width to natural aspect once to avoid stretching
      if (!state.imgAdjusted && sprites.current.crab && sprites.current.crab.naturalWidth && sprites.current.crab.naturalHeight) {
        const img = sprites.current.crab;
        const newW = Math.round(state.player.h * (img.naturalWidth / img.naturalHeight));
        state.player.w = Math.max(40, Math.min(140, newW));
        state.imgAdjusted = true;
      }

      // speed ramps up slowly
    // parallax shift & speed ramps up
    state.bgShift += state.speed * dt;
    // speed ramps up slowly
      state.speed += state.speedUp * dt * 60;

  // apply pending lane change requests
      if (laneChange.current !== 0) {
        const next = Math.max(0, Math.min(2, state.player.lane + (laneChange.current > 0 ? 1 : -1)));
        state.player.lane = next;
        state.player.targetY = state.lanes[state.player.lane] || state.ground;
        laneChange.current = 0;
      }
      // ease toward target lane position
      state.player.y += (state.player.targetY - state.player.y) * Math.min(1, (prefersReducedMotion ? 0.4 : 0.2) * 60 * dt);

      // spawn
        // update clouds
        for (const c of state.clouds) {
          c.x += c.vx * dt;
          if (c.x < -c.w) {
            c.x = state.w + c.w;
            c.y = 40 + Math.random() * 140;
            c.vx = -(10 + Math.random() * 25);
          }
        }

      // countdown/grace handling (no collisions or spawns during countdown)
      if (countdownRef.current > 0) {
        countdownRef.current = Math.max(0, countdownRef.current - dt);
      }

      // spawn
      state.spawnTimer -= dt;
  const base = prefersReducedMotion ? 1.0 : 0.9;
      if (countdownRef.current === 0 && state.spawnTimer <= 0) {
        spawn(state.speed);
        state.spawnTimer = Math.max(0.5, base - Math.min(0.5, (state.speed - 300) / 400));
      }
      // power-up spawn
      state.powerSpawnTimer -= dt;
      if (countdownRef.current === 0 && state.powerSpawnTimer <= 0) {
        spawnPowerup(state.speed);
        state.powerSpawnTimer = 8 + Math.random() * 6; // every 8-14s
      }

      // move entities and collide
      const playerRect = { x: state.player.x - state.player.w / 2, y: state.player.y - state.player.h, w: state.player.w, h: state.player.h };
      // magnet attraction on pickups
      const now = performance.now();
      for (let i = state.pickups.length - 1; i >= 0; i--) {
        const p = state.pickups[i];
        // move
        p.x += p.vx * dt;
        if (p.x < -40) { state.pickups.splice(i, 1); continue; }
        // magnet effect
        if (magnetUntil.current > now) {
          const dx = (state.player.x - p.x);
          const dy = (state.player.y - p.y);
          const dist = Math.hypot(dx, dy);
          const radius = 220;
          if (dist < radius) {
            const pull = (prefersReducedMotion ? 600 : 900) * dt * (1 - dist / radius);
            p.x += (dx / (dist || 1)) * pull;
            p.y += (dy / (dist || 1)) * pull * 0.35; // small vertical assist
          }
        }
        // collect
        if (countdownRef.current === 0 && collides(playerRect.x, playerRect.y, playerRect.w, playerRect.h, p.x, p.y, p.r)) {
          state.pickups.splice(i, 1);
          setShells(s => s + 1);
          // combo scoring
          const comboWindow = 1200; // ms
          if (now < comboRef.current.until) {
            comboRef.current.count += 1;
          } else {
            comboRef.current.count = 1;
          }
          comboRef.current.until = now + comboWindow;
          const mult = 1 + Math.min(4, Math.floor((comboRef.current.count - 1) / 3)); // x1..x5
          scoreRef.current += 1 * mult;
          if (scoreRef.current > bestRef.current) {
            bestRef.current = scoreRef.current;
            try { localStorage.setItem('bitcrab_best', String(bestRef.current)); } catch {}
          }
        }
      }
      // power-ups
      for (let i = state.powerups.length - 1; i >= 0; i--) {
        const u = state.powerups[i];
        u.x += u.vx * dt; if (u.x < -40) { state.powerups.splice(i, 1); continue; }
        if (countdownRef.current === 0 && collides(playerRect.x, playerRect.y, playerRect.w, playerRect.h, u.x, u.y, u.r)) {
          if (u.type === 'magnet') { magnetUntil.current = performance.now() + 6000; }
          else if (u.type === 'shield') { shieldCharges.current = Math.min(1, shieldCharges.current + 1); }
          state.powerups.splice(i, 1);
        }
      }
      // obstacles
      if (countdownRef.current === 0) {
        if (time > invUntil.current) {
          for (let i = state.obstacles.length - 1; i >= 0; i--) {
            const o = state.obstacles[i]; o.x += o.vx * dt; if (o.x < -40) { state.obstacles.splice(i, 1); continue; }
            if (collides(playerRect.x, playerRect.y, playerRect.w, playerRect.h, o.x, o.y, o.r)) {
              if (shieldCharges.current > 0) {
                shieldCharges.current -= 1; // consume shield
                invUntil.current = time + 800;
                state.obstacles.splice(i, 1);
              } else {
                invUntil.current = time + 1200; setLives(l => l - 1); state.obstacles.splice(i, 1);
              }
            }
          }
        } else {
          for (let i = state.obstacles.length - 1; i >= 0; i--) { const o = state.obstacles[i]; o.x += o.vx * dt; if (o.x < -40) state.obstacles.splice(i, 1); }
        }
      } else {
        // during countdown, still scroll obstacles but no collisions
        for (let i = state.obstacles.length - 1; i >= 0; i--) { const o = state.obstacles[i]; o.x += o.vx * dt; if (o.x < -40) state.obstacles.splice(i, 1); }
      }
      state.gameOver = lives <= 0;

      // draw
      ctx.clearRect(0, 0, state.w, state.h);
      if (needReset.current) {
        state.obstacles = []; state.pickups = []; state.powerups = [];
        state.speed = prefersReducedMotion ? 230 : 260;
        state.spawnTimer = 0; state.powerSpawnTimer = 6;
        state.player.lane = 1; state.player.targetY = state.lanes[state.player.lane] || state.ground; state.player.y = state.player.targetY;
        scoreRef.current = 0; comboRef.current = { count: 0, until: 0 };
        magnetUntil.current = 0; shieldCharges.current = 0;
        countdownRef.current = 3; invUntil.current = 0;
        needReset.current = false;
      }
      drawBackground();
      drawEntities();
      drawPlayer();

  // HUD (top-right)
  const panelW = 210;
  const panelX = state.w - panelW - 10;
  ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(panelX, 10, panelW, 70);
  ctx.fillStyle = '#fff'; ctx.font = '700 16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
  ctx.textAlign = 'start';
  ctx.fillText(`Speed: ${Math.round(state.speed)}`, panelX + 10, 26);
  ctx.fillText(`Shells: ${shells}`, panelX + 10, 46);
  ctx.fillText(`Lives: ${lives}`, panelX + 10, 66);
  // right column: score/best
  ctx.textAlign = 'end';
  ctx.fillText(`Score: ${Math.floor(scoreRef.current)}`, panelX + panelW - 10, 26);
  ctx.fillText(`Best: ${Math.floor(bestRef.current)}`, panelX + panelW - 10, 46);
  // combo indicator
  if (performance.now() < comboRef.current.until && comboRef.current.count > 1) {
    const mult = 1 + Math.min(4, Math.floor((comboRef.current.count - 1) / 3));
    ctx.fillStyle = '#ffd166';
    ctx.textAlign = 'center';
    ctx.font = '800 18px system-ui';
    ctx.fillText(`Combo x${mult}`, panelX + panelW / 2, 86);
    ctx.font = '700 16px system-ui'; ctx.fillStyle = '#fff'; ctx.textAlign = 'start';
  }

  // power-up indicators
  const iconY = 96; const icSize = 18; let icX = panelX + 10;
  const drawShield = () => { ctx.strokeStyle = '#9bdcf9'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(icX + icSize/2, iconY, icSize/2, 0, Math.PI * 2); ctx.stroke(); };
  const drawMagnet = () => { ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(icX + icSize/2, iconY, icSize/2, Math.PI*0.2, Math.PI*0.8); ctx.stroke(); };
  if (shieldCharges.current > 0) { drawShield(); icX += icSize + 8; }
  if (magnetUntil.current > performance.now()) { drawMagnet(); }

      if (state.gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(0, 0, state.w, state.h);
        ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
        ctx.font = '800 32px Fredoka, system-ui'; ctx.fillText('Game Over', state.w / 2, state.h / 2 - 10);
        ctx.font = '500 16px system-ui'; ctx.fillText('Press R to Restart', state.w / 2, state.h / 2 + 20);
      }

      // countdown overlay
      if (countdownRef.current > 0) {
        ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(0, 0, state.w, state.h);
        ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
        ctx.font = '800 48px Fredoka, system-ui';
        const n = Math.ceil(countdownRef.current);
        ctx.fillText(String(n), state.w / 2, state.h / 2);
        if (n === 1 && countdownRef.current < 0.4) {
          ctx.font = '800 32px Fredoka, system-ui';
          ctx.fillText('Go!', state.w / 2, state.h / 2 + 44);
        }
      }

      raf.current = requestAnimationFrame(step);
    };

    const start = () => { if (raf.current) cancelAnimationFrame(raf.current); last.current = performance.now(); raf.current = requestAnimationFrame(step); };
    start();

    const onVis = () => { if (document.hidden) setPaused(true); };
    document.addEventListener('visibilitychange', onVis);

    const onPointerDown = (e: PointerEvent) => { touchStart.current = { x: e.clientX, y: e.clientY, t: performance.now() }; };
    const onPointerUp = (e: PointerEvent) => {
      if (!touchStart.current) return;
      const dx = e.clientX - touchStart.current.x;
      const dy = e.clientY - touchStart.current.y;
      const adx = Math.abs(dx), ady = Math.abs(dy);
      // vertical swipe changes lane
      if (ady > adx && ady > 24) {
        if (dy < 0) { // swipe up
          const next = Math.max(0, Math.min(2, state.player.lane - 1));
          if (next !== state.player.lane) { state.player.lane = next; state.player.targetY = state.lanes[state.player.lane] || state.ground; }
        } else { // swipe down
          const next = Math.max(0, Math.min(2, state.player.lane + 1));
          if (next !== state.player.lane) { state.player.lane = next; state.player.targetY = state.lanes[state.player.lane] || state.ground; }
        }
      }
      touchStart.current = null;
    };
    cv.addEventListener('pointerdown', onPointerDown);
    cv.addEventListener('pointerup', onPointerUp);
    cv.addEventListener('pointerleave', onPointerUp);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      document.removeEventListener('visibilitychange', onVis);
  cv.removeEventListener('pointerdown', onPointerDown);
  cv.removeEventListener('pointerup', onPointerUp);
  cv.removeEventListener('pointerleave', onPointerUp);
    };
  }, [paused, lives, shells, prefersReducedMotion]);

  const restart = () => { needReset.current = true; setLives(4); setShells(0); setPaused(false); };

  return (
    <div className="game-wrap" ref={wrapRef}>
      <canvas ref={canvasRef} aria-label="Bitcrab runner game canvas" />
      <div className="game-ui">
        <div className="game-ui__left">
          <button className="btn btn--ghost" onClick={() => setPaused(p => !p)} aria-label={paused ? 'Resume game' : 'Pause game'}>{paused ? 'Resume' : 'Pause'}</button>
          <button className="btn btn--primary" onClick={restart}>Restart</button>
        </div>
  {/* right side removed: no Home button in game window */}
      </div>
      {!loaded && <div className="game-loading">Loading assets…</div>}
  <div className="game-hint" role="note">Swipe Up/Down or use Arrow/W/S to change lanes. Collect shells, avoid urchins. Power-ups: Magnet (auto-attract), Shield (one hit). Combos boost score. P to pause, R to restart.</div>
    </div>
  );
}
