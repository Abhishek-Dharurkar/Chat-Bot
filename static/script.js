document.addEventListener('DOMContentLoaded', () => {
    // Add the initial bot message when the page loads
    addBotMessage("How can I assist you today?");

    document.getElementById('send-btn').addEventListener('click', () => {
        const userInput = document.getElementById('user-input').value;
        if (userInput.trim()) {
            addUserMessage(userInput);
            document.getElementById('user-input').value = "";
            showLoadingIndicator();

            // Simulate sending request to server
            fetch('/get_response', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userInput })
            })
            .then(response => response.json())
            .then(data => {
                hideLoadingIndicator();
                addBotMessage(data.bot_message);
            });
        }
    });
});

function addUserMessage(message) {
    const chatBody = document.getElementById('chat-body');
    const timeStamp = new Date().toLocaleTimeString(); // Get current time
    const userMessageElem = `
        <div class="user-message">
            <strong>You:</strong> ${message}
            <div class="timestamp">${timeStamp}</div>
        </div>
    `;
    chatBody.innerHTML += userMessageElem;
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addBotMessage(message) {
    const chatBody = document.getElementById('chat-body');
    const timeStamp = new Date().toLocaleTimeString(); // Get current time
    const botMessageElem = `
        <div class="bot-message">
            <strong>Bot:</strong> ${message}
            <div class="timestamp">${timeStamp}</div>
        </div>
    `;
    chatBody.innerHTML += botMessageElem;
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showLoadingIndicator() {
    document.getElementById('loading-indicator').style.display = 'block';
}

function hideLoadingIndicator() {
    document.getElementById('loading-indicator').style.display = 'none';
}
