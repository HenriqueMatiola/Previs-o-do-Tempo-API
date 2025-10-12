const key = "5f8a9b1ab06faba20a1b63206e1f3651";

const search = document.querySelector("button");
const cityName = document.getElementById("city");
const temp = document.getElementById("temp");
const imgTemp = document.querySelector("#temp img");

function getdata(city) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${key}`)
    .then(response => response.json());
}

search.addEventListener("click", () => {
  const city = document.querySelector("input").value;
  getdata(city).then(data => {
      console.log(data);

      cityName.textContent = data.name + " " + data.sys.country;
      temp.textContent = data.weather[0].description + " " + data.weather[0].icon;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      imgTemp.src = iconUrl;

  });
});



