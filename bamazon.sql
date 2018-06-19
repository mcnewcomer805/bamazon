CREATE DATABASE bamazon_DB;

USE bamazon;

CREATE TABLE products (
	 id INT NOT NULL AUTO_INCREMENT,
     product_name VARCHAR(100) NOT NULL,
     department_name VARCHAR(50) NOT NULL,
	 price INT NOT NULL,
     stock_quantity INTEGER(100) NOT NULL,
     PRIMARY KEY (id)
     );
     
	 DESCRIBE products;
     

     
     INSERT INTO products (product_name, department_name, price, stock_quantity)
     VALUES ("3D Projector", "Electronics", 800, 2);
     
	 INSERT INTO products (product_name, department_name, price, stock_quantity)
     VALUES ("Screen", "Electronics", 200, 28);
     
	 INSERT INTO products (product_name, department_name, price, stock_quantity)
     VALUES ("Speaker Sytem", "Electronics", 800, 19);

	 INSERT INTO products (product_name, department_name, price, stock_quantity)
     VALUES ("3D glasses", "Electronics", 10, 2);
     
	 INSERT INTO products (product_name, department_name, price, stock_quantity)
     VALUES ("laptop", "Electronics", 1200, 22);
 0    
	 INSERT INTO products (product_name, department_name, price, stock_quantity)
     VALUES ("Microwave", "Electronics", 200, 12);
     
	 INSERT INTO products (product_name, department_name, price, stock_quantity)
     VALUES ("Lazy Boy", "Furniture", 600, 16);
     
	 INSERT INTO products (product_name, department_name, price, stock_quantity)
     VALUES ("Xbox One", "Electronics", 400, 24);
     
	 INSERT INTO products (product_name, department_name, price, stock_quantity)
     VALUES ("Refrigerator", "Appliance", 850, 18);
     
	 INSERT INTO products (product_name, department_name, price, stock_quantity)
     VALUES ("Toaster Oven", "Appliance", 150, 26);
     
     DELETE  FROM products  
     WHERE id = 7;
     
	 SELECT * FROM products;