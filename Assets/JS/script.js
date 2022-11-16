const now = new Date();
console.log(now)
const searched = document.getElementById("city-search");
const cityName = document.getElementById("city");
const $searchBtn = document.getElementById('btn');



function getDays(){
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'];

    const day = now.getDay();
    const month = now.getUTCMonth()
    const date = now.getUTCDate() +'/' + months[month] + '/' + now.getUTCFullYear();

    
    console.log(day)
    for (i=0 ; i < 6; i++){
        document.getElementById('wday' + (i + 1)).innerHTML = days[(day + i) % days.length]
        console.log(days[(day + i) % days.length])
    }
    const p = document.createElement('p');
    p.setAttribute('id', 'date');
    document.getElementById('current-weather').appendChild(p).innerHTML = date

}
    getDays()
    $searchBtn.addEventListener('click', getCity);

    function getCity(event) {
    const city = searched.value
    cityName.innerHTML = "Here's current weather in " + city + ':';
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=219054b9bdf3d5200fce0e0280cbeec4&units=imperial`
    event.preventDefault();


    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            for (i = 0; i < 5; i++) {
                document.getElementById('day' + (i + 1) + 'Min').innerHTML = 'Min: ' + Number(data.list[i].main.temp_min ).toFixed(0) + '°';
            };

            for (i = 0; i < 5; i++) {
                document.getElementById('day' + (i + 1) + 'Max').innerHTML = 'Max: ' + Number(data.list[i].main.temp_max ).toFixed(0) + '°';
                console.log(data.list[i])
            };
            for (i = 0; i < 3; i++) {
                const currentData = ['temp', 'wind', 'humidity'];
                const p = document.createElement('p');
                p.setAttribute('id', currentData[i]);
                document.getElementById('current-weather').appendChild(p)
                document.getElementById(currentData[i]).innerHTML = currentData[i]
            
            };

            document.getElementById('temp').insertAdjacentText('afterend', data.list[1].main.temp)
            document.getElementById('wind').insertAdjacentText('afterend', data.list[1].wind.speed);
            document.getElementById('humidity').insertAdjacentText('afterend', data.list[1].main.humidity)
            
        })
}


// function runApi(){
//     cityName = document.querySelector(`input`).value.trim().replaceAll(` `, `-`);
//     const cordAPI = `https://api.openweathermap.org/geo/1.0/direct?q=`+cityName+`&limit=1&appid=219054b9bdf3d5200fce0e0280cbeec4`;
//     fetch(cordAPI)
//     .then(function(response){
//         if(response.ok){
//             return response.json();
//         }else{
//             errorPage(response.statusText);
//         };
//     })
//     .then(function(data){
//         getServerData(data);
//         console.log(data);
//     })
    
// };

// function getServerData(data){
//     cityName = document.querySelector(`input`).value.trim().replaceAll(` `, `-`);
//     const weatherURL = `api.openweathermap.org/data/2.5/forecast?q=`+cityName+`&appid=219054b9bdf3d5200fce0e0280cbeec4`;
//     fetch(weatherURL)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         $temp = data.current.temp.toFixed(1);
//         wind = data.current.wind_speed;
//         humidity = data.current.humidity;
//         uvIndex = data.current.uvi;
//         iconURL = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
//         for (i=0; i<5; i++) {
//             dailyDate[i] = moment(data.daily[i+1].dt, 'X').format('LL');
//             dailyTemp[i] = data.daily[i+1].temp.day.toFixed(1);
//             dailyWind[i] = data.daily[i+1].wind_speed;
//             dailyHumidity[i] = data.daily[i+1].humidity;
//             dailyIconURL[i] = `https://openweathermap.org/img/wn/${data.daily[i+1].weather[0].icon}@2x.png`;
//             console.log(dailyIconURL[i]);
//         }
//         localStorage.setItem($submittedCity, JSON.stringify({
//             localCity: $submittedCity,
//             localDate: date,
//             localTemp: temp,
//             localWind: wind,
//             localHumidity: humidity,
//             localUVIndex: uvIndex,
//             localIconURL: iconURL,
//             localDailyDate: dailyDate,
//             localDailyTemp: dailyTemp,
//             localDailyWind: dailyWind,
//             localDailyHumidity: dailyHumidity,
//             localDailyIconURL: dailyIconURL
//         }))
//         })
// };

// function displayData(){
//     $temp.textContent = data.temp;
//     $wind.textContent = [0].currentWind;
//     $humidity.textContent= [0].humidity;
//     $uvIndex.textContent = [0].currentUvIndex;
//     $titleH2.textContent = cityName;
//     $uvIndex.removeAttribute(`class`)
//     if([0].currentUvIndex >= 6 ){
//         $uvIndex.classList.add(`bg-danger`);
//     }else if([0].currentUvIndex >= 3){
//         $uvIndex.classList.add(`bg-warning`);
//     }else{
//         $uvIndex.classList.add(`bg-success`);
//     };
// };

// searchButton.addEventListener(`click`, getServerData);