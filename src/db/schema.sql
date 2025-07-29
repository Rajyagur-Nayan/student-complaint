DROP TABLE IF EXISTS complaints;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL ,
    password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);


DROP TYPE IF EXISTS priority_level;
DROP TYPE IF EXISTS status_types;
CREATE TYPE priority_level AS ENUM ('HIGH', 'MEDIUM', 'LOW');
CREATE TYPE status_types AS ENUM ('PENDING','RESOLVE','IN_PROGRESS');
DROP TABLE IF EXISTS complaints;
CREATE TABLE complaints (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    priority priority_level NOT NULL DEFAULT 'MEDIUM',
    status status_types NOT NULL DEFAULT 'PENDING',

    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);
