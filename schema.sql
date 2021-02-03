DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255),
  instructions VARCHAR(255),
  image TEXT,
  measurements TEXT, 
  ingredients TEXT
);