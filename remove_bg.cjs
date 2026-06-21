const { Jimp } = require('jimp');

async function removeBackground() {
  try {
    const inputPath = 'C:/Users/reall/.gemini/antigravity/brain/aeed2862-644b-4f42-83f2-da93ad8670e1/transparent_blue_brain_1782001394850.png';
    const image = await Jimp.read(inputPath);
    
    // Resize to a standard icon size if it's too big
    image.resize(256, 256);
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red   = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue  = this.bitmap.data[idx + 2];

      // Se for muito próximo de branco, deixa transparente
      if (red > 230 && green > 230 && blue > 230) {
        this.bitmap.data[idx + 3] = 0;
      }
      
      // Suavização das bordas
      else if (red > 200 && green > 200 && blue > 200) {
        this.bitmap.data[idx + 3] = 128;
      }
    });

    await image.writeAsync('public/icon.png');
    await image.writeAsync('build/icon.png');
    console.log("Background removed and saved as public/icon.png and build/icon.png");
  } catch (err) {
    console.error("Error:", err);
  }
}

removeBackground();
