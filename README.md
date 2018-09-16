# Steaph Module Connector

That microservice is responsable to turn on/off the end-points according of them schedule :D

## Requirements

* Docker (Optinal)
* Mongo v2.6.10 in :27017
* Node.js v10
* Steaph API

# Usage

## Target environemnt

* Start up Steaph Thing Connector
```
$ docker-compose up --build
```

## Development environment

1. Intall the requirements
```
$ npm install
$ npm run knot-build
```

2. Start up MongoDB Server
```
$ mongod
```

3. Start up Babel listener
```
$ npm run babelw
```

4. Start up Steaph API
```
$ nodemon
```

Developed by Anderson Laurentino
Steaph Copyright