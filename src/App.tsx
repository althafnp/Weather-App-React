import axios from "axios";
import React, { useEffect, useState } from "react";


interface WeatherData {
  name: string;
  weather: {description: string} [];
  main: {
    temp: number;
    humidity: number
  };
  wind: {
    speed: number
  }
}


function App() {

  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const key: string = import.meta.env.VITE_API_KEY;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setError(null)
  }

  async function fetchWeather() {
    if(city !== '') {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
        setWeatherData(response.data)
        setError(null);
      } catch (error) {
        setError('City not found, Try again!')
        setWeatherData(null);
      }
    }else {
      setError("Input can't be empty!")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-gray-800">
      <div className="p-8 rounded-lg shadow-xl bg-gray-600 w-96">
        <h1 className="text-4xl font-semibold text-center mb-6 text-yellow-500">Weather App</h1>

        <div className="mb-4">
          <input type="text" value={city} onChange={handleChange} className="w-full p-3 rounded-lg text-white outline-2 outline-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800" />
        </div>
        <button onClick={fetchWeather} className="w-full p-3 transition delay-75 ease-in-out bg-gray-800 hover:bg-yellow-500 text-white font-semibold hover:text-gray-800 rounded-lg focus:outline-none cursor-pointer">Get Weather</button>

        {error && <p className="mt-4 text-center">⚠️{error}</p>}

        {weatherData && (
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold">{weatherData.name}</h3>
            <p className="text-lg">Description: {weatherData.weather[0].description}</p>
            <p className="text-xl mt-2">Temperature: <span className="font-semibold">{weatherData.main.temp}℃</span></p>
            <p className="text lg mt-2">Humidity: <span className="font-semibold">{weatherData.main.humidity}%</span></p>
            <p className="text lg mt-2">Wind Speed: <span className="font-semibold">{weatherData.wind.speed} m/s</span></p>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default App
