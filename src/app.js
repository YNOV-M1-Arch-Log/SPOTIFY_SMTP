import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import emailRoutes from './routes/emailRoutes.js';

const app = express();

// Middlewares globaux
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.use('/api/mail', emailRoutes);

export default app;
