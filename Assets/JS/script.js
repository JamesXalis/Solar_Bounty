const searchButton = document.querySelector(`button`);
let $temp = document.getElementById(`temp`);
let $wind = document.getElementById(`wind`);
let $humidity= document.getElementById(`humidity`);
let $uvIndex= document.getElementById(`uvIndex`);
let $titleH2 = document.getElementById(`cityTitle`);
let $currentImg = document.getElementById(`img`);




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

function getServerData(data){
    cityName = document.querySelector(`input`).value.trim().replaceAll(` `, `-`);
    const weatherURL = `api.openweathermap.org/data/2.5/forecast?q=`+cityName+`&appid=219054b9bdf3d5200fce0e0280cbeec4`;
    fetch(weatherURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        $temp = data.current.temp.toFixed(1);
        wind = data.current.wind_speed;
        humidity = data.current.humidity;
        uvIndex = data.current.uvi;
        iconURL = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
        for (i=0; i<5; i++) {
            dailyDate[i] = moment(data.daily[i+1].dt, 'X').format('LL');
            dailyTemp[i] = data.daily[i+1].temp.day.toFixed(1);
            dailyWind[i] = data.daily[i+1].wind_speed;
            dailyHumidity[i] = data.daily[i+1].humidity;
            dailyIconURL[i] = `https://openweathermap.org/img/wn/${data.daily[i+1].weather[0].icon}@2x.png`;
            console.log(dailyIconURL[i]);
        }
        localStorage.setItem($submittedCity, JSON.stringify({
            localCity: $submittedCity,
            localDate: date,
            localTemp: temp,
            localWind: wind,
            localHumidity: humidity,
            localUVIndex: uvIndex,
            localIconURL: iconURL,
            localDailyDate: dailyDate,
            localDailyTemp: dailyTemp,
            localDailyWind: dailyWind,
            localDailyHumidity: dailyHumidity,
            localDailyIconURL: dailyIconURL
        }))
        })
};

function displayData(){
    $temp.textContent = data.temp;
    $wind.textContent = [0].currentWind;
    $humidity.textContent= [0].humidity;
    $uvIndex.textContent = [0].currentUvIndex;
    $titleH2.textContent = cityName;
    $uvIndex.removeAttribute(`class`)
    if([0].currentUvIndex >= 6 ){
        $uvIndex.classList.add(`bg-danger`);
    }else if([0].currentUvIndex >= 3){
        $uvIndex.classList.add(`bg-warning`);
    }else{
        $uvIndex.classList.add(`bg-success`);
    };
};

searchButton.addEventListener(`click`, getServerData);