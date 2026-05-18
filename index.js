const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.get('/', function(req, res) {
  res.send(`
    <!DOCTYPE html>
    <html>
      <body>

        <form action="/api/fileanalyse"
              method="post"
              enctype="multipart/form-data">

          <input type="file" name="upfile" />
          <input type="submit" />

        </form>

      </body>
    </html>
  `);
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {

  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: Number(req.file.size)
  });

});

const listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port ' + listener.address().port);
});