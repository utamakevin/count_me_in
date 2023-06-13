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

INSERT INTO events (title, image_url, user_id, description, number_joined) VALUES ('Cycling', 'https://c.ndtvimg.com/2020-08/dtm9edd8_cycling_625x300_05_August_20.jpg?im=Resize=(1230,900)', 1, 'lorem ipsum', 0);

INSERT INTO events (title, image_url, user_id, description, number_joined) VALUES ('Badminton', 'https://cdn-japantimes.com/wp-content/uploads/2022/08/np_file_179250.jpeg', 1, 'lorem ipsum', 0);

INSERT INTO events (title, image_url, user_id, description, number_joined) VALUES ('Swimming', 'https://images.theconversation.com/files/412390/original/file-20210721-13-1gmnwji.jpg?ixlib=rb-1.1.0&rect=35%2C0%2C2595%2C1329&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip', 1, 'lorem ipsum', 0);

INSERT INTO events (title, image_url, user_id, description, number_joined) VALUES ('Cycling', 'http://via.placeholder.com/640x360', 1, 'lorem ipsum', 0);

INSERT INTO events (title, image_url, user_id, description, number_joined) VALUES ('Cycling', 'http://via.placeholder.com/640x360', 1, 'lorem ipsum', 0);

INSERT INTO events (title, image_url, user_id, description, number_joined) VALUES ('Cycling', 'http://via.placeholder.com/640x360', 1, 'lorem ipsum', 0);

ALTER TABLE events ADD number_joined INTEGER;