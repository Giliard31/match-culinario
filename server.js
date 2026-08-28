const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Servir os arquivos estáticos da pasta public (nosso frontend PWA)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rota de teste da API para buscar receitas com base nos ingredientes
app.post('/api/receitas', (req, res) => {
    const { ingredientes } = req.body;
    
    // Aqui depois vamos plugar a IA ou banco de dados de receitas
    // Por enquanto, simulamos uma resposta:
    const receitasExemplo = [
        { id: 1, nome: "Omelete Completa", tempo: "10 min", compatibilidade: "90%", ingredientesUsados: ingredientes || [] },
        { id: 2, nome: "Arroz de Forno Rápido", tempo: "20 min", compatibilidade: "75%", ingredientesUsados: ingredientes || [] }
    ];

    res.json(receitasExemplo);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
