const btn = document.getElementById("btn");
const villeInput = document.getElementById("ville");
const meteoBox = document.getElementById("meteo");

const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("windSpeed");
const pressureEl = document.getElementById("pressure");
const feelsLikeEl = document.getElementById("feelsLike");

const detailsEl = document.querySelector(".details");
const detailsEl2 = document.querySelector(".details_2");



const apiKey = "38ae77f3ed422e10059ac5429ee43ba9";

// صور كبيرة حسب الجو (emoji style)
const weatherEmojis = {
    Clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png", // شمس
    Clouds: "https://cdn-icons-png.flaticon.com/512/414/414825.png", // غيوم
    Rain: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png", // مطر
    Drizzle: "https://cdn-icons-png.flaticon.com/512/414/414854.png", // رذاذ
    Thunderstorm: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png", // رعد
    Snow: "https://cdn-icons-png.flaticon.com/512/642/642102.png", // ثلج
    Mist: "https://cdn-icons-png.flaticon.com/512/4005/4005909.png", // ضباب
    Haze: "https://cdn-icons-png.flaticon.com/512/4005/4005909.png",
    Fog: "https://cdn-icons-png.flaticon.com/512/4005/4005909.png",
    Smoke: "https://cdn-icons-png.flaticon.com/512/4005/4005909.png",
    Dust: "https://cdn-icons-png.flaticon.com/512/4005/4005909.png",
    Sand: "https://cdn-icons-png.flaticon.com/512/4005/4005909.png",
    Ash: "https://cdn-icons-png.flaticon.com/512/4005/4005909.png",
    Squall: "https://cdn-icons-png.flaticon.com/512/4005/4005909.png",
    Tornado: "https://cdn-icons-png.flaticon.com/512/1146/1146865.png"
};

btn.addEventListener("click", () => {

    detailsEl.style.display = "flex";
    detailsEl2.style.display = "flex";
    meteoBox.style.display="flex"
    const ville = villeInput.value.trim();
    if (!ville) {
        meteoBox.innerHTML = "<p>Veuillez entrer une ville.</p>";
        detailsEl.style.display = "none";
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ville)}&appid=${apiKey}&units=metric&lang=fr`)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                meteoBox.innerHTML = "<p>Ville introuvable.</p>";
                detailsEl.style.display = "none";
                return;
            }

            const mainWeather = data.weather[0].main; // Clear, Clouds, Rain...
            const temp = Math.round(data.main.temp);
            const imgSrc = weatherEmojis[mainWeather] || "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // شمس افتراضية

            // عرض الطقس مع الصورة الكبيرة
            meteoBox.innerHTML = `
                <h2>${data.name} (${data.sys.country}) </h2>
                <div class="image_temp">
                    <img src="${imgSrc}" alt="Weather Emoji" class="weather-img">
                    <p> ${Math.round(data.main.temp)}°C</p>
                </div>
               
            `;

            // التفاصيل
            humidityEl.textContent = `${data.main.humidity}%`;
            windSpeedEl.textContent = `${data.wind.speed} km/h`;
            pressureEl.textContent = `${data.main.pressure} hPa`;
            feelsLikeEl.textContent = `${Math.round(data.main.feels_like)}°C`;

            detailsEl.style.display = "flex";
        })
        .catch(() => {
            meteoBox.innerHTML = "<p>Erreur de connexion.</p>";
            detailsEl.style.display = "none";
        });
});