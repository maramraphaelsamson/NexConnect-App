export function NexConnectLogo() {
  return (
    <svg
      viewBox="-10 -10 250 60"
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
            .nexconnect-text {
              font-family: 'Playfair Display', serif;
              font-size: 40px;
              font-weight: 700;
              fill: none;
              stroke: url(#logo-gradient);
              stroke-width: 1.5;
              stroke-dasharray: 800;
              stroke-dashoffset: 800;
              animation: draw-text 3s ease-in-out forwards;
            }

            @keyframes draw-text {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}
        </style>
      </defs>

      <text x="0" y="40" className="nexconnect-text">
        NexConnect
      </text>
    </svg>
  );
}
