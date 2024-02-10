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
            addChatMessage('bot', 'Sorry, something went wrong while processing your request.');
            scrollChatboxToBottom(); // Scroll to the bottom after adding a message
        }
    };

    // Function to handle Rasa response
    const handleRasaResponse = (data) => {
        const responseText = data[0].text || 'Sorry, I didn\'t understand that.';
        addChatMessage('bot', responseText);
        scrollChatboxToBottom(); // Scroll to the bottom after adding a message
    };

    // Function to add a new chat message to the chat box
    const addChatMessage = (sender, message) => {
        const newMessage = document.createElement('li');
        newMessage.className = `chat ${sender === 'user' ? 'outgoing' : 'incoming'}`;
        newMessage.innerHTML = `<span class="material-symbols-outlined">${sender === 'user' ? 'account_circle' : 'smart_toy'}</span><p>${message}</p>`;
        chatbox.appendChild(newMessage);
    };

    // Function to scroll the chatbox to the bottom
    const scrollChatboxToBottom = () => {
        chatbox.scrollTop = chatbox.scrollHeight;
    };

    // Function to handle sending message
    const sendMessage = () => {
        const userMessage = inputField.value.trim();
        if (userMessage !== '') {
            addChatMessage('user', userMessage);
            sendUserMessage(userMessage);
            inputField.value = '';
        }
    };

    // Event listener for Enter key in the textarea
    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevents the newline character
            sendMessage();
        }
    });

    // Event listener for send button click
    sendButton.addEventListener('click', sendMessage);
});
