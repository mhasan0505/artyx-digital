const fs = require('fs');
const content = fs.readFileSync('.next/static/chunks/0ykwfds9~erzb.js', 'utf8');
console.log('Chunk size KB:', Math.round(content.length / 1024));
if (content.includes('react-dom')) console.log('Contains: react-dom');
if (content.includes('gsap')) console.log('Contains: gsap');
if (content.includes('three')) console.log('Contains: three');
if (content.includes('framer-motion')) console.log('Contains: framer-motion');
if (content.includes('lenis')) console.log('Contains: lenis');
