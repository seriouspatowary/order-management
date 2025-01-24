CREATE TABLE orders(
    id serial PRIMARY KEY NOT NULL,
    order_description VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    
);

CREATE TABLE products(
    id INT PRIMARY KEY NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    product_description TEXT
    
);

CREATE TABLE order_productmap (
    id SERIAL PRIMARY KEY,           
    order_id INT NOT NULL,            
    product_id INT NOT NULL,           
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);






