const isValidImage = fileName => {
  return fileName.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp|tiff)$/);
};

const validateImage = (req, res, next) => {
  if (isValidImage(req.file.originalname)) {
    next();
  } else {
    res.status(500).send({
      message:
        'Invalid file, we can process only JPG, JPEG, PNG, GIF, WEBP or TIFF files',
    });
  }
};

module.exports = validateImage;
