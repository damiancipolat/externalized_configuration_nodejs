//Get lib.
const {
  s3GetFile
} = require('./s3.js');

//Read config from s3.
const loadS3Config = async (BucketParam, KeyParam)=>{

  const external = await s3GetFile(BucketParam, KeyParam);

  if (!external)
    throw new Error('Bad read');

  const str = external.Body.toString();

  if (!str)
    throw new Error('External config file error');

  return JSON.parse(external.Body.toString());

}

//Read config from globals.
const getExternal = () => global.config;

//Set external.
const setExternal = (key )=> global.config = key;

module.exports = {
  loadS3Config,
  getExternal,
  setExternal
};