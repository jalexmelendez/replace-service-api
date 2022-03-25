const express = require('express');

/**
 * 
 * 
 * Application Boot
 * 
 * 
 */

const app = express();

/**
 * 
 * 
 * Server config
 * 
 */

app.listen(process.env.PORT || 3000, () => { console.log("Running on port 3000.") });

// CORS
const CORS = require('cors');
app.use(CORS());

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Api Docs
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
/**
 * 
 * Default route
 * 
 */


app.post('/', async (req, res) => {
    /*
        #swagger.tags = ['Translate']
        #swagger.parameters['Translation'] = {
            in: 'body',
            description: 'Translate words.',
            schema: { $ref: '#/definitions/TranslationSchema' }
        }
    */
   let translationRules = req.body.words;
   let jsonPayload = req.body.jsonPayload;
   let wordsToSearch = Object.keys(translationRules);

   for (let i=0, len = wordsToSearch.length;i<len;i++) {
       let targetWord = wordsToSearch[i];
       jsonPayload = replaceWord(jsonPayload, targetWord, translationRules[targetWord]);
   }
   res.send(jsonPayload);
});


 /**
  * 
  * Translate function
  * 
  */
function replaceWord(json, wordToSearch, replacementWord) {
    try {
        let jsonString = JSON.stringify(json);
        jsonString = jsonString.replaceAll(wordToSearch, replacementWord);
        return JSON.parse(jsonString);
    }

    catch {
        return "Error, this is not a valid JSON format.";
    }
}
