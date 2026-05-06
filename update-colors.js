const fs = require('fs');

let content = fs.readFileSync('accent-review.html', 'utf8');

// The 6 original pairs
const replacements = [
  // Option 1
  { old1: '#EBB3A2', new1: '#D9C3AD', old2: '#E8D2BF', new2: '#CDB39B', 
    title: 'Sand Beige', desc: 'A soft, sandy beige that completely removes the pink tint while maintaining a light, elegant feel.' },
  // Option 2
  { old1: '#E3AC9D', new1: '#D1BAA3', old2: '#E2CDBD', new2: '#C4A98F', 
    title: 'Warm Oatmeal', desc: 'A comfortable, natural oat tone. Slightly darker than sand with a very subtle warmth.' },
  // Option 3
  { old1: '#DFB2A5', new1: '#C7AE97', old2: '#DDD1C6', new2: '#B99E85', 
    title: 'Latte', desc: 'A smooth, creamy coffee tone. Earthy and grounded, steering completely clear of blush tones.' },
  // Option 4
  { old1: '#DBA392', new1: '#BEA28C', old2: '#DBC4B2', new2: '#AF907A', 
    title: 'Almond', desc: 'A slightly deeper beige-brown. Very sophisticated and provides excellent contrast against light backgrounds.' },
  // Option 5
  { old1: '#E5A895', new1: '#B5957C', old2: '#E2C5B3', new2: '#A3836A', 
    title: 'Camel', desc: 'A rich, classic camel brown. Brings a distinct premium leather/wood aesthetic to the design.' },
  // Option 6
  { old1: '#D49A88', new1: '#AA876E', old2: '#D4BBAB', new2: '#98755C', 
    title: 'Hazelnut', desc: 'The darkest of the set. A robust, earthy brown that acts as a strong, grounding accent color.' }
];

replacements.forEach((r, idx) => {
  content = content.replace(new RegExp(r.old1, 'g'), r.new1);
  content = content.replace(new RegExp(r.old2, 'g'), r.new2);
  
  // also replace title and desc for context
  // Option 1 title was "Subtle Beige Shift"
  // Option 2 title was "Slight Brown Shift"
  // etc. We can just regex the title and desc block.
});

content = content.replace(/Subtle Beige Shift/, 'Sand Beige');
content = content.replace(/Extremely close to the original.*?slightly./, replacements[0].desc);

content = content.replace(/Slight Brown Shift/, 'Warm Oatmeal');
content = content.replace(/A very tiny step darker.*?quality./, replacements[1].desc);

content = content.replace(/Muted Clay/, 'Latte');
content = content.replace(/Noticeably earthier.*?calm./, replacements[2].desc);

content = content.replace(/Deep Rosewood/, 'Almond');
content = content.replace(/A stronger, richer interpretation.*?boldness./, replacements[3].desc);

content = content.replace(/Warm Terracotta/, 'Camel');
content = content.replace(/Leans into the orange\/brown.*?energy./, replacements[4].desc);

content = content.replace(/Earthy Cocoa/, 'Hazelnut');
content = content.replace(/The most brown-leaning.*?vibe./, replacements[5].desc);

fs.writeFileSync('accent-review.html', content);
console.log('Colors updated.');
