const sharp = require('sharp');

async function removeBackground() {
  try {
    const inputPath = 'C:/Users/reall/.gemini/antigravity/brain/aeed2862-644b-4f42-83f2-da93ad8670e1/transparent_blue_brain_1782001394850.png';
    const outputPathPub = 'public/icon.png';
    const outputPathBuild = 'build/icon.png';

    // Para fazer o branco virar transparente no sharp, 
    // podemos extrair o alpha e multiplicar, mas o jeito mais fácil
    // é ler os pixels (raw), processar, e recriar.
    
    const { data, info } = await sharp(inputPath)
      .resize(256, 256)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];

      if (r > 240 && g > 240 && b > 240) {
        data[i+3] = 0; // Transparente
      } else if (r > 200 && g > 200 && b > 200) {
        // Anti-aliasing super simples nas bordas brancas
        data[i+3] = 255 - r; 
      }
    }

    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    }).toFile(outputPathPub);

    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    }).toFile(outputPathBuild);

    console.log('Fundo removido com sucesso!');
  } catch (err) {
    console.error(err);
  }
}

removeBackground();
