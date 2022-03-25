const swaggerAutogen = require('swagger-autogen')()

/*const hostNames = {
    development: "localhost:3000",
    production: "app4iot.herokuapp.com"
};*/

const doc = {
    info: {
        title: 'TRANSLATE WORDS REST API',
        description: 'REST API Para Traducir.',
    },

    host: 'localhost:3000',//(process.env.NODE_ENV ? hostNames.production : hostNames.development),
    
    schemes: [
        'http', 
        'https'
    ],

    definitions: {
        
        TranslationSchema:
        {
            words: 
            {
                wordToReplace: "replacement",
                wordToReplace2: "replacement",
            },

            jsonPayload: {}
        },
        

    },
};

const outputFile = './swagger_output.json'
const endpointsFiles = ['./index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)