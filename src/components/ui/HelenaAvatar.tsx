export function HelenaAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size * (72 / 64)} viewBox="0 0 64 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="65" rx="16" ry="8" fill="#0A2463" />
      <rect x="20" y="52" width="24" height="18" rx="10" fill="#163a80" />
      <ellipse cx="14" cy="58" rx="5" ry="3" fill="#F4C2A1" transform="rotate(-20 14 58)" />
      <ellipse cx="50" cy="58" rx="5" ry="3" fill="#F4C2A1" transform="rotate(20 50 58)" />
      <rect x="27" y="44" width="10" height="8" rx="4" fill="#F4C2A1" />
      <circle cx="32" cy="30" r="22" fill="#F4C2A1" />
      <path d="M10 26 Q12 8 32 8 Q52 8 54 26 Q50 14 32 14 Q14 14 10 26Z" fill="#3B1F0A" />
      <ellipse cx="10" cy="22" rx="5" ry="8" fill="#3B1F0A" />
      <circle cx="10" cy="14" r="4" fill="#FF6B9D" />
      <ellipse cx="54" cy="22" rx="5" ry="8" fill="#3B1F0A" />
      <circle cx="54" cy="14" r="4" fill="#FF6B9D" />
      <ellipse cx="23" cy="30" rx="6" ry="7" fill="#fff" />
      <ellipse cx="41" cy="30" rx="6" ry="7" fill="#fff" />
      <circle cx="24" cy="31" r="4" fill="#3B1F0A" />
      <circle cx="42" cy="31" r="4" fill="#3B1F0A" />
      <circle cx="25" cy="30" r="1.5" fill="#fff" />
      <circle cx="43" cy="30" r="1.5" fill="#fff" />
      <line x1="17" y1="24" x2="15" y2="21" stroke="#3B1F0A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="20" y1="22" x2="19" y2="19" stroke="#3B1F0A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="23" y1="22" x2="23" y2="19" stroke="#3B1F0A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="38" y1="22" x2="38" y2="19" stroke="#3B1F0A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="41" y1="22" x2="40" y2="19" stroke="#3B1F0A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="44" y1="24" x2="46" y2="21" stroke="#3B1F0A" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="32" cy="36" rx="2" ry="1.5" fill="#E8A882" />
      <path d="M25 41 Q32 48 39 41" stroke="#D4724A" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M28 42 Q32 46 36 42" fill="#fff" />
      <ellipse cx="16" cy="36" rx="5" ry="3.5" fill="#FF9EB5" fillOpacity=".45" />
      <ellipse cx="48" cy="36" rx="5" ry="3.5" fill="#FF9EB5" fillOpacity=".45" />
    </svg>
  );
}
