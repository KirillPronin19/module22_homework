document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendMessageButton = document.getElementById('send-message');
    const sendLocationButton = document.getElementById('send-location');
  
    // Подключение к эхо-серверу
    const socket = new WebSocket('wss://echo-ws-service.herokuapp.com/');
  
    // Обработчик сообщений от сервера
    socket.onmessage = function(event) {
      const message = JSON.parse(event.data);
      appendMessage(message.text);
    };
  
    // Функция для добавления сообщения в чат
    function appendMessage(text) {
      const messageElement = document.createElement('li');
      messageElement.textContent = text;
      chatMessages.appendChild(messageElement);
    }
  
    // Обработчик клика на кнопку "Отправить"
    sendMessageButton.addEventListener('click', function() {
      const message = chatInput.value;
      if (message) {
        socket.send(JSON.stringify({ text: message }));
        chatInput.value = '';
      }
    });
  
    // Обработчик клика на кнопку "Гео-локация"
    sendLocationButton.addEventListener('click', function() {
      navigator.geolocation.getCurrentPosition(function(position) {
        const { latitude, longitude } = position.coords;
        const url = `https://www.openstreetmap.org/${latitude},${longitude}`;
        socket.send(JSON.stringify({ text: url }));
        appendMessage(`Ссылка на вашу гео-локацию: ${url}`);
      }, function(error) {
        appendMessage(`Ошибка при получении гео-локации: ${error.message}`);
      });
    });
  });