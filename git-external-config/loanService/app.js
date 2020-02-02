//Include api modules.
const http    = require('http');
const express = require('express');
const config  = require('config'); 

//Get external config location.
const {
  host
} = config.get('external');

//Get libs.
const {
  loadConfig,
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

//Server events on start.
const bootStrap = async ()=>{

  try {

    console.log('> Fetching configuration from Git ...');
    
    //Read config.
    const external = await loadConfig(host);
    
    //Set external config.
    setExternal(external);

    const {
      port
    } = external;

    if (!port)
      throw new Error("Port is missing in config, server could'nt start.");

    //Start listen mode.
    app.listen(port, () => console.log('> Server start in port',port));

    //Route binding.
    app.get('/test', mockGET);

  } catch(err){
    console.log('Problem starting server', err);
  }

}

bootStrap();