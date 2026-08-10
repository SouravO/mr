import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { FaHouse, FaBagShopping } from 'react-icons/fa6';

// Three.js interactive 3D orb component
function FloatingOrb() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.8;
      meshRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshStandardMaterial color="#8b5cf6" wireframe />
    </mesh>
  );
}

export default function MobileNavbar() {
  const navItems = [
    { label: 'Home', href: 'https://mrplus.in', Icon: FaHouse },
    { label: 'Shop', href: 'https://shop.mrplus.in', Icon: FaBagShopping },
    { label: 'AI', href: 'https://ai.mrplus.in', isThree: true },
  ];

  return (
    <nav style={styles.navContainer}>
      <div style={styles.navbar}>
        {navItems.map((item) => {
          const IconComponent = item.Icon;

          return (
            <a key={item.label} href={item.href} style={styles.navLink}>
              <div style={styles.iconWrapper}>
                {item.isThree ? (
                  <div style={styles.canvasContainer}>
                    <Canvas camera={{ position: [0, 0, 3] }}>
                      <ambientLight intensity={1.5} />
                      <pointLight position={[5, 5, 5]} />
                      <FloatingOrb />
                    </Canvas>
                  </div>
                ) : (
                  <IconComponent size={18} color="#ffffff" />
                )}
              </div>
              <span style={styles.label}>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

const styles = {
  navContainer: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    maxWidth: '400px',
    zIndex: 1000,
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 16px',
    backgroundColor: 'rgba(18, 18, 18, 0.75)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRadius: '30px',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  },
  navLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#ffffff',
    gap: '4px',
  },
  iconWrapper: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvasContainer: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontSize: '11px',
    fontWeight: '500',
    letterSpacing: '0.5px',
    opacity: 0.85,
  },
};