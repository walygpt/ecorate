export function EcoRateLogo() {
  return (
    <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Leaf shape */}
      <path
        d="M 20 5 Q 25 8 25 15 Q 25 22 20 28 Q 15 22 15 15 Q 15 8 20 5 Z"
        fill="currentColor"
        className="text-accent"
      />
      {/* Graph bars */}
      <rect x="8" y="22" width="3" height="10" fill="currentColor" className="text-sidebar-primary" />
      <rect x="13" y="18" width="3" height="14" fill="currentColor" className="text-sidebar-primary" />
      <rect x="18" y="14" width="3" height="18" fill="currentColor" className="text-sidebar-primary" />
      <rect x="23" y="10" width="3" height="22" fill="currentColor" className="text-sidebar-primary" />
      <rect x="28" y="6" width="3" height="26" fill="currentColor" className="text-sidebar-primary" />
    </svg>
  )
}
