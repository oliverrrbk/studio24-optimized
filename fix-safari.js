const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

if (!content.includes('const hardwareAccelerated')) {
  content = content.replace(
    '// Safari Optimization Config (Hardware Acceleration + will-change)',
    `// Safari Optimization Config (Hardware Acceleration + will-change)
const hardwareAccelerated = {
  WebkitTransform: "translateZ(0)",
  transform: "translate3d(0, 0, 0)",
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
  willChange: "transform, opacity",
} as React.CSSProperties;`
  );
}

// Add style={hardwareAccelerated} to all <motion.X tags that don't have style=
content = content.replace(/<motion\.[a-z0-9]+(\s+[^>]*?)>/g, (match, p1) => {
  if (match.includes('style={hardwareAccelerated}') || match.includes('style={{')) {
    return match; // already has style
  }
  // Insert before the className or transition prop
  return match.replace('<motion.' + match.split(' ')[0].split('.')[1], '$& style={hardwareAccelerated}');
});

fs.writeFileSync('app/page.tsx', content);
console.log('Fixed Safari optimization in app/page.tsx');
