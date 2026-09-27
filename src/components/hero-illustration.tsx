export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="mx-auto w-full max-w-sm"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="drop-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.68 0.19 25)" />
          <stop offset="100%" stopColor="oklch(0.48 0.22 20)" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="170" fill="oklch(0.55 0.22 25 / 0.08)" />
      <circle cx="200" cy="200" r="130" fill="oklch(0.55 0.22 25 / 0.10)" />
      <path
        d="M200 60
           C 200 60 110 175 110 240
           A 90 90 0 0 0 290 240
           C 290 175 200 60 200 60 Z"
        fill="url(#drop-gradient)"
      />
      <path
        d="M150 235c0 28 22 50 50 50"
        fill="none"
        stroke="oklch(0.98 0 0 / 0.55)"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  )
}
