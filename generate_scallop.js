const points = 12; // less frequent, wider curves
const cx = 50, cy = 60;
const rx = 40, ry = 55;
const scallopDepth = 6;
let d = "";

for (let i = 0; i <= points; i++) {
  const theta = (i / points) * Math.PI * 2;
  const nextTheta = ((i + 1) / points) * Math.PI * 2;
  const midTheta = ((i + 0.5) / points) * Math.PI * 2;
  
  const x = cx + rx * Math.cos(theta);
  const y = cy + ry * Math.sin(theta);
  
  const midX = cx + (rx + scallopDepth) * Math.cos(midTheta);
  const midY = cy + (ry + scallopDepth) * Math.sin(midTheta);
  
  const nextX = cx + rx * Math.cos(nextTheta);
  const nextY = cy + ry * Math.sin(nextTheta);
  
  if (i === 0) {
    d += `M ${x.toFixed(2)} ${y.toFixed(2)} `;
  } else if (i < points) {
    // We already moved to previous target, draw curve
    // The previous target was x, y.
  }
  if (i < points) {
    d += `Q ${midX.toFixed(2)} ${midY.toFixed(2)} ${nextX.toFixed(2)} ${nextY.toFixed(2)} `;
  }
}
console.log(d);
