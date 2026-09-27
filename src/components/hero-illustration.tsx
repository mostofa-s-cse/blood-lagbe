export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 420 420"
      className="mx-auto w-full max-w-md"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="drop-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.68 0.19 25)" />
          <stop offset="100%" stopColor="oklch(0.48 0.22 20)" />
        </linearGradient>
        <linearGradient id="bag-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.7 0.17 20)" />
          <stop offset="100%" stopColor="oklch(0.55 0.21 22)" />
        </linearGradient>
      </defs>

      {/* soft blob backdrop, echoes the pink/blush look of donation-drive posters */}
      <circle cx="210" cy="210" r="190" fill="oklch(0.7 0.1 20 / 0.14)" />
      <circle cx="140" cy="120" r="70" fill="oklch(0.55 0.22 25 / 0.10)" />
      <circle cx="300" cy="300" r="90" fill="oklch(0.55 0.22 25 / 0.08)" />

      {/* floating medical-cross badges */}
      <g fill="oklch(1 0 0)" stroke="oklch(0.55 0.22 25)" strokeWidth="2">
        <rect x="52" y="70" width="26" height="26" rx="6" />
        <path
          d="M65 76v14M58 83h14"
          stroke="oklch(0.55 0.22 25)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect x="330" y="60" width="22" height="22" rx="6" />
        <path
          d="M341 65v12M335 71h12"
          stroke="oklch(0.55 0.22 25)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* small heart badge */}
      <g transform="translate(325 200)">
        <circle r="22" fill="oklch(0.98 0 0)" stroke="oklch(0.55 0.22 25 / 0.3)" />
        <path
          d="M0 8c-8-6-13-11-13-17a8 8 0 0 1 13-6 8 8 0 0 1 13 6c0 6-5 11-13 17Z"
          fill="oklch(0.55 0.22 25)"
        />
      </g>

      {/* blood bag */}
      <g transform="translate(58 300)">
        <path
          d="M6 10h44a6 6 0 0 1 6 6v46a20 20 0 0 1-20 20H20A20 20 0 0 1 0 62V16a6 6 0 0 1 6-6Z"
          fill="url(#bag-gradient)"
        />
        <rect x="20" y="0" width="16" height="12" rx="3" fill="oklch(0.55 0.22 25)" />
        <circle cx="28" cy="45" r="9" fill="oklch(0.98 0 0 / 0.9)" />
        <path
          d="M28 40v10M23 45h10"
          stroke="oklch(0.55 0.22 25)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* central blood drop */}
      <path
        d="M210 70
           C 210 70 118 188 118 255
           A 92 92 0 0 0 302 255
           C 302 188 210 70 210 70 Z"
        fill="url(#drop-gradient)"
      />
      <path
        d="M158 250c0 29 23 52 52 52"
        fill="none"
        stroke="oklch(0.98 0 0 / 0.55)"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  )
}
