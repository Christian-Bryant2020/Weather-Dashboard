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
const iconEl = document.getElementById('icon');
var citiesArray = []//JSON.parse(localStorage.getItem('history'));
                        


let weatherSearch = function (event) {
    let cityInput = document.getElementById('citySearch');
    inputValue = cityInput.value.trim();
    citiesArray.push(inputValue)
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputValue + '&appid=' + apiKey + '&units=imperial';
console.log(citiesArray)
    //local storage set item
    localStorage.setItem('City', JSON.stringify(citiesArray));
    let recentEntry = JSON.parse(localStorage.getItem('City'));
    //let searchedLocations= document.getElementById('location').textContent;
    console.log(inputValue)

    document.getElementById('cityName').textContent = inputValue + ' ' + currentDate;

    // Local Storage get
    //  function (recentEntry){
    //     for(i=0; i < citiesArray.; i++){

    //     }
    // }

    
    //first fetch for base information
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let tempValue = data.main.temp;
            let humidValue = data.main.humidity;
            let windValue = data.wind.speed;
            let icon = data.weather[0].icon;

            document.getElementById('temp').textContent = 'Temp ' + tempValue + '°F';
            document.getElementById('humid').textContent = 'Humid ' + humidValue + '%';
            document.getElementById('wind').textContent = 'Wind ' + windValue + ' MPH';
            iconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
            
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
                    if (uvValue > 0 && uvValue <= 4) {
                        uv.classList.add('green');
                    }
                    else if (uvValue > 4 && uvValue <= 8) {
                        uv.classList.add('orange');
                    }
                    else if (uvValue > 8) {
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
                        dayCount = dayCount + 1;
                    }


                })
        })
}
btn.onclick = weatherSearch;