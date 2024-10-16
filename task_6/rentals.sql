create database if not exists internship;
use internship;

-- craete table rental
-- drop table if exists rental;
CREATE TABLE IF NOT EXISTS `rental`(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    location VARCHAR(200) NOT NULL,
    price FLOAT NOT NULL,
    size INT NOT NULL,
    isBooked BOOLEAN DEFAULT false,
    ammenities JSON
);

-- create table payment
-- drop table if exists payment;
CREATE TABLE IF NOT EXISTS `payment`(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    rentalId INT NOT NULL,
    amount INT NOT NULL,
    FOREIGN KEY (rentalId) REFERENCES `rental` (id) ON DELETE CASCADE
);