import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { initDatabase } from './db/index.js';

// Routes
import routes from "./routes/index.js";


//Constants
const PORT = 5000;
const API_BASE_PATH = '/api/v1';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(API_BASE_PATH, routes);



// Default route for health check or root
app.get('/', (req, res) => {
    res.send('API is working');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const start = async () => {
    try {
        app.listen(PORT, () => {
            initDatabase();
            console.log(`API is running at http://localhost:${PORT}${API_BASE_PATH}`);
        });
    } catch (err) {
        console.error("Error starting server:", err);
    }
};

start();
