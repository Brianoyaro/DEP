-- create a database
CREATE DATABASE IF NOT EXISTS toys_db;

USE toys_db;

-- create a table
CREATE TABLE IF NOT EXISTS toys(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(80) UNIQUE NOT NULL,
	description TEXT NOT NULL,
	price DECIMAL(10, 2) DEFAULT 0.00,
	origin_country VARCHAR(200) DEFAULT 'UK'
);

-- INSERT DUMMY DATA

INSERT INTO toys (name, description, price, origin_country) VALUES
	('ScoobyDoo', 'ScoobyDoo action toy from the infamous mysteryinc franchise', 12.00, 'US'),
	('Thomas Train', 'Thomas the friendly engine', 4.97, 'KE'),
	('Teddy', 'A Teddy bear whom we all love and adore', 17.20, 'US');
