const now = new Date();
const searched = document.getElementById("city-search");
const cityName = document.getElementById("city");
const $searchBtn = document.getElementById('btn');



function getDays(){
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'];

    const day = now.getDay();
    const month = now.getUTCMonth()
    const date = now.getUTCDate() +'/' + months[month] + '/' + now.getUTCFullYear();

    
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
