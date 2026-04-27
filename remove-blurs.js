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

      // Remove blur-[XYZpx]
      content = content.replace(/blur-\[[0-9]+px\]/g, '');

      // Remove video opacity
      content = content.replace(/<video([\s\S]*?)className="([^"]*)opacity-40([^"]*)"/g, '<video$1className="$2$3"\n            />\n            <div className="absolute inset-0 bg-[#FDFBF7]/60 pointer-events-none z-0"></div>\n            <div className="hidden');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Cleaned blurs in: ${fullPath}`);
      }
    }
  }
}

const rootDir = path.join(__dirname, 'app');
processDirectory(rootDir);
console.log('Done!');
