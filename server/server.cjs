const express = require('express');
const app = express();

// Middleware necessário para ler JSON no body da requisição
app.use(express.json());

// Rota GET existente
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'Online com Node.js ' + process.version,
    message: 'Agora funcionando no PowerShell!'
  });
});

// ✅ Rota POST que espera { userGoal, dietType }
app.post('/api/test', (req, res) => {
  const { userGoal, dietType } = req.body;

  if (!userGoal || !dietType) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
  }

  res.json({
    status: 'Sucesso',
    message: `Objetivo recebido: ${userGoal}, tipo de dieta: ${dietType}`
  });
});

app.listen(3001, () => {
  console.log('\x1b[36m%s\x1b[0m', ' Servidor rodando na porta 3001');
  console.log('\x1b[33m%s\x1b[0m', 'Acesse: http://localhost:3001/api/test');
});
