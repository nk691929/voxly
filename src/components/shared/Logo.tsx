import { site } from "@/config/site";

export function Logo({ showName = true }: { showName?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="voxly-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4338CA" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#voxly-g)" />
        <g fill="#fff">
          <rect x="13.5" y="25" width="5" height="14" rx="2.5" />
          <rect x="21.5" y="19" width="5" height="26" rx="2.5" />
          <rect x="29.5" y="13" width="5" height="38" rx="2.5" />
          <rect x="37.5" y="21" width="5" height="22" rx="2.5" />
          <rect x="45.5" y="27" width="5" height="12" rx="2.5" />
        </g>
        <circle cx="48" cy="16" r="4" fill="#FB7185" />
      </svg>
      {showName && (
        <span className="text-xl font-bold tracking-tight">{site.name}</span>
      )}
    </span>
  );
}
