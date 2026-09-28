const fs = require('fs');
const path = require('path');

const imgDir = path.join('e:', 'gayatri birthday', 'public', 'images');
const musicDir = path.join('e:', 'gayatri birthday', 'public', 'music');

if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}
if (!fs.existsSync(musicDir)) {
  fs.mkdirSync(musicDir, { recursive: true });
}

const captions = [
  "Our First Memory ❤️",
  "That Beautiful Smile 😊",
  "Just Us Two 💕",
  "Under The Stars ✨",
  "My Favorite Person 💖",
  "Laughing Together 😂",
  "Sweet Escape 🌹",
  "To Forever & Beyond 🥂"
];

for (let i = 1; i <= 8; i++) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750">
    <defs>
      <linearGradient id="grad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${i % 2 === 0 ? '#4c1d95' : '#881337'}" />
        <stop offset="50%" stop-color="${i % 3 === 0 ? '#9f1239' : '#581c87'}" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>
    </defs>
    <rect width="600" height="750" fill="url(#grad${i})" />
    <circle cx="300" cy="320" r="140" fill="none" stroke="rgba(244,114,182,0.3)" stroke-width="2" />
    <circle cx="300" cy="320" r="100" fill="rgba(225,29,72,0.2)" />
    <text x="300" y="340" font-family="sans-serif" font-size="70" text-anchor="middle" fill="#fb7185">💖</text>
    <text x="300" y="520" font-family="serif" font-size="32" font-style="italic" font-weight="bold" text-anchor="middle" fill="#fecdd3">${captions[i-1]}</text>
    <text x="300" y="570" font-family="sans-serif" font-size="18" letter-spacing="4" text-anchor="middle" fill="#94a3b8">SOUMYA &amp; GAYATRI</text>
    <text x="300" y="610" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#e2e8f0" opacity="0.6">Replace with /public/images/memory${i}.jpg</text>
  </svg>`;

  fs.writeFileSync(path.join(imgDir, `memory${i}.jpg`), svg);
}

// Write dummy placeholder music file if not exists
const musicPath = path.join(musicDir, 'our-song.mp3');
if (!fs.existsSync(musicPath)) {
  fs.writeFileSync(musicPath, 'DUMMY AUDIO PLACEHOLDER - Replace with real mp3 audio file');
}

console.log("Successfully created image and music placeholders!");
