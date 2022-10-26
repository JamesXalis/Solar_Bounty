function runApi(){
    cityName = document.querySelector(`input`).value.trim().replaceAll(` `, `-`);
    const cordAPI = `https://api.openweathermap.org/geo/1.0/direct?q=`+cityName+`&limit=1&appid=327e492de8c1e347e7f779666d577345`;
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
};