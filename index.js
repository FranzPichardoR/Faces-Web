const AWS = require('aws-sdk')

var rekognition = new AWS.Rekognition();

var params = {
    CollectionId: "faces", 
    DetectionAttributes: [
    ], 
    ExternalImageId: "myphotoid", //TODO
    Image: {
     S3Object: {
      Bucket: "mybucket", 
      Name: "myphoto"
     }
    }
   };
   rekognition.indexFaces(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else     console.log(data);           // successful response
   });