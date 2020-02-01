# Externalized configuration Pattern with Node.js
Examples of how to manage external configurations in a microservice scenario, here are some ways on how to do it.
I'm following the spec from this doc. https://microservices.io/patterns/externalized-configuration.html

## There are differents situations of external configuration scenarios:
- From a S3 bucket.
- From a git repository.

## From a S3 bucket.
In this scenario I use a S3 bucket to get the configuration when the server start.

Todo: add config change handler.

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
