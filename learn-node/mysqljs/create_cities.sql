CREATE TABLE cities (
  name TEXT NOT NULL,
  postal_code VARCHAR (9) CHECK (postal_code <> ''),
  country_code CHAR (2) REFERENCES countries,
  PRIMARY KEY (country_code, postal_code)
);
