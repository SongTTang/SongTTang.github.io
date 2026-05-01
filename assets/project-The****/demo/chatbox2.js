const chatBox = document.getElementById('chatBox');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');

// Generate a random number between 501 and 599 for the user name, formatted with asterisks
const userName = `*${Math.floor(Math.random() * 99) + 501}*`;

// List of preset bot responses
const botResponses = [
    "to stifle the pain of insanity",
    "I don't know what to call you.",
    "Life is but a dream.",
    "Do you believe in fate?",
    "We are all just stardust.",
    "What's your purpose?",
    "Why do you ask?",
    "Time waits for no one.",
    "It's all a game.",
    "Do you really think you blend in?",
    "Don't look around; you already know.",
    "They're all thinking the same thing.",
    "You can't hide from what you don't understand.",
    "There is no escape from the gaze.",
    "Welcome to the matrix."
];

// Function to display a message
function displayMessage(message, type = 'user') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    if (type === 'user') {
        messageElement.textContent = `${userName}: ${message}`; // Display the user's message with the formatted user name
    } else {
        messageElement.textContent = message; // Display bot message
    }
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Send button click event
sendButton.addEventListener('click', () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        displayMessage(userMessage, 'user'); // Display user message
        chatInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const botNumber = Math.floor(Math.random() * 500) + 1; // Random number between 1 and 500
            const botResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            displayMessage(`*${botNumber}*: ${botResponse}`, 'bot');
        }, 500); // Response delay
    }
});

// Allow pressing Enter to send message
chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
