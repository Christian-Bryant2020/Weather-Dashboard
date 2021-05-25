var btn = document.getElementById("search-input");
const apiKey = 'd266a33294e8e5458622d88908376ab6';
let temp = document.getElementById('temp');
let humidity = document.getElementById('humid');
let wind = document.getElementById('wind');
let uv = document.getElementById('uv');
let dayOne = document.getElementById('dayOne');


let weatherSearch = function (event) {
    var cityInput = document.getElementById('citySearch');
    inputValue = cityInput.value.trim();
    let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + inputValue + '&appid=' + apiKey + '&units=imperial';


    localStorage.setItem('City', inputValue);
    let recentEntry = localStorage.getItem('City');
    document.getElementById('location').textContent = recentEntry;
    document.getElementById('cityName').textContent = recentEntry + ' (date)'
    console.log(apiUrl);
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var tempValue = data.main.temp;
            var humidValue = data.main.humidity;
            var windValue = data.wind.speed;
            var uvValue = data.uvi;
            var icon = data.weather.icon;

            document.getElementById('temp').textContent = 'Temp ' + tempValue + icon;
            document.getElementById('humid').textContent = 'Humid ' + humidValue;
            document.getElementById('wind').textContent = 'Wind ' + windValue;
            document.getElementById('uv').textContent = 'Temp ' + uvValue;

            var lat = data.coord.lat;
            var lon = data.coord.lon;
        
            var uvapiURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    console.log(uvapiURL)
        })
        // .catch(funcion(err){
        //     alet('Invalid input')
        // })

}
btn.onclick = weatherSearch;