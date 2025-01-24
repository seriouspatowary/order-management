import dotenv from 'dotenv';
import pg from 'pg'; 

dotenv.config();


const pool = new pg.Pool({
  user: process.env.DB_USER,       
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,  
  port: process.env.DB_PORT || 5432,  
  ssl: { rejectUnauthorized: false },
});


async function checkDatabaseConnection() {
  try {
    const client = await pool.connect(); // Attempt to connect to the database
    console.log('Database connected successfully');
    client.release(); // Release the client back to the pool after the test
  } catch (err) {
    console.error('Database connection error:', err.message);
    throw new Error('Failed to connect to the database');
  }
}

export { pool, checkDatabaseConnection };
