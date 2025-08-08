const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Function to generate hash for a file
function generateHash(filePath) {
    const content = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(content).digest('hex').substring(0, 8);
}

// Function to copy file with hash
function copyWithHash(srcPath, destDir, fileName) {
    const hash = generateHash(srcPath);
    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext);
    const hashedName = `${baseName}.${hash}${ext}`;
    const destPath = path.join(destDir, hashedName);
    
    fs.copyFileSync(srcPath, destPath);
    return hashedName;
}

// Create build directory
if (fs.existsSync('build')) {
    fs.rmSync('build', { recursive: true });
}
fs.mkdirSync('build');

console.log('Starting build with cache busting...');

// Copy static files that don't need hashing
fs.copyFileSync('server.js', 'build/server.js');

// Copy optimized-images directory
if (fs.existsSync('optimized-images')) {
    fs.cpSync('optimized-images', 'build/optimized-images', { recursive: true });
}

// Copy and hash CSS and JS files
const hashedCSS = copyWithHash('styles.css', 'build', 'styles.css');
const hashedMainJS = copyWithHash('js/main.js', 'build', 'main.js');

console.log(`Created: ${hashedCSS}`);
console.log(`Created: ${hashedMainJS}`);

// Read and update HTML file
let htmlContent = fs.readFileSync('index.html', 'utf8');

// Replace CSS and JS references with hashed versions
htmlContent = htmlContent.replace(/href="styles\.css"/, `href="${hashedCSS}"`);
htmlContent = htmlContent.replace(/src="js\/main\.js"/, `src="${hashedMainJS}"`);

// Write updated HTML
fs.writeFileSync('build/index.html', htmlContent);

// Create _headers file for Netlify
const headersContent = `# Cache Control Headers

# HTML files - no cache
/*.html
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0

# Hashed JS and CSS files - cache forever (immutable)
/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

# Images - cache for 1 year
/optimized-images/*
  Cache-Control: public, max-age=31536000

# Favicon and other assets
/favicon.*
  Cache-Control: public, max-age=86400

# Server file - no cache
/server.js
  Cache-Control: no-cache
`;

fs.writeFileSync('build/_headers', headersContent);

console.log('Build completed successfully!');
console.log('Files created:');
console.log(`- index.html (updated with hashed references)`);
console.log(`- ${hashedCSS}`);
console.log(`- ${hashedMainJS}`);
console.log('- server.js');
console.log('- optimized-images/ (copied)');
console.log('- _headers (cache control configuration)');