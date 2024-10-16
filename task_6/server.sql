create database if not exists internship;
use internship;

create table if not exists genre(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(120) NOT NULL
);

create table if not exists song(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(120) NOT NULL,
    genre_id INT NOT NULL,
    FOREIGN KEY (genre_id) REFERENCES genre (id) ON DELETE RESTRICT
);

create table if not exists playlist(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(120) NOT NULL,
    songs JSON
);