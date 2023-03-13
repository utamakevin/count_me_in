CREATE DATABASE countmein;

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    image_url TEXT,
    user_id INTEGER,
    description TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password_digest TEXT
);

INSERT INTO events (title, image_url, user_id, description) VALUES ('Cycling', 'http://via.placeholder.com/640x360', 1, 'lorem ipsum');