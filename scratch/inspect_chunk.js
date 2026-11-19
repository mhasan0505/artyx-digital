const fs = require('fs');
const content = fs.readFileSync('.next/static/chunks/0ykwfds9~erzb.js', 'utf8');

const matches = new Set();
const re = /node_modules\/([^/\\"]+)/g;
let m;
while ((m = re.exec(content)) !== null) {
  matches.add(m[1]);
}

console.log('Modules in 0ykwfds9~erzb.js:', Array.from(matches));

