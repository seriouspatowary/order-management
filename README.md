# frontend

npm install    ---to install dependecies---
npm run dev  ---to run the app----

# backend
npm install    ---to install dependecies---
npm run dev  ---to run the app----




# postgress

sudo -u postgres psql
CREATE USER simanta WITH PASSWORD 'password';
CREATE DATABASE blink_worx;
GRANT ALL PRIVILEGES ON DATABASE blink_worx TO simanta;
ALTER USER simanta WITH SUPERUSER;


# login
psql -U simanta -h localhost -d blink_worx
password

# create tables 
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


![neworder](https://github.com/user-attachments/assets/45facf17-d46f-4988-be83-7eedb5079cec)

![ordermanagement](https://github.com/user-attachments/assets/dada70fa-8566-408f-b988-f5b28f72a093)
![updateOrder](https://github.com/user-attachments/assets/2d5cbc58-5617-4b00-9b60-2e3a9a285ad1)





