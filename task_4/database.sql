-- create a new database
-- sDROP DATABASE IF EXISTS internship;
CREATE DATABASE IF NOT EXISTS internship;
USE internship;

-- create products table
-- DROP TABLE IF EXISTS product;
CREATE TABLE IF NOT EXISTS product(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(200) NOT NULL,
	quantity INT NOT NULL
);
-- create orders table
-- DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order`(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	status VARCHAR(20) NOT NULL,
	quantity INT NOT NULL,
	product_id INT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE
);
-- craete payments table
-- DROP TABLE IF EXISTS payment;
CREATE TABLE IF NOT EXISTS payment(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	order_id INT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES `order` (id) ON DELETE CASCADE
);

-- create cart table
DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart`(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	product_id INT NOT NULL,
	quantity INT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES `product` (id) ON DELETE CASCADE
);

-- create reviews table
DROP TABLE IF EXISTS `review`;
CREATE TABLE IF NOT EXISTS `review`(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	content TEXT NOT NULL,
	product_id INT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES `product` (id) ON DELETE CASCADE
);