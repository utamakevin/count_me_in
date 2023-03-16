CREATE DATABASE countmein;

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    image_url TEXT,
    user_id INTEGER,
    description TEXT,
    number_joined INTEGER
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password_digest TEXT,
    event_id_joined TEXT
);

CREATE TABLE agendas (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    event_id INTEGER
);

INSERT INTO events (title, image_url, user_id, description, number_joined) VALUES ('Cycling', 'http://via.placeholder.com/640x360', 1, 'lorem ipsum', 0);

ALTER TABLE events ADD number_joined INTEGER;