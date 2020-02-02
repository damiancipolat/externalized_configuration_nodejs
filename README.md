# Externalized configuration Pattern with Node.js
Examples of how to manage external configurations in a microservice scenario, here are some ways on how to do it.
I'm following the spec from this doc. https://microservices.io/patterns/externalized-configuration.html

### There are differents situations of external configuration scenarios:
- From a S3 bucket: https://github.com/damiancipolat/externalized_configuration_nodejs/tree/master/s3-external-config
- From a git repository.

Benefits:
- Hot configuration changes.

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
