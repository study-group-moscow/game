create TABLE "user"
(
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(255),
    theme VARCHAR(255)
);

create TABLE "post"
(
    id      SERIAL PRIMARY KEY,
    content VARCHAR(255),
    likes  integer[],
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);