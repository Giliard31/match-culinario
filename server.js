const express = require('express');
const path = require('path');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/analisar-geladeira', upload.single('foto'), (req, res) => {
    try {
        let fotoBase64 = null;
        
        // Se o usuário mandou uma foto, convertemos para base64 para exibir na tela
        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            fotoBase64 = `data:${req.file.mimetype};base64,${b64}`;
        }

        const ingredientesDetectados = ["Ovos", "Tomate", "Cebola", "Queijo Mussarela", "Arroz Cozido"];

        const receitasGeradas = [
            {
                id: 1,
                nome: "Arroz de Forno Cremoso de Preguiçoso",
                tempo: "20 min",
                dificuldade: "Fácil",
                compatibilidade: "95%",
                fotoUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80",
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
                fotoUrl: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=600&q=80",
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
            fotoGeladeira: fotoBase64, // Devolve a foto tirada pelo usuário
            ingredientes: ingredientesDetectados,
            receitas: receitasGeradas
        });

    } catch (error) {
        res.status(500).json({ sucesso: false, erro: "Erro ao processar imagem." });
    }
});

app.listen(PORT, () => {
    console.log(`MatchCulinário Pro rodando na porta ${PORT}`);
});
