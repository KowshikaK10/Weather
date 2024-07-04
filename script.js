document.addEventListener('DOMContentLoaded',()=>{
    const btn=document.getElementById('fetch');
    let API_Key='b4f7f6a9d53b59324a81affd0fff0c75';
    const output=document.querySelector('.output')
    const map=document.getElementById('map')
    btn.addEventListener('click',async()=>{
        navigator.geolocation.getCurrentPosition(showLoc, errHand);
        document.querySelector('.container').style.display='none';
        document.querySelector('.output').style.display='block';
    })
     function showLoc(pos) {
        let latitude=pos.coords.latitude;
        let longitude=pos.coords.longitude;
        showWeather(latitude,longitude)
        .then((res)=>{
            const windDir=windDirection(res.wind.deg);
            document.getElementById('lat').innerText=`Lat: ${latitude}`
            document.getElementById('lon').innerText=`Lon: ${longitude}`
            map.innerHTML=`<iframe id='mapData' src="https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe>`
            let button=document.querySelector('.button');
            let data=`  <button class="btn" id="loc">Location: ${res.name}</button>
                        <button class="btn" id="wind">Wind Speed:${res.wind.speed}</button>
                        <button class="btn" id="humidity">Humidity :${res.main.humidity}</button>
                        <button class="btn" id="timezone">Time Zone: GMT+5:30</button>
                        <button class="btn" id="pressure">Pressure:${res.main.pressure}</button>
                        <button class="btn" id="direction">Wind Direction :${windDir}</button>
                        <button class="btn" id="feels">Feels like:${res.main.feels_like}°</button>
                        `
            button.innerHTML+=(data)
        })
        .catch((err)=>console.log(err))
    }
    
    function errHand(err) {
        switch (err.code) {
            case err.PERMISSION_DENIED:
                output.innerHTML =
                    "The application doesn't have the permission to make use of location services";
                break;
            case err.POSITION_UNAVAILABLE:
                output.innerHTML = 
                      "The location of the device is uncertain";
                break;
            case err.TIMEOUT:
                output.innerHTML = 
                      "The request to get user location timed out";
                break;
            case err.UNKNOWN_ERROR:
                output.innerHTML =
                    "Time to fetch location information exceeded" +
                    "the maximum timeout interval";
                break;
        }
    }
    
    async function showWeather(lat,long){
        let Url='https://api.openweathermap.org/data/2.5/weather';
        let fullUrl=`${Url}?lat=${lat}&lon=${long}&appid=${API_Key}&units=imperial`;
        const weather=await fetch(fullUrl)
        const response = weather;
        return await response.json();
    }
    function windDirection(degree){
        if (degree>337.5) return 'North';
        if (degree>292.5) return 'North West';
        if(degree>247.5) return 'West';
        if(degree>202.5) return 'South West';
        if(degree>157.5) return 'South';
        if(degree>122.5) return 'South East';
        if(degree>67.5) return 'East';
        if(degree>22.5){return 'North East';}
        return 'North';
    }
})