const btn = document.getElementById("search-input");
const apiKey = 'd266a33294e8e5458622d88908376ab6';
const temp = document.getElementById('temp');
const humidity = document.getElementById('humid');
const wind = document.getElementById('wind');
const uv = document.getElementById('uv');
const dayOne = document.getElementById('dayOne');
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const currentDate = mm + '/' + dd + '/' + yyyy;

let weatherSearch = function (event) {
    var cityInput = document.getElementById('citySearch');
    inputValue = cityInput.value.trim();
    let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + inputValue + '&appid=' + apiKey + '&units=imperial';
console.log(apiUrl)

    localStorage.setItem('City', inputValue);
    let recentEntry = localStorage.getItem('City');
    document.getElementById('location').textContent = recentEntry;
    document.getElementById('cityName').textContent = recentEntry + ' ' + currentDate;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var tempValue = data.main.temp;
            var humidValue = data.main.humidity;
            var windValue = data.wind.speed;
            var icon = data.weather.icon;

            document.getElementById('temp').textContent = 'Temp ' + tempValue +  '°F';
            document.getElementById('humid').textContent = 'Humid ' + humidValue + '%';
            document.getElementById('wind').textContent = 'Wind ' + windValue + ' MPH';

            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var uvapiURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
            console.log(uvapiURL)
           fetch(uvapiURL)
           .then (function (response) {
               return response.json();
           })
           .then(function(data){
            var uvValue = data.value;
            console.log(uvValue)
            document.getElementById('uv').textContent = 'UV index ' + uvValue;

           })
        })
}
btn.onclick = weatherSearch;