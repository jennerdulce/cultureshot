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
app.use(express.urlencoded({ extended: true }));

client.on('error', err => {
  throw err;
});

// Routes
app.get('/', homeHandler);
app.get('/test', testHandler);
app.get('/searchForm', searchFormHandler);
app.post('/results', resultsHandler);
app.post('/details', detailsHandler);
app.post('/favorites', favoritesHandler);
app.post('/ingredient', ingredientHandler);


// Handlers
function homeHandler(request, response) {
  response.status(200).render('index');
}

// Adding Favorites To the Table
function favoritesHandler(request, response) {
  let SQL = `INSERT INTO favorites
            (name, instructions, image, measurements, ingredients)
            VALUES ($1, $2, $3, $4, $5);`;

  let safeValues = [request.body.name, request.body.instructions, request.body.image, request.body.measurements, request.body.ingredients];

  client.query(SQL, safeValues)
    .then(() => {
      console.log(`${request.body.name} added to your favorites list!`);

      response.status(200).redirect('/searchForm');
    });
}

function ingredientHandler(request, response) {
  console.log('========================================', request.body.id);
  let url = `www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${request.body.id}`;

  let regexIngredients = /strIngredient+/gm;
  let regexMeasure = /strMeasure+/gm;
  superagent.get(url)
    .then(results => {
      let data = results.body.drinks;
      console.log('results', data);
      let drinkResults = data.map(currentObject => {
        let ingredients = [];
        let measurements = [];
        let x = Object.keys(currentObject);
        x.forEach(value => {
          if (value.match(regexIngredients)) {
            ingredients.push(value);
          } else if (value.match(regexMeasure)) {
            measurements.push(value);
          }
        });

        let ingredientsList = ingredients.reduce((acc, value) => {
          if (currentObject[value]) {
            acc.push(currentObject[value]);
          };
          return acc;
        }, []);

        let measureList = measurements.reduce((acc, value) => {
          if (currentObject[value]) {
            acc.push(currentObject[value]);
          }
          return acc;
        }, []);
        return new Recipe(currentObject, ingredientsList, measureList);
      });

      response.status(200).render('ingredientDetails', { data: drinkResults });
    });
}


function testHandler(request, response) {
  // Start code Here
}


function searchFormHandler(request, response) {
  response.status(200).render('searchForm');
}


function resultsHandler(request, response) {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/`;

  if (request.body.filter === 'name') {
    url += `search.php?s=${request.body.search}`;
    let regexIngredients = /strIngredient+/gm;
    let regexMeasure = /strMeasure+/gm;
    superagent.get(url)
      .then(results => {
        let data = results.body.drinks;
        let drinkResults = data.map(currentObject => {
          let ingredients = [];
          let measurements = [];
          let x = Object.keys(currentObject);
          x.forEach(value => {
            if (value.match(regexIngredients)) {
              ingredients.push(value);
            } else if (value.match(regexMeasure)) {
              measurements.push(value);
            }
          });

          let ingredientsList = ingredients.reduce((acc, value) => {
            if (currentObject[value]) {
              acc.push(currentObject[value]);
            }
            return acc;
          }, []);

          let measureList = measurements.reduce((acc, value) => {
            if (currentObject[value]) {
              acc.push(currentObject[value]);
            }
            return acc;
          }, []);
          return new Recipe(currentObject, ingredientsList, measureList);
        });

        response.status(200).render('drinkResults', { data: drinkResults });

        // ingredients and measure are arrays
        console.log(drinkResults);
      });
  }

  if (request.body.filter === 'ingredient') {
    url += `filter.php?i=${request.body.search}`;

    superagent.get(url)
      .then(results => {
        console.log(results);
        let data = results.body.drinks;
        let drinkResults = data.map(value => {
          return new Ingredient(value);
        });

        response.status(200).render('ingredientResults', { data: drinkResults });
      });
  }

}

function detailsHandler(request, response) {
  console.log(request.body.ingredients);
  request.body.ingredients = request.body.ingredients.split(',');
  request.body.measurements = request.body.measurements.split(',');
  response.status(200).render('drinkDetails', { data: request.body });
}

// Constructor
function Recipe(data, ingredients, measurements) {
  this.name = data.strDrink;
  this.instructions = data.strInstructions;
  this.image = data.strDrinkThumb;
  this.ingredients = ingredients;
  this.measurements = measurements;
}

function Ingredient(data) {
  this.name = data.strDrink;
  this.image = data.strDrinkThumb;
  this.id = data.idDrink;
}


function Location(data) {
  // How will be searching for the location?
  // city? lat and lon? zipcode?
}

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
      console.log('Connected to database:', client.connectionParameters.database);
    });
  })
  .catch(err => console.log(err));

