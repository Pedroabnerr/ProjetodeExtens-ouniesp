const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

async function startServer() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clinica'
  });

  app.get('/pacientes', async (req, res) => {
    try {
      const [rows] = await connection.execute(
        'SELECT id, nome, horario FROM usuarios'
      );
      res.json(rows);
    } catch (err) {
      console.error('Erro ao buscar pacientes:', err);
      res.status(500).json({ erro: 'Erro ao buscar pacientes' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

startServer();