import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface TechGlobeCanvasProps {
  className?: string;
  variant?: 'hero' | 'radar' | 'ambient';
  intensity?: number;
}

export const TechGlobeCanvas: React.FC<TechGlobeCanvasProps> = ({
  className = '',
  variant = 'ambient',
  intensity = 1.0,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect WebGL capability safely
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setIsSupported(false);
        return;
      }
    } catch {
      setIsSupported(false);
      return;
    }

    let animationFrameId: number;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = variant === 'radar' ? 3.8 : 4.4;
    camera.position.y = 0.2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Group for the entire transforming cyber globe
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Globe Particle Shell with Dissolving / Dispersing Effect
    // We generate points on a sphere, and give each particle an original position
    // and an offset target where it dissolves/melts outward like digital dust
    const particleCount = variant === 'radar' ? 1800 : 2400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);
    const dissolveOffsets = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    const radius = 1.7;
    const cyan = new THREE.Color('#06b6d4');
    const emerald = new THREE.Color('#10b981');
    const amber = new THREE.Color('#fabd00');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution on sphere for uniform aesthetic dots
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;

      // Dissolve vector: particles drift off to the right and upward into digital disintegration
      const driftAngle = Math.random() * Math.PI * 2;
      const driftDist = 1.2 + Math.random() * 2.2;
      dissolveOffsets[i * 3] = Math.cos(driftAngle) * 0.8 + 1.2; // drift toward +X
      dissolveOffsets[i * 3 + 1] = Math.sin(driftAngle) * 0.8 + 0.4; // slight float up
      dissolveOffsets[i * 3 + 2] = (Math.random() - 0.5) * 1.5;

      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.5 + Math.random() * 0.8;

      // Palette coloring based on position & random highlights
      let chosenColor = cyan;
      const rand = Math.random();
      if (rand < 0.25) {
        chosenColor = emerald;
      } else if (rand < 0.4) {
        chosenColor = amber;
      } else if (rand > 0.9) {
        chosenColor = white;
      }

      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture (sharp circular point)
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 32;
    canvasTexture.height = 32;
    const ctx = canvasTexture.getContext('2d')!;
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(6, 182, 212, 0.8)');
    gradient.addColorStop(0.8, 'rgba(16, 185, 129, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvasTexture);
    texture.colorSpace = THREE.SRGBColorSpace;

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.055,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85 * intensity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, pointsMaterial);
    globeGroup.add(particleSystem);

    // 2. Wireframe Core Rings (Latitude / Longitude Hologram lines)
    const ringGroup = new THREE.Group();
    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.18 * intensity,
      blending: THREE.AdditiveBlending,
    });

    // Equator and latitude circles
    const ringAngles = [-0.9, -0.45, 0, 0.45, 0.9];
    ringAngles.forEach((lat) => {
      const ringRad = radius * Math.cos(lat);
      const ringY = radius * Math.sin(lat);
      const curve = new THREE.EllipseCurve(0, 0, ringRad, ringRad, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(64);
      const ringGeom = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(ringGeom, ringMaterial);
      line.rotation.x = Math.PI / 2;
      line.position.y = ringY;
      ringGroup.add(line);
    });

    // 3 Longitude Meridians
    for (let m = 0; m < 4; m++) {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(64);
      const ringGeom = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(ringGeom, ringMaterial);
      line.rotation.y = (m * Math.PI) / 4;
      ringGroup.add(line);
    }
    globeGroup.add(ringGroup);

    // 3. Cyber Data Nodes (Orbiting glowing points representing active prospecting radar pings)
    const nodeCount = 14;
    const nodeGeom = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);

    for (let k = 0; k < nodeCount; k++) {
      const phi = Math.random() * Math.PI;
      const theta = Math.random() * Math.PI * 2;
      const r = radius * 1.02;
      nodePositions[k * 3] = r * Math.sin(phi) * Math.cos(theta);
      nodePositions[k * 3 + 1] = r * Math.cos(phi);
      nodePositions[k * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const isAlert = k % 3 === 0;
      const nodeCol = isAlert ? amber : emerald;
      nodeColors[k * 3] = nodeCol.r;
      nodeColors[k * 3 + 1] = nodeCol.g;
      nodeColors[k * 3 + 2] = nodeCol.b;
    }

    nodeGeom.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeom.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

    const nodeMat = new THREE.PointsMaterial({
      size: 0.11,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodes = new THREE.Points(nodeGeom, nodeMat);
    globeGroup.add(nodes);

    // Interactive mouse parallax state with exponential damping
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.1;
    let targetRotationY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseX = (clientX / rect.width) * 2 - 1;
      mouseY = -(clientY / rect.height) * 2 + 1;
      targetRotationY = mouseX * 0.45;
      targetRotationX = 0.1 - mouseY * 0.35;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Render loop with high-efficiency clock
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Continuous rotation
      globeGroup.rotation.y += 0.25 * delta;

      // Exponential damping toward mouse parallax
      globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y * 0.1) * 0.04;
      globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.05;

      // Dissolving particle effect animation
      // On the right hemisphere (x > 0), particles dissolve and drift outward, then re-converge
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const bx = basePositions[i3];
        const by = basePositions[i3 + 1];
        const bz = basePositions[i3 + 2];

        // Dissolve factor varies with time and position
        // Particles on the positive X half experience a dispersing wave
        const wave = Math.sin(elapsed * speeds[i] + phases[i]);
        const shouldDissolve = bx > 0.2;

        if (shouldDissolve) {
          // Calculate melt progression: 0 (assembled) to 1 (dispersed)
          const melt = Math.max(0, (wave + 0.4) * 0.65);
          posArray[i3] = bx + dissolveOffsets[i3] * melt;
          posArray[i3 + 1] = by + dissolveOffsets[i3 + 1] * melt + Math.sin(elapsed + i) * 0.05;
          posArray[i3 + 2] = bz + dissolveOffsets[i3 + 2] * melt;
        } else {
          // Intact sphere side with subtle organic breathing
          const pulse = 1 + Math.sin(elapsed * 1.5 + phases[i]) * 0.015;
          posArray[i3] = bx * pulse;
          posArray[i3 + 1] = by * pulse;
          posArray[i3 + 2] = bz * pulse;
        }
      }
      posAttr.needsUpdate = true;

      // Node pulsing
      nodes.rotation.y -= 0.15 * delta;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      nodeGeom.dispose();
      pointsMaterial.dispose();
      nodeMat.dispose();
      ringMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [variant, intensity]);

  if (!isSupported) {
    // Elegant fallback if WebGL is unavailable
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(6,182,212,0.15),transparent_60%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-cyan-500/20 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
