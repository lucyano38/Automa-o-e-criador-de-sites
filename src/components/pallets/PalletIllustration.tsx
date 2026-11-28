import React from 'react';
import { PalletMaterial } from '../../data/pallets';

interface PalletIllustrationProps {
  material: PalletMaterial;
  className?: string;
  label?: string;
}

const PALETTES: Record<
  PalletMaterial,
  { top: string; slat: string; slatAlt: string; side: string; block: string; glow: string }
> = {
  madeira: {
    top: '#B87A3F',
    slat: '#D89A57',
    slatAlt: '#C98A4B',
    side: '#8A5A2B',
    block: '#7A4E24',
    glow: 'rgba(249, 115, 22, 0.18)',
  },
  plastico: {
    top: '#2C8FA3',
    slat: '#7FD8E8',
    slatAlt: '#5CC3D6',
    side: '#1E6C7C',
    block: '#175561',
    glow: 'rgba(76, 215, 246, 0.22)',
  },
  compensado: {
    top: '#B98A45',
    slat: '#E3B873',
    slatAlt: '#D2A45E',
    side: '#8E6830',
    block: '#7A5827',
    glow: 'rgba(255, 182, 144, 0.18)',
  },
};

export const PalletIllustration: React.FC<PalletIllustrationProps> = ({
  material,
  className = '',
  label,
}) => {
  const c = PALETTES[material];
  const gradientId = React.useId();

  // Top face corners (isometric projection)
  const A = { x: 40, y: 74 };
  const B = { x: 172, y: 44 };
  const C = { x: 228, y: 78 };
  const D = { x: 96, y: 108 };
  const depth = 14;

  const slats = Array.from({ length: 5 }, (_, index) => {
    const t = index / 5;
    const dt = 0.155;
    const lerp = (p: { x: number; y: number }, q: { x: number; y: number }, k: number) => ({
      x: p.x + (q.x - p.x) * k,
      y: p.y + (q.y - p.y) * k,
    });
    const p1 = lerp(A, B, t);
    const p2 = lerp(A, B, t + dt);
    const p4 = { x: p1.x + (D.x - A.x), y: p1.y + (D.y - A.y) };
    const p3 = { x: p2.x + (D.x - A.x), y: p2.y + (D.y - A.y) };
    return { points: `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`, index };
  });

  const blocks = [
    { x: 96, y: 108 },
    { x: 160, y: 96 },
    { x: 212, y: 80 },
  ];

  return (
    <svg
      viewBox="0 0 260 180"
      className={className}
      role="img"
      aria-label={label ?? `Ilustração de pallet de ${material}`}
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor={c.glow} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id={`${gradientId}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c.slat} />
          <stop offset="100%" stopColor={c.slatAlt} />
        </linearGradient>
      </defs>

      <ellipse cx="132" cy="150" rx="96" ry="14" fill="rgba(0,0,0,0.45)" />
      <rect x="0" y="0" width="260" height="180" fill={`url(#${gradientId})`} />

      {/* Top deck boards */}
      <polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`}
        fill={`url(#${gradientId}-top)`}
        opacity="0.35"
      />
      {slats.map((slat) => (
        <polygon
          key={slat.index}
          points={slat.points}
          fill={slat.index % 2 === 0 ? c.slat : c.slatAlt}
          stroke={c.top}
          strokeWidth="0.8"
        />
      ))}

      {/* Right side face */}
      <polygon
        points={`${D.x},${D.y} ${C.x},${C.y} ${C.x},${C.y + depth} ${D.x},${D.y + depth}`}
        fill={c.side}
      />
      {/* Left side face */}
      <polygon
        points={`${A.x},${A.y} ${D.x},${D.y} ${D.x},${D.y + depth} ${A.x},${A.y + depth}`}
        fill={c.block}
      />

      {/* Blocks and bottom boards */}
      {blocks.map((block, index) => (
        <g key={index}>
          <polygon
            points={`${block.x},${block.y + 4} ${block.x + 14},${block.y + 1} ${block.x + 14},${block.y + 22} ${block.x},${block.y + 25}`}
            fill={c.block}
          />
          <polygon
            points={`${block.x},${block.y + 25} ${block.x + 14},${block.y + 22} ${block.x + 20},${block.y + 25} ${block.x + 6},${block.y + 28}`}
            fill={c.side}
            opacity="0.9"
          />
        </g>
      ))}

      {/* Bottom runner */}
      <polygon
        points={`${A.x + 8},${A.y + depth + 12} ${D.x + 8},${D.y + depth + 12} ${D.x + 8},${D.y + depth + 20} ${A.x + 8},${A.y + depth + 20}`}
        fill={c.side}
        opacity="0.85"
      />
      <polygon
        points={`${D.x + 8},${D.y + depth + 12} ${C.x + 8},${C.y + depth + 12} ${C.x + 8},${C.y + depth + 20} ${D.x + 8},${D.y + depth + 20}`}
        fill={c.block}
      />
    </svg>
  );
};
