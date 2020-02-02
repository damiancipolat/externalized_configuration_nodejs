const config  = require('config'); 

//Get libs.
const {
    loadS3Config,
    getExternal
} = require('./lib.js');

const {
    Bucket,
    Key
} = config.get('external');

//Get external config location.
const {
    host
} = config.get('external');

const detectChanges = async () =>{

    try {

        const newConfig = await loadS3Config(Bucket,Key);
        const oldConfig = getExternal();

        if (newConfig&&oldConfig&&newConfig.external&&oldConfig.external&&newConfig.external!=oldConfig.external){
            console.log('Config detected, reset server!');
            process.exit(0);
        }
        
    }catch(err){
        console.log('Problem in fecth new config.',err);
    }

}

const changeObserver = ()=> setInterval(detectChanges, 3000);

module.exports = {
    changeObserver,
    detectChanges
}