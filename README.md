## Introduction
This repo is a knowledgebase application

## Setup
To build and run the app you need to follow below steps:
* Update config/config.json
* Import the db dump
    * mongorestore --drop -d knowledgebase deploy/knowledgebase
* Create .env file and update following details
    * JWT_SECRET=
    * AWS_ACCESS_KEY_ID=
    * AWS_SECRET_ACCESS_KEY=
    * GOOGLE_CLIENT_ID=
    * GOOGLE_CLIENT_SECRET=
* Run bash deploy/setup.sh (It will install dependencies and build frontend)

## Technology Stack

* Angular
* ExpressJS
* TypeScript
* Node
* MongooDB

## Install, Build, Run

Install node package dependencies:

`$ npm install`

Build:

`$ npm run build`

Run ExpressJS server:

`$ npm start`

Application is accessible on https://localhost:3000/

## Recommendation

Details of API Document (Postman Collection) can be found in `deploy/` folder
Keep all TypeScript source files in the `src` folder.
