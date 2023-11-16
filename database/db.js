// db.js
import mysql from 'mysql';

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '', // Sem senha neste caso
    database: 'alunosUnipe',
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conexão bem-sucedida ao MySQL!');
    }
});

export default connection;
