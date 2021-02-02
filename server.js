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
app.get('/searchForm', searchFormHandler);
app.post('/results', resultsHandler);


// Handlers
function homeHandler(request, response){
  // Start code Here
}

function testHandler(request, response){
  // Start code Here
}

function searchFormHandler(request, response){
  response.status(200).render('searchForm');
}

function resultsHandler(request, response){

  let url1 = ``;
  let url2 = ``;
  let url3 = ``;
  let apiData = {}

  superagent.get(url1)
    .then(results => {
      let data = results.body[1];
      let drinkResults = data.map(value => {
        return new Drinks(value);
      });
      container.push(drinkResults);
    });

    superagent.get(url2)
    .then(results => {
      let data = results.body[1];
      let drinkResults = data.map(value => {
        return new Drinks(value);
      });
      container.push(drinkResults);
    });

    superagent.get(url3)
    .then(results => {
      let data = results.body[1];
      let drinkResults = data.map(value => {
        return new Drinks(value);
      });
      container.push(drinkResults);
    });
    
    response.status(200).render('results', {data: container});
}


// Constructor
// function Drinks(data){
//   this.name = ;
//   this.description = ;
//   this.image = ;
//   this. = ;
// }

function Location(data){
  // How will be searching for the location?
  // city? lat and lon? zipcode?
}

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
      console.log('Connected to database:', client.connectionParameters.database);
    });
  }).catch(err => console.log(err));
