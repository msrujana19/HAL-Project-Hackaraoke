let chatHistory = [];
let isChatboxVisible = false;
let isTyping = false;

function toggleChatbox() {
    console.log('Toggle function called');
    const chatbox = document.getElementById('chatbox-container');
    isChatboxVisible = !isChatboxVisible;
    console.log('Chatbox visibility:', isChatboxVisible);
    chatbox.style.display = isChatboxVisible ? 'flex' : 'none';
    if (isChatboxVisible) {
        document.getElementById('userInput').focus();
    }
}

function handleKeyPress(event) {
    console.log('Key pressed:', event.key);
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
    // Auto-resize textarea
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const userMessage = userInput.value.trim();
    
    if (!userMessage || isTyping) return;

    // Add user message to chat
    addMessageToChat('user', userMessage);
    userInput.value = '';
    userInput.style.height = 'auto';
    isTyping = true;

    // Show typing indicator
    const chatbox = document.getElementById('chatbox');
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'bot-message typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    chatbox.appendChild(typingIndicator);

    try {
        const response = await fetch('http://localhost:5000/api/chatbot', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                message: userMessage,
                chatHistory: chatHistory
            })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        
        // Remove typing indicator
        typingIndicator.remove();
        
        // Add bot response
        addMessageToChat('bot', data.response);
    } catch (error) {
        console.error('Error:', error);
        typingIndicator.remove();
        addMessageToChat('bot', 'I apologize, but I encountered an error. Please try again or contact our support team.');
        console.log(error)
    } finally {
        isTyping = false;
    }
}

function addMessageToChat(role, content) {
    console.log('Adding message to chat:', role, content);
    const chatbox = document.getElementById('chatbox');
    const messageDiv = document.createElement('div');
    messageDiv.className = role === 'user' ? 'user-message' : 'bot-message';
    messageDiv.textContent = content;
    
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
    chatHistory.push({ role, content });
}

// Add click event listener to chatbot icon
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    const chatbotIcon = document.getElementById('chatbot-icon');
    if (chatbotIcon) {
        chatbotIcon.addEventListener('click', function() {
            console.log('Chatbot icon clicked');
            toggleChatbox();
            if (chatHistory.length === 0) {
                setTimeout(() => {
                    addMessageToChat('bot', 'Hello! I\'m here to help answer your health-related questions. While I can provide general information, please remember to consult with a healthcare provider for personal medical advice.');
                }, 500);
            }
        });
    } else {
        console.error('Chatbot icon not found');
    }
});