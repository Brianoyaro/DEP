-- create a database
DROP DATABASE IF EXISTS internship;
CREATE DATABASE IF NOT EXISTS internship;
USE internship;

-- create users table
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(80)  NOT NULL,
	email VARCHAR(120) UNIQUE NOT NULL,
	password VARCHAR(200) NOT NULL
);

-- create posts table
DROP TABLE IF EXISTS  posts;
CREATE TABLE IF NOT EXISTS posts(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	title VARCHAR(200) NOT NULL,
	post TEXT NOT NULL,
	author_id INT NOT NULL,
	FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE
);

-- create comments table
DROP TABLE IF EXISTS  comments;
CREATE TABLE IF NOT EXISTS comments(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	comment TEXT NOT NULL,
	author_id INT NOT NULL,
	post_id INT NOT NULL,
	FOREIGN KEY(author_id) REFERENCES users (id) ON DELETE CASCADE,
	FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
);
