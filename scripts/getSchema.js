var fetch = require('node-fetch');
var fs = require('fs');

const {
  buildClientSchema,
  introspectionQuery,
  printSchema,
} = require('graphql/utilities');

const GRAPHQL_API_URL = 'http://localhost:3000/api';

console.log(introspectionQuery);

fetch(GRAPHQL_API_URL, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ 'query': introspectionQuery }),
})
  .then(res => res.json())
  .then(res => {
    console.log(res);
    const schemaString = printSchema(buildClientSchema(res.data));
    fs.writeFileSync('schema.graphql', schemaString);
  });
