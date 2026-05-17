var express = require('express');
var cors = require('cors');
var multer = require('multer');

var app = express();

app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer({ dest: './uploads/' });

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {

  if (!req.file) {
    return res.send('No file uploaded');
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });

});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});