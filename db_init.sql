-- Create the database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS user_demo;

USE user_demo;

-- Create the users table
CREATE TABLE IF NOT EXISTS users
(
    id INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    address1 VARCHAR(255) NOT NULL,
    address2 VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zip INT NOT NULL,
    country VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)
