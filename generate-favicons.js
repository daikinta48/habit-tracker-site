const sharp = require('sharp');
const fs = require('fs');
const pngToIco = require('png-to-ico');

async function generateFavicons() {
  const sourceImage = 'assets/images/icon.png';
  
  console.log('Generating favicons from', sourceImage);
  
  // Generate favicon-32.png (32x32)
  await sharp(sourceImage)
    .resize(32, 32)
    .toFile('favicon-32.png');
  console.log('✓ Generated favicon-32.png');
  
  // Generate apple-touch-icon.png (180x180)
  await sharp(sourceImage)
    .resize(180, 180)
    .toFile('apple-touch-icon.png');
  console.log('✓ Generated apple-touch-icon.png');
  
  // Generate 16x16 and 32x32 PNGs for ICO
  const png16Path = 'favicon-16.png';
  const png32Path = 'favicon-32-temp.png';
  
  await sharp(sourceImage)
    .resize(16, 16)
    .toFile(png16Path);
  
  await sharp(sourceImage)
    .resize(32, 32)
    .toFile(png32Path);
  
  // Create multi-size ICO file
  const ico = await pngToIco([png16Path, png32Path]);
  fs.writeFileSync('favicon.ico', ico);
  console.log('✓ Generated favicon.ico (16x16, 32x32)');
  
  // Clean up temporary files
  fs.unlinkSync(png16Path);
  fs.unlinkSync(png32Path);
  
  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);

