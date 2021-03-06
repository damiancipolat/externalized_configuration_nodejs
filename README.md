# Externalized configuration Pattern in Node.js
Examples of how to manage external configurations in a microservice scenario, here are some ways on how to do it.
I'm following the spec from this doc. https://microservices.io/patterns/externalized-configuration.html

### There are differents situations of external configuration scenarios:
- [From a S3 bucket](#from-s3)
- [From a Api-rest](#from-api)
- [From a git repository](#from-git)
- [From AWS parameter store](#from-ssm)

**Benefits:**
- Hot configuration changes.


## Change hot settings.
Some interesting benefits of this patter is that, you can make changes in the config, without redeploy the services.
In the projects there are a file ./configChange.js with a mechanism to detect changes in configuration and reset the services, to apply this new changes. So is important to run the script using a process agent example **nodemon** or **pm2** to detect when the process finish and restart it.

<a name="from-s3"></a>
## From a S3 bucket.
In this scenario I use a S3 bucket to get the configuration when the server start. There are two mock service loan and payments, and there are a config folder in each service with only the s3 bucket path. 

Link: https://github.com/damiancipolat/externalized_configuration_nodejs/tree/master/s3-external-config

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
<a name="from-api"></a>
## From a configuration service.
In this scenario there is a service that work as a exclusive api rest for configuration. I'm using https://www.mocky.io/ to mock an api-rest.

Link: https://github.com/damiancipolat/externalized_configuration_nodejs/tree/master/api-external-config

<img src="https://github.com/damiancipolat/externalized_configuration_nodejs/blob/master/doc/S3-service.png?raw=true" width="500px"/>

### Install and run:
```sh
cd loanService
npm install
npm start
```

<a name="from-git"></a>
## From a GITHUB repository.
In this scenario we extract the configurations from a github central configuration "file" so is very easy to make changes in this configurations. To make this the service use the GITHUB-API to can fetch the file, in the config/default.json there are the github credentials.

The service use this the file https://github.com/damiancipolat/externalized_configuration_nodejs/tree/master/git-external-config/loanService/config, only for a example purpose I'm using the same repo, but in a production scenario is better to use a **configuration repository** for the services.

Link: https://github.com/damiancipolat/externalized_configuration_nodejs/tree/master/git-external-config

<img src="https://github.com/damiancipolat/externalized_configuration_nodejs/blob/master/doc/from-git.png?raw=true" width="500px"/>

How to get the Github api token, go to this link: https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line#creating-a-token

```sh
cd loanService
npm install
npm start
```

<a name="from-ssm"></a>
## From a AWS Parameter Store.
In this scenario we extract the configurations from a aws parameter store service

Link: https://github.com/damiancipolat/externalized_configuration_nodejs/tree/master/aws-parameter-store-config/lambda

<img src="https://github.com/damiancipolat/externalized_configuration_nodejs/blob/master/doc/ssm-aws.png?raw=true" width="500px"/>
