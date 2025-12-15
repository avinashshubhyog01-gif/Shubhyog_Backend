import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());


// routes
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;