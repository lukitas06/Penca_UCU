import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: 3306,
    database: 'penca_ucu',
    user: 'root',
    password: 'obligatorio',
    charset: 'utf8mb4',
});

export { pool };
