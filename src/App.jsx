import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCart from './assets/components/WeatherCart'
import PantallaCarga from './assets/components/Loading'
function App() {
  const [latlon, setlatlon] = useState()
  const [weather, setweather] = useState()
  const [temperature, setTemperature] = useState()
  useEffect(() => {
    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setlatlon(obj)
    }
    const error = err => {
      console.log(err);
    }
    navigator.geolocation.getCurrentPosition(success, error)
  }, [])
  useEffect(() => {
    if (latlon) {
      const keyApi = '6e32393849b8cf1f6608b0c4d64df437';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${keyApi}`
      axios.get(url)
        .then(res => {
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const farenheit = (celsius * 9 / 5 + 32).toFixed(1)
          setTemperature({ celsius, farenheit })
          setweather(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [latlon])
  // aqui
    const [indice, setIndice] = useState(1);
    const imagenes = ["imagen1.jpg", "imagen2.jpg", "imagen3.jpg", "imagen4.jpg", "imagen5.jpg"];
    const tiempo = 5000;
    useEffect(() => {
      const intervalo = setInterval(() => {
        let nuevoIndice = indice + 1;
        if (nuevoIndice >= imagenes.length) {
          nuevoIndice = 0;
        }
        setIndice(nuevoIndice);
      }, tiempo);
      return () => clearInterval(intervalo);
    }, [indice]);
  // aqui
  const appStyle = {
    backgroundImage: `url('/fondo/${imagenes[indice]}')`,
  }
  return (
    <div  style={appStyle} className="App">
      {
        weather
          ? <WeatherCart
            weather={weather}
            temperature={temperature}
          />
          :
          <PantallaCarga/>
      }
    </div>
  )
}

export default App
