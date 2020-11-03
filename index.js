const AWS = require('aws-sdk')
const express = require('express')
const fileUpload = require('express-fileupload')

const app = express();
app.use(fileUpload());

AWS.config.loadFromPath('./credentials.json');
AWS.config.update({ region: 'us-east-1' });

var rekognition = new AWS.Rekognition();

function searchByImage(image, cb) {
  var params = {
    CollectionId: "faces",
    Image: {
      Bytes: image.data.buffer
    }
  };
  rekognition.searchFacesByImage(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      cb([])
    }
    else{
      console.log(data); // successful response
      const imageMatches = data.FaceMatches.filter(function (match) {return match.Face.ExternalImageId !== undefined;})
          .map(function (image) {return image.Face.ExternalImageId})
          .map(function (s3ObjectKey) {return "https://s3.amazonaws.com/edrekogbucket/" + s3ObjectKey;})

          cb(imageMatches)
    }
  });
}

app.use(express.static('public'));

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

    const uploadedImage = req.files.facetosearch;

  searchByImage(uploadedImage, function (images){
    let html = "<html><body>"
    images.forEach(function (imgSrc){
      html = html + "img src='" + imgSrc + "' />"
    })
    html = html + "</body></html>"
    res.send(html)
  })
});

app.listen(3000)