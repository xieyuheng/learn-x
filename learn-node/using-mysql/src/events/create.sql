CREATE TABLE events (
  event_id SERIAL PRIMARY KEY,
  title TEXT,
  starts TIMESTAMP,
  ends TIMESTAMP NULL,
  venue_id INT REFERENCES venues
);
