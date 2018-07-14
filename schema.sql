DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30),
    price INTEGER(10) NOT NULL,
    stock_quantity INTEGER(10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
    VALUES ("flux capacitor","auto",1000.00,20),
            ("hoover boots","clothing",30.00,30),
            ("lightsaber","tools",1200.00,100),
            ("railgun","military",890.00,12),
            ("jetpack","transportation",500.00,30),
            ("whitewall tires","auto",150.00,38),
            ("bomber","clothing",130.00,5),
            ("sonic screwdriver","tools",300.00,10),
            ("bazooka","military",300.00,3);

