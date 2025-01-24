import express from 'express';
import { checkDatabaseConnection } from './config/db.js';  
import cors from 'cors';
import orderRoutes from './routes/orders.route.js'

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Allow only the frontend origin
  credentials: true, // Allow cookies, Authorization headers, etc.
}));

app.use(express.json());

app.use("/api",orderRoutes)


// Check database connection before starting the server
checkDatabaseConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on Port:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error starting server:', err.message);
  });

  // Export serverless function handler
export default (req, res) => {
  app(req, res); // Delegate to Express app
};