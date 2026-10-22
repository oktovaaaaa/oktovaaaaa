import fs from 'fs';

const svg = fs.readFileSync('temp-other.svg', 'utf8');

const start = svg.indexOf('<g clip-path="url(#clip0_33_740)">');
const end = svg.indexOf('</g>', start + 100) + 4;
const appleBlock = svg.slice(start, end);

// Replace all stripe colors in appleBlock with #A2AAAD (Apple's signature silver/gray)
const newAppleBlock = appleBlock
  .replaceAll('fill="#00A0E2"', 'fill="#A2AAAD"')
  .replaceAll('fill="#34BE2D"', 'fill="#A2AAAD"')
  .replaceAll('fill="#FFB400"', 'fill="#A2AAAD"')
  .replaceAll('fill="#FF7A00"', 'fill="#A2AAAD"')
  .replaceAll('fill="#F41E34"', 'fill="#A2AAAD"')
  .replaceAll('fill="#A2359C"', 'fill="#A2AAAD"');

const updatedSvg = svg.slice(0, start) + newAppleBlock + svg.slice(end);
fs.writeFileSync('other-tech-stacks.svg', updatedSvg);
console.log('Saved other-tech-stacks.svg successfully!');
