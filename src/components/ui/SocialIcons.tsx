type IconProps = { className?: string };

/** Brand icons are not part of lucide-react v1, so they live here as inline SVG. */

export function InstagramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M15.5 3h-2.2A3.8 3.8 0 0 0 9.5 6.8V9H7.5v3h2v9h3v-9h2.4l.6-3H12.5V7a1 1 0 0 1 1-1h2z" />
    </svg>
  );
}

export function TikTokIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M14 3v11.2a3.1 3.1 0 1 1-2.6-3.06" />
      <path d="M14 6.2A4.8 4.8 0 0 0 18.8 11" />
    </svg>
  );
}
