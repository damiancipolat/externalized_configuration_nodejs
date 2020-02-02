const fetch  = require('node-fetch');
const config = require('config');

//Get hook data from config.
const {
  token
} = config.get('git');

//Get package.json from the repo.
const getFile = async (urlParam) => {

  //Get api url from package repo url.
  const url = `${urlParam.replace('https://github.com/',' https://api.github.com/repos/')}`;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token,
    'Accept': 'application/vnd.github.v3.raw'
  };

  const result = await fetch(url,{
    method: 'GET',
    headers
  });

  const jsonResult = await result.json();
  return jsonResult;

};

module.exports = {
    getFile
};