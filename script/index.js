API_key = "90f46bd5d45fa5c486fb1ceac22fbf71";
setDefaults();
const sec1 = document.getElementById('sec1');
const header = document.querySelector('header');
const navitems = document.getElementsByClassName("nav-items");
const qs_city = document.querySelector('.search_city input');
const logo = document.getElementById("logo");
//for displaying data
const go = document.getElementById("go");
const city_name = document.getElementById("city_name");
const temp_big = document.getElementById("temp_big");
const temp_dis = document.getElementById("temp-display");
const humid_dis = document.getElementById("humid-display");
const pressure_dis = document.getElementById("pressure");
const wind = document.getElementById("wind");
const desc = document.getElementById("desc");
const main_dis = document.getElementById("main");
const st_img = document.getElementsByClassName("st_img");
const details_body_div = document.getElementById("details_body_div");
window.addEventListener('scroll', function () {
    let value = window.scrollY;
    sec1.style.backgroundPositionY = value * 0.7 + "px";
    // console.log(value)
    if (Number(value) > 20) {
        header.style.backgroundColor = "rgb(63, 66, 66)";

        logo.style.fontSize = "2rem";
        for (let i = 0; i < navitems.length; i++) {
            navitems[i].style.fontSize = "0.9rem";
        }
    }
    else {
        logo.style.fontSize = "3rem";
        header.style.backgroundColor = "transparent";
        for (let i = 0; i < navitems.length; i++) {
            navitems[i].style.fontSize = "1.1rem";
        }
    }
})
go.addEventListener('click', () => {
    let city = qs_city.value;
    if (city != null && city != "") {
        requestApi(city);
    }
    else {
        // qs_city.classList.add("error")
        alert("Please Enter a valid City Name.")
    }
    // console.log(city)
})
function requestApi(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;
    fetch(api).then(response => response.json()).then(result => details(result));
}
function details(result) {
    let { feels_like, humidity, pressure, temp, temp_max, temp_min } = result.main;
    let { lon, lat } = result.coord;
    let { country } = result.sys;
    let { speed,gust,deg } = result.wind;
    let name = result.name;
    let visibility = result.visibility;
    let cloudiness = result.clouds.all;
    let { id, main, description, icon } = result.weather[0];
    city_name.innerHTML = `${name},${country}`;
    temp_dis.innerHTML = `Max: ${temp_max}°C <br> Min: ${temp_min}°C`;
    humid_dis.innerHTML = `${humidity}% <br>Humidity`;
    temp_big.innerText = temp;
    pressure_dis.innerText = pressure;
    wind.innerText = speed;
    desc.innerText=`${description.toUpperCase()}`;
    main_dis.innerText=`${main}`;
    details_body_div.innerHTML = `<div style="font-size:3rem; font-weight: 500;font-family: Verdana, Geneva, Tahoma, sans-serif;"> ${name},${country} </div> <br><br>  <div id="det"> Latitude: ${lat}<br> Longitude: ${lon} <br> Current Temperature: ${temp}°C <br> Min Temperature: ${temp_min}°C <br> Max Temperature: ${temp_max}°C <br> Pressure: ${pressure} millibars <br> Humidity: ${humidity}% <br> Wind-speed: ${speed} metre/sec <br> Visibility: ${Number(visibility) / 1000} kilometre(s) <br> Wind-direction: ${deg} Degrees <br> Gust: ${gust} metre/sec <br> Cloudiness:${cloudiness}% `;
    st_img[0].src=st_img[1].src=`../images/${String(icon)}.png`;
    console.log(result);
    // console.log(st_img.src);
}
function setDefaults() {
    city = "Ponda";
    requestApi(city);
}