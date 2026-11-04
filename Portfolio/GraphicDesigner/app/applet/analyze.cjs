const fs = require('fs');
const https = require('https');

// 1. Download CSS and inspect
https.get('https://farabial-amin.vercel.app/assets/index-DoIaGul3.css', (res) => {
  let css = '';
  res.on('data', c => css += c);
  res.on('end', () => {
    fs.writeFileSync('bundle.css', css);
    console.log('CSS saved, size:', css.length);
  });
});

const code = fs.readFileSync('bundle.js', 'utf-8');

// Download images / assets if found
const imgMatches = code.match(/["'`]((\/|\.\/)[a-zA-Z0-9_\-\.\/]+\.(png|jpg|jpeg|webp|svg|gif|mp4))["'`]/g) || [];
const cleanedImgs = [...new Set(imgMatches.map(s => s.replace(/["'`]/g, '')))];
console.log('Asset matches:', cleanedImgs);

// Find urls
const urls = code.match(/https?:\/\/[^\s"'`<>]+/g) || [];
const uniqueUrls = [...new Set(urls)];
console.log('URLs count:', uniqueUrls.length);
fs.writeFileSync('urls.json', JSON.stringify(uniqueUrls, null, 2));

// Check texts
// Let us write a script to search for sections, headings, titles, descriptions in the bundle
fs.writeFileSync('bundle_strings.txt', code.split('"').filter(s => s.length > 20 && s.length < 500 && !s.includes('{') && !s.includes(';')).join('\n---\n'));
