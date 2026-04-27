const viewportHeight = 800;
const rectHeight = 1200;
const dynamicOffsetTop = 55;
const offsetBottom = 0; // The user wants 0 padding on mobile at the bottom

const minTop = viewportHeight - rectHeight - offsetBottom; // 800 - 1200 - 0 = -400
const maxTop = dynamicOffsetTop; // 55

let currentTop = 55;

console.log("Initial: stuck to top, top=", currentTop);

// Scroll down by 100px. Document moves UP.
let scrollDiff = 100;
currentTop -= scrollDiff;
currentTop = Math.max(minTop, Math.min(currentTop, maxTop));
console.log("Scroll down 100: currentTop=", currentTop); // Expected: -45, moves up with document

// Scroll down 500px more.
scrollDiff = 500;
currentTop -= scrollDiff;
currentTop = Math.max(minTop, Math.min(currentTop, maxTop));
console.log("Scroll down 500: currentTop=", currentTop); // Expected: -400, hits minTop and clamps

// Scroll down 100px more.
scrollDiff = 100;
currentTop -= scrollDiff;
currentTop = Math.max(minTop, Math.min(currentTop, maxTop));
console.log("Scroll down 100: currentTop=", currentTop); // Expected: -400, stays clamped to bottom

// Scroll UP by 50px. Document moves DOWN.
scrollDiff = -50;
currentTop -= scrollDiff;
currentTop = Math.max(minTop, Math.min(currentTop, maxTop));
console.log("Scroll up 50: currentTop=", currentTop); // Expected: -350, un-sticks and moves down with doc

// Scroll UP by 400px more.
scrollDiff = -400;
currentTop -= scrollDiff;
currentTop = Math.max(minTop, Math.min(currentTop, maxTop));
console.log("Scroll up 400: currentTop=", currentTop); // Expected: 50, hits maxTop 55
