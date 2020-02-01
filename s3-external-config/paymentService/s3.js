const AWS = require('aws-sdk');
const s3  = new AWS.S3();

//Read file from S3.
const s3GetFile = (Bucket, Key)=>{

	const params = {
		Bucket, 
		Key
  };

	return s3.getObject(params).promise();

};

module.exports = {
  s3GetFile
};