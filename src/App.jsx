import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import 'bootstrap/dist/css/bootstrap.min.css'
import Loading from './components/Loading'
function App() {

  const [coords, setcoords] = useState()
  const [weather, setweather] = useState()
  const [temp, settemp] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const success = pos =>{
    const obj = {
      lat: pos.coords.latitude ,
      lon: pos.coords.longitude
    }
    setcoords(obj)
  }

  useEffect(() =>{
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(success)
  },[])

  useEffect(() =>{
   if (coords){
    const {lat, lon} = coords
    const API_KEY ='1cf5f185b491fac6610e8781b84850ee'
    const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    axios.get(url)
    .then(res => {
      const obj ={
        celsius: (res.data.main.temp - 273.15).toFixed(1),
        fahrenheit: ((res.data.main.temp -273.15)* 9 / 5 + 32).toFixed(1)
      }
      settemp(obj)
      setweather(res.data)})
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false))
   }
  },[coords])


  return (

    <div className='app'>
      {
      isLoading
      ?
       <Loading isLoading ={isLoading} /> 
      :(
        <WeatherCard weather ={weather} 
        temp ={temp} />
      )
      }
    </div>

  )

}

export default App
