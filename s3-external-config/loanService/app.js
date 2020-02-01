//Include api modules.
const http    = require('http');
const express = require('express');
const config  = require('config'); 

//Get external config location.
const {
    Bucket,
    Key
} = config.get('external');

const {
  loadS3Config,
  getExternal,
  setExternal
} = require('./lib.js');

//Start Express-js.
const app    = express();
const server = http.createServer(app);

//Mocked endpoint.
const mockGET = (re,res) => {

  const {
    base
  } = getExternal();

  res.status(200).json({'Loan':base});
}

const bootStrap = async ()=>{

  try {

    //Read config.
    const external = await loadS3Config(Bucket,Key);

    //Set external config.
    setExternal(external);

    const {
      port
    } = external;

    //Start listen mode.
    app.listen(port, () => console.log('> Server start in port',port));

    //Route binding.
    app.get('/test', mockGET);

  } catch(err){
    console.log('Problem starting server', err);
  }

}

bootStrap();