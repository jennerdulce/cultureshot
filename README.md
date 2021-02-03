# cultureshot
301 Final Project

Motto: Feeling thirsty? Drink some culture! 

Summary of Idea
People are stressed throughout a busy work week and want to relax, our app allows people to learn about new alcohol beverages and see local places that sell them. People like to learn stuff and enjoy alcohol as a luxury. Our mission is to create an app to help people have a more meaningful experience with the beverage(s) they like as well as discover new ones! Sharing new drinks and knowledge with your friends and introducing them to new ones as well. Redefining the phrase of being ’thirsty for knowledge’. Benefit local shops/market

“Satisfying thirst for knowledge as well as alcohol”

Minimum Value Product
Our app utilizes API databases to display the origins and information about the product
Also displays local areas where you can find searched beverages so that you may try them right away. Favorites list of alcoholic drinks that you have tried and notes about them. You can share this information with your friends and family (of legal age of course). Cheers. 

- List alcohol types
- Use of database
- Use of multiple APIS
    - View local businesses through yelp apis location iq
    - Retrieve information through wikipedia APIS
    - View location distance through Google Maps API

- Stored sql database
- Caveat to call places to ensure store is open

Stretch goals:
- Top 10 list table
- Recipes 
- Adding a dynamic background
- A sound file
- Drink of the week/ Drink of the Day
- Username/Password?
- virtual bar


LAYOUT

API for WikiPedia
- API key? 
- URL
- Superagent

API for Google Places
- API key? 
- URL
- Superagent

API for Googlemaps
- API key? 
- URL
- Superagent

API for TheCocktailDB
- API key? 
- URL
- Superagent
- Render a page: cocktails.ejs

app.get(‘/’)
- renders home.ejs
- Contains information from 
- app.get(‘/favorites)
- renders favorites.ejs
- app.get(‘/search’)
- Renders searchform.ejs
- app.get(‘/results’)
- Renders results.ejs

- Page: Favorites
- Page: Cocktails
- Page: Search form
- Page: Results
- Page: Default/ Home
    - Drink of the Day
    - Drink of the Week
- Carousel Slideshow HERO image
- Database
  - Display Favorites
   -  SQL “INSERT INTO favorites”
   -  SafeValues
   -  client.query
   -  Add to Favorites
  - SQL “SELECT FROM favorites”
    - SafeValues
    - client.query
