const functions = require('firebase-functions');
const cors = require('cors')({
    origin: true
  });
  
  // Imports the Google Cloud client library
  const {
    BigQuery
  } = require('@google-cloud/bigquery');

  async function executeQuery(query) {
    
    const projectId = 'fcmpoc-be302';
    const keyFilename = 'fcmpoc-be302-0ae799253e14.json';

    // Create a client
    const bigqueryClient = new BigQuery({ projectId, keyFilename });
    
    const sqlQuery = query;
  
    const options = {
      query: sqlQuery,
      timeoutMs: 100000, // Time out after 100 seconds.
      useLegacySql: false, // Use standard SQL syntax for queries.
      location: 'US'
    };
  
    // Runs the query
    return bigqueryClient.query(options);
  }
  
  // Cors response to handle the result from BigQuery
  function responseCors(req, res, data) {
    return cors(req, res, () => {
      res.json({
        result: data
      });
    });
  }
  
  // Cors error when the function throw an error
  function errorCors(req, res, error) {
    return cors(req, res, () => {
      res.status(500).send(error);
    });
  }
  
  
  exports.bigQSqlQuery = functions.https.onRequest(async (req, res) => {
  
    try {
      //   Retrieve the request data from our Angular Application
      let data = req.body;
      const datasetName = data.datasetName;
      const query = data.query;
  
      if (!datasetName) {
        return errorCors(req, res, 'Dataset name does not exists');
      }
  
      // If there is no query params from the App
      if (!query) {
        return errorCors(req, res, 'Query does not exists');
      }
  
      // Execute the query and return a result Object if everything is OK
      let result = await executeQuery(query);
      return responseCors(req, res, result);
  
    } catch (error) {
  
      // Otherwise throw an error
      errorCors(req, res, error);
      return;
    }
  
  })