const fs = require('fs');
const path = require('path');

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('.next')) {
        processDirectory(fullPath);
      }
    } else if (stat.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const originalContent = content;

      // 1. Remove filter: "blur(Xpx)" from Framer Motion variants
      content = content.replace(/,\s*filter:\s*["']blur\(\d+px\)["']/g, '');
      content = content.replace(/filter:\s*["']blur\(\d+px\)["'],?\s*/g, '');

      // 2. Remove backdrop-blur-* classes
      content = content.replace(/backdrop-blur-(?:sm|md|lg|xl|2xl|3xl|none|\[.*?\])/g, '');
      
      // 3. Remove mix-blend-multiply and mix-blend-* classes
      content = content.replace(/mix-blend-[a-z\-]+/g, '');

      // 4. Change bg-white/60 or bg-white/80 with backdrop-blur to just bg-white/95 to preserve readability
      content = content.replace(/bg-white\/[0-9]{2}/g, (match) => {
          // It's safer to just let the background be mostly opaque if we removed blur
          if (match === 'bg-white/60' || match === 'bg-white/80') return 'bg-white/95';
          return match;
      });

      // 5. Remove large rotating background blurs (we replace the blur-[80px] with just a solid color or very soft opacity to mimic the glow without the heavy blur filter)
      // Actually, large blurred divs (like blur-[80px] or blur-[100px]) are okay IF they are not animated or very slow.
      // But they are animating: animate-[spin_15s_linear_infinite]
      // Safari hates animated large blurs. Let's just remove the animate-[spin...] from them!
      content = content.replace(/animate-\[spin_[^\]]+\]/g, '');

      // 6. Fix any weird inline styles with WebkitBackdropFilter
      content = content.replace(/style=\{\{.*?WebkitBackdropFilter:.*?\}\}/g, '');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Cleaned Safari killers in: ${fullPath}`);
      }
    }
  }
}

const rootDir = path.join(__dirname, 'app');
processDirectory(rootDir);
const componentsDir = path.join(__dirname, 'components');
if (fs.existsSync(componentsDir)) {
    processDirectory(componentsDir);
}
console.log('Done!');
