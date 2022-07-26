create TABLE user
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(255),
    theme VARCHAR(255),
)

create TABLE forum
(
    id      SERIAL PRIMARY KEY,
    title   VARCHAR(255),
    content VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user (id)
)
