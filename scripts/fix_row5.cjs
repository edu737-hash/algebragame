const sharp = require('sharp');
const path = require('path');

const outDir = path.join(__dirname, '../public/assets/penguins');
const inputPath = path.join(__dirname, '../public/assets/aistudio/image_3b1c583c.png');

async function fixRow5() {
  // waiting_coffee (col 0)
  await sharp(inputPath)
    .extract({
      left: 40,
      top: 720,
      width: 140,
      height: 120,
    })
    .trim({ background: '#FFFFFF', threshold: 10 })
    .toFile(path.join(outDir, 'waiting_coffee.png'));
  console.log('waiting_coffee cropped');

  // call_me (col 1)
  await sharp(inputPath)
    .extract({
      left: 185,
      top: 720,
      width: 140,
      height: 120,
    })
    .trim({ background: '#FFFFFF', threshold: 10 })
    .toFile(path.join(outDir, 'call_me.png'));
  console.log('call_me cropped');
}

fixRow5().catch(console.error);
