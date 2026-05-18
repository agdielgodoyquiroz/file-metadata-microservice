const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.get('/', function(req, res) {
  res.send(`
    <form action="/api/fileanalyse" method="post" enctype="multipart/form-data">
      <input type="file" name="upfile">
      <input type="submit">
    </form>
  `);
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  res.send({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening');
});