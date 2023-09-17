const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = '9f14b10fa8c9ab0615363f0e89802669';
const difKelvin = 273.15
const errorContainer = document.getElementById('errorContainer'); 
const datosClimaContainer = document.getElementById('datosClima');

document.getElementById('botonBusqueda').addEventListener('click', () => {
    const cityInput = document.getElementById('ciudadEntrada');
    const city = cityInput.value;
    const errorContainer = document.getElementById('errorContainer'); // Elemento para mostrar el mensaje de error
    
    if (city) {
        // Borra el mensaje de error si estaba presente
        datosClimaContainer.innerHTML = '';  // Línea agregada
        errorContainer.textContent = '';
        fetchDatosClima(city); // Realiza la solicitud a la API sin restricciones
    } else {
        // Muestra un mensaje de error si el campo de ciudad está vacío
        errorContainer.textContent = 'Por favor, ingresa una ciudad.';
    }
});

document.getElementById('botonBorrar').addEventListener('click', () => {
    const elementoABorrar = mostrarDatosClima();
    if (elementoABorrar) {
        elementoABorrar.remove();
    }
})


function fetchDatosClima(city) {
    fetch(`${urlBase}?q=${city}&appid=${api_key}`)
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Ciudad no encontrada');
        }
    })
    .then(data => {
        mostrarDatosClima(data);
        // Borra el mensaje de error si la búsqueda fue exitosa
        errorContainer.textContent = '';
    })
    .catch(error => {
        console.error("Error:", error);
        // Muestra un mensaje de error si la ciudad no se encontró
        errorContainer.textContent = 'Ciudad no encontrada o inválida.';
    });
}


function mostrarDatosClima(data) {
 console.log(data)
 const divDatosClima = document.getElementById('datosClima')
 divDatosClima.innerHTML=''

 const name = data.name
 const country = data.sys.country
 const temperature = data.main.temp
 const temperatureMax = data.main.temp_max
 const temperatureMin = data.main.temp_min
 const humidity = data.main.humidity
 const description = data.weather[0].description

  /// 

  const cityInfoContainer = document.createElement('div'); // Contenedor para la información de la ciudad
  cityInfoContainer.classList.add('city-info-container');

  const cityName = document.createElement('h2');
  cityName.textContent = `${name}, ${country}`;
  cityName.classList.add('cityName');

  ///
  const temperatureInfo = document.createElement('div');
  temperatureInfo.classList.add('temperature-info');

  const cityTemperature = document.createElement('p');
  cityTemperature.textContent = `${Math.round(temperature - difKelvin)}ºC`;
  cityTemperature.classList.add('Temperature');

  const cityTemperatureText = document.createElement('i'); // Elemento para el texto adicional
  cityTemperatureText.textContent = 'Temperatura Actual';
  cityTemperatureText.classList.add('TemperatureText'); // Clase para el texto adicional

  const cityTemperatureMax = document.createElement('p');
  cityTemperatureMax.textContent = `${Math.ceil(temperatureMax - difKelvin)}ºC`;
  cityTemperatureMax.classList.add('Temperature');

  const cityTemperatureMaxText = document.createElement('i'); // Elemento para el texto adicional
  cityTemperatureMaxText.textContent = 'Temperatura Máxima';
  cityTemperatureMaxText.classList.add('TemperatureText'); // Clase para el texto adicional

  const cityTemperatureMin = document.createElement('p');
  cityTemperatureMin.textContent = `${Math.floor(temperatureMin - difKelvin)}ºC`;
  cityTemperatureMin.classList.add('Temperature');

  const cityTemperatureMinText = document.createElement('i'); // Elemento para el texto adicional
  cityTemperatureMinText.textContent = 'Temperatura Mínima';
  cityTemperatureMinText.classList.add('TemperatureText'); // Clase para el texto adicional
  ///

  ///
  const cityDescription = document.createElement('p');
  cityDescription.textContent = `${description}`;
  cityDescription.classList.add('Description');
  ///

  ///
  const cityHumidity = document.createElement('p');
  cityHumidity.textContent = `La humedad es de: ${humidity}%`;
  cityHumidity.classList.add('Humidity');
  ///

  temperatureInfo.appendChild(cityTemperature);
  temperatureInfo.appendChild(cityTemperatureText); // Agregar el texto adicional
  temperatureInfo.appendChild(cityTemperatureMax);
  temperatureInfo.appendChild(cityTemperatureMaxText); // Agregar el texto adicional
  temperatureInfo.appendChild(cityTemperatureMin);
  temperatureInfo.appendChild(cityTemperatureMinText); // Agregar el texto adicional

  cityInfoContainer.appendChild(cityName);
  cityInfoContainer.appendChild(temperatureInfo);
  cityInfoContainer.appendChild(cityHumidity);
  cityInfoContainer.appendChild(cityDescription);

  divDatosClima.appendChild(cityInfoContainer); // Agregar el contenedor de información de la ciudad
}