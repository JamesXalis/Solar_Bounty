const searchButton = document.querySelector(`button`);




function runApi(){
    cityName = document.querySelector(`input`).value.trim().replaceAll(` `, `-`);
    const cordAPI = `https://api.openweathermap.org/geo/1.0/direct?q=`+cityName+`&limit=1&appid=219054b9bdf3d5200fce0e0280cbeec4`;
    fetch(cordAPI)
        .then(function(response){
            if(response.ok){
                return response.json();
                }else{
                    errorPage(response.statusText);
                };
            })
        .then(function(data){
            getServerData(data);
        })

        console.log(response.json)
};

function getServerData(data){
    const weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=`+data[0].lat+`&lon=`+data[0].lon+`&appid=219054b9bdf3d5200fce0e0280cbeec4&units=imperial`;
    fetch(weatherURL)
        .then(function(response){
            if(response.ok){
                return response.json();
            }else{
                errorPage(response.statusText);
            }
        })
        .then(function(data){
            recentSearch = [{
                cityName: `${cityName}`,
                currentTemp: `${data.current.temp}`,
                currentWind: `${data.current.wind_speed}`,
                humidity: `${data.current.humidity}`,
                currentUvIndex: `${data.current.uvi}`,
                currentImage:`${data.current.weather[0].icon}`
            }];
            for(i=0;i < 5 ;i++){
                recentFutureSearch = {
                    dailyDate: `${data.daily[i].dt}`,
                    dailyImg: `${data.daily[i].weather[0].icon}`,
                    dailyTemp: `${data.daily[i].temp.max}`,
                    dailyWind: `${data.daily[i].wind_speed}`,
                    dailyHumidity: `${data.daily[i].humidity}`
                };
                recentSearch.push(recentFutureSearch);
            };
            let firstSearch = arrayOfHistory.length  || 0
            arrayOfHistory.push(recentSearch);
            localStorage.setItem(`searchHistory`, JSON.stringify(arrayOfHistory));
            storedHistory = JSON.parse(localStorage.getItem(`searchHistory`));
            displayData(firstSearch, true);
        })
};
searchButton.addEventListener(`click`, runApi);