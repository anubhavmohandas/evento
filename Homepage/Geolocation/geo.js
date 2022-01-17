var x = document.getElementById("out")
var y = document.getElementById("address")
var z = document.getElementById('icon')

function geolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        x.innerText = "Geo Not Supported"
    }
}

function showPosition(data) {
    console.log(data)
    let lat = data.coords.latitude;
    let long = data.coords.longitude
    var url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&mode=json&units=metric&cnt=1&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            data.list.map((item) => {
                console.log(item.temp.day)
                y.innerText = `${item.temp.day}°C`
                z.innerHTML = `<img class='card-img-top' src='https://openweathermap.org/img/w/${item.weather[0].icon}.png' alt='weather'/>`
            })

        })
}