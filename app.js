const apiUrl = "http://api.openweathermap.org"
const geoApiPath = "/geo/1.0/direct?q="
const weatherApiPath = "/data/3.0/onecall?"
const apiKey = "bf4cd5466179067780d1737f57afdbd1"

async function getLatLong(cityName) {
    return await fetch(`${apiUrl}${geoApiPath}${cityName}&limit=1&appid=${apiKey}`)
        .then(r => r.json())
        .then(d => {
            return {
                'lat': d[0].lat,
                'long': d[0].lon
            }
        })
}

async function getWeatherData(cityName) {
    const { lat, lon } = await getLatLong(cityName)
    return await fetch(`${apiUrl}${weatherApiPath}lat=${lat}&lon=${lon}&appid=${apiKey}`)
}