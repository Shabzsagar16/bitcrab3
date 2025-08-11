"use client";
import React, { useEffect, useRef, useState } from "react";

type Bubble = { row: number; col: number; color: string };
type Shot = { x: number; y: number; r: number; vx: number; vy: number; color: string; active: boolean };

const COLORS = ["#ff6b6b", "#ffd166", "#4d96ff", "#6be795", "#d98cff", "#ffa36c"];

export default function BubbleGame() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(true);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [shotsLeftDrop, setShotsLeftDrop] = useState(5);
  const raf = useRef<number | null>(null);
  const last = useRef<number>(0);
  const mouse = useRef<{ x: number; y: number; down: boolean }>({ x: 0, y: 0, down: false });
  const shotRef = useRef<Shot | null>(null);
  const needReset = useRef<boolean>(false);

  useEffect(() => {
    try { const b = Number(localStorage.getItem("bitcrab_bubbles_best") || "0"); if (!isNaN(b)) setBest(b); } catch {}
  }, []);

  useEffect(() => {
    const cv = canvasRef.current, wrap = wrapRef.current; if (!cv || !wrap) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;

    // hex-like grid using staggered rows
    const state = {
      w: 960,
      h: 540,
      t: 0,
      rows: 13,
      cols: 12,
      r: 18, // bubble radius
      grid: [] as (Bubble | null)[],
      shooterX: 0,
      shooterY: 0,
      nextColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      gameOver: false,
      dropCounter: 5,
    };

    const idx = (row: number, col: number) => row * state.cols + col;
    const inBounds = (row: number, col: number) => row >= 0 && row < state.rows && col >= 0 && col < state.cols;

    const resetGrid = () => {
      state.grid = new Array(state.rows * state.cols).fill(null);
      // seed top rows with bubbles
      const seedRows = 4;
      for (let r = 0; r < seedRows; r++) {
        for (let c = 0; c < state.cols; c++) {
          // leave some gaps
          if (Math.random() < 0.12) continue;
          const color = COLORS[Math.floor(Math.random() * 4)];
          state.grid[idx(r, c)] = { row: r, col: c, color };
        }
      }
      state.dropCounter = 5;
      setShotsLeftDrop(5);
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const maxW = Math.min(1100, rect.width);
      const aspect = 16 / 9;
      const w = Math.round(maxW);
      const h = Math.round(w / aspect);
      cv.width = w; cv.height = h;
      state.w = w; state.h = h;
      state.r = Math.max(14, Math.min(22, Math.floor(w / (state.cols * 2.8))));
      state.shooterX = w / 2; state.shooterY = h - 40;
      if (!state.grid.length) resetGrid();
      // initialize aim slightly above shooter so the aim line is visible even before first move
      mouse.current.x = state.shooterX;
      mouse.current.y = state.shooterY - 100;
    };
    resize(); const ro = new ResizeObserver(resize); ro.observe(wrap);

    const rowOffsetX = (row: number) => (row % 2 === 0 ? 0 : state.r);
    const cellX = (row: number, col: number) => rowOffsetX(row) + state.r + col * (state.r * 2);
    const cellY = (row: number) => state.r + row * (state.r * 1.75);

    const neighbors = (row: number, col: number) => {
      // hex neighbors depending on row parity
      const odd = row % 2 === 1;
      const d = [
        [0, -1], [0, 1],
        [-1, 0], [-1, odd ? 1 : -1],
        [1, 0], [1, odd ? 1 : -1],
      ];
      const result: [number, number][] = [];
      for (const [dr, dc] of d) {
        const nr = row + dr, nc = col + dc;
        if (inBounds(nr, nc)) result.push([nr, nc]);
      }
      return result;
    };

    const worldToCell = (x: number, y: number): { row: number; col: number } => {
      // approximate mapping: try both parities and pick closest center
      let best = { row: 0, col: 0, dist: Infinity } as any;
      for (let row = 0; row < state.rows; row++) {
        const cy = cellY(row);
        for (let col = 0; col < state.cols; col++) {
          const cx = cellX(row, col);
          const d = (cx - x) * (cx - x) + (cy - y) * (cy - y);
          if (d < best.dist) best = { row, col, dist: d };
        }
      }
      return { row: best.row, col: best.col };
    };

    const canPlace = (row: number, col: number) => inBounds(row, col) && !state.grid[idx(row, col)];

    const placeShotAt = (row: number, col: number, color: string) => {
      if (!inBounds(row, col)) return false;
      state.grid[idx(row, col)] = { row, col, color };
      // match check
      const cluster = bfsCluster(row, col, color);
      let popped = 0;
      if (cluster.length >= 3) {
        for (const [r, c] of cluster) { state.grid[idx(r, c)] = null; popped++; }
        // drop floating groups (not connected to top row)
        const anchored = new Set<number>();
        const q: [number, number][] = [];
        for (let c = 0; c < state.cols; c++) {
          if (state.grid[idx(0, c)]) q.push([0, c]);
        }
        while (q.length) {
          const [r, c] = q.shift()!; const id = idx(r, c);
          if (anchored.has(id) || !state.grid[id]) continue;
          anchored.add(id);
          for (const [nr, nc] of neighbors(r, c)) q.push([nr, nc]);
        }
        let dropped = 0;
        for (let r = 0; r < state.rows; r++) {
          for (let c = 0; c < state.cols; c++) {
            const id = idx(r, c);
            if (state.grid[id] && !anchored.has(id)) { state.grid[id] = null; dropped++; }
          }
        }
        const gained = popped * 10 + dropped * 25;
        setScore(s => {
          const ns = s + gained; if (ns > best) { setBest(ns); try { localStorage.setItem("bitcrab_bubbles_best", String(ns)); } catch {} }
          return ns;
        });
      }
      return true;
    };

    const bfsCluster = (row: number, col: number, color: string) => {
      const res: [number, number][] = [];
      const seen = new Set<string>();
      const key = (r: number, c: number) => `${r},${c}`;
      const q: [number, number][] = [[row, col]];
      while (q.length) {
        const [r, c] = q.shift()!;
        const k = key(r, c); if (seen.has(k)) continue; seen.add(k);
        const b = state.grid[idx(r, c)]; if (!b || b.color !== color) continue;
        res.push([r, c]);
        for (const [nr, nc] of neighbors(r, c)) q.push([nr, nc]);
      }
      return res;
    };

    const shoot = (angle: number) => {
      if (shotRef.current && shotRef.current.active) return;
      const speed = 520;
      const color = state.nextColor;
      state.nextColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      const vx = Math.cos(angle) * speed, vy = Math.sin(angle) * speed;
      shotRef.current = { x: state.shooterX, y: state.shooterY, r: state.r, vx, vy, color, active: true };
      state.dropCounter -= 1; setShotsLeftDrop(Math.max(0, state.dropCounter));
      if (state.dropCounter <= 0) { dropCeiling(); state.dropCounter = 5; setShotsLeftDrop(5); }
    };

    const dropCeiling = () => {
      // attempt to push everything down one row; if bottom reached, game over
      for (let r = state.rows - 2; r >= 0; r--) {
        for (let c = 0; c < state.cols; c++) {
          const from = idx(r, c), to = idx(r + 1, c);
          state.grid[to] = state.grid[from] ? { ...state.grid[from]!, row: r + 1, col: c } : null;
        }
      }
      // add a new random row at the top
      for (let c = 0; c < state.cols; c++) {
        const color = Math.random() < 0.15 ? null : COLORS[Math.floor(Math.random() * 4)];
        state.grid[idx(0, c)] = color ? { row: 0, col: c, color } : null;
      }
      // check for loss (bubbles too low)
      for (let c = 0; c < state.cols; c++) {
        const b = state.grid[idx(state.rows - 2, c)];
        if (b) { state.gameOver = true; break; }
      }
    };

    const updateShot = (dt: number) => {
      const s = shotRef.current; if (!s || !s.active) return;
      s.x += s.vx * dt; s.y += s.vy * dt;
      // bounce on walls
      if (s.x < state.r) { s.x = state.r; s.vx *= -1; }
      if (s.x > state.w - state.r) { s.x = state.w - state.r; s.vx *= -1; }
      // ceiling
      if (s.y < state.r + 4) {
        const { row, col } = worldToCell(s.x, state.r + 4);
        placeShotAt(row, col, s.color);
        s.active = false;
        return;
      }
      // collision with grid bubbles
      for (let r = 0; r < state.rows; r++) {
        for (let c = 0; c < state.cols; c++) {
          const b = state.grid[idx(r, c)]; if (!b) continue;
          const cx = cellX(r, c), cy = cellY(r);
          const dx = s.x - cx, dy = s.y - cy;
          const dist = Math.hypot(dx, dy);
          if (dist <= state.r * 2 - 1) {
            // stick near this location
            const { row, col } = worldToCell(s.x, s.y);
            // find nearest empty neighbor around (row,col)
            const candidates: [number, number][] = [[row, col], ...neighbors(row, col)];
            let bestCell: [number, number] | null = null;
            let bestDist = Infinity;
            for (const [nr, nc] of candidates) {
              if (!canPlace(nr, nc)) continue;
              const dx2 = cellX(nr, nc) - s.x; const dy2 = cellY(nr) - s.y;
              const d2 = dx2 * dx2 + dy2 * dy2;
              if (d2 < bestDist) { bestDist = d2; bestCell = [nr, nc]; }
            }
            if (!bestCell) {
              // fallback: clamp to worldToCell even if occupied
              const place = worldToCell(s.x, s.y);
              if (canPlace(place.row, place.col)) bestCell = [place.row, place.col];
            }
            if (bestCell) placeShotAt(bestCell[0], bestCell[1], s.color);
            s.active = false;
            return;
          }
        }
      }
      // hit bottom -> game over
      if (s.y > state.h - 30) { state.gameOver = true; s.active = false; }
    };

    const draw = () => {
      // background
      ctx.clearRect(0, 0, state.w, state.h);
      const g = ctx.createLinearGradient(0, 0, 0, state.h);
      g.addColorStop(0, "#9bdcf9"); g.addColorStop(0.7, "#6cc4f1"); g.addColorStop(1, "#f8e3b0");
      ctx.fillStyle = g; ctx.fillRect(0, 0, state.w, state.h);
      // grid
      for (let r = 0; r < state.rows; r++) {
        for (let c = 0; c < state.cols; c++) {
          const b = state.grid[idx(r, c)]; if (!b) continue;
          const x = cellX(r, c), y = cellY(r);
          ctx.fillStyle = b.color; ctx.beginPath(); ctx.arc(x, y, state.r - 1, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,.2)"; ctx.lineWidth = 1; ctx.stroke();
        }
      }
      // shooter
      ctx.fillStyle = "#ef6b4a"; ctx.beginPath(); ctx.arc(state.shooterX, state.shooterY, state.r, 0, Math.PI * 2); ctx.fill();
      // aim line
      const ang = Math.atan2(mouse.current.y - state.shooterY, mouse.current.x - state.shooterX);
      const clampAng = Math.max((-75 * Math.PI) / 180, Math.min((75 * Math.PI) / 180, ang));
      ctx.strokeStyle = "rgba(0,0,0,.35)"; ctx.lineWidth = 2; ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.moveTo(state.shooterX, state.shooterY); ctx.lineTo(state.shooterX + Math.cos(clampAng) * 80, state.shooterY + Math.sin(clampAng) * 80); ctx.stroke(); ctx.setLineDash([]);
      // next bubble
      ctx.fillStyle = state.nextColor; ctx.beginPath(); ctx.arc(state.shooterX + 60, state.shooterY + 18, state.r * 0.8, 0, Math.PI * 2); ctx.fill();

      // shot
      const s = shotRef.current; if (s && s.active) { ctx.fillStyle = s.color; ctx.beginPath(); ctx.arc(s.x, s.y, state.r - 1, 0, Math.PI * 2); ctx.fill(); }

      // HUD
      const panelW = 240; const panelX = state.w - panelW - 10;
      ctx.fillStyle = "rgba(0,0,0,.35)"; ctx.fillRect(panelX, 10, panelW, 74);
      ctx.fillStyle = "#fff"; ctx.font = "700 16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
      ctx.textAlign = "start";
      ctx.fillText(`Score: ${score}`, panelX + 10, 30);
      ctx.fillText(`Best: ${best}`, panelX + 10, 52);
      ctx.fillText(`Ceiling in: ${shotsLeftDrop} shots`, panelX + 10, 72);

      if (state.gameOver) {
        ctx.fillStyle = "rgba(0,0,0,.55)"; ctx.fillRect(0, 0, state.w, state.h);
        ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.font = "800 32px Fredoka, system-ui";
        ctx.fillText("Game Over", state.w / 2, state.h / 2 - 10);
        ctx.font = "500 16px system-ui"; ctx.fillText("Click or press R to restart", state.w / 2, state.h / 2 + 20);
      }
    };

    const step = (time: number) => {
      if (paused || document.hidden) { last.current = time; raf.current = requestAnimationFrame(step); return; }
      const dt = Math.min(32, time - (last.current || time)) / 1000; last.current = time; state.t += dt * 60;

      if (needReset.current) {
        needReset.current = false;
        state.gameOver = false; resetGrid(); setScore(0);
        shotRef.current = null;
      }

      updateShot(dt);
      draw();
      raf.current = requestAnimationFrame(step);
    };

    const start = () => { if (raf.current) cancelAnimationFrame(raf.current); last.current = performance.now(); raf.current = requestAnimationFrame(step); };
    start();

    const onMove = (e: PointerEvent | MouseEvent) => {
      const rect = cv.getBoundingClientRect();
      const clientX = (e as PointerEvent).clientX ?? (e as MouseEvent).clientX;
      const clientY = (e as PointerEvent).clientY ?? (e as MouseEvent).clientY;
      mouse.current.x = clientX - rect.left; mouse.current.y = clientY - rect.top;
    };
    const onEnter = (e: PointerEvent | MouseEvent) => {
      onMove(e);
    };
    const onDown = (e?: PointerEvent | MouseEvent | TouchEvent) => {
      if (e instanceof PointerEvent) {
        try { cv.setPointerCapture(e.pointerId); } catch {}
      }
      if (state.gameOver) { needReset.current = true; return; }
      const ang = Math.atan2(mouse.current.y - state.shooterY, mouse.current.x - state.shooterX);
      const clampAng = Math.max((-75 * Math.PI) / 180, Math.min((75 * Math.PI) / 180, ang));
      shoot(clampAng);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches.length) return; e.preventDefault();
      const t = e.touches[0]; const rect = cv.getBoundingClientRect();
      mouse.current.x = t.clientX - rect.left; mouse.current.y = t.clientY - rect.top;
    };
    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches.length) return; e.preventDefault();
      onTouchMove(e); onDown();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.type === "keydown") {
        if (e.key === "p" || e.key === "P") setPaused(p => !p);
        if (e.key === "r" || e.key === "R") { needReset.current = true; }
        if (e.key === " ") { const ang = Math.atan2(mouse.current.y - state.shooterY, mouse.current.x - state.shooterX); const clampAng = Math.max((-75 * Math.PI) / 180, Math.min((75 * Math.PI) / 180, ang)); shoot(clampAng); }
      }
    };
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerenter", onEnter);
    cv.addEventListener("pointerdown", onDown as any);
    // Fallbacks for browsers without robust PointerEvent support
    cv.addEventListener("mousemove", onMove as any);
    cv.addEventListener("mousedown", onDown as any);
    cv.addEventListener("touchstart", onTouchStart, { passive: false });
    cv.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerenter", onEnter);
      cv.removeEventListener("pointerdown", onDown as any);
      cv.removeEventListener("mousemove", onMove as any);
      cv.removeEventListener("mousedown", onDown as any);
      cv.removeEventListener("touchstart", onTouchStart);
      cv.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [paused, best]);

  return (
    <div className="game-wrap" ref={wrapRef}>
  <canvas ref={canvasRef} aria-label="Bitcrab Bubble Shooter game canvas" />
      <div className="game-ui">
        <div className="game-ui__left">
          <button className="btn btn--ghost" onClick={() => setPaused(p => !p)} aria-label={paused ? "Resume game" : "Pause game"}>{paused ? "Resume" : "Pause"}</button>
          <button className="btn btn--primary" onClick={() => { (needReset.current = true); }}>{"Restart"}</button>
        </div>
      </div>
      {!loaded && <div className="game-loading">Loading…</div>}
      <div className="game-hint" role="note">Aim with mouse/touch. Click/tap or press Space to shoot. Pop 3+ same-color bubbles; avoid reaching the bottom. P to pause, R to restart.</div>
    </div>
  );
}
