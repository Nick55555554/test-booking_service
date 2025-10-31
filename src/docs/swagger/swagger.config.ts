import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    failOnErrors: false,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Booking service',
            version: '1.0.0',
        },
        servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./src/docs/swagger/*.yaml'],
};

export const openapiSpecification = swaggerJsdoc(options);
