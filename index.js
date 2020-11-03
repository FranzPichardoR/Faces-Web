const AWS = require('aws-sdk')

AWS.config.loadFromPath('./credentials.json');
AWS.config.update({region: 'us-east-1'});

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
   rekognition.indexFaces(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else     console.log(data);           // successful response
   });