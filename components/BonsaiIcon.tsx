"use client";

interface BonsaiIconProps {
  icon: string;
  className?: string;
  "aria-label"?: string;
}

// SVG-based bonsai icons — no emoji
export function BonsaiIcon({ icon, className = "w-8 h-8", ...rest }: BonsaiIconProps) {
  const ariaLabel = rest["aria-label"] ?? icon;

  switch (icon) {
    case "matsu":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-label={ariaLabel} role="img">
          {/* Pine tree */}
          <rect x="28" y="46" width="8" height="12" rx="2" fill="#6B4F2A"/>
          <polygon points="32,6 14,34 50,34" fill="#2D5A1B"/>
          <polygon points="32,16 18,40 46,40" fill="#3A7023"/>
          <polygon points="32,26 20,46 44,46" fill="#4A8A2D"/>
        </svg>
      );
    case "ume":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-label={ariaLabel} role="img">
          {/* Plum blossom */}
          <rect x="28" y="46" width="8" height="14" rx="2" fill="#6B4F2A"/>
          <rect x="20" y="28" width="6" height="20" rx="2" fill="#6B4F2A" transform="rotate(-20 23 38)"/>
          <rect x="38" y="28" width="6" height="20" rx="2" fill="#6B4F2A" transform="rotate(20 41 38)"/>
          <circle cx="32" cy="24" r="9" fill="#E8A0B4"/>
          <circle cx="20" cy="28" r="7" fill="#F0B8C8"/>
          <circle cx="44" cy="28" r="7" fill="#F0B8C8"/>
          <circle cx="24" cy="16" r="6" fill="#E8A0B4"/>
          <circle cx="40" cy="16" r="6" fill="#E8A0B4"/>
        </svg>
      );
    case "sakura":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-label={ariaLabel} role="img">
          {/* Cherry blossom */}
          <rect x="28" y="46" width="8" height="14" rx="2" fill="#6B4F2A"/>
          <ellipse cx="32" cy="30" rx="20" ry="18" fill="#F7C5D0"/>
          <circle cx="22" cy="22" r="8" fill="#F0A8B8"/>
          <circle cx="42" cy="22" r="8" fill="#F0A8B8"/>
          <circle cx="32" cy="18" r="8" fill="#F7C5D0"/>
          <circle cx="32" cy="30" r="6" fill="#FFECEF"/>
          {/* petals */}
          <ellipse cx="32" cy="22" rx="4" ry="6" fill="#F9D0DA"/>
          <ellipse cx="32" cy="22" rx="4" ry="6" fill="#F9D0DA" transform="rotate(72 32 22)"/>
          <ellipse cx="32" cy="22" rx="4" ry="6" fill="#F9D0DA" transform="rotate(144 32 22)"/>
          <ellipse cx="32" cy="22" rx="4" ry="6" fill="#F9D0DA" transform="rotate(216 32 22)"/>
          <ellipse cx="32" cy="22" rx="4" ry="6" fill="#F9D0DA" transform="rotate(288 32 22)"/>
        </svg>
      );
    case "momiji":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-label={ariaLabel} role="img">
          {/* Maple leaf */}
          <rect x="28" y="46" width="8" height="14" rx="2" fill="#6B4F2A"/>
          <path d="M32 8 L28 18 L18 14 L24 24 L14 26 L24 30 L20 42 L32 36 L44 42 L40 30 L50 26 L40 24 L46 14 L36 18 Z"
            fill="#D4440A" stroke="#B03500" strokeWidth="1"/>
        </svg>
      );
    case "fuji":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-label={ariaLabel} role="img">
          {/* Wisteria */}
          <rect x="28" y="36" width="8" height="24" rx="2" fill="#6B4F2A"/>
          <ellipse cx="32" cy="20" rx="16" ry="8" fill="#7B4FA0"/>
          <ellipse cx="22" cy="28" rx="8" ry="14" fill="#9B6FC0"/>
          <ellipse cx="32" cy="30" rx="8" ry="14" fill="#8A5FB0"/>
          <ellipse cx="42" cy="28" rx="8" ry="14" fill="#9B6FC0"/>
          <ellipse cx="26" cy="26" rx="5" ry="10" fill="#B080D0" opacity="0.7"/>
          <ellipse cx="38" cy="26" rx="5" ry="10" fill="#B080D0" opacity="0.7"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 64 64" className={className} aria-label={ariaLabel} role="img">
          <rect x="28" y="46" width="8" height="14" rx="2" fill="#6B4F2A"/>
          <circle cx="32" cy="28" r="18" fill="#3A7023"/>
        </svg>
      );
  }
}

interface ItemIconProps {
  icon: string;
  className?: string;
}

export function ItemIcon({ icon, className = "w-6 h-6" }: ItemIconProps) {
  switch (icon) {
    case "water":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-label="水やり" role="img">
          <path d="M32 8 C32 8 14 30 14 42 C14 52 22 58 32 58 C42 58 50 52 50 42 C50 30 32 8 32 8Z"
            fill="#4A9EE0" stroke="#2A7EC0" strokeWidth="1.5"/>
          <ellipse cx="26" cy="44" rx="4" ry="6" fill="#7BC4F0" opacity="0.6"/>
        </svg>
      );
    case "fertilizer":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-label="肥料" role="img">
          <rect x="16" y="28" width="32" height="28" rx="4" fill="#6B8C42"/>
          <rect x="22" y="20" width="20" height="12" rx="3" fill="#8AAA55"/>
          <rect x="20" y="36" width="6" height="4" rx="1" fill="#4A6A2A"/>
          <rect x="29" y="36" width="6" height="4" rx="1" fill="#4A6A2A"/>
          <rect x="38" y="36" width="6" height="4" rx="1" fill="#4A6A2A"/>
          <path d="M32 8 C32 8 28 14 28 18 C28 22 30 24 32 24 C34 24 36 22 36 18 C36 14 32 8 32 8Z"
            fill="#5AAA30"/>
        </svg>
      );
    case "scissors":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-label="剪定ばさみ" role="img">
          <circle cx="20" cy="20" r="10" fill="none" stroke="#666" strokeWidth="3"/>
          <circle cx="20" cy="44" r="10" fill="none" stroke="#666" strokeWidth="3"/>
          <line x1="28" y1="26" x2="52" y2="52" stroke="#888" strokeWidth="3" strokeLinecap="round"/>
          <line x1="28" y1="38" x2="52" y2="12" stroke="#888" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 64 64" className={className} aria-label={icon} role="img">
          <circle cx="32" cy="32" r="24" fill="#aaa"/>
        </svg>
      );
  }
}

// Tree icon for header/title
export function TreeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="28" y="46" width="8" height="14" rx="2" fill="#6B4F2A"/>
      <polygon points="32,6 14,34 50,34" fill="#2D5A1B"/>
      <polygon points="32,16 18,40 46,40" fill="#3A7023"/>
      <polygon points="32,26 20,46 44,46" fill="#4A8A2D"/>
    </svg>
  );
}

// Coin icon
export function CoinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="#F5C518" stroke="#D4A800" strokeWidth="2"/>
      <circle cx="32" cy="32" r="22" fill="#FFD700" stroke="#D4A800" strokeWidth="1"/>
      <text x="32" y="40" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#A07800">C</text>
    </svg>
  );
}

// Home/garden icon
export function HomeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <polygon points="32,8 6,32 14,32 14,56 26,56 26,42 38,42 38,56 50,56 50,32 58,32" fill="#4A8A2D" stroke="#2D5A1B" strokeWidth="2"/>
    </svg>
  );
}

// Shop/bag icon
export function ShopIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="12" y="26" width="40" height="32" rx="4" fill="#8B6914" stroke="#6B4F0A" strokeWidth="2"/>
      <path d="M22 26 C22 14 42 14 42 26" fill="none" stroke="#6B4F0A" strokeWidth="3"/>
      <line x1="22" y1="38" x2="42" y2="38" stroke="#6B4F0A" strokeWidth="2"/>
    </svg>
  );
}

// Stats/chart icon
export function StatsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="8" y="40" width="12" height="18" rx="2" fill="#4A9EE0"/>
      <rect x="26" y="26" width="12" height="32" rx="2" fill="#3A8ED0"/>
      <rect x="44" y="14" width="12" height="44" rx="2" fill="#2A7EC0"/>
    </svg>
  );
}

// Trophy icon
export function TrophyIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M16 10 L48 10 L44 34 C44 44 38 50 32 50 C26 50 20 44 20 34 Z" fill="#F5C518" stroke="#D4A800" strokeWidth="2"/>
      <rect x="26" y="50" width="12" height="8" rx="2" fill="#D4A800"/>
      <rect x="20" y="56" width="24" height="6" rx="3" fill="#B08800"/>
      <path d="M16 10 L8 10 L8 28 C8 34 12 38 18 36" fill="#FFD700" stroke="#D4A800" strokeWidth="1.5"/>
      <path d="M48 10 L56 10 L56 28 C56 34 52 38 46 36" fill="#FFD700" stroke="#D4A800" strokeWidth="1.5"/>
    </svg>
  );
}

// Seedling icon
export function SeedlingIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="30" y="32" width="4" height="28" rx="2" fill="#6B4F2A"/>
      <ellipse cx="32" cy="24" rx="12" ry="10" fill="#4A8A2D"/>
      <path d="M32 24 C24 18 20 8 28 6 C32 14 32 24 32 24Z" fill="#5AAA35"/>
    </svg>
  );
}

// Moon icon (offline banner)
export function MoonIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M32 6 C16 6 6 18 6 32 C6 46 16 58 32 58 C44 58 54 50 58 38 C52 42 44 44 36 40 C24 34 22 18 32 6Z"
        fill="#F5C518" stroke="#D4A800" strokeWidth="1.5"/>
    </svg>
  );
}

// Pot/planter icon (empty slot)
export function PotIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <ellipse cx="32" cy="20" rx="22" ry="8" fill="#8B6914" opacity="0.5"/>
      <path d="M10 20 L16 52 C16 54 20 56 32 56 C44 56 48 54 48 52 L54 20 Z"
        fill="#A07820" stroke="#8B6914" strokeWidth="2"/>
      <ellipse cx="32" cy="20" rx="22" ry="8" fill="#C09030" stroke="#8B6914" strokeWidth="2"/>
    </svg>
  );
}
