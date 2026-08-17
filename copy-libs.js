const fs = require('fs');
const path = require('path');

const libDir = path.join(__dirname, 'public', 'lib');
fs.mkdirSync(libDir, { recursive: true });

const libs = [
  ['node_modules/react/umd/react.production.min.js',         'react.min.js'],
  ['node_modules/react-dom/umd/react-dom.production.min.js', 'react-dom.min.js'],
  ['node_modules/recharts/umd/Recharts.js',                  'recharts.js'],
  ['node_modules/xlsx/dist/xlsx.full.min.js',                'xlsx.min.js'],
];

libs.forEach(function([src, dest]) {
  try {
    fs.copyFileSync(path.join(__dirname, src), path.join(libDir, dest));
    console.log('✅ Copiado:', dest);
  } catch(e) {
    console.error('❌ Erro ao copiar', dest, ':', e.message);
  }
});
