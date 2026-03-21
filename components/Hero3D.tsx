
import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, useProgress, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { scrollToSection } from '../utils/navigation';
import { buildWhatsAppUrl } from '../utils/whatsapp';

// ─── Desert Titanium color palette ────────────────────────
// Apple iPhone 16 Pro "Desert Titanium" — warm champagne-gold
const COLORS = {
  body: '#B5A48E',   // desert titanium warm tan
  bodyDark: '#9B8E7A',   // slightly darker for depth
  frame: '#C8B99A',   // slightly lighter frame rails
  frameShine: '#D9CEBF',   // highlight edge
  screenBg: '#000000',   // screen base
  cameraModule: '#8A7D6B',   // camera bump
  cameraLens: '#1A1614',   // lens opening
  button: '#C0AF97',   // side buttons
  homeBar: 'rgba(255,255,255,0.28)',
};

// ─── Screen texture with "iPhone Navarro" brand ────────────
const createScreenTexture = (): THREE.CanvasTexture => {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = Math.round(size * 2.16); // 9:19.5 iPhone ratio
  const ctx = canvas.getContext('2d')!;
  const h = canvas.height;

  // --- Background --- deep blue-black with subtle gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#020810');
  bgGrad.addColorStop(0.5, '#000408');
  bgGrad.addColorStop(1, '#010306');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, size, h);

  // --- Subtle radial glow at center ---
  const glow = ctx.createRadialGradient(size / 2, h * 0.5, 0, size / 2, h * 0.5, size * 0.6);
  glow.addColorStop(0, 'rgba(0,113,227,0.15)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, h);

  // --- Apple logo SVG path redrawn on canvas (center-top area) ---
  const appleSize = 54;
  const ax = size / 2;
  const ay = h * 0.28;
  ctx.save();
  ctx.translate(ax - appleSize / 2, ay - appleSize / 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.globalAlpha = 0.92;
  // Simplified Apple shape using bezier curves
  const s = appleSize / 24;
  ctx.beginPath();
  ctx.moveTo(18.71 * s, 19.5 * s);
  ctx.bezierCurveTo(17.88 * s, 20.74 * s, 17 * s, 21.95 * s, 15.66 * s, 21.97 * s);
  ctx.bezierCurveTo(14.32 * s, 22 * s, 13.89 * s, 21.18 * s, 12.37 * s, 21.18 * s);
  ctx.bezierCurveTo(10.84 * s, 21.18 * s, 10.37 * s, 21.95 * s, 9.1 * s, 22 * s);
  ctx.bezierCurveTo(7.79 * s, 22.05 * s, 6.8 * s, 20.68 * s, 5.96 * s, 19.47 * s);
  ctx.bezierCurveTo(4.25 * s, 17 * s, 2.94 * s, 12.45 * s, 4.7 * s, 9.39 * s);
  ctx.bezierCurveTo(5.57 * s, 7.87 * s, 7.13 * s, 6.91 * s, 8.82 * s, 6.88 * s);
  ctx.bezierCurveTo(10.1 * s, 6.86 * s, 11.32 * s, 7.75 * s, 12.11 * s, 7.75 * s);
  ctx.bezierCurveTo(12.89 * s, 7.75 * s, 14.37 * s, 6.68 * s, 15.91 * s, 6.84 * s);
  ctx.bezierCurveTo(16.56 * s, 6.87 * s, 18.38 * s, 7.1 * s, 19.55 * s, 8.82 * s);
  ctx.bezierCurveTo(19.46 * s, 8.88 * s, 17.38 * s, 10.1 * s, 17.4 * s, 12.63 * s);
  ctx.bezierCurveTo(17.43 * s, 15.65 * s, 20.05 * s, 16.66 * s, 20.08 * s, 16.67 * s);
  ctx.bezierCurveTo(20.05 * s, 16.74 * s, 19.66 * s, 18.11 * s, 18.71 * s, 19.5 * s);
  ctx.closePath();
  // Leaf
  ctx.moveTo(13 * s, 3.5 * s);
  ctx.bezierCurveTo(13.73 * s, 2.67 * s, 14.94 * s, 2.04 * s, 15.94 * s, 2 * s);
  ctx.bezierCurveTo(16.07 * s, 3.17 * s, 15.6 * s, 4.35 * s, 14.9 * s, 5.19 * s);
  ctx.bezierCurveTo(14.21 * s, 6.04 * s, 13.07 * s, 6.7 * s, 11.95 * s, 6.61 * s);
  ctx.bezierCurveTo(11.8 * s, 5.46 * s, 12.36 * s, 4.26 * s, 13 * s, 3.5 * s);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();

  // --- "iPhone Navarro" main title ---
  ctx.save();
  ctx.textAlign = 'center';

  // Brand name with Inter-like font
  ctx.font = `800 ${Math.round(size * 0.085)}px -apple-system, "Helvetica Neue", sans-serif`;
  ctx.fillStyle = '#FFFFFF';
  ctx.globalAlpha = 1;
  ctx.fillText('iPhone', size / 2, h * 0.49);

  ctx.font = `800 ${Math.round(size * 0.085)}px -apple-system, "Helvetica Neue", sans-serif`;
  ctx.fillStyle = '#B5A48E'; // Desert Titanium color echo
  ctx.fillText('Navarro', size / 2, h * 0.57);

  // --- Divider line ---
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = '#B5A48E';
  ctx.fillRect(size / 2 - 60, h * 0.615, 120, 1.5);
  ctx.globalAlpha = 1;

  // --- Eyebrow tag ---
  ctx.font = `600 ${Math.round(size * 0.038)}px -apple-system, sans-serif`;
  ctx.fillStyle = 'rgba(181,164,142,0.7)';
  ctx.letterSpacing = '3px';
  ctx.fillText('NAVARRO · BUENOS AIRES', size / 2, h * 0.655);

  // --- Status bar icons (top) ---
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `500 ${Math.round(size * 0.03)}px -apple-system, sans-serif`;
  ctx.fillText('9:41', size / 2, h * 0.045);
  ctx.globalAlpha = 1;

  // --- Home indicator bar ---
  const barW = 100;
  const barGrad = ctx.createLinearGradient(size / 2 - barW / 2, 0, size / 2 + barW / 2, 0);
  barGrad.addColorStop(0, 'rgba(255,255,255,0)');
  barGrad.addColorStop(0.2, 'rgba(255,255,255,0.35)');
  barGrad.addColorStop(0.8, 'rgba(255,255,255,0.35)');
  barGrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = barGrad;
  ctx.beginPath();
  ctx.roundRect(size / 2 - barW / 2, h * 0.96, barW, 4, 2);
  ctx.fill();

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

// ─── iPhone 3D model (GLTF) ──────────────────────────────────────
const IPhoneModel: React.FC<{ scrollY: number }> = ({ scrollY }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [isDragging, setIsDragging] = useState(false);
  const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState({ x: 0.12, y: 0.15 });
  const currentRotation = useRef({ x: 0.12, y: 0.15 });
  const autoRotVel = useRef(0.35);

  const screenTexture = useMemo(() => createScreenTexture(), []);
  const { nodes, materials } = useGLTF('/models/iphone.glb') as any;

  // Apply Desert Titanium color to the body parts
  useEffect(() => {
    Object.entries(materials).forEach(([name, material]) => {
      // These specific materials are glass, lenses, or screen borders that shouldn't be recolored
      if (
        name !== "zFdeDaGNRwzccye" &&
        name !== "ujsvqBWRMnqdwPx" &&
        name !== "hUlRcbieVuIiOXG" &&
        name !== "jlzuBkUzuJqgiAK" &&
        name !== "xNrofRCqOXXHVZt"
      ) {
        (material as THREE.MeshStandardMaterial).color = new THREE.Color(COLORS.body);
        (material as THREE.MeshStandardMaterial).metalness = 0.8;
        (material as THREE.MeshStandardMaterial).roughness = 0.2;
      }
      (material as THREE.MeshStandardMaterial).needsUpdate = true;
    });
  }, [materials]);

  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const onDown = (e: PointerEvent) => { setIsDragging(true); setPrevMouse({ x: e.clientX, y: e.clientY }); autoRotVel.current = 0; };
    const onUp = () => { setIsDragging(false); setTimeout(() => { autoRotVel.current = 0.35; }, 800); };
    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      setTargetRotation(r => ({ x: Math.max(-0.7, Math.min(0.7, r.x + dy * 0.007)), y: r.y + dx * 0.012 }));
      setPrevMouse({ x: e.clientX, y: e.clientY });
    };
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointermove', onMove);
    return () => { canvas.removeEventListener('pointerdown', onDown); window.removeEventListener('pointerup', onUp); window.removeEventListener('pointermove', onMove); };
  }, [isDragging, prevMouse, gl]);

  useFrame((_s, delta) => {
    if (!groupRef.current) return;
    // Auto-rotate
    if (!isDragging) setTargetRotation(r => ({ ...r, y: r.y + delta * autoRotVel.current }));
    // Smooth lerp
    currentRotation.current.x = THREE.MathUtils.lerp(currentRotation.current.x, targetRotation.x + scrollY * 0.6, 0.065);
    currentRotation.current.y = THREE.MathUtils.lerp(currentRotation.current.y, targetRotation.y + scrollY * 0.25, 0.065);
    groupRef.current.rotation.x = currentRotation.current.x;
    groupRef.current.rotation.y = currentRotation.current.y;
    // Float
    groupRef.current.position.y = Math.sin(Date.now() * 0.00085) * 0.09;
  });

  return (
    <group ref={groupRef} scale={[14.45, 14.45, 14.45]} position={[0, -0.1, 0]}>
      <mesh geometry={nodes.ttmRoLdJipiIOmf.geometry} material={materials.hUlRcbieVuIiOXG} scale={0.01} />
      <mesh geometry={nodes.DjsDkGiopeiEJZK.geometry} material={materials.PaletteMaterial001} scale={0.01} />
      <mesh geometry={nodes.buRWvyqhBBgcJFo.geometry} material={materials.PaletteMaterial002} scale={0.01} />
      <mesh geometry={nodes.MrMmlCAsAxJpYqQ_0.geometry} material={materials.dxCVrUCvYhjVxqy} scale={0.01} />
      <mesh geometry={nodes.wqbHSzWaUxBCwxY_0.geometry} material={materials.MHFGNLrDQbTNima} scale={0.01} />
      <mesh geometry={nodes.QvGDcbDApaGssma.geometry} material={materials.kUhjpatHUvkBwfM} scale={0.01} />
      <mesh geometry={nodes.vFwJFNASGvEHWhs.geometry} material={materials.RJoymvEsaIItifI} scale={0.01} />
      <mesh geometry={nodes.evAxFwhaQUwXuua.geometry} material={materials.KSIxMqttXxxmOYl} scale={0.01} />
      <mesh geometry={nodes.USxQiqZgxHbRvqB.geometry} material={materials.mcPrzcBUcdqUybC} scale={0.01} />
      <mesh geometry={nodes.TvgBVmqNmSrFVfW.geometry} material={materials.pIhYLPqiSQOZTjn} scale={0.01} />
      <mesh geometry={nodes.GuYJryuYunhpphO.geometry} material={materials.eShKpuMNVJTRrgg} scale={0.01} />
      <mesh geometry={nodes.pvdHknDTGDzVpwc.geometry} material={materials.xdyiJLYTYRfJffH} scale={0.01} />
      <mesh geometry={nodes.CfghdUoyzvwzIum.geometry} material={materials.jpGaQNgTtEGkTfo} scale={0.01} />
      <mesh geometry={nodes.DjdhycfQYjKMDyn.geometry} material={materials.ujsvqBWRMnqdwPx} scale={0.01} />
      <mesh geometry={nodes.usFLmqcyrnltBUr.geometry} material={materials.sxNzrmuTqVeaXdg} scale={0.01} />

      {/* ── Screen Mesh ── */}
      <mesh geometry={nodes.xXDHkMplTIDAXLN.geometry} scale={0.01}>
        <meshStandardMaterial
          map={screenTexture}
          roughness={0}
          metalness={0}
          emissiveMap={screenTexture}
          emissive={new THREE.Color(1, 1, 1)}
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh geometry={nodes.vELORlCJixqPHsZ.geometry} material={materials.zFdeDaGNRwzccye} scale={0.01} />
      <mesh geometry={nodes.EbQGKrWAqhBHiMv.geometry} material={materials.TBLSREBUyLMVtJa} scale={0.01} />
      <mesh geometry={nodes.EddVrWkqZTlvmci.geometry} material={materials.xNrofRCqOXXHVZt} scale={0.01} />
      <mesh geometry={nodes.KSWlaxBcnPDpFCs.geometry} material={materials.yQQySPTfbEJufve} scale={0.01} />
      <mesh geometry={nodes.TakBsdEjEytCAMK.geometry} material={materials.PaletteMaterial003} scale={0.01} />
      <mesh geometry={nodes.IykfmVvLplTsTEW.geometry} material={materials.PaletteMaterial004} scale={0.01} />
      <mesh geometry={nodes.wLfSXtbwRlBrwof.geometry} material={materials.oZRkkORNzkufnGD} scale={0.01} />
      <mesh geometry={nodes.WJwwVjsahIXbJpU.geometry} material={materials.yhcAXNGcJWCqtIS} scale={0.01} />
      <mesh geometry={nodes.YfrJNXgMvGOAfzz.geometry} material={materials.bCgzXjHOanGdTFV} scale={0.01} />
      <mesh geometry={nodes.DCLCbjzqejuvsqH.geometry} material={materials.vhaEJjZoqGtyLdo} scale={0.01} />
      <mesh geometry={nodes.CdalkzDVnwgdEhS.geometry} material={materials.jlzuBkUzuJqgiAK} scale={0.01} />
      <mesh geometry={nodes.NtjcIgolNGgYlCg.geometry} material={materials.PpwUTnTFZJXxCoE} scale={0.01} />
      <mesh geometry={nodes.pXBNoLiaMwsDHRF.geometry} material={materials.yiDkEwDSyEhavuP} scale={0.01} />
      <mesh geometry={nodes.IkoiNqATMVoZFKD.geometry} material={materials.hiVunnLeAHkwGEo} scale={0.01} />
      <mesh geometry={nodes.rqgRAGHOwnuBypi.geometry} material={materials.HGhEhpqSBZRnjHC} scale={0.01} />

      {/* ── Ambient glow rim light effect geometry ── */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[0.2, 0.4]} />
        <meshBasicMaterial color="#B5A48E" transparent opacity={0.018} />
      </mesh>
    </group>
  );
};

// ─── Loader ───────────────────────────────────────────────
const Loader: React.FC = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: '#B5A48E', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        {progress.toFixed(0)}%
      </div>
    </Html>
  );
};

// ─── Lighting rig — warm key + cool fill ──────────────────
const Lights: React.FC = () => (
  <>
    <ambientLight intensity={0.95} color="#E8DDD0" />
    {/* Warm key light — from upper left front */}
    <directionalLight position={[-2.5, 4, 3]} intensity={2.2} color="#FFF0E0" castShadow />
    {/* Cool fill — right side */}
    <directionalLight position={[3, 1, 1]} intensity={1.2} color="#C8DEFF" />
    {/* Rim light — behind phone, subtle warm */}
    <directionalLight position={[0, -2, -3]} intensity={2.0} color="#DDD0BB" />
    {/* Blue accent point — from below front */}
    <pointLight position={[0, -2.5, 2.5]} intensity={0.8} color="#0071E3" />
    {/* Warm accent — top */}
    <pointLight position={[0, 3, 1]} intensity={0.4} color="#FFEED8" />
  </>
);

// ─── Floating specs ────────────────────────────────────────
const SpecTag: React.FC<{
  side: 'left' | 'right';
  top: string;
  label: string;
  visible: boolean;
}> = ({ side, top, label, visible }) => (
  <div
    className="absolute hidden md:flex items-center gap-2 pointer-events-none"
    style={{
      top,
      [side === 'left' ? 'left' : 'right']: 'calc(50% + 200px)',
      opacity: visible ? 0.65 : 0,
      transition: 'opacity 0.5s',
      flexDirection: side === 'left' ? 'row-reverse' : 'row',
    }}
  >
    <div style={{ width: 32, height: 1, background: 'rgba(181,164,142,0.5)' }} />
    <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#B5A48E', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
      {label}
    </span>
  </div>
);

// ─── Main Hero ─────────────────────────────────────────────
const Hero3D: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [specsVisible, setSpecsVisible] = useState(false);

  useEffect(() => {
    const handle = () => {
      setScrollY(window.scrollY);
      setScrollProgress(Math.min(window.scrollY / window.innerHeight, 1));
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Reveal observers for later sections
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setShowHint(false), 3000);
    const t2 = setTimeout(() => setSpecsVisible(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollProgress * 2.2);
  const heroTranslateY = scrollProgress * 90;
  const wa = buildWhatsAppUrl();

  return (
    <section
      className="relative w-full h-screen overflow-hidden section-dark hero-grid"
      style={{ minHeight: '100svh' }}
    >
      {/* ── Three.js canvas — full bleed ── */}
      <div className="absolute inset-0 z-10" style={{ cursor: 'grab' }}>
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}>
          <PerspectiveCamera makeDefault position={[0, 0.1, 5.2]} fov={22} />
          <fog attach="fog" args={['#0a111a', 8, 18]} />
          <Lights />
          <Suspense fallback={<Loader />}>
            <IPhoneModel scrollY={scrollY * 0.001} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Ambient glows ── */}
      <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] rounded-full pointer-events-none z-0 animate-glow-pulse"
        style={{ background: 'radial-gradient(circle, rgba(181,164,142,0.25) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(0,113,227,0.18) 0%, transparent 70%)' }} />

      {/* ── Drag hint ── */}
      <div
        className="absolute top-28 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2"
        style={{ opacity: showHint ? 0.6 : 0, transition: 'opacity 0.7s ease' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(181,164,142,0.9)"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z" /></svg>
        <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(181,164,142,0.9)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
          arrastrar para rotar
        </span>
      </div>

      {/* ── Floating spec callouts ── */}
      <SpecTag side="left" top="30%" label="A18 Pro Chip" visible={specsVisible} />
      <SpecTag side="right" top="42%" label="Triple Camera" visible={specsVisible} />
      <SpecTag side="left" top="56%" label="Desert Titanium" visible={specsVisible} />

      {/* ── Hero copy — bottom left ── */}
      <div
        className="absolute inset-0 z-20 flex items-end pb-20 px-6 md:px-16 pointer-events-none"
        style={{ opacity: heroOpacity, transform: `translateY(${heroTranslateY}px)`, transition: 'transform 0.12s linear' }}
      >
        <div className="max-w-xl pointer-events-auto">
          {/* Trust eyebrow */}
          <div className="mb-5">
            <span className="trust-pill" style={{ borderColor: 'rgba(181,164,142,0.2)', background: 'rgba(181,164,142,0.08)', color: '#B5A48E' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-iphone-blue inline-block" />
              Navarro · Buenos Aires · +10.000 ventas
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-bold leading-[0.88] tracking-tighter text-white mb-5"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 5.2rem)' }}>
            Es mucho<br />
            <span style={{ color: '#C8B99A' }}>iPhone.</span><br />
            Por menos.
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, marginBottom: 28, maxWidth: 400, lineHeight: 1.6 }}>
            Sellados, usados premium y envíos a todo el país.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => scrollToSection('catalogo')} className="btn-primary">
              Ver Catálogo
              <svg viewBox="0 0 20 20" fill="currentColor" width={15}><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
            </button>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <svg viewBox="0 0 24 24" fill="currentColor" width={15}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Consultar ahora
            </a>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-8 right-10 flex flex-col items-center gap-3 z-20"
        style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
        aria-hidden
      >
        <div className="w-[1px] h-14 overflow-hidden" style={{ background: 'rgba(181,164,142,0.15)' }}>
          <div className="w-full h-1/3 animate-scroll-line" style={{ background: '#B5A48E' }} />
        </div>
        <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(181,164,142,0.35)', textTransform: 'uppercase', letterSpacing: '0.5em' }}>scroll</span>
      </div>
    </section>
  );
};

useGLTF.preload('/models/iphone.glb');
export default Hero3D;
