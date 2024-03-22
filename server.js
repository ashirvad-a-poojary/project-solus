const express = require('express');
const axios = require('axios'); // Assuming you don't want to rely on axios in chatpage.js

const app = express();
const rasaUrl = 'http://localhost:5005/webhooks/rest/webhook'; // Replace with your Rasa server URL if different

app.use(express.static('public'));

// API endpoint to handle user messages and forward them to Rasa
app.post('/api/rasa', async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: 'Missing message in request body' });
    }

    const response = await axios.post(rasaUrl, {
      sender: 'user',
      message: userMessage,
    });

    res.json(response.data); // Forward Rasa response to the client
  } catch (error) {
    console.error('Error sending message to Rasa:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
