DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gurren Lagann Blu Ray Collection", "Movies & Shows", 500, 3),
("Howl's Moving Castle DVD", "Movies & Shows", 20, 10),
("Kindle Fire", "Electronics", 80, 30),
("Microsoft Surface Pro 4", "Electronics", 1000, 10),
("Wilson Evolution Basketball", "Sports", 60, 15),
("Propenn Tennis Ball (24 Cans)", "Sports", 80, 10),
("Folding Dinner Tray", "Furniture", 10, 30),
("Modern Coffee Table", "Furniture", 200, 4),
("Lulu Lemon Long Sleeve Shirt", "Clothing", 55, 13),
("Nike Basketball Tee", "Clothing", 20, 40);

<<<<<<< HEAD
SELECT * FROM products;
=======
SELECT * FROM products;
>>>>>>> 7fe4440f51b861aa9f15b81f2e5777511c1d80da
