// Helper function to generate a random username for automatic replies (bots) between *100* to *500*
function getRandomBotUsername() {
    return `User*${Math.floor(Math.random() * 401) + 100}*`; // 100-500
}

// Helper function to generate a random username for the user (site visitor) between *501* to *699*
function getRandomUserUsername() {
    return `User*${Math.floor(Math.random() * 199) + 501}*`; // 501-699
}

// Generate a username for the user (site visitor) when they first load the page
const userUsername = getRandomUserUsername();

// List of preset replies for initial messages
const initialMessages = [
    'No, this is way too dangerous! My goodness, we should call the cops before it gets worse!',
    'I’ve seen similar things happen before.',
    'Who cares? I just want to see the video. Nowadays people are all in an angry mood. It’s not surprising this happened.',
    'I’m not surprised at all.'
    
];

// Function to get random messages for initial replies
function getRandomInitialReplies() {
    const replies = [];
    const usedIndices = new Set();
    while (replies.length < 4) { // Generates exactly 4 initial replies
        const randomIndex = Math.floor(Math.random() * initialMessages.length);
        if (!usedIndices.has(randomIndex)) {
            replies.push({
                username: getRandomBotUsername(),
                text: initialMessages[randomIndex]
            });
            usedIndices.add(randomIndex);
        }
    }
    return replies;
}

// Function to add replies to the replies container
function addReply(username, text, isUserReply = false) {
    const repliesContainer = document.querySelector('.replies');
    const newReply = document.createElement('div');
    newReply.className = 'reply';

    // Create an avatar element
    const avatar = document.createElement('img');
    avatar.src = 'avatar.png'; // 头像路径
    avatar.className = 'reply-avatar';

    // If the reply is from the user, add a special class to change the background color
    if (isUserReply) {
        newReply.classList.add('user-reply');
    }

    // Create a container for username and text
    const replyContent = document.createElement('div');
    replyContent.className = 'reply-content';

    const usernameBox = document.createElement('div');
    usernameBox.className = 'reply-username';
    usernameBox.textContent = `${username}:`;

    const textBox = document.createElement('div');
    textBox.className = 'reply-text';
    textBox.textContent = text;

    // Append username and text to the reply content container
    replyContent.appendChild(usernameBox);
    replyContent.appendChild(textBox);

    // Append avatar and reply content to the new reply
    newReply.appendChild(avatar);
    newReply.appendChild(replyContent);
    
    repliesContainer.appendChild(newReply);
    repliesContainer.scrollTop = repliesContainer.scrollHeight; // Auto scroll to the latest reply
}

// Generate initial replies only once when the page loads
const initialReplies = getRandomInitialReplies();
initialReplies.forEach(reply => addReply(reply.username, reply.text));

// Function to display preset replies every 2 seconds
const presetReplies = [
    'Can anyone explain what’s actually happening?',
    'There are always two sides to a story.',
    'It feels like we’re watching a movie—so intense! I want to know what happens next.',
    'Haha! Finally, some excitement in this boring life! Don’t stop, keep streaming!'
];

let presetIndex = 0;
const displayPresetReply = () => {
    if (presetIndex < presetReplies.length) {
        addReply(getRandomBotUsername(), presetReplies[presetIndex]);
        presetIndex++;
    } else {
        clearInterval(presetInterval); // Stop displaying replies if all have been shown
    }
};

// Start displaying preset replies every 2 seconds
let presetInterval = setInterval(displayPresetReply, 2000);

// Disable buttons after a choice is made
function disableButtons() {
    document.querySelectorAll('button').forEach(button => {
        button.disabled = true;
        button.classList.add('disabled');
    });
}

// Function to display replies after a button click every 2 seconds
function displayButtonReplies(replies) {
    let buttonReplyIndex = 0;
    const buttonReplyInterval = setInterval(() => {
        if (buttonReplyIndex < replies.length) {
            addReply(getRandomBotUsername(), replies[buttonReplyIndex]);
            buttonReplyIndex++;
        } else {
            clearInterval(buttonReplyInterval); // Stop if all replies are shown
        }
    }, 2000);
}

// Change button color when clicked
function changeButtonColor(button) {
    button.style.backgroundColor = '#bd0000'; // 深色背景
    button.style.color = '#fff'; // 白色文本
}

// Button click handlers with unique responses and automatic follow-up replies
document.getElementById('supportBtn').addEventListener('click', function () {
    changeButtonColor(this);
    addReply(userUsername, 'This is SO MUCH FUN.', true); // Mark as user reply
    displayButtonReplies([
        'Are you sure about this?',
        'Nobody is trying to stop it?'
    ]);
    disableButtons();
});

document.getElementById('opposeBtn').addEventListener('click', function () {
    changeButtonColor(this);
    addReply(userUsername, 'STOP IT! I don’t think this is correct.', true); // Mark as user reply
    displayButtonReplies([
        'This is what many would think.',
        'I completely agree! You guys gone crazy.'
    ]);
    disableButtons();
});

document.getElementById('ignoreBtn').addEventListener('click', function () {
    changeButtonColor(this);
    addReply(userUsername, 'WHATEVER, jest let it go.', true); // Mark as user reply
    displayButtonReplies([
        'Yeah! keep streaming!',
        'I do not think this is right.'
    ]);
    disableButtons();
});

///////////////////////////////////////////////