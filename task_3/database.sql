-- create a new database
DROP DATABASE IF EXISTS internship;
CREATE DATABASE IF NOT EXISTS internship;
USE internship;

-- create products table
DROP TABLE IF EXISTS product;
CREATE TABLE IF NOT EXISTS product(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(200) NOT NULL,
	quantity INT NOT NULL
);
-- create orders table
DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order`(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	status VARCHAR(20) NOT NULL,
	quantity INT NOT NULL,
	product_id INT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE
);
-- craete payments table
DROP TABLE IF EXISTS payment;
CREATE TABLE IF NOT EXISTS payment(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	order_id INT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES `order` (id) ON DELETE CASCADE
);