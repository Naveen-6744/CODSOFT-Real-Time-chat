// Store messages and user names
const messages = [];

// Function to get user name (you can enhance this for user authentication)
function getUserName() {
  const storedName = localStorage.getItem('chatUserName');
  if (storedName) {
    return storedName;
  } else {
    const userName = prompt('Enter your name:');
    if (userName) {
      localStorage.setItem('chatUserName', userName);
      return userName;
    } else {
      return 'Anonymous';
    }
  }
}

function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  if (message !== '') {
    const chatMessages = document.querySelector('.chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    const userName = getUserName();
    messageElement.innerHTML = `<strong>${userName}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    messages.push(messageElement.innerHTML);
    messageInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

function clearChat() {
  const chatMessages = document.querySelector('.chat-messages');
  chatMessages.innerHTML = '';
  messages.length = 0;
}

function handleFileUpload(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const chatMessages = document.querySelector('.chat-messages');
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      const userName = getUserName();
      messageElement.innerHTML = `<strong>${userName} uploaded a file:<br><a href="${e.target.result}" target="_blank">${file.name}</a>`;
      chatMessages.appendChild(messageElement);
      messages.push(messageElement.innerHTML);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };
    reader.readAsDataURL(file);
  }
}

// Event listener for sending messages
document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

// Event listener for clearing chat
document.getElementById('clear-button').addEventListener('click', clearChat);

// Event listener for file uploads
document.getElementById('file-input').addEventListener('change', handleFileUpload);
