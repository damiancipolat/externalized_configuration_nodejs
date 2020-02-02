const config = require('config');

const {
  host
} = config.get('external');

const {
  getFile
} = require('./git.js');

//Read config from s3.
const loadConfig = async (url)=>{

  const config = await getFile(url);

  if (!config)
    throw new Error('Bad config in git file');
console.log('xxx',config);
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