import db from '../database/db.js';

export const criarAluno = (id, nome, email, curso, turma) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO alunos (id, nome, email, curso, turma) VALUES (?, ?, ?, ?, ?)';

        db.query(query, [id, nome, email, curso, turma], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

export const editarAluno = (id, nome, email, curso, turma) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE alunos SET nome = ?, email = ?, curso = ?, turma = ? WHERE id = ?';

        db.query(query, [nome, email, curso, turma, id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

export const excluirAluno = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM alunos WHERE id = ?';

        db.query(query, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
