
import mysql2 from 'mysql2';

const connection = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'penca_ucu',
    user: 'root',
    password: 'obligatorio',
    charset: 'utf8mb4',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to database');
})

export { connection };

