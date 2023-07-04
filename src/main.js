import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import {
    connectDatabase
} from './database/index.js';
import route from './routes/index.js';

const app = express();

dotenv.config();

const port = process.env.PORT || 8443;

app.use(express.json());
app.use(morgan("combined"));
app.use(cors());


app.get('/health/info', (req, res, next) => {
    res
        .status(200)
        .json({
            message: `The mynzo servers are healthy ✅`
        });
});

// routing
app.use('/', route);

// 404
app.use('*', (req, res, next) => {
    res.status(404).json({
        message: `The page you are looking for does not exists.`
    });
})

// error handling
app.use((err, req, res, next) => {
    const statusCode = err.status || err.statusCode || 500;
    const message = err.message || err;
    const debug = (process.env.NODE_ENV === `production`) ? false : err;
    console.warn(err);
    res.status(statusCode).json({
        message,
        debug,
    });
});

// connect with resources
connectDatabase();

// expose app
app.listen(port, () => {
    console.log(`Server running on port ${port} 🚀. *Expose this port if using Docker*`);
});

export default app;