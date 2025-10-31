import cors from 'cors';

const { APP_PORT, PGADMIN_PORT } = process.env;

export const corsMiddleware = cors({
    origin: [
        `http://localhost:${APP_PORT}`,
        `http://localhost:${PGADMIN_PORT}`,
        `http://127.0.0.1:${PGADMIN_PORT}`,
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});
