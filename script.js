const key = "5f8a9b1ab06faba20a1b63206e1f3651";

const hora = document.querySelector(".hour");
const weather = document.querySelector(".weather");
const search = document.querySelector("button");
const cityName = document.getElementById("city");
const temp = document.getElementById("temp");
const imgTemp = document.querySelector("#temp");
const grau = document.getElementById("grau");

// Atualiza a hora a cada segundo
setInterval(() => {
  hora.textContent = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}, 1000);

// Função para buscar os dados da API
function getdata(city) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${key}`)
    .then(response => response.json());
}

// Função para verificar a temperatura e alterar o fundo
function verifyTemp(grau) {
  if (grau <= 5) {
    document.body.style.backgroundImage = "url('assets/muitofrio.jpg')";
    hora.classList.add("muitofrio");
    weather.classList.add("muitofrio");
  }
  else if (grau <= 14) {
    document.body.style.backgroundImage = "url('assets/frio.jpg')";
    hora.classList.add("frio");
    weather.classList.add("frio");
  } 
  else if (grau <= 22) {
    document.body.style.backgroundImage = "url('assets/ameno.jpg')";
    hora.classList.add("ameno");
    weather.classList.add("ameno");
  }
  else if (grau <= 30) {
    document.body.style.backgroundImage = "url('assets/calor.jpg')";
    hora.classList.add("calor");
    weather.classList.add("calor");
  }
  else {
    document.body.style.backgroundImage = "url('assets/muitocalor.jpg')";
    hora.classList.add("muitocalor");
    weather.classList.add("muitocalor");
  }
}

// Quando clicar no botão...
search.addEventListener("click", () => {

  // Remove todas as classes de temperatura
  hora.classList.remove("muitofrio", "frio", "ameno", "calor", "muitocalor");
  weather.classList.remove("muitofrio", "frio", "ameno", "calor", "muitocalor");

  // Pega o valor digitado no input
  const city = document.querySelector("input").value;

    // 🚨 Verifica se o campo está vazio
  if (city === "") {
    alert("Por favor, digite o nome de uma cidade.");
    return;
  }

    // Chama a função que busca os dados da API
    getdata(city).then(data => {
      console.log(data);

      if (data.cod === "404") {
      cityName.textContent = "Cidade não encontrada ❌";
      temp.textContent = "";
      grau.textContent = ""; // opcional, pode ser uma imagem de erro
      return;
    }
      city.value = "";
      // Atualiza o conteúdo dos elementos na página
      cityName.textContent = data.name + " " + data.sys.country;
      temp.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icone do clima"> ${data.weather[0].description}`;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      imgTemp.src = iconUrl;
      grau.textContent = "Temperatura: " + data.main.temp + "°";
    
      // Verifica a temperatura e altera o fundo
      verifyTemp(data.main.temp);

    });
});



