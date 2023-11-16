import db from '../database/db.js';
import * as alunosRepository from '../repositories/alunosRepository.js';

const listarAlunos = (req, res) => {
    const query = 'SELECT * FROM alunos';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao buscar alunos no MySQL:', err);
            res.status(500).json({ mensagem: 'Erro ao buscar alunos' });
        } else {
            res.status(200).json(result);
        }
    });
};

const obterAlunoPorId = (req, res) => {
    const query = 'SELECT * FROM alunos WHERE id = ?';
    const alunoId = req.params.id;

    db.query(query, [alunoId], (err, result) => {
        if (err) {
            console.error('Erro ao buscar aluno por ID no MySQL:', err);
            res.status(500).json({ mensagem: 'Erro ao buscar aluno por ID' });
        } else {
            res.status(200).json(result[0]);
        }
    });
};

const criarAluno = async (req, res) => {
    const { id, nome, email, curso, turma } = req.body;

    if (!id || !nome || !email || !curso || !turma) {
        return res.status(400).json({ mensagem: 'Todos os dados são obrigatórios' });
    }

    try {
        await alunosRepository.criarAluno(id, nome, email, curso, turma);
        res.status(201).json({ mensagem: 'Aluno criado com sucesso!' });
    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        res.status(500).json({ mensagem: 'Erro ao criar aluno' });
    }
};

const editarAluno = async (req, res) => {
    const alunoId = req.params.id;
    const { nome, email, curso, turma } = req.body;

    if (!nome || !email || !curso || !turma) {
        return res.status(400).json({ mensagem: 'Todos os dados são obrigatórios' });
    }

    try {
        const result = await alunosRepository.editarAluno(alunoId, nome, email, curso, turma);

        if (result.affectedRows > 0) {
            res.json({ mensagem: 'Aluno atualizado com sucesso' });
        } else {
            res.status(404).json({ mensagem: 'Aluno não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(500).json({ mensagem: 'Erro ao atualizar aluno' });
    }
};

const excluirAluno = async (req, res) => {
    const alunoId = req.params.id;

    try {
        const result = await alunosRepository.excluirAluno(alunoId);

        if (result.affectedRows > 0) {
            res.json({ mensagem: 'Aluno excluído com sucesso' });
        } else {
            res.status(404).json({ mensagem: 'Aluno não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        res.status(500).json({ mensagem: 'Erro ao excluir aluno' });
    }
};

export default { listarAlunos, obterAlunoPorId, criarAluno, editarAluno, excluirAluno };

