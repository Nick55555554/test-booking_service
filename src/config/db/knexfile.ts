import path from 'path';

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env;

module.exports = {
    client: 'pg',
    connection: {
        host: POSTGRES_HOST || 'localhost',
        port: POSTGRES_PORT || 5432,
        database: POSTGRES_DB || 'postgres',
        user: POSTGRES_USER || 'postgres',
        password: POSTGRES_PASSWORD || 'postgres',
    },
    migrations: {
        directory: path.join(__dirname, '../../db/migrations'),
        tableName: 'knex_migrations',
        extension: 'ts',
        loadExtensions: ['.js'],
    },
};
