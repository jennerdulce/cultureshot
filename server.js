'use strict';

// Bring in dependencies
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const methodOverride = require('method-override');

// Start App
const app = express();
const PORT = process.env.PORT || 3000;
const client = new pg.Client(process.env.DATABASE_URL);
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Express middleware
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));

client.on('error', err => {
  throw err;
});

// Routes
app.get('/', homeHandler);
app.get('/test', testHandler);


// Handlers
function homeHandler(request, response){
  // Start code Here
}

function test__INSERTROUTE__(request, response){
  // Start code Here
}

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
      console.log('Connected to database:', client.connectionParameters.database);
    });
  }).catch(err => console.log(err));
