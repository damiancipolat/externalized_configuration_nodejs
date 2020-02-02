# Externalized configuration Pattern with Node.js
Examples of how to manage external configurations in a microservice scenario, here are some ways on how to do it.
I'm following the spec from this doc. https://microservices.io/patterns/externalized-configuration.html

### There are differents situations of external configuration scenarios:
- From a S3 bucket: https://github.com/damiancipolat/externalized_configuration_nodejs/tree/master/s3-external-config
- From a git repository.

Benefits:
- Hot configuration changes.


## Change hot settings.
Some interesting benefits of this patter is that, you can make changes in the config, without redeploy the services.
In the projects there are a file ./configChange.js with a mechanism to detect changes in configuration and reset the services, to apply this new changes. So is important to run the script using a process agent example **nodemon** or **pm2** to detect when the process finish and restart it.

## From a S3 bucket.
In this scenario I use a S3 bucket to get the configuration when the server start.

Todo: add config change handler.

There are two mock service loan and payments, and there are a config folder in each service with only the s3 bucket path.

### **Architecture diagram**
Many instances of differents services fetching the config from the s3 files.

<img src="https://github.com/damiancipolat/externalized_configuration_nodejs/blob/master/s3-external-config/doc/from-s3.png?raw=true" width="800px"/>

The services retrieves config from json files stored in a s3 bucket.

**loanService.json**
```json
{
    "port":"8080",
    "base":{
        "dollars":10,
        "ars":30,
        "eur":50
    }
}
```

**paymentService.json**
```json
{
    "port":"8080",
    "base":{
        "dollars":10,
        "ars":30,
        "eur":50
    }
}
```

### Install and run:
```sh
cd paymentService
npm install
cd ..

cd loanService
npm install
cd ..
```

## From a configuration service.
In this scenario there is a service that work as a exclusive api rest for configuration. I'm using https://www.mocky.io/ to mock an api-rest.

<img src="https://github.com/damiancipolat/externalized_configuration_nodejs/blob/master/doc/S3-service.png?raw=true" width="500px"/>

### Install and run:
```sh
cd loanService
npm install
npm start
```

## From a GITHUB repository.
In this scenario we extract the configurations from a github central configuration "file" so is very easy to make changes in this configurations. To make this the service use the GITHUB-API to can fetch the file, in the config/default.json there are the github credentials.

<img src="https://github.com/damiancipolat/externalized_configuration_nodejs/blob/master/doc/from-git.png?raw=true" width="500px"/>

How to get the Github api token, go to this link: https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line#creating-a-token

```sh
cd loanService
npm install
npm start
```
