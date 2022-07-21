import React, {useState} from 'react'
import axios from 'axios'

function App() {

  // const url = `https://api.openweathermap.org/data/2.5/weather?q=vancouver&appid=d1071bb1135354df20150f668ce62347`

  return (
    <div className="app">
      <div className="container">
        <div className="top">
          <div className="location">
            <p>Vancouver</p>
          </div>
          <div className="temp">
            <h1>25°C</h1>
          </div>
          <div className="description">
            <p>Clouds</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">30°C</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">56%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">5 KM/H</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
