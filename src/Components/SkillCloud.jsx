import { useEffect, useRef } from "react";
import { SKILLS, GROUP_COLORS } from "../data.js";

const CORNERS = [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]];

export default function SkillCloud({ filter }) {
  const cvRef = useRef(null);
  const nnRef = useRef(null);
  const filterRef = useRef(filter);

  useEffect(() => { filterRef.current = filter; }, [filter]);

  useEffect(() => {
    const cv = cvRef.current;
    const ctx = cv.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const m = { x: -999, y: -999 };
    let W, H, R, cx, cy, raf;
    let ay = 0, ox = 0, oy = 0, k = 1, kv = 0; // rotation, tilt, burst spring
    let P = [];

    const add = (g, l, c) => {
      const u = Math.random() * 6.28;
      const v = Math.acos(2 * Math.random() - 1);
      const d = l ? 0.3 : 0.12 + Math.random() * 0.3;
      P.push({
        g, l, lab: !!l,
        r: l ? 4.5 : 1.8 + Math.random(),
        X: c[0] * 0.5 + d * Math.sin(v) * Math.cos(u),
        Y: c[1] * 0.5 + d * Math.sin(v) * Math.sin(u),
        Z: c[2] * 0.5 + d * Math.cos(v),
      });
    };

    const build = () => {
      const r = cv.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(W, H) * (W < 700 ? 0.34 : 0.4);
      cx = W < 700 ? W * 0.5 : W * 0.7;
      cy = W < 700 ? H * 0.3 : H * 0.45;
      P = [];
      Object.keys(SKILLS).forEach((g, i) => {
        SKILLS[g].forEach((s) => add(g, s, CORNERS[i]));
        for (let j = 0; j < 14; j++) add(g, "", CORNERS[i]);
      });
    };

    const draw = () => {
      const f = filterRef.current;
      const dim = (g) => f !== "All" && g !== f;
      ctx.clearRect(0, 0, W, H);

      const on = m.x > 0;
      const gy = on ? ((m.x - cx) / W) * 1.6 : 0;
      const gx = on ? ((m.y - cy) / H) * 1 : 0;
      if (!reduce) ay += 0.004;
      oy += (gy - oy) * 0.05;
      ox += (gx - ox) * 0.05;
      kv += (1 - k) * 0.08; kv *= 0.85; k += kv;

      const A = ay + oy, B = ox;
      const ca = Math.cos(A), sa = Math.sin(A), cb = Math.cos(B), sb = Math.sin(B);

      // rotate + project every point
      P.forEach((p) => {
        const X = p.X * R * k, Y = p.Y * R * k, Z = p.Z * R * k;
        const x1 = X * ca + Z * sa, z1 = -X * sa + Z * ca;
        const y2 = Y * cb - z1 * sb, z2 = Y * sb + z1 * cb;
        const s = 520 / (520 + z2);
        p.sx = cx + x1 * s; p.sy = cy + y2 * s; p.s = s; p.z = z2;
      });
      P.sort((a, b) => b.z - a.z); // far points first

      // links between neighbours in the same group
      ctx.lineWidth = 1;
      for (let i = 0; i < P.length; i++) {
        for (let j = i + 1; j < P.length; j++) {
          const a = P[i], b = P[j];
          if (a.g !== b.g) continue;
          const dx = a.X - b.X, dy = a.Y - b.Y, dz = a.Z - b.Z;
          if (dx * dx + dy * dy + dz * dz > 0.12) continue;
          ctx.strokeStyle = GROUP_COLORS[a.g];
          ctx.globalAlpha = (dim(a.g) ? 0.03 : 0.2) * Math.min(a.s, b.s);
          ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
        }
      }

      // points and labels
      let near = [];
      P.forEach((p) => {
        const d = Math.hypot(p.sx - m.x, p.sy - m.y);
        if (p.lab && d < 120) near.push({ p, d });
        const al = Math.max(0.25, Math.min(1, (p.s - 0.55) * 1.2)) * (dim(p.g) ? 0.12 : 1);
        ctx.fillStyle = GROUP_COLORS[p.g];
        if (p.lab) {
          ctx.globalAlpha = al * 0.18;
          ctx.beginPath(); ctx.arc(p.sx, p.sy, p.r * p.s * 3, 0, 6.28); ctx.fill();
        }
        ctx.globalAlpha = al;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, p.r * p.s, 0, 6.28); ctx.fill();
        if (p.lab) {
          ctx.font = `${10 + p.s * 3}px Manrope, system-ui, sans-serif`;
          ctx.fillStyle = "#ebe8f5";
          ctx.fillText(p.l, p.sx + 9, p.sy + 4);
        }
      });

      // cursor links to nearest skills
      near.sort((a, b) => a.d - b.d);
      near = near.slice(0, 4);
      ctx.globalAlpha = 1;
      near.forEach((n) => {
        ctx.strokeStyle = `rgba(255,143,177,${(1 - n.d / 120) * 0.7})`;
        ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(n.p.sx, n.p.sy); ctx.stroke();
      });
      if (nnRef.current) {
        nnRef.current.textContent = near.length
          ? "Nearest: " + near.slice(0, 3).map((n) => n.p.l).join(", ")
          : "";
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const move = (e) => {
      const q = e.touches ? e.touches[0] : e;
      const r = cv.getBoundingClientRect();
      m.x = q.clientX - r.left; m.y = q.clientY - r.top;
    };
    const leave = () => { m.x = m.y = -999; };
    const burst = () => { kv = 0.7; };

    build();
    raf = requestAnimationFrame(draw);
    addEventListener("resize", build);
    cv.addEventListener("mousemove", move);
    cv.addEventListener("touchmove", move, { passive: true });
    cv.addEventListener("mouseleave", leave);
    cv.addEventListener("click", burst);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", build);
      cv.removeEventListener("mousemove", move);
      cv.removeEventListener("touchmove", move);
      cv.removeEventListener("mouseleave", leave);
      cv.removeEventListener("click", burst);
    };
  }, []);

  return (
    <>
      <canvas ref={cvRef} aria-hidden="true" className="absolute inset-0 h-full w-full cursor-grab" />
      <div className="pointer-events-none absolute right-[5vw] top-6 hidden max-w-[240px] text-right text-[13px] text-mute md:block">
        Move your cursor to spin this 3D map of my skills. Click to make it burst. Each point is a skill, grouped by similarity.
        <div ref={nnRef} className="min-h-6 text-accent2" />
      </div>
    </>
  );
}