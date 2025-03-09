const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/webhook", async (req, res) => {
    const { userId } = req.body;  // Recebe o user ID do Roblox
    try {
        // Passo 1: Busca a URL do ícone do avatar usando a API do Roblox
        const thumbnailUrl = `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=150x150&format=Png&isCircular=false`;
        const thumbnailResponse = await axios.get(thumbnailUrl);
        const imageUrl = thumbnailResponse.data.data[0].imageUrl;

        // Passo 2: Envia o webhook para o Discord
        const discordWebhookUrl = "https://discord.com/api/webhooks/SEU_WEBHOOK_AQUI";
        const embed = {
            title: "Ícone do Avatar",
            description: `Ícone do usuário com ID ${userId}`,
            thumbnail: { url: imageUrl },
            color: 0x00ff00
        };
        await axios.post(discordWebhookUrl, { embeds: [embed] });

        res.status(200).send("Webhook enviado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro: " + error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));