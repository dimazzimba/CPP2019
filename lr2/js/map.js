let map;
let marker;
let url = "https://api.openweathermap.org/data/2.5/weather?APPID=43ac0a3664a447dec6dd624247cb7d83";
const ABSOLUTE_ZERO = -273.15
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.2327805, lng: 28.4809704},
        zoom: 8
    });
    google.maps.event.addListener(map, 'click', function(event){
        getWeather(url, event);
    });
}


function addMarker(props){
    if(marker){
        marker.setMap(null);
    }
    marker = new google.maps.Marker({
        position: props.coords,
        map: map
    });

    if(props.content){
        var infoWindow = new google.maps.InfoWindow({
            content: props.content
        });
        infoWindow.open(map, marker);
    }
}


function getWeather(url, event) {
    let content;
    $.ajax(
        {
            url: url + `&lat=${event.latLng.lat()}&lon=${event.latLng.lng()}`,
            type: "GET",
            success: function (response) {
                addMarker({
                    coords: event.latLng,
                    content: createInfoWindowContent(response)
                })
            },
            error: function (error) {
                addMarker({
                    coords: event.latLng,
                    content: `Error - ${error}`
                })
            }
        }
    )
}


function createInfoWindowContent(response){
    return `<div>
        <h1>City: ${response.name}</h1>
        <div id="coordinates">
        <h2>Coordinates:</h2>
        Latitude = ${response.coord.lat}
        <br>Longitude = ${response.coord.lon}
        </div>
        <div id="temperature">
            <h2>Temperature:</h2>
            Real: ${Math.round((response.main.temp + ABSOLUTE_ZERO) * 10) / 10} C
            <br>Feels like: ${Math.round((response.main.feels_like + ABSOLUTE_ZERO) * 10) / 10} C
            <br>Max: ${Math.round((response.main.temp_max + ABSOLUTE_ZERO) * 10) / 10} C
            <br>Min: ${Math.round((response.main.temp_min + ABSOLUTE_ZERO) * 10) / 10} C
        </div>
        <div id="weather">
            <h2>The weather is: ${response.weather[0].main}</h2>
            <img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png">
            <br>Description: ${response.weather[0].description}
        </div>
        <div id="other">
            <h2>Other:</h2>
            Humidity: ${response.main.humidity} %
            <br>Pressure: ${response.main.pressure} 
            <br>Wind: ${response.wind.speed} m/s, dir = ${response.wind.deg} deg
        </div>
    </div>`;
}