import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: '-10% 0px' });
  
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredDot, setHoveredDot] = useState(false);

  // Core Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0, fillOpacity: 0, strokeOpacity: 0.3 },
    visible: {
      pathLength: 1,
      fillOpacity: 1,
      strokeOpacity: 0,
      transition: {
        pathLength: { duration: 1.8, ease: [0.65, 0, 0.35, 1], delay: 0.2 },
        fillOpacity: { duration: 0.6, delay: 1.5 },
        strokeOpacity: { duration: 0.4, delay: 1.5 },
      },
    },
  };

  return (
    <footer
      ref={footerRef}
      style={{
        backgroundColor: '#0a0a0a',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '80px 24px 40px',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          left: '-100px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Animated Heading */}
        <motion.div variants={itemVariants} style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: '-0.03em',
            }}
          >
            Let’s start <br />
            <span style={{ fontWeight: 600, fontStyle: 'italic', color: '#d4d4d4' }}>
              with Mr Plus
            </span>
          </h2>
        </motion.div>

        {/* Action Bar: Buttons & Socials */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            marginBottom: '64px',
          }}
        >
          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {/* Shop Now Button */}
            <motion.a
              href="https://shop.mrplus.in"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setHoveredBtn('shop')}
              onMouseLeave={() => setHoveredBtn(null)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 28px',
                borderRadius: '9999px',
                border: '1px solid',
                borderColor: hoveredBtn === 'shop' ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
                backgroundColor: hoveredBtn === 'shop' ? '#ffffff' : 'rgba(255, 255, 255, 0.03)',
                color: hoveredBtn === 'shop' ? '#000000' : '#ffffff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease',
                cursor: 'pointer',
              }}
            >
              <span>Shop Now</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  transform: hoveredBtn === 'shop' ? 'translate(2px, -2px)' : 'none',
                  transition: 'transform 0.3s ease',
                }}
              >
                <path
                  d="M1 11L11 1M11 1H3M11 1V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>

            {/* Email Button */}
            <motion.a
              href="mailto:contact@mrplus.in"
              onMouseEnter={() => setHoveredBtn('email')}
              onMouseLeave={() => setHoveredBtn(null)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 28px',
                borderRadius: '9999px',
                border: '1px solid',
                borderColor: hoveredBtn === 'email' ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
                backgroundColor: hoveredBtn === 'email' ? '#ffffff' : 'rgba(255, 255, 255, 0.03)',
                color: hoveredBtn === 'email' ? '#000000' : '#ffffff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease',
                cursor: 'pointer',
              }}
            >
              <span>drop us an email</span>
              <span style={{ opacity: hoveredBtn === 'email' ? 1 : 0.5 }}>@</span>
            </motion.a>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {['LinkedIn', 'Instagram', 'Behance'].map((platform) => (
              <a
                key={platform}
                href="#"
                onMouseEnter={() => setHoveredSocial(platform)}
                onMouseLeave={() => setHoveredSocial(null)}
                style={{
                  position: 'relative',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: hoveredSocial === platform ? '#ffffff' : '#888888',
                  textDecoration: 'none',
                  paddingBottom: '4px',
                  transition: 'color 0.3s ease',
                }}
              >
                {platform}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: hoveredSocial === platform ? '100%' : '0%',
                    height: '1px',
                    backgroundColor: '#ffffff',
                    transition: 'width 0.3s ease',
                  }}
                />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Animated Vector Logo */}
        <motion.div variants={itemVariants} style={{ margin: '40px 0' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 1408 294"
            fill="none"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            <g transform="matrix(0.8855345911949686 0 0 0.8855345911949686 -17.71069182389937 -51.36100628930818)">
              {[
                "M 20 300 C 65 240 160 80 215 80 C 255 80 275 110 305 180 L 325 225 C 335 247 350 247 360 225 L 380 180 C 410 110 430 80 470 80 C 525 80 620 240 665 300 L 545 300 C 515 255 448 140 438 140 C 428 140 410 170 395 203 L 378 240 C 350 295 315 295 288 240 L 270 203 C 255 170 238 140 228 140 C 218 140 150 255 120 300 Z",
                "M 680 300 L 680 115 C 680 98 692 85 710 85 L 760 85 L 760 135 C 782 100 818 85 860 85 C 872 85 880 92 880 105 L 880 160 C 880 170 870 175 860 175 C 818 175 785 195 760 235 L 760 300 Z",
                "M 1005 375 L 1005 225 L 1035 225 L 1035 200 L 1005 200 L 1005 170 L 1035 170 L 1035 145 L 1005 145 L 1005 105 C 1005 78 1025 60 1055 60 L 1070 60 C 1120 60 1155 95 1155 145 C 1155 195 1120 230 1070 230 L 1070 375 Z M 1070 118 C 1088 118 1098 130 1098 145 C 1098 160 1088 172 1070 172 L 1070 118 Z",
                "M 1175 110 C 1175 78 1198 58 1230 58 L 1248 58 L 1248 300 L 1175 300 Z",
                "M 1270 105 L 1335 105 L 1335 225 C 1335 242 1347 252 1363 252 C 1379 252 1390 242 1390 225 L 1390 105 L 1455 105 L 1455 300 L 1390 300 L 1390 272 C 1373 292 1350 302 1320 302 C 1280 302 1270 270 1270 228 Z",
                "M 1475 105 L 1580 105 C 1597 105 1610 118 1610 135 L 1610 170 C 1610 188 1597 200 1580 200 L 1530 200 C 1523 200 1517 205 1517 212 L 1517 228 C 1517 235 1523 240 1530 240 L 1610 240 L 1610 300 L 1495 300 C 1477 300 1465 288 1465 270 L 1465 235 C 1465 218 1477 205 1495 205 L 1545 205 C 1553 205 1559 200 1559 192 L 1559 178 C 1559 170 1553 165 1545 165 L 1475 165 Z"
              ].map((pathData, i) => (
                <motion.path
                  key={i}
                  d={pathData}
                  fill="#ffffff"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  variants={pathVariants}
                />
              ))}

              {/* Interactive Apostrophe */}
              <motion.path
                d="M 900 250 C 900 238 910 228 922 228 L 952 228 C 964 228 974 238 974 250 L 974 282 C 974 294 964 304 952 304 L 922 304 C 910 304 900 294 900 282 Z"
                fill="#ffffff"
                stroke="#ffffff"
                strokeWidth="1"
                animate={hoveredDot ? { scale: 1.25 } : { scale: 1 }}
                onMouseEnter={() => setHoveredDot(true)}
                onMouseLeave={() => setHoveredDot(false)}
                style={{ cursor: 'pointer', transformOrigin: '937px 266px', transition: 'transform 0.2s ease' }}
              />
            </g>
          </svg>
        </motion.div>

        {/* Footer Meta Row */}
        <motion.div
          variants={itemVariants}
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '12px',
            color: '#888888',
          }}
        >
          <div>©2026 — Coded by Bigrip</div>

          <div>
            Site by{' '}
            <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>
              Bigrip
            </a>{' '}
            &amp;{' '}
            <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>
              Rip Big
            </a>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div>
              Visuals by{' '}
              <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>
                Bigrip
              </a>
            </div>
            <a href="#" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}>
              EN
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}