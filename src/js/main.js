"use strict";

const xhr = new XMLHttpRequest();
let x = document.getElementById("city");
let mt = document.getElementById("minT");
let maxt = document.getElementById("maxT");
let wnd = document.getElementById("wind");

document.addEventListener("DOMContentLoaded", Location);


function Location() {
    return new Promise((resolve, reject) => {
        resolve(navigator.geolocation.getCurrentPosition(getLocation));
        reject(x.innerHTML = "Geolocation is not supported by this browser.");
    });
}

    function getLocation(position) {

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        return new Promise((resolve, reject) => {
            xhr.open('POST', 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=a265d5194c56485f220f32efc4b0fefd&units=metric', true);
            xhr.onload = () => {
                if (xhr.status === 200){
                resolve(xhr.responseText);
                }};
            xhr.onerror = () => reject(xhr.error);
            xhr.send();
        })
            .then(() =>{

                let Weather = JSON.parse(xhr.responseText);
                let pic = document.getElementById("city");
                let img = document.createElement("img");

                x.innerHTML = 'Город: '+ Weather.name;
                img.src = 'https://openweathermap.org/img/wn/'+ Weather.weather[0].icon +'.png';
                pic.append(img);
                pic.classList.add('logo');
                mt.innerHTML = 'Минимальная температура: '+ Weather.main.temp_min + " &#176;C";
                maxt.innerHTML = 'Максимальная температура: '+ Weather.main.temp_max + " &#176;C";
                wnd.innerHTML = 'Ветер: '+ Weather.wind.speed +" м/с";

            })
            .catch((error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        x.innerHTML = "Пользователь отклонил запрос на геолокацию.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        x.innerHTML = "Информация о местоположении недоступна.";
                        break;
                    case error.TIMEOUT:
                        x.innerHTML = "Время, на получение местоположения пользователя, истекло.";
                        break;
                    default:
                        break;
                }
            });
    }