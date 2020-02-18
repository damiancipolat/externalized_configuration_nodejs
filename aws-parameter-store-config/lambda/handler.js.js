const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'});

const parameterStore = new AWS.SSM();

exports.handler = async (event) => {

 const params = { Name: 'password', WithDecryption: true};

 const data = await parameterStore.getParameter(params).promise();
 console.log('value read from store',data);
  
  return data;
  
};