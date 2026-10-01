const fs = require('fs');

// Pure Path Geometry for Interlocking Loops (No masks needed, 100% universal support)
// Dimensions: Capsule width 24, length 60, radius 12.
// Center between capsules: dx = 22.
// When rotated by -40 degrees around (50, 50):

function getInterlockingLoopSvg(strokeColor = '#0F0F11', strokeW = 7, bg = null) {
  const bgMarkup = bg ? `<rect width="100" height="100" rx="22" fill="${bg}"/>\n` : '';

  // In unrotated coordinate system:
  // Capsule 1 (Left): X from 26 to 50 (width 24, r=12), Y from 20 to 80 (height 60).
  // Left side: X=26, Right side: X=50. Center line: X=38.
  // Capsule 2 (Right): X from 50 to 74 (width 24, r=12), Y from 20 to 80 (height 60).
  // Left side: X=50, Right side: X=74. Center line: X=62.
  // Notice: The right edge of Capsule 1 and the left edge of Capsule 2 touch/overlap at X=50!
  // If we space them with dx = 18:
  // Center 1 = (41, 50), Center 2 = (59, 50).
  // Capsule 1: x: 29..53. Capsule 2: x: 47..71.
  // Overlap is between x=47 and x=53 (width 6px overlap).
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none">
${bgMarkup}  <g transform="rotate(-38 50 50)">
    <!-- Loop 1 (Left / L-pillar): continuous except gap at lower right crossing -->
    <!-- Arc from top-left (29, 32) down to (29, 68), around bottom to (53, 68), then up with weave break -->
    <path d="M 41 20 
             A 12 12 0 0 0 29 32 
             L 29 68 
             A 12 12 0 0 0 53 68 
             L 53 60" 
          stroke="${strokeColor}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" />
          
    <path d="M 53 44 
             L 53 32 
             A 12 12 0 0 0 41 20 Z" 
          stroke="${strokeColor}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" />

    <!-- Loop 2 (Right / N-pillar): continuous except gap at upper left crossing -->
    <path d="M 59 80 
             A 12 12 0 0 0 71 68 
             L 71 32 
             A 12 12 0 0 0 47 32 
             L 47 40" 
          stroke="${strokeColor}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" />

    <path d="M 47 56 
             L 47 68 
             A 12 12 0 0 0 59 80 Z" 
          stroke="${strokeColor}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;
}

console.log('Testing pure path SVG');
const testSvg = getInterlockingLoopSvg();
fs.writeFileSync('c:/Users/theki/Desktop/Loopni/scripts/test-loop.svg', testSvg);
console.log('Written test-loop.svg');
