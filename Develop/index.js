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
const currentDate = '(' + mm + '/' + dd + '/' + yyyy + ')';

                        


let weatherSearch = function (event) {
    let cityInput = document.getElementById('citySearch');
    inputValue = cityInput.value.trim();
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputValue + '&appid=' + apiKey + '&units=imperial';

    //local storage set item
    localStorage.setItem('City', inputValue);
    let recentEntry = localStorage.getItem('City');

    document.getElementById('location').textContent = recentEntry;
    document.getElementById('cityName').textContent = recentEntry + ' ' + currentDate;

    //first fetch for base information
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let tempValue = data.main.temp;
            let humidValue = data.main.humidity;
            let windValue = data.wind.speed;
            let icon = data.weather.icon;

            document.getElementById('temp').textContent = 'Temp ' + tempValue + '°F';
            document.getElementById('humid').textContent = 'Humid ' + humidValue + '%';
            document.getElementById('wind').textContent = 'Wind ' + windValue + ' MPH';

            let lat = data.coord.lat;
            let lon = data.coord.lon;

            //second fetch for UV information
            let uvapiURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
            fetch(uvapiURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    let uvValue = data.value;
                    document.getElementById('uv').textContent = 'UV index ' + uvValue;
                    if (uvValue <= 4) {
                        uv.classList.add('green');
                    }
                    else if (uvValue <= 8) {
                        uv.classList.add('orange');
                    }
                    else if (uvValue <= 12) {
                        uv.classList.add('red');
                    }
                })

            //third fetch for 5 day forecast 
            let fiveDayapiURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + inputValue + '&appid=' + apiKey + '&units=imperial';
            let dayCount = 1;
            fetch(fiveDayapiURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    for (i = 0; i < 5; i++) {
                        var icon = document.querySelector("#icon" + dayCount);
                        icon.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
                        document.getElementById("date" + dayCount).innerHTML = data.list[i].dt_txt.substring(0, 10);
                        document.getElementById("temp" + dayCount).innerHTML = "Temp: " + data.list[i].main.temp + "F";
                        document.getElementById("humidity" + dayCount).innerHTML = "Humidity: " + data.list[i].main.humidity + "%";
                        // increment day
                        dayCount = dayCount + 1;
                    }


                    // let dayOneTemp = data.list[0].main.temp;
                    // let dayOneHumid = data.list[0].main.humidity;
                    // console.log(dayOne)
                    // document.getElementById('dayOne').textContent = currentDate + 'icon' + dayOneTemp + dayOneHumid;
                })
        })
}
btn.onclick = weatherSearch;