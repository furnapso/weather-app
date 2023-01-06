const weatherCodes = {
    0: 'Clear Sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Light snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight showers',
    81: 'Moderate showers',
    82: 'Violent showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
}

async function getLatLong(cityName) {
    return await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`)
        .then(r => r.json())
        .then(d => {
            return {
                lat: d.results[0].latitude,
                lon: d.results[0].longitude,
                country: d.results[0].country
            }
        })
}

async function getWeatherData(cityName) {
    const { lat, lon } = await getLatLong(cityName)
    return await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(r => r.json())
}

async function updateWeather() {
    displayLoading()
    const formData = new FormData(document.querySelector("form"))
    const cityName = formData.get("city")
    if (cityName != null && cityName.trim() != "") {
        console.log('cityName:', cityName)
        const weatherData = await getWeatherData(cityName)
        console.log(weatherData)

        let weatherElement = `
        <h2>${cityName}</h2>
        <h3>${weatherData.current_weather.temperature}°c</h3>
        <h4>${weatherCodes[weatherData.current_weather.weathercode]}</h4>
        `
        document.querySelector("#weatherContainer").innerHTML = weatherElement
    }
}

function displayLoading() {
    const loading = `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
    document.querySelector("#weatherContainer").innerHTML = loading
}

document.querySelector("button").addEventListener('click', updateWeather)
document.querySelector("form").addEventListener('click', e => {
    e.preventDefault()
})