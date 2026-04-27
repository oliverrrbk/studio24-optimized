const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
        results = results.concat(walk(file));
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('/Users/oliverrrbk/Downloads/studio24-saved');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Remove drop-shadow utility classes but leave indentation alone
  const newContent = content.replace(/\bdrop-shadow-(sm|md|lg)\s*/g, '')
                            .replace(/\bdrop-shadow\s*/g, '');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});
