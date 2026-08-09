import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

export default function RefinedIconicNav() {
  const [activeTab, setActiveTab] = useState('overview');
  const containerRef = useRef(null);
  const mouseX = useMotionValue(Infinity);

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      code: '01',
      detail: 'Architectural Portfolio',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      id: 'collection',
      label: 'Works',
      code: '02',
      detail: 'Curated Archive',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: 'exhibits',
      label: 'Exhibits',
      code: '03',
      detail: 'Spatial Installations',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      id: 'journal',
      label: 'Journal',
      code: '04',
      detail: 'Essays & Press',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
  ];

  const currentTab = navItems.find((item) => item.id === activeTab) || navItems[0];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '44px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        width: 'calc(100% - 32px)',
        maxWidth: '460px',
        fontFamily: '"SF Pro Text", "Inter", -apple-system, sans-serif',
      }}
    >
      {/* Editorial Sub-header Drawer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
          style={{
            marginBottom: '10px',
            padding: '8px 18px',
            borderRadius: '100px',
            backgroundColor: 'rgba(20, 20, 23, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '10px',
                fontFamily: '"SF Mono", monospace',
                color: '#8E8E93',
                letterSpacing: '0.08em',
              }}
            >
              [{currentTab.code}]
            </span>
            <span style={{ fontSize: '12px', color: '#E5E5EA', fontWeight: 400, letterSpacing: '-0.01em' }}>
              {currentTab.detail}
            </span>
          </div>

          <span
            style={{
              fontSize: '10px',
              color: '#8E8E93',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            INDEX
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Understated Luxury Dock */}
      <motion.nav
        ref={containerRef}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        onTouchMove={(e) => {
          if (e.touches[0]) mouseX.set(e.touches[0].clientX);
        }}
        onTouchEnd={() => mouseX.set(Infinity)}
        style={{
          position: 'relative',
          padding: '5px',
          borderRadius: '100px',
          backgroundColor: 'rgba(16, 16, 18, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        }}
      >
        {navItems.map((item) => (
          <RefinedNavItem
            key={item.id}
            item={item}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            mouseX={mouseX}
          />
        ))}
      </motion.nav>
    </div>
  );
}

function RefinedNavItem({ item, activeTab, setActiveTab, mouseX }) {
  const ref = useRef(null);
  const isActive = activeTab === item.id;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() || { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-100, 0, 100], [86, 110, 86]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 350, damping: 28 });

  return (
    <motion.button
      ref={ref}
      style={{
        width,
        height: '44px',
        borderRadius: '100px',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '7px',
        cursor: 'pointer',
        position: 'relative',
        WebkitTapHighlightColor: 'transparent',
      }}
      onClick={() => setActiveTab(item.id)}
      whileTap={{ scale: 0.96 }}
    >
      {/* Matte Alabaster Active Pill */}
      {isActive && (
        <motion.div
          layoutId="refinedActivePill"
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '100px',
            backgroundColor: '#F2F2F7',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
            zIndex: 0,
          }}
        />
      )}

      {/* Monochrome Line Icon */}
      <motion.div
        animate={{
          color: isActive ? '#000000' : '#8E8E93',
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {item.icon}
      </motion.div>

      {/* Label */}
      <motion.span
        animate={{
          color: isActive ? '#000000' : '#8E8E93',
          fontWeight: isActive ? 600 : 400,
        }}
        transition={{ duration: 0.2 }}
        style={{
          fontSize: '13px',
          letterSpacing: '-0.01em',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {item.label}
      </motion.span>
    </motion.button>
  );
}