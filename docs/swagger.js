/* Swagger configuration */
const options = {
    openapi: 'OpenAPI 3',   // Enable/Disable OpenAPI. By default is null
    language: 'en-US',      // Change response language. By default is 'en-US'
    disableLogs: false,     // Enable/Disable logs. By default is false
    autoHeaders: false,     // Enable/Disable automatic headers capture. By default is true
    autoQuery: false,       // Enable/Disable automatic query capture. By default is true
    autoBody: false         // Enable/Disable automatic body capture. By default is true
}

// const config = require('../config/cloud');
import swaggerAutogen from 'swagger-autogen'
swaggerAutogen()
// const msg = require('../utils/lang/messages');

const doc = {
  info: {
    version: '1.0.0',      // by default: '1.0.0'
    title: 'Vital Step API',        // by default: 'REST API'
    description: 'API for IOT Health device',  // by default: ''
    contact: {
        'name': 'Antriksh',
        'email': 'business@antrikshlabs.com'
    },
  },
  components: {
    securitySchemes: {
        Authorization: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
        }
    }
},
  host: "https://ameya-api.onrender.com/",      // by default: 'localhost:3000'
  basePath: '/',  // by default: '/'
  schemes: ['http'],   // by default: ['http']
  consumes: ['application/json'],  // by default: ['application/json']
  produces: ['application/json'],  // by default: ['application/json']
  tags: [        // by default: empty Array
    // {
    //   name: 'Health CRUD',         // Tag name
    //   description: 'Assessment related apis',  // Tag description
    // },
    {
        name: 'Health',
        description: 'Health Check'
    }
  ],
  securityDefinitions: {
    bearerAuth: []
  },  // by default: empty object
  definitions: {
    'errorResponse.404': {
      "code": "404",
      "message": "Not found",
    },
  },          // by default: empty object (Swagger 2.0)
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./index.js', './routes/*.js', './controllers/*.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });

// exports.health = async (req, res) => {
//     /* 
//     #swagger.tags = ['Health']
//     #swagger.summary = 'This is the health API.'
//     #swagger.description = 'This API response tells us service is up or down.'
//     #swagger.consumes = ['application/json']
//     #swagger.produces = ['application/json']
//     #swagger.responses[200] = {
//      description: 'Service is',
//      schema: { $ref: '#/definitions/helathResponse' }
//     }
//     #swagger.responses[500] = {
//      description: 'Server Issue',
//      schema: { $ref: '#/definitions/errorResponse.500' }
//     }
//     #swagger.responses[404] = {
//      description: 'Not found',
//      schema: { $ref: '#/definitions/errorResponse.404' }
//     }
//      */
//     res.send({
//      code: msg.response.CAG001.code,
//      message: msg.response.CAG001.message,
//     });
//    }