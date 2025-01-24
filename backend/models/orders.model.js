import { pool } from "../config/db.js";

export const getAllOrderModel = async (req) => {

    try {
       
        const orderResult =    await pool.query(`SELECT 
                                                    o.id AS order_id,
                                                    o.order_description,
                                                    o.created_at,
                                                COUNT(op.product_id) AS count_of_products
                                                FROM 
                                                    orders o
                                                LEFT JOIN 
                                                    order_productmap op ON o.id = op.order_id
                                                GROUP BY 
                                                    o.id`);

        const orders = orderResult.rows;

        return orders;
        
    } catch (error) {
         console.error('Error retrieving orders:', error.message);
         return {
          
           status_code: "500",
           message: "Internal server error",
    };
        
    }
};


export const getOrderByIdModel = async (req) => {
    const orderId = req.params.id;
    try {
        const ordeQuery = `SELECT o.id AS order_id, o.order_description, o.created_at,
                                                COUNT(op.product_id) AS count_of_products
                                                FROM 
                                                    orders o
                                                LEFT JOIN 
                                                    order_productmap op ON o.id = op.order_id
                                                WHERE o.id =$1
                                                GROUP BY o.id`;
        const orderResult = await pool.query(ordeQuery, [orderId]);

    if (orderResult.rows.length === 0) {
        return {
          status_code: "404",
          message: "Order not found",
      }
    }

        const order = orderResult.rows;
        return order;
        
    } catch (error) {
        console.error('Error retrieving orders:', error.message);
        return {
          
           status_code: "500",
           message: "Internal server error",
         };

    }
}




export const addNewOrderModel = async (req) => {
    const client = await pool.connect(); // Obtain a client from the pool
    
    const { order_description, product_id } = req.body; // `productid` is expected to be a comma-separated string
    const createdAt = new Date();
      
    try {
        if (!order_description || !product_id) {
            return {
                status_code: "400",
                message: "Missing order_description or product_id",
            };
        }

        await client.query('BEGIN');

        const insertOrderQuery = `
            INSERT INTO orders (order_description, created_at)
            VALUES ($1, $2)
            RETURNING id;
        `;
        const resOrder = await client.query(insertOrderQuery, [order_description, createdAt]);
        const orderId = resOrder.rows[0].id;

        const productIds = product_id.split(',').map((id) => id.trim());

        const insertOrderProductMapQuery = `
            INSERT INTO order_productmap (order_id, product_id)
            VALUES ($1, $2);
        `;
        for (const id of productIds) {
            await client.query(insertOrderProductMapQuery, [orderId, id]);
        }

        await client.query('COMMIT');

        return {
            status_code: "200",
            message: "Order added successfully",
        };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error while adding new order:', error.message);
        return {
            status_code: "500",
            message: "Internal server error",
        };
    } finally {
        client.release(); // Correctly release the client back to the pool
    }
};


export const updateOrderByIdModel = async (req) => {
    const client = await pool.connect();
    const orderId = req.params.id; 
    const { order_description, product_id } = req.body; 

    try {
        if (!order_description || !product_id) {
            return {
                status_code: "400",
                message: "Missing order_description or product_id",
            };
        }

        const checkOrderQuery = `
            SELECT id 
            FROM orders
            WHERE id = $1;
        `;
        const orderResult = await client.query(checkOrderQuery, [orderId]);

        if (orderResult.rowCount === 0) {
            return {
                status_code: "404",
                message: "Order not found",
            };
        }


        await client.query('BEGIN');

    
        const updateOrderQuery = `
            UPDATE orders
            SET order_description = $1
            WHERE id = $2;
        `;
        await client.query(updateOrderQuery, [order_description, orderId]);

        const deleteOrderProductsQuery = `
            DELETE FROM order_productmap
            WHERE order_id = $1;
        `;
        await client.query(deleteOrderProductsQuery, [orderId]);

        const productIds = product_id.split(',').map((id) => id.trim());
        const insertOrderProductMapQuery = `
            INSERT INTO order_productmap (order_id, product_id)
            VALUES ($1, $2);
        `;
        for (const id of productIds) {
            await client.query(insertOrderProductMapQuery, [orderId, id]);
        }

        await client.query('COMMIT');

        return {
            status_code: "200",
            message: "Order updated successfully",
        };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error while updating order:', error.message);
        return {
            status_code: "500",
            message: "Internal server error",
        };
    } finally {
        client.release();
    }
};


export const deleteOrderByIdModel = async (req) => {
    const client = await pool.connect();
    const orderId = req.params.id;

    try {
        // Check if the order exists in the `orders` table
        const checkOrderQuery = `
            SELECT id 
            FROM orders
            WHERE id = $1;
        `;
        const orderResult = await client.query(checkOrderQuery, [orderId]);

        if (orderResult.rowCount === 0) {
            return {
                status_code: "404",
                message: "Order not found",
            };
        }

        await client.query('BEGIN');

        // Delete from `order_productmap` table first (to handle foreign key constraints)
        const deleteOrderProductsQuery = `
            DELETE FROM order_productmap
            WHERE order_id = $1;
        `;
        await client.query(deleteOrderProductsQuery, [orderId]);

        // Delete from `orders` table
        const deleteOrderQuery = `
            DELETE FROM orders
            WHERE id = $1;
        `;
        await client.query(deleteOrderQuery, [orderId]);

        await client.query('COMMIT');

        return {
            status_code: "200",
            message: "Order deleted successfully",
        };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error while deleting order:', error.message);
        return {
            status_code: "500",
            message: "Internal server error",
        };
    } finally {
        client.release();
    }
};


export const getProductModel = async (req) => {

    try {
       
        const orderResult =    await pool.query(`SELECT id, product_name, product_description FROM products`);

        const orders = orderResult.rows;

        return orders;
        
    } catch (error) {
         console.error('Error retrieving orders:', error.message);
         return {
          
           status_code: "500",
           message: "Internal server error",
    };
        
    }
};