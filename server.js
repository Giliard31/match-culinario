const express = require('express');
const path = require('path');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Guarda a foto temporariamente na memória

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rota inteligente que analisa os ingredientes e retorna receitas completas
app.post('/api/analisar-geladeira', upload.single('foto'), (req, res) => {
    try {
        // Simulando a IA identificando itens da foto (aqui futuramente entra o Gemini Vision)
        const ingredientesDetectados = ["Ovos", "Tomate", "Cebola", "Queijo Mussarela", "Arroz Cozido"];

        // Banco de dados simulado de receitas avançadas
        const receitasGeradas = [
            {
                id: 1,
                nome: "Arroz de Forno Cremoso de Preguiçoso",
                tempo: "20 min",
                dificuldade: "Fácil",
                compatibilidade: "95%",
                ingredientesUsados: ["Arroz Cozido", "Queijo Mussarela", "Tomate", "Cebola"],
                ingredientesFaltantes: ["Requeijão (opcional)"],
                modoPreparo: [
                    "Misture o arroz cozido com a cebola e o tomate picados.",
                    "Coloque metade em uma travessa untada.",
                    "Cubra com bastante queijo mussarela e adicione o restante do arroz.",
                    "Leve ao forno ou micro-ondas apenas para derreter o queijo. Sirva quente!"
                ]
            },
            {
                id: 2,
                nome: "Omelete de Forno Recheada",
                tempo: "15 min",
                dificuldade: "Muito Fácil",
                compatibilidade: "85%",
                ingredientesUsados: ["Ovos", "Tomate", "Queijo Mussarela"],
                ingredientesFaltantes: ["Sal e Orégano a gosto"],
                modoPreparo: [
                    "Bata os ovos em um recipiente com um pouco de sal.",
                    "Misture o tomate picado e o queijo em cubos.",
                    "Despeje em uma frigideira antiaderente ou assadeira pequena.",
                    "Tampe e deixe cozinhar em fogo baixo até firmar."
                ]
            }
        ];

        res.json({
            sucesso: true,
            ingredientes: ingredientesDetectados,
            receitas: receitasGeradas
        });

    } catch (error) {
        res.status(500).json({ sucesso: false, erro: "Erro ao processar imagem." });
    }
});

app.listen(PORT, () => {
    console.log(`MatchCulinário V2 rodando na porta ${PORT}`);
});
