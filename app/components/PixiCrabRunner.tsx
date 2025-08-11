"use client";
import React, { useEffect, useRef } from "react";
import { Application, Assets, Container, Graphics, Sprite, Text } from "pixi.js";

type Obstacle = { sprite: Graphics; lane: number; x: number; speed: number; radius: number };
type Pickup = { sprite: Graphics; lane: number; x: number; speed: number; radius: number };

export default function PixiCrabRunner() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    let cancelled = false;
    const setup = async () => {
      const wrap = wrapRef.current; if (!wrap) return;

      const app = new Application();
      await app.init({ resizeTo: wrap, backgroundAlpha: 0, antialias: true });
      if (cancelled) { app.destroy(true); return; }
      wrap.appendChild(app.canvas);
      appRef.current = app;

      const stage = app.stage;
      const world = new Container(); stage.addChild(world);

      const metrics = { w: app.renderer.width, h: app.renderer.height };
      const getLanes = () => {
        const top = Math.round(metrics.h * 0.25);
        const mid = Math.round(metrics.h * 0.5);
        const bot = Math.round(metrics.h * 0.75);
        return [top, mid, bot];
      };
      let lanes = getLanes();

      // Player sprite (fallback to simple graphic if image fails)
      let crab: Sprite | Graphics;
      try {
        const crabTex = await Assets.load("/assets/img/bitcrab.png");
        const s = new Sprite(crabTex); s.anchor.set(0.5); crab = s;
      } catch {
        const g = new Graphics(); g.circle(0, 0, 24).fill(0xef6b4a); crab = g;
      }
      const asSprite = (node: any): node is Sprite => node && "anchor" in node;
      const setCrabSize = () => {
        if (asSprite(crab)) {
          crab.width = Math.min(metrics.w * 0.08, 90);
          (crab as Sprite).height = (crab as Sprite).width * 0.8;
        }
      };
      setCrabSize();
      crab.position.set(Math.round(metrics.w * 0.18), lanes[1]);
      world.addChild(crab as any);
      let playerLane = 1;

      // HUD
      const hud = new Container(); stage.addChild(hud);
      const hudBg = new Graphics().roundRect(0, 0, 260, 70, 10).fill({ color: 0x000000, alpha: 0.35 });
      hud.addChild(hudBg);
      const scoreText = new Text({ text: "Score: 0", style: { fill: 0xffffff, fontWeight: "700", fontSize: 16 } }); scoreText.position.set(10, 10); hud.addChild(scoreText);
      const bestText = new Text({ text: "Best: 0", style: { fill: 0xffffff, fontWeight: "700", fontSize: 16 } }); bestText.position.set(10, 36); hud.addChild(bestText);
      hud.position.set(metrics.w - 270, 10);
      let best = 0; try { const b = Number(localStorage.getItem("pixi_runner_best") || "0"); if (!isNaN(b)) best = b; } catch {}
      bestText.text = `Best: ${best}`;

      // Game state
      let running = true; let speed = 260; let t = 0; let score = 0;
      let obT = 0; let pkT = 0;
      const obstacles: Obstacle[] = []; const pickups: Pickup[] = [];

      const makeUrchin = (lane: number): Obstacle => {
        const g = new Graphics(); const r = Math.max(14, Math.min(24, Math.round(metrics.h * 0.03)));
        g.circle(0, 0, r).fill(0x5e2a7a).stroke({ color: 0x000000, alpha: 0.3, width: 1 });
        const x = metrics.w + r + 10; g.position.set(x, lanes[lane]); world.addChild(g);
        return { sprite: g, lane, x, speed: speed + 40, radius: r };
      };
      const makeShell = (lane: number): Pickup => {
        const g = new Graphics(); const r = Math.max(10, Math.min(18, Math.round(metrics.h * 0.022)));
        g.circle(0, 0, r).fill(0xffd166).stroke({ color: 0x8a5e00, width: 2, alpha: 0.6 });
        const x = metrics.w + r + 10; g.position.set(x, lanes[lane]); world.addChild(g);
        return { sprite: g, lane, x, speed: speed, radius: r };
      };

      const reset = () => {
        running = true; speed = 260; t = 0; score = 0; obT = 0; pkT = 0; playerLane = 1; (crab as any).y = lanes[playerLane];
        for (const o of obstacles) world.removeChild(o.sprite); obstacles.length = 0;
        for (const p of pickups) world.removeChild(p.sprite); pickups.length = 0;
        scoreText.text = `Score: ${score}`;
        const go = hud.getChildByName("go"); if (go) hud.removeChild(go);
      };

      const resize = () => {
        metrics.w = app.renderer.width; metrics.h = app.renderer.height; lanes = getLanes();
        (crab as any).x = Math.round(metrics.w * 0.18); (crab as any).y = lanes[playerLane]; setCrabSize();
        hud.position.set(metrics.w - 270, 10);
      };
      app.renderer.on("resize", resize);

      const clampLane = (n: number) => Math.max(0, Math.min(2, n));
      const toLane = (delta: number) => { playerLane = clampLane(playerLane + delta); (crab as any).y = lanes[playerLane]; };

      const onKey = (e: KeyboardEvent) => {
        if (e.type === "keydown") {
          if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") toLane(-1);
          if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") toLane(1);
          if (e.key === "p" || e.key === "P") running = !running;
          if (e.key === "r" || e.key === "R") reset();
        }
      };
      window.addEventListener("keydown", onKey);

      const onPointerDown = (ev: PointerEvent) => {
        const rect = app.canvas.getBoundingClientRect(); const y = ev.clientY - rect.top; const half = metrics.h / 2;
        if (y < half) toLane(-1); else toLane(1);
      };
      app.canvas.addEventListener("pointerdown", onPointerDown);

      const aabbHit = (ax: number, ay: number, aw: number, ah: number, bx: number, by: number, br: number) => {
        const leftA = ax - aw / 2, rightA = ax + aw / 2, topA = ay - ah / 2, bottomA = ay + ah / 2;
        const closestX = Math.max(leftA, Math.min(bx, rightA));
        const closestY = Math.max(topA, Math.min(by, bottomA));
        const dx = bx - closestX, dy = by - closestY; return dx * dx + dy * dy <= br * br;
      };

      const spawn = (dt: number) => {
        obT -= dt; pkT -= dt;
        if (obT <= 0) { obstacles.push(makeUrchin(Math.floor(Math.random() * 3))); obT = Math.max(0.6, 1.2 - (speed - 260) / 200); }
        if (pkT <= 0) { pickups.push(makeShell(Math.floor(Math.random() * 3))); pkT = 0.9; }
      };

      const update = (dt: number) => {
        const cw = asSprite(crab) ? (crab as Sprite).width * 0.8 : 40; const ch = asSprite(crab) ? (crab as Sprite).height * 0.8 : 32;
        for (let i = obstacles.length - 1; i >= 0; i--) {
          const o = obstacles[i]; o.x -= o.speed * dt; o.sprite.x = o.x; o.sprite.y = lanes[o.lane];
          if (aabbHit((crab as any).x, (crab as any).y, cw, ch, o.x, lanes[o.lane], o.radius)) { running = false; }
          if (o.x < -80) { world.removeChild(o.sprite); obstacles.splice(i, 1); }
        }
        for (let i = pickups.length - 1; i >= 0; i--) {
          const p = pickups[i]; p.x -= p.speed * dt; p.sprite.x = p.x; p.sprite.y = lanes[p.lane];
          if (aabbHit((crab as any).x, (crab as any).y, cw, ch, p.x, lanes[p.lane], p.radius)) {
            score += 10; scoreText.text = `Score: ${score}`; world.removeChild(p.sprite); pickups.splice(i, 1);
          } else if (p.x < -80) { world.removeChild(p.sprite); pickups.splice(i, 1); }
        }
      };

      const loop = () => {
        const dt = app.ticker.deltaMS / 1000;
        metrics.w = app.renderer.width; metrics.h = app.renderer.height;
        if (running) {
          t += dt; speed = Math.min(520, 260 + t * 12); spawn(dt); update(dt);
          if (t > 0.2) { score += Math.floor(dt * 20); scoreText.text = `Score: ${score}`; }
        } else if (!hud.getChildByName("go")) {
          const go = new Text({ text: "Game Over — R to restart", style: { fill: 0xffffff, fontSize: 20, fontWeight: "800" } });
          go.name = "go"; go.position.set(10, 56); hud.addChild(go);
        }
        if (score > best) { best = score; bestText.text = `Best: ${best}`; try { localStorage.setItem("pixi_runner_best", String(best)); } catch {} }
      };
      app.ticker.add(loop);

      reset();

      return () => {
        window.removeEventListener("keydown", onKey);
        app.canvas.removeEventListener("pointerdown", onPointerDown);
        app.ticker.remove(loop);
        app.destroy(true);
      };
    };
    setup();
    return () => { cancelled = true; const app = appRef.current; if (app) { try { app.destroy(true); } catch {} } };
  }, []);

  return (
    <div className="game-wrap" ref={wrapRef}>
      <div className="game-hint" role="note">PixiJS Runner — Tap upper/lower half or use W/S (↑/↓) to switch lanes. Collect shells, avoid urchins. P pause, R restart.</div>
    </div>
  );
}
