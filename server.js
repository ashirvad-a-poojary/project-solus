const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const rasaResponse = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
            message: userMessage
        });
        const botResponse = rasaResponse.data[0].text;

        res.json({ message: botResponse });
    } catch (error) {
        console.error('Error sending message to Rasa:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
