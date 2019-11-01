DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;

CREATE TABLE products
(
	item_id INT(4) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(20) NOT NULL,
	PRIMARY KEY (item_id)
);

Select *
FROM products;

INSERT INTO products
	(item_id, product_name, department_name, price, stock_quantity)
VALUES
	(101, "Apple AirPods", "electronics", 149.99, 20),
	(212, "Samsung Television", "electronics", 999.99, 10),
	(313, "Sectional Sofa", "furniture", 699.99, 5),
	(420, "Bonsai Tree", "garden", 99.99, 14),
	(504, "Baseball Bat", "baseball", 39.99, 15),
	(619, "Philadelphia Eagles Jersey", "football", 79.99, 20),
	(720, "Golf clubs", "golf", 1099.99, 11),
	(808, "Nintendo DS", "electronics", 199.99, 10),
	(913, "Playstation 5", "electronics", 999.99, 19),
	(1009, "Air Jordans", "basketball", 199.99, 17)