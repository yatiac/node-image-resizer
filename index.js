const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const validateImage = require('./middleware/fileValidator');
const resizeImage = require('./services/resizeImage');

const app = express();

const port = process.env.PORT || 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.single('file'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/resize.html');
});

app.use(validateImage);

app.post('/resize', async (req, res, next) => {
  try {
    const resizedImage = await resizeImage(req.file.buffer);
    res.set(
      'Content-disposition',
      'attachment; filename=' + 'resized_' + req.file.originalname
    );
    res.send(resizedImage);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error ocurred' });
  }
});

app.listen(port, () => {
  console.log(`Image resize server listening on port ${port}`);
});
