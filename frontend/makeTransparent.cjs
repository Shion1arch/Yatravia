const Jimp = require('jimp');

async function makeTransparent() {
  const imagePath = 'd:\\mern-app\\yatravia\\frontend\\public\\images\\yatravia_logo.png';
  const outputPath = 'd:\\mern-app\\yatravia\\frontend\\public\\images\\yatravia_logo.png';
  
  const image = await Jimp.read(imagePath);
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const red = this.bitmap.data[idx + 0];
    const green = this.bitmap.data[idx + 1];
    const blue = this.bitmap.data[idx + 2];
    
    // If pixel is very close to white, make it transparent
    if (red > 240 && green > 240 && blue > 240) {
      this.bitmap.data[idx + 3] = 0; // Alpha channel
    }
  });
  
  await image.writeAsync(outputPath);
  console.log('Logo background made transparent.');
}

makeTransparent().catch(console.error);
