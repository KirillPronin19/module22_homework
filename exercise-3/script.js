document.addEventListener('DOMContentLoaded', function() {
    var userInfoButton = document.getElementById('userInfoButton');
    userInfoButton.addEventListener('click', displayUserInfo);
});

function displayUserInfo() {
    // Получаем размеры экрана
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    document.getElementById('screenWidth').textContent = screenWidth;
    document.getElementById('screenHeight').textContent = screenHeight;

    // Получаем координаты местоположения пользователя
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        document.getElementById('userLocation').textContent = "Широта: " + position.coords.latitude + ", Долгота: " + position.coords.longitude;
    }, function() {
        document.getElementById('userLocation').textContent = "Информация о местоположении недоступна";
    });
    } else {
        document.getElementById('userLocation').textContent = "Информация о местоположении недоступна";
    }

    // Показываем блок с информацией
    document.getElementById('user-info').style.display = 'block';
}