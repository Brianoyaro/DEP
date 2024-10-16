create database if not exists test;
use test;

create table if not exists `test_users`(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    data JSON
);