const AWS = require('aws-sdk')
const express = require('express')
const fileUpload = require('express-fileupload')

const app = express();
app.use(fileUpload());

AWS.config.loadFromPath('./credentials.json');
AWS.config.update({ region: 'us-east-1' });

var rekognition = new AWS.Rekognition();

var params = {
  CollectionId: "faces",
  DetectionAttributes: [
  ],
  ExternalImageId: "edrekogbucketMarcMerill1.jpg", //TODO
  Image: {
    S3Object: {
      Bucket: "edrekogbucket",
      Name: "MarcMerill1.jpg"
    }
  }
};
rekognition.indexFaces(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data);           // successful response
});

app.use(express.static('public'));

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

    const sampleFile = req.files.sampleFile;

    sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
      if (err)
        return res.status(500).send(err);

      res.send('File uploaded!');
    });
});

app.listen(3000)