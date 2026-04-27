const fs = require('fs');

function processFile(path) {
  let content = fs.readFileSync(path, 'utf8');

  // Replace text opacity combinations with strict hex values based on tier
  content = content.replace(/text-\[#1c1a18\]\/80/g, 'text-[#6A5D55]');
  content = content.replace(/text-\[#1c1a18\]\/70/g, 'text-[#6A5D55]');
  content = content.replace(/text-\[#1c1a18\]\/60/g, 'text-[#92857C]');
  content = content.replace(/text-\[#1c1a18\]\/50/g, 'text-[#92857C]');

  // Replace remaining text colors with primary earthy dark
  // We'll use a replacer function to avoid replacing the logo
  const logoRegex = /<Link[^>]*href="\/".*?>Studio 24<\/Link>/;
  const match = logoRegex.exec(content);
  
  // Actually, let's just globally replace all `#1c1a18` to `#4C433C`
  // and then restore the logo exactly from `#4C433C` back to `#1c1a18` if needed.
  content = content.replace(/#1c1a18/g, '#4C433C');
  
  // Restore Studio 24 logo text color back to black
  content = content.replace(/className="([^"]*)text-\[#4C433C\]([^"]*)"([^>]*)>Studio 24<\/Link>/, 'className="$1text-[#1c1a18]$2"$3>Studio 24</Link>');

  // Also restore footer if "logo that you have up there" implicitly means only the header one. 
  // Let's restore any exact matching <Link> or <div> that says Studio 24
  content = content.replace(/text-\[#4C433C\]([^>]*)>Studio 24<\/div>/, 'text-[#1c1a18]$1>Studio 24</div>');

  fs.writeFileSync(path, content, 'utf8');
}

processFile('./app/page.tsx');
processFile('./components/ui/faq-accordion.tsx');

console.log('Replaced colors successfully!');
