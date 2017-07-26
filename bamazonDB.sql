DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(20) NOT NULL,
  price DECIMAL(10,3) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("USB Cable", "Electronics", 12.50, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Umbrella", "Fashion", 15.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shampoo", "Personal Care", 4.50, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Book", "Books", 8.50, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DVD", "Music", 22.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Razors", "Personal Care", 9.95, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toothbrush", "Personal Care", 6.50, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 350.50, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Towel", "Home", 3.50, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat litter", "Pets", 18.75, 100);


