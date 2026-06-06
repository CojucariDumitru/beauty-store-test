"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const SWATCHES = [
  "#EE4291",
  "#FF6B6B",
  "#F5D547",
  "#6BBF8A",
  "#4A7FD4",
  "#9B7FD4",
  "#F59E42",
  "#E8A0A0",
];

const FLAKES = Array.from({ length: 42 }, (_, i) => ({
  id: i,
  left: 38 + ((i * 37 + 11) % 58),
  top: (i * 29 + 7) % 88,
  size: 4 + (i % 4) * 2.5,
  rotate: (i * 53) % 360,
  colorA: SWATCHES[i % SWATCHES.length],
  colorB: SWATCHES[(i + 3) % SWATCHES.length],
  driftX: ((i % 5) - 2) * 14,
  driftY: -18 - (i % 6) * 8,
  duration: 9 + (i % 7) * 1.8,
  delay: (i % 9) * 0.35,
}));

const ORBITS = [
  { rx: 148, ry: 52, tilt: 18, speed: 22, color: "#EE4291", dot: 7 },
  { rx: 168, ry: 44, tilt: -32, speed: 28, color: "#4A7FD4", dot: 6 },
  { rx: 128, ry: 38, tilt: 58, speed: 18, color: "#F5D547", dot: 5 },
];

const VISUAL_CENTER = "68%";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#fce4ec]">
      {/* Seamless background — radial washes, no vertical split */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 120% at 15% 50%, #fce4ec 0%, transparent 70%),
            radial-gradient(ellipse 80% 100% at 75% 40%, rgba(248,187,217,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 60% 80% at 90% 60%, rgba(225,190,231,0.35) 0%, transparent 70%),
            #fce4ec
          `,
        }}
      />

      {SWATCHES.slice(0, 5).map((color, i) => (
          <motion.div
            key={color}
            className="pointer-events-none absolute hidden rounded-full opacity-30 blur-3xl md:block"
            style={{
              backgroundColor: color,
              width: 100 + (i % 3) * 50,
              height: 100 + (i % 3) * 50,
              left: `${10 + i * 14}%`,
              top: `${20 + (i % 3) * 18}%`,
            }}
            animate={{ y: [0, -10, 0], scale: [1, 1.06, 1] }}
            transition={{
              duration: 5 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#ee4291]/12 to-transparent" />

      {/* Animation layer — full width, no clipped panel */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{ perspective: 1000 }}
        aria-hidden
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.8 }}
          className="relative h-full w-full"
        >
          {FLAKES.map((f) => (
            <motion.span
              key={f.id}
              className="absolute rounded-[2px] opacity-70 mix-blend-multiply"
              style={{
                left: `${f.left}%`,
                top: `${f.top}%`,
                width: f.size,
                height: f.size * 0.45,
                rotate: `${f.rotate}deg`,
                background: `linear-gradient(135deg, ${f.colorA}cc, ${f.colorB}88)`,
                boxShadow: `0 0 ${f.size}px ${f.colorA}55`,
              }}
              animate={
                {
                      x: [0, f.driftX, 0],
                      y: [0, f.driftY, 0],
                      opacity: [0.35, 0.85, 0.35],
                      rotate: [f.rotate, f.rotate + 40, f.rotate],
                    }
              }
              transition={{
                duration: f.duration,
                repeat: Infinity,
                delay: f.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 400 360"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            <defs>
              <linearGradient id="pourGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EE4291" />
                <stop offset="25%" stopColor="#F5D547" />
                <stop offset="50%" stopColor="#6BBF8A" />
                <stop offset="75%" stopColor="#4A7FD4" />
                <stop offset="100%" stopColor="#9B7FD4" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 30 300 C 80 180, 140 120, 200 100 S 320 60, 370 40"
              stroke="url(#pourGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity={0.55}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2.2,
                delay: 0.3,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M 50 320 C 120 220, 180 160, 230 140 S 300 100, 350 80"
              stroke="url(#pourGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity={0.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2.8,
                delay: 0.5,
                ease: "easeInOut",
              }}
            />
          </svg>

          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: VISUAL_CENTER }}
          >
            <motion.div
              className="relative"
              animate={{ rotate: [0, 6, 0, -6, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                width="220"
                height="220"
                viewBox="0 0 220 220"
                className="lg:h-[260px] lg:w-[260px]"
              >
                <defs>
                  <linearGradient
                    id="moonGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#EE4291">
                      {
                        <animate
                          attributeName="stop-color"
                          values="#EE4291;#9B7FD4;#4A7FD4;#EE4291"
                          dur="6s"
                          repeatCount="indefinite"
                        />
                      }
                    </stop>
                    <stop offset="50%" stopColor="#F5D547">
                      {
                        <animate
                          attributeName="stop-color"
                          values="#F5D547;#EE4291;#6BBF8A;#F5D547"
                          dur="6s"
                          repeatCount="indefinite"
                        />
                      }
                    </stop>
                    <stop offset="100%" stopColor="#4A7FD4">
                      {
                        <animate
                          attributeName="stop-color"
                          values="#4A7FD4;#F5D547;#9B7FD4;#4A7FD4"
                          dur="6s"
                          repeatCount="indefinite"
                        />
                      }
                    </stop>
                  </linearGradient>
                  <filter id="moonGlow">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M 110 20 A 90 90 0 1 1 110 200 A 70 70 0 1 0 110 20 Z"
                  fill="url(#moonGrad)"
                  filter="url(#moonGlow)"
                  opacity="0.5"
                />
              </svg>
            </motion.div>
          </div>

          {ORBITS.map((orbit, i) => (
            <div
              key={i}
              className="absolute top-1/2"
              style={{
                left: VISUAL_CENTER,
                width: orbit.rx * 2,
                height: orbit.ry * 2,
                marginLeft: -orbit.rx,
                marginTop: -orbit.ry,
                transform: `rotateX(72deg) rotateZ(${orbit.tilt}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{
                  duration: orbit.speed,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span
                  className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full shadow-lg"
                  style={{
                    width: orbit.dot,
                    height: orbit.dot,
                    backgroundColor: orbit.color,
                    boxShadow: `0 0 12px ${orbit.color}`,
                  }}
                />
              </motion.div>
            </div>
          ))}

        </motion.div>
      </div>

      {/* Copy — sits above animation, no separate background panel */}
      <div className="relative z-10 mx-auto flex min-h-[220px] max-w-7xl items-center sm:min-h-[300px] lg:min-h-[400px]">
        <div className="flex flex-1 flex-col justify-center px-4 py-8 sm:px-10 sm:py-10 lg:max-w-[52%] lg:px-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ee4291]">
            New season
          </p>
          <h2 className="mt-3 max-w-md text-2xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-[#ad1457]">80 shades.</span>
            <br />
            <span className="text-[#880e4f]">One stunning you.</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm text-[#880e4f]/80 sm:text-base">
            Professional nail polishes from Luna, Edlen, Heylove & Sova — filter
            by color, shop by brand.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
            <Link
              href="#catalog"
              className="rounded-xl bg-[#ee4291] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#ee4291]/30 transition hover:bg-[#e13e8a] sm:px-6 sm:py-3"
            >
              Shop all polishes
            </Link>
            <Link
              href="/?brand=Luna"
              className="rounded-xl border-2 border-white/80 bg-white/50 px-5 py-2.5 text-sm font-semibold text-[#c2185b] backdrop-blur-sm transition hover:bg-white sm:px-6 sm:py-3"
            >
              Explore Luna
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
