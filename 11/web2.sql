create database web2;
use web2;
create table country (
    id int primary key auto_increment,
    name varchar(255),
    capital varchar(255) );

create table users (
    id int primary key auto_increment,
    username varchar(255),
    password varchar(255)
)
