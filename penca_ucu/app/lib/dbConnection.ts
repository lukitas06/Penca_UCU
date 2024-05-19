
import mysql2 from 'mysql2';

export const connection = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'penca_ucu',
    user: 'root',
    password: 'obligatorio',
}
);