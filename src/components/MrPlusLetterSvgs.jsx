/**
 * MrPlusLetterSvgs - The scattered MR PLUS letter SVGs that float
 * around the "formes-w" section. Each letter is positioned via CSS
 * classes like m-cursor, r-cursor, p-cursor, etc. (shared selectors
 * with the original letter-cursor rules in main.min.css).
 */
export function MrPlusLetterSvgs() {
  return (
    <>
      {/* M (rotated, top-right) */}
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="20 80 645 220" fill="none" className="m-cursor _2">
        <path d="M 20 300 C 65 240 160 80 215 80 C 255 80 275 110 305 180 L 325 225 C 335 247 350 247 360 225 L 380 180 C 410 110 430 80 470 80 C 525 80 620 240 665 300 L 545 300 C 515 255 448 140 438 140 C 428 140 410 170 395 203 L 378 240 C 350 295 315 295 288 240 L 270 203 C 255 170 238 140 228 140 C 218 140 150 255 120 300 Z" fill="currentColor"></path>
      </svg>

      {/* R */}
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="680 85 200 215" fill="none" className="r-cursor">
        <path d="M 680 300 L 680 115 C 680 98 692 85 710 85 L 760 85 L 760 135 C 782 100 818 85 860 85 C 872 85 880 92 880 105 L 880 160 C 880 170 870 175 860 175 C 818 175 785 195 760 235 L 760 300 Z" fill="currentColor"></path>
      </svg>

      {/* P */}
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="1005 60 150 315" fill="none" className="p-cursor">
        <path fillRule="evenodd" d="M 1005 375 L 1005 225 L 1035 225 L 1035 200 L 1005 200 L 1005 170 L 1035 170 L 1035 145 L 1005 145 L 1005 105 C 1005 78 1025 60 1055 60 L 1070 60 C 1120 60 1155 95 1155 145 C 1155 195 1120 230 1070 230 L 1070 375 Z M 1070 118 C 1088 118 1098 130 1098 145 C 1098 160 1088 172 1070 172 L 1070 118 Z" fill="currentColor"></path>
      </svg>

      {/* L */}
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="1175 58 73 242" fill="none" className="l-cursor">
        <path d="M 1175 110 C 1175 78 1198 58 1230 58 L 1248 58 L 1248 300 L 1175 300 Z" fill="currentColor"></path>
      </svg>

      {/* U */}
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="1270 105 185 197" fill="none" className="u-cursor">
        <path d="M 1270 105 L 1335 105 L 1335 225 C 1335 242 1347 252 1363 252 C 1379 252 1390 242 1390 225 L 1390 105 L 1455 105 L 1455 300 L 1390 300 L 1390 272 C 1373 292 1350 302 1320 302 C 1280 302 1270 270 1270 228 Z" fill="currentColor"></path>
      </svg>

      {/* S */}
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="1475 105 135 195" fill="none" className="s-cursor">
        <path d="M 1475 105 L 1580 105 C 1597 105 1610 118 1610 135 L 1610 170 C 1610 188 1597 200 1580 200 L 1530 200 C 1523 200 1517 205 1517 212 L 1517 228 C 1517 235 1523 240 1530 240 L 1610 240 L 1610 300 L 1495 300 C 1477 300 1465 288 1465 270 L 1465 235 C 1465 218 1477 205 1495 205 L 1545 205 C 1553 205 1559 200 1559 192 L 1559 178 C 1559 170 1553 165 1545 165 L 1475 165 Z" fill="currentColor"></path>
      </svg>
    </>
  );
}
