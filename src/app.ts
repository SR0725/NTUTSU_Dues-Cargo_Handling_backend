import 'express-async-errors';

import { errorMiddleware } from '@/middlewares/errorMiddleware';
import { serviceMiddleware } from '@/middlewares/serviceMiddleware';
import apiV1Router from '@/routes/index';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(serviceMiddleware);
app.use(errorMiddleware);

app.use('/api/v1', apiV1Router);

export default app;
