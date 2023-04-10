import React, { useState } from 'react'
const WeatherCart = ({ weather, temperature }) => {
  const [isCelsius, setIsCelsius] = useState(true)
  const handleChangeTemperature = () => setIsCelsius(!isCelsius)
  return (
    <article className='Container'>
      <h1>Wheather App</h1>
      <h2>{weather?.name}, {weather?.sys.country}</h2>
      <section className='header'>
        <header className='img'>
          <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
        </header>
        <article className='article'>
          <h3 className='h3'>"{weather?.weather[0].description}"</h3>
          <ul className='ul'>
            <li><span>Wind Speed</span> <b>{weather?.wind.speed} m/s</b></li>
            <li><span>Clouds</span> <b>{weather?.clouds.all} %</b></li>
            <li><span>Pressure</span> <b>{weather?.main.pressure} hPa</b></li>
          </ul>
        </article>
      </section>
      <footer className='footer'>
        <h2>
          {
            isCelsius
              ? ` ${temperature?.celsius} °C`
              : `${temperature?.farenheit} °F`
          }
        </h2>
        <button className='boton' onClick={handleChangeTemperature}><span > Change to {isCelsius ? '°F' : '°C'}</span></button>
      </footer>
    </article>
  )
}

export default WeatherCart