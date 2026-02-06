export default function Logo({ size = 40, animated = true }: { size?: number; animated?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={animated ? "animate-pulse-slow" : ""}
    >
      {/* DNA Helix Structure */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="50%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
        
        {animated && (
          <animate
            attributeName="gradientTransform"
            type="rotate"
            from="0 100 100"
            to="360 100 100"
            dur="10s"
            repeatCount="indefinite"
          />
        )}
      </defs>
      
      {/* Outer Circle */}
      <circle
        cx="100"
        cy="100"
        r="95"
        stroke="url(#gradient1)"
        strokeWidth="3"
        fill="none"
        opacity="0.3"
      />
      
      {/* DNA Double Helix Left Strand */}
      <path
        d="M 60 40 Q 55 60, 60 80 Q 65 100, 60 120 Q 55 140, 60 160"
        stroke="url(#gradient1)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      >
        {animated && (
          <animate
            attributeName="d"
            values="M 60 40 Q 55 60, 60 80 Q 65 100, 60 120 Q 55 140, 60 160;
                    M 60 40 Q 65 60, 60 80 Q 55 100, 60 120 Q 65 140, 60 160;
                    M 60 40 Q 55 60, 60 80 Q 65 100, 60 120 Q 55 140, 60 160"
            dur="4s"
            repeatCount="indefinite"
          />
        )}
      </path>
      
      {/* DNA Double Helix Right Strand */}
      <path
        d="M 140 40 Q 145 60, 140 80 Q 135 100, 140 120 Q 145 140, 140 160"
        stroke="url(#gradient2)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      >
        {animated && (
          <animate
            attributeName="d"
            values="M 140 40 Q 145 60, 140 80 Q 135 100, 140 120 Q 145 140, 140 160;
                    M 140 40 Q 135 60, 140 80 Q 145 100, 140 120 Q 135 140, 140 160;
                    M 140 40 Q 145 60, 140 80 Q 135 100, 140 120 Q 145 140, 140 160"
            dur="4s"
            repeatCount="indefinite"
          />
        )}
      </path>
      
      {/* DNA Connections/Base Pairs */}
      <line x1="60" y1="50" x2="140" y2="50" stroke="url(#gradient1)" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
      <line x1="60" y1="70" x2="140" y2="70" stroke="url(#gradient2)" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
      <line x1="60" y1="90" x2="140" y2="90" stroke="url(#gradient1)" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
      <line x1="60" y1="110" x2="140" y2="110" stroke="url(#gradient2)" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
      <line x1="60" y1="130" x2="140" y2="130" stroke="url(#gradient1)" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
      <line x1="60" y1="150" x2="140" y2="150" stroke="url(#gradient2)" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
      
      {/* Central Flow Arrow */}
      <path
        d="M 100 35 L 100 85"
        stroke="url(#gradient1)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M 90 75 L 100 85 L 110 75"
        stroke="url(#gradient1)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.8"
      />
      
      <path
        d="M 100 115 L 100 165"
        stroke="url(#gradient2)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M 90 155 L 100 165 L 110 155"
        stroke="url(#gradient2)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.8"
      />
      
      {/* Decorative Nodes */}
      <circle cx="60" cy="50" r="5" fill="#14b8a6">
        {animated && (
          <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="140" cy="70" r="5" fill="#d946ef">
        {animated && (
          <animate attributeName="r" values="5;7;5" dur="2s" begin="0.5s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="60" cy="90" r="5" fill="#f97316">
        {animated && (
          <animate attributeName="r" values="5;7;5" dur="2s" begin="1s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="140" cy="110" r="5" fill="#14b8a6">
        {animated && (
          <animate attributeName="r" values="5;7;5" dur="2s" begin="1.5s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="60" cy="130" r="5" fill="#d946ef">
        {animated && (
          <animate attributeName="r" values="5;7;5" dur="2s" begin="2s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="140" cy="150" r="5" fill="#f97316">
        {animated && (
          <animate attributeName="r" values="5;7;5" dur="2s" begin="2.5s" repeatCount="indefinite" />
        )}
      </circle>
      
      {/* Sparkles */}
      <circle cx="30" cy="30" r="2" fill="#14b8a6" opacity="0.6">
        {animated && (
          <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="170" cy="170" r="2" fill="#d946ef" opacity="0.6">
        {animated && (
          <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="1s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="170" cy="30" r="2" fill="#f97316" opacity="0.6">
        {animated && (
          <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="2s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="30" cy="170" r="2" fill="#14b8a6" opacity="0.6">
        {animated && (
          <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="1.5s" repeatCount="indefinite" />
        )}
      </circle>
    </svg>
  )
}
