// app.js
import express from 'express';
//import cors from 'cors';
import apicache from 'apicache';
import * as alunosController from './controllers/alunosController.js';

// Use o middleware apicache com uma configuração básica
const cache = apicache.middleware('2 minutes'); // Tempo de cache de 2 minutos

const app = express();
const port = process.env.WEBSITE_PORT || 3000;

app.use(express.json());
//app.use(cors());

app.get('/', (req, res) => {
    res.send('Bem-vindo à minha API!');
});

app.get('/alunos', cache, alunosController.listarAlunos);
app.get('/alunos/:id', alunosController.obterAlunoPorId);
app.post('/alunos', alunosController.criarAluno);
app.put('/alunos/:id', alunosController.editarAluno)
app.delete('/alunos/:id', alunosController.excluirAluno);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
