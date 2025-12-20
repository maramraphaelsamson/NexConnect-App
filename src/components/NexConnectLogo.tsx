export function NexConnectLogo() {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
        <style>
          {`
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
          .animate-draw {
            stroke-dasharray: 500;
            stroke-dashoffset: 500;
            animation: draw 2s ease-in-out forwards;
          }
          .fade-in {
            opacity: 0;
            animation: fadeIn 1s ease-in forwards 1s;
          }
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
        `}
        </style>
      </defs>

      <path
        d="M20,80 L50,20 L80,80"
        stroke="url(#logo-gradient)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="animate-draw"
      />

      <path
        d="M35,60 L65,60"
        stroke="hsl(var(--foreground))"
        strokeWidth="8"
        strokeLinecap="round"
        className="fade-in"
      />
      
      <circle cx="50" cy="20" r="7" fill="hsl(var(--accent))" className="fade-in" />
    </svg>
  );
}
