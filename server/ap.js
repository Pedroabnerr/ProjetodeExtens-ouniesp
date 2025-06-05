const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/pacientes', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT 
        id,
        nome,
        data_nascimento,
        sexo,
        cpf,
        rg,
        celular,
        casa,
        cep,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        pais, 
        horario FROM usuarios`
    );
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar todos os pacientes:', err);
    res.status(500).json({ erro: 'Erro ao buscar pacientes' });
  }
});

app.get('/pacientes/:PacienteID', async (req, res) => {
  const { PacienteID } = req.params;

  try {
    const [rows] = await pool.execute(
      `SELECT 
         PacienteID AS id,
         Nome AS nome,
         Telefone,
         Email,
         DataNascimento,
         Sexo,
         Endereco,
         NumeroPlano,
         Observacoes,
         DataCadastro
       FROM pacientes
       WHERE PacienteID = ?`,
      [PacienteID]
    );

    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Paciente não encontrado' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Erro ao buscar pacientes:', err);
    res.status(500).json({ erro: 'Erro ao buscar pacientes' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
