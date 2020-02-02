const config = require('config');

const {
  host
} = config.get('external');

const {
  getFile
} = require('./git.js');

//Read config from s3.
const loadConfig = async (url)=>{

  const res = await getFile(url);
  console.log('xxxxxxxxxxxx',res);
  /*
  const config = await res.json();

  if (!config)
    throw new Error('Bad config file');

  return config;*/

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