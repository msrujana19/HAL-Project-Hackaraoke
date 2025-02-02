const messagesContainer = document.getElementById("messages-container");
let messages = JSON.parse(localStorage.getItem("messages")) || [];

function addMessage() {
    const username = document.getElementById("username").value.trim() || "Anonymous";
    const content = document.getElementById("message-content").value.trim();
    const timestamp = new Date().toLocaleString();

    if (content === "") {
        alert("Message cannot be empty!");
        return;
    }

    const newMessage = {
        id: Date.now(),
        username,
        content,
        timestamp,
        likes: 0,
        comments: []
    };

    messages.unshift(newMessage);
    localStorage.setItem("messages", JSON.stringify(messages));
    document.getElementById("username").value = "";
    document.getElementById("message-content").value = "";
    renderMessages();
}

function likeMessage(id) {
    const message = messages.find(msg => msg.id === id);
    message.likes += 1;
    localStorage.setItem("messages", JSON.stringify(messages));
    renderMessages();
}

function deleteMessage(id) {
    messages = messages.filter(msg => msg.id !== id);
    localStorage.setItem("messages", JSON.stringify(messages));
    renderMessages();
}

function addComment(id) {
    const commentInput = document.getElementById(`comment-input-${id}`);
    const commentText = commentInput.value.trim();

    if (commentText === "") return;

    const message = messages.find(msg => msg.id === id);
    message.comments.push(commentText);
    localStorage.setItem("messages", JSON.stringify(messages));

    commentInput.value = "";
    renderMessages();
}

function renderMessages() {
    messagesContainer.innerHTML = "";
    
    messages.forEach(msg => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.innerHTML = `
            <p>${msg.content}</p>
            <p class="meta">Posted by <strong>${msg.username}</strong> | ${msg.timestamp}</p>
            <div class="actions">
                <button class="like" onclick="likeMessage(${msg.id})">❤️ ${msg.likes}</button>
                <button class="delete" onclick="deleteMessage(${msg.id})">🗑️</button>
            </div>
            <div class="comments">
                <div class="comment-box">
                    <input type="text" id="comment-input-${msg.id}" placeholder="Write a comment..." />
                    <button onclick="addComment(${msg.id})">💬</button>
                </div>
                ${msg.comments.map(comment =>` <p class="comment">💬 ${comment}</p>`).join('')}
            </div>
        `;

        messagesContainer.appendChild(messageElement);
    });
}

renderMessages();