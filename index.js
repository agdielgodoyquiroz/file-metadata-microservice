const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>File Metadata</title>
</head>
<body>

  <h1>File Metadata Microservice</h1>

  <form action="/api/fileanalyse" method="post" enctype="multipart/form-data">

    <input type="file" name="upfile">
    <input type="submit" value="Upload">

  </form>

</body>
</html>
  `);
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {

  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });

});

app.listen(process.env.PORT || 3000);