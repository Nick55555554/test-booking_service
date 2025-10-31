import 'dotenv/config';
import '@/config/db';

import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import appRouter from '@/controllers/routes';
import { corsMiddleware, requestLogger } from '@/middleware';

import { openapiSpecification } from './docs/swagger/swagger.config';

const { APP_PORT } = process.env;

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(helmet());
app.use(requestLogger);

app.use(appRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.get('/', (_req, res) => {
    res.json({
        message: 'Booking Service API',
        docs: '/api-docs',
    });
});

app.listen(APP_PORT, () => {
    console.log(`Server running on ${APP_PORT}`);
});
