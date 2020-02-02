const fetch = require('node-fetch');

//Read config from s3.
const loadConfig = async (url)=>{

  const res    = await fetch(url);
  const config = await res.json();

  if (!config)
    throw new Error('Bad config file');

  return config;

}

//Read config from globals.
const getExternal = () => global.config;

//Set external.
const setExternal = (key)=> global.config = key;

module.exports = {
  loadConfig,
  getExternal,
  setExternal
};