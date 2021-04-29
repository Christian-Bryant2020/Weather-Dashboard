var btn = document.getElementById("search-input");
const apiKey = 'd266a33294e8e5458622d88908376ab6';



let weatherSearch = function(event) {
    var cityInput = document.getElementById('citySearch');
    inputValue = cityInput.value.trim();
    let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + inputValue + '&appid='+ apiKey;
console.log(apiUrl)
}

btn.onclick= weatherSearch;







//api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}



// var	formSubmitHandler = function(event) {
// 	console.log("formSubmitHandler is fine");
// 	event.preventDefault();

//     var userInput = document.getElementById("search-input");
// 	inputValue = userInput.value.trim();
	
// 		getApi(inputValue);
// 		localStorage.setItem("city", inputValue);
// 		var recentEntry = localStorage.getItem("city");
// 		document.getElementById("searchResults").textContent = "Search results for: " + recentEntry;
// 	}
	
// let getApi = function () {
//     fetch(apiUrl)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function (data) {
// console.log(data);
//     })
// }