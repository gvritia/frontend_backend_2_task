const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Управления Товарами',
            version: '1.0.0',
            description: 'Полная документация бэкенда с аутентификацией и ролями',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Локальный сервер',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Подключаем все роуты
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };