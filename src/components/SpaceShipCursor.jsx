import { useEffect, useRef } from 'react';

const SpaceShipCursor = () => {
  const svgRef = useRef(null);
  const screenRef = useRef(null);
  const projectilesRef = useRef(null);
  const pointer = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const targetPointer = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const lastInteractionTime = useRef(Date.now());

  const elems = useRef([]);
  const rad = useRef(0);
  const frm = useRef(Math.random());
  const radm = useRef(0);
  const width = useRef(window.innerWidth);
  const height = useRef(window.innerHeight);

  // Refined state for smooth rotation
  const shipState = useRef({ x: 0, y: 0, angle: 0 });

  const N = 25;
  const xmlns = "http://www.w3.org/2000/svg";
  const xlinkns = "http://www.w3.org/1999/xlink";

  // Angular interpolation to prevent flipping and flickering
  const lerpAngle = (a, b, t) => {
    let d = b - a;
    while (d < -Math.PI) d += Math.PI * 2;
    while (d > Math.PI) d -= Math.PI * 2;
    return a + d * t;
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      lastInteractionTime.current = Date.now();
      rad.current = 0;
    };

    const handleResize = () => {
      width.current = window.innerWidth;
      height.current = window.innerHeight;
      radm.current = Math.min(pointer.current.x, pointer.current.y) - 20;
    };

    const handleMouseDown = (e) => {
      const target = e.target.closest('button, a, .tilt-card, .btn, .nav-link, .projects-card, .footer-link');
      if (target) {
        lastInteractionTime.current = Date.now();
        firePlasma(e.clientX, e.clientY);
      }
    };

    const firePlasma = (targetX, targetY) => {
      if (!projectilesRef.current) return;
      const { x, y, angle } = shipState.current;

      const cannonOffset = 22;
      const cannonX1 = x + Math.cos(angle - 0.75) * cannonOffset;
      const cannonY1 = y + Math.sin(angle - 0.75) * cannonOffset;
      const cannonX2 = x + Math.cos(angle + 0.75) * cannonOffset;
      const cannonY2 = y + Math.sin(angle + 0.75) * cannonOffset;

      [[cannonX1, cannonY1], [cannonX2, cannonY2]].forEach(([cx, cy]) => {
        createPlasmaLightning(cx, cy, targetX, targetY);
      });
    };

    const createPlasmaLightning = (startX, startY, endX, endY) => {
      const g = document.createElementNS(xmlns, "g");
      const path = document.createElementNS(xmlns, "path");

      const segments = 6;
      let d = `M ${startX} ${startY}`;
      const dx = (endX - startX) / segments;
      const dy = (endY - startY) / segments;

      for (let i = 1; i < segments; i++) {
        const jitter = 18;
        const jx = startX + dx * i + (Math.random() - 0.5) * jitter;
        const jy = startY + dy * i + (Math.random() - 0.5) * jitter;
        d += ` L ${jx} ${jy}`;
      }
      d += ` L ${endX} ${endY}`;

      path.setAttribute("d", d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "#00f5ff");
      path.setAttribute("stroke-width", "3");
      path.style.filter = "url(#plasmaGlow)";
      g.appendChild(path);
      projectilesRef.current.appendChild(g);

      const flickerInterval = setInterval(() => {
        const jitteredD = d.split(' ').map(token => {
          if (!isNaN(token)) return parseFloat(token) + (Math.random() - 0.5) * 8;
          return token;
        }).join(' ');
        path.setAttribute("d", jitteredD);
      }, 40);

      setTimeout(() => {
        clearInterval(flickerInterval);
        if (g.parentNode) projectilesRef.current.removeChild(g);
        createImpact(endX, endY);
      }, 300);
    };

    const createImpact = (x, y) => {
      const impact = document.createElementNS(xmlns, "circle");
      impact.setAttribute("cx", x); impact.setAttribute("cy", y);
      impact.setAttribute("r", "2"); impact.setAttribute("fill", "#00f5ff");
      impact.style.filter = "url(#plasmaGlow)";
      impact.style.transition = "all 0.4s ease-out";
      projectilesRef.current.appendChild(impact);
      requestAnimationFrame(() => { impact.setAttribute("r", "30"); impact.style.opacity = "0"; });
      setTimeout(() => { if (impact.parentNode) projectilesRef.current.removeChild(impact); }, 400);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousedown", handleMouseDown);
    handleResize();

    const screen = screenRef.current;
    if (screen) {
      while (screen.firstChild) screen.removeChild(screen.firstChild);
      const newElems = [];
      for (let i = 0; i < N; i++) {
        newElems[i] = { use: null, x: width.current / 2, y: height.current / 2, angle: 0 };
        if (i > 0) {
          const elem = document.createElementNS(xmlns, "use");
          const type = i === 1 ? "RealisticShip" : "IonFlare";
          elem.setAttributeNS(xlinkns, "xlink:href", "#" + type);
          screen.prepend(elem);
          newElems[i].use = elem;
        }
      }
      elems.current = newElems;
    }

    let animId;
    const run = () => {
      animId = requestAnimationFrame(run);
      let e0 = elems.current[0];
      if (!e0) return;

      const now = Date.now();
      const isIdle = now - lastInteractionTime.current > 3000;

      if (isIdle) {
        const t = now * 0.0003;
        targetPointer.current.x = width.current / 2 + Math.cos(t) * (width.current * 0.4);
        targetPointer.current.y = height.current / 2 + Math.sin(t * 0.82) * (height.current * 0.4);
      } else {
        targetPointer.current.x = pointer.current.x;
        targetPointer.current.y = pointer.current.y;
      }

      const ax = (Math.cos(3 * frm.current) * rad.current * width.current) / height.current;
      const ay = (Math.sin(4 * frm.current) * rad.current * height.current) / width.current;

      // Heavier position smoothing for cinematic feel
      e0.x += (ax + targetPointer.current.x - e0.x) / 18;
      e0.y += (ay + targetPointer.current.y - e0.y) / 18;

      for (let i = 1; i < N; i++) {
        let e = elems.current[i];
        let ep = elems.current[i - 1];
        if (!e || !ep || !e.use) continue;

        // Position update
        const strength = i === 1 ? 8 : 6;
        const dx = ep.x - e.x;
        const dy = ep.y - e.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Calculate target angle
        const targetAngle = Math.atan2(dy, dx);

        // ONLY update rotation if moving meaningfully (Deadzone)
        // This prevents flickering when the ship is stationary or tiny movements occur
        if (dist > (i === 1 ? 2 : 1)) {
          // Smoothly interpolate angle
          e.angle = lerpAngle(e.angle || 0, targetAngle, i === 1 ? 0.1 : 0.15);
        }

        e.x += (dx + (Math.cos(e.angle) * (120 - i)) / strength) / strength;
        e.y += (dy + (Math.sin(e.angle) * (120 - i)) / strength) / strength;

        const s = i === 1 ? 1.5 : (1 - i / N) * 1.0;
        e.use.setAttributeNS(null, "transform", `translate(${(ep.x + e.x) / 2},${(ep.y + e.y) / 2}) rotate(${(180 / Math.PI) * e.angle}) scale(${s},${s})`);

        if (i === 1) shipState.current = { x: (ep.x + e.x) / 2, y: (ep.y + e.y) / 2, angle: e.angle };
      }

      if (rad.current < radm.current) rad.current++;
      frm.current += 0.003;
    };

    run();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handleMouseDown);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <svg ref={svgRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 20000000 }}>
      <defs>
        <g id="RealisticShip">
          <path fill="url(#MetalDark)" d="M40,0 L-12,-22 L-8,-8 L-30,0 L-8,8 L-12,22 Z" />
          <path fill="url(#MetalLight)" d="M35,0 L-10,-18 L-5,-6 L-25,0 L-5,6 L-10,18 Z" />
          <g opacity="0.4">
            <rect x="-15" y="-12" width="6" height="2" fill="#000" />
            <rect x="-15" y="10" width="6" height="2" fill="#000" />
            <line x1="0" y1="-14" x2="10" y2="-10" stroke="#000" strokeWidth="0.5" />
            <line x1="0" y1="14" x2="10" y2="10" stroke="#000" strokeWidth="0.5" />
            <rect x="5" y="-5" width="2" height="10" fill="rgba(255,255,255,0.05)" />
            <circle cx="-18" cy="-5" r="0.8" fill="#ffaa00" />
            <circle cx="-18" cy="5" r="0.8" fill="#ffaa00" />
          </g>
          <ellipse cx="10" cy="0" rx="12" ry="4.5" fill="url(#GlassGrad)" />
          <path d="M15,0 L8,-2 L8,2 Z" fill="#fff" opacity="0.2" />
          <g fill="#222">
            <rect x="-12" y="-24" width="18" height="4" rx="1" />
            <rect x="-12" y="20" width="18" height="4" rx="1" />
            <rect x="2" y="-23.5" width="2" height="3" fill="#333" />
            <rect x="2" y="20.5" width="2" height="3" fill="#333" />
          </g>
          <g>
            <circle cx="-32" cy="0" r="5" fill="#00f5ff" opacity="0.4">
              <animate attributeName="r" values="4;6;4" dur="0.6s" repeatCount="indefinite" />
            </circle>
            <circle cx="-30" cy="0" r="3" fill="#a1eef0ff" opacity="0.8">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="0.6s" repeatCount="indefinite" />
            </circle>
          </g>
          <circle cx="-10" cy="-20" r="1.5" fill="#ff0000">
            <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="-10" cy="20" r="1.5" fill="#00ff00">
            <animate attributeName="opacity" values="1;0;1" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <rect x="20" y="-1" width="5" height="2" fill="#00f5ff" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
          </rect>
        </g>

        <g id="IonFlare">
          <ellipse cx="-5" cy="0" rx="20" ry="7" fill="url(#IonGrad)" filter="blur(3px)" />
        </g>

        <linearGradient id="MetalDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        <linearGradient id="MetalLight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="60%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        <radialGradient id="GlassGrad">
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
          <stop offset="80%" stopColor="#0ea5e9" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#00f5ff" stopOpacity="0.3" />
        </radialGradient>

        <radialGradient id="IonGrad">
          <stop offset="0%" stopColor="#00f5ff" stopOpacity="1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        <filter id="plasmaGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#00f5ff" />
        </filter>
      </defs>
      <g ref={screenRef} />
      <g ref={projectilesRef} />
    </svg>
  );
};

export default SpaceShipCursor;
