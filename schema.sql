DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS dotd;

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255),
  instructions VARCHAR(255),
  image TEXT,
  measurements TEXT, 
  ingredients TEXT
);

CREATE TABLE dotd (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  img TEXT,
  date DATE NOT NULL DEFAULT NOW()
)
