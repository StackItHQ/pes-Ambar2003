-- Create Database
CREATE DATABASE IF NOT EXISTS `database`;

-- Use the created database
USE `database`;

-- Create users table
CREATE TABLE IF NOT EXISTS `users` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

-- Insert sample data
INSERT INTO `users` (name, email) VALUES 
('Ambar Ahmad', 'amanambar908@gmail.com'),
('Rocky Balboa', 'rocky@gmail.com'),
('James Bond', 'james@gmail.com');
