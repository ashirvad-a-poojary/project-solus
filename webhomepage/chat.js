document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.querySelector('.chatbox');
    const inputField = document.querySelector('.chat-input textarea');
    const sendButton = document.getElementById('send-btn');
  
    // Function to send user message to Rasa
    const sendUserMessage = async (message) => {
      try {
        const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
          sender: 'user',
          message: message,
        });
  
        handleRasaResponse(response.data);
      } catch (error) {
        console.error('Error sending message to Rasa:', error);
      }
    };
  
    // Function to handle Rasa response
    const handleRasaResponse = (data) => {
      // Add logic to parse and display Rasa response in your chat box
      const responseText = data[0].text || 'Sorry, I didn\'t understand that.';
      addChatMessage('bot', responseText);
    };
  
    // Function to add a new chat message to the chat box
    const addChatMessage = (sender, message) => {
      const newMessage = document.createElement('li');
      newMessage.className = `chat ${sender === 'user' ? 'outgoing' : 'incoming'}`;
      newMessage.innerHTML = `<span class="material-symbols-outlined">${sender === 'user' ? 'account_circle' : 'smart_toy'}</span><p>${message}</p>`;
      chatbox.appendChild(newMessage);
    };
  
    // Event listener for sending user messages
    sendButton.addEventListener('click', () => {
      const userMessage = inputField.value.trim();
      if (userMessage !== '') {
        addChatMessage('user', userMessage);
        sendUserMessage(userMessage);
        inputField.value = '';
      }
    });
  });
  