const sharp = require('sharp');
const resizeImage = async buffer => {
  const sharpImage = await sharp(buffer);
  const imageMetadata = await sharpImage.metadata();
  const resizedImage = await sharpImage
    .resize(imageMetadata.width / 2, imageMetadata.height / 2)
    .withMetadata()
    .toBuffer();
  return resizedImage;
};

module.exports = resizeImage;
