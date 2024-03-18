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
            handleError(error);
        }
    };


    const handleRasaResponse = (data) => {
        const responseText = data[0].text || 'Sorry, I didn\'t understand that.';
        addChatMessage('bot', responseText);
        scrollChatboxToBottom(); 
    };

    const handleError = (error) => {
        const errorMessage = 'Sorry, something went wrong while processing your request.';
        addChatMessage('bot', errorMessage);
        scrollChatboxToBottom(); 
    };

    const addChatMessage = (sender, message) => {
        const newMessage = document.createElement('li');
        newMessage.className = `chat ${sender === 'user' ? 'outgoing' : 'incoming'}`;
        chatbox.appendChild(newMessage);

        const messageElement = document.createElement('p');
        newMessage.appendChild(messageElement);

        if (sender === 'user') {
            messageElement.textContent = message;
        } else {
            typeWriter(message, messageElement);
        }

        newMessage.innerHTML = `<span class="material-symbols-outlined">${sender === 'user' ? 'account_circle' : 'smart_toy'}</span>`;
        newMessage.appendChild(messageElement);
    };

    const typeWriter = (text, element) => {
        let i = 0;
        const speed = 25;
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        type();
    };

    const scrollChatboxToBottom = () => {
        chatbox.scrollTop = chatbox.scrollHeight;
    };

    const sendMessage = () => {
        const userMessage = inputField.value.trim();
        if (userMessage !== '') {
            addChatMessage('user', userMessage);
            sendUserMessage(userMessage);
            inputField.value = '';
        }
    };

    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); 
            sendMessage();
        }
    });

    sendButton.addEventListener('click', sendMessage);
});
