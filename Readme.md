# educapp Application

Restful API for handling data requests application using Node.js, Express and MongoDB.

## Steps to Setup

1. Install dependencies

```bash
npm install
```

2. Run Server

```bash
node server.js
```

###### You can browse the apis at <http://localhost:8080>
- In ./server.js you can specify de server port

## how to add more resources

###### Add schemas of new models of data in:
- ./app/models
* the nomenclature is [MODEL].model.js

###### Add the routes to point new resources in:
- ./app/routes
* the nomenclature is [MODEL].routes.js

###### Write the logic of the new routes:
- ./app/controllers
* the nomenclature is [MODEL].controller.js

###### Add your resource to ./server.js using:
```bash
require('./app/routes/[MODEL].routes.js')(app);
```
