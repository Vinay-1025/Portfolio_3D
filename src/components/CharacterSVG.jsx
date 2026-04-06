export default function CharacterSVG() {
  return (
    <svg
      width="280"
      height="360"
      viewBox="0 0 280 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="character-svg"
      style={{ position: 'relative', zIndex: 2 }}
    >
      <style>{`
        .character-svg {
          animation: float 3.5s ease-in-out infinite;
          filter: drop-shadow(0 20px 40px rgba(0,245,255,0.15));
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }

        /* Eye blinking */
        .eye-l, .eye-r {
          animation: blink-char 4s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes blink-char {
          0%, 90%, 100% { scaleY: 1; }
          95% { transform: scaleY(0.1); }
        }

        /* Wave arm */
        .arm-r {
          transform-origin: 200px 165px;
          animation: wave 2.5s ease-in-out infinite;
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-18deg); }
          75% { transform: rotate(10deg); }
        }

        /* laptop screen flicker */
        .laptop-screen {
          animation: screen-flicker 6s ease-in-out infinite;
        }
        @keyframes screen-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
      `}</style>

      {/* ── Shadow ── */}
      <ellipse cx="140" cy="355" rx="70" ry="8" fill="rgba(0,245,255,0.08)" />

      {/* ── Body / Torso ── */}
      <rect x="95" y="155" width="90" height="100" rx="20" fill="#1a2744" />
      {/* Shirt collar / neckline */}
      <path d="M120 155 L140 175 L160 155" stroke="#00f5ff" strokeWidth="2" fill="none" opacity="0.6" />
      {/* Hoodie pocket */}
      <rect x="120" y="210" width="40" height="28" rx="8" fill="#0f1e3d" opacity="0.7" />

      {/* ── Left Arm ── */}
      <rect x="60" y="158" width="36" height="18" rx="9" fill="#1a2744" />
      <rect x="48" y="160" width="20" height="64" rx="10" fill="#1a2744" />
      {/* Left hand */}
      <ellipse cx="55" cy="228" rx="12" ry="10" fill="#e8c49a" />

      {/* ── Right Arm (waving) ── */}
      <g className="arm-r">
        <rect x="184" y="158" width="36" height="18" rx="9" fill="#1a2744" />
        <rect x="194" y="155" width="20" height="64" rx="10" fill="#1a2744" />
        {/* Right hand */}
        <ellipse cx="207" cy="223" rx="12" ry="10" fill="#e8c49a" />
        {/* Wave fingers */}
        <line x1="202" y1="215" x2="198" y2="207" stroke="#e8c49a" strokeWidth="4" strokeLinecap="round" />
        <line x1="207" y1="213" x2="207" y2="204" stroke="#e8c49a" strokeWidth="4" strokeLinecap="round" />
        <line x1="213" y1="215" x2="216" y2="206" stroke="#e8c49a" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* ── Legs ── */}
      <rect x="100" y="252" width="34" height="70" rx="12" fill="#0d1529" />
      <rect x="146" y="252" width="34" height="70" rx="12" fill="#0d1529" />

      {/* ── Shoes ── */}
      <ellipse cx="117" cy="325" rx="22" ry="10" fill="#00f5ff" opacity="0.9" />
      <ellipse cx="163" cy="325" rx="22" ry="10" fill="#00f5ff" opacity="0.9" />

      {/* ── Neck ── */}
      <rect x="127" y="128" width="26" height="30" rx="8" fill="#e8c49a" />

      {/* ── Head ── */}
      <ellipse cx="140" cy="105" rx="52" ry="58" fill="#e8c49a" />

      {/* ── Hair ── */}
      <ellipse cx="140" cy="52" rx="52" ry="24" fill="#2d1a0e" />
      <path d="M88 65 Q85 40 100 35 Q115 48 140 47 Q165 48 180 35 Q195 40 192 65" fill="#2d1a0e" />
      {/* Hair detail */}
      <path d="M108 45 Q120 38 140 38 Q160 38 172 45" stroke="#3d2512" strokeWidth="3" fill="none" opacity="0.6" />

      {/* ── Face ── */}
      {/* Eyebrows */}
      <path d="M112 82 Q120 78 128 82" stroke="#2d1a0e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M152 82 Q160 78 168 82" stroke="#2d1a0e" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Eyes */}
      <g className="eye-l">
        <ellipse cx="120" cy="98" rx="10" ry="11" fill="white" />
        <ellipse cx="120" cy="100" rx="6" ry="7" fill="#1a2744" />
        <ellipse cx="122" cy="97" rx="2.5" ry="2.5" fill="white" />
        {/* Cyan eye shine */}
        <ellipse cx="123" cy="96" rx="1.5" ry="1.5" fill="#00f5ff" opacity="0.8" />
      </g>
      <g className="eye-r">
        <ellipse cx="160" cy="98" rx="10" ry="11" fill="white" />
        <ellipse cx="160" cy="100" rx="6" ry="7" fill="#1a2744" />
        <ellipse cx="162" cy="97" rx="2.5" ry="2.5" fill="white" />
        <ellipse cx="163" cy="96" rx="1.5" ry="1.5" fill="#00f5ff" opacity="0.8" />
      </g>

      {/* Nose */}
      <path d="M138 104 Q135 115 140 118 Q145 115 142 104" fill="#d4a574" opacity="0.5" />

      {/* Smile */}
      <path d="M125 128 Q140 140 155 128" stroke="#c4714a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Cheek blush */}
      <ellipse cx="108" cy="115" rx="10" ry="6" fill="#ff9b7a" opacity="0.25" />
      <ellipse cx="172" cy="115" rx="10" ry="6" fill="#ff9b7a" opacity="0.25" />

      {/* ── Laptop (held with left arm) ── */}
      <g transform="translate(0, 8)">
        {/* Laptop base */}
        <rect x="42" y="237" width="68" height="8" rx="3" fill="#2a3a5c" />
        {/* Laptop screen */}
        <rect x="40" y="195" width="72" height="44" rx="5" fill="#0a1628" stroke="#00f5ff" strokeWidth="1" strokeOpacity="0.4" />
        {/* Screen glow */}
        <rect className="laptop-screen" x="44" y="199" width="64" height="36" rx="3" fill="#0d1e3d" />
        {/* Code lines on screen */}
        <line x1="48" y1="208" x2="80" y2="208" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <line x1="48" y1="215" x2="70" y2="215" stroke="#ffb347" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <line x1="48" y1="222" x2="76" y2="222" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="48" y1="229" x2="64" y2="229" stroke="#8892b0" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* ── Floating badges ── */}
      {/* React badge */}
      <g transform="translate(220, 80)">
        <rect width="48" height="22" rx="11" fill="rgba(0,200,255,0.15)" stroke="rgba(0,200,255,0.4)" strokeWidth="1" />
        <text x="24" y="15" textAnchor="middle" fill="#00c8ff" fontSize="9" fontFamily="JetBrains Mono, monospace">⚛ React</text>
      </g>
      {/* Node badge */}
      <g transform="translate(12, 100)">
        <rect width="52" height="22" rx="11" fill="rgba(100,220,100,0.12)" stroke="rgba(100,220,100,0.4)" strokeWidth="1" />
        <text x="26" y="15" textAnchor="middle" fill="#68dc68" fontSize="9" fontFamily="JetBrains Mono, monospace">⬡ Node</text>
      </g>
      {/* TS badge */}
      <g transform="translate(225, 200)">
        <rect width="40" height="22" rx="11" fill="rgba(49,120,198,0.15)" stroke="rgba(49,120,198,0.4)" strokeWidth="1" />
        <text x="20" y="15" textAnchor="middle" fill="#3178c6" fontSize="9" fontFamily="JetBrains Mono, monospace">TS</text>
      </g>
    </svg>
  )
}
