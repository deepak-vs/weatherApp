import React, { useEffect } from 'react'
import './Styles/Home.css'
import Header from './Header'
import Details from './Details'
import Hours from './Hours'
import Days from './Days'
import { useGetCityContext } from '../ApiContext/GetCityContext'
import { useGetWeatherContext } from "../ApiContext/GetWeatherContext";


export default function Home() {

  //Getting city related data
  const {longitude,latitude,setLatitude,setLongitude,setCity,setCountry}=useGetCityContext();

  //Getting a function to fetch current weather Details 
  const {getCurrentWeather}=useGetWeatherContext();


  //Fetching current weather data using lattitude and longitude
  const getWeatherData=async(latitude,longitude)=>{
     await getCurrentWeather(latitude,longitude);
  }


  //Getting user's location using Geolocation API
  const getLocation=()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        setCity("Noida");
        setCountry("IN");
      });
    }
  }


  //Getting user's location  on the initial rendering of the Home component
  useEffect(()=>{
    getLocation();
},[])


//Getting weather data whenever lattitude and longitude changes
  useEffect(()=>{
    getWeatherData(latitude,longitude);
  },[latitude,longitude])

 
  return (
    <>
    <div className='home'>
           <Header getLocation={getLocation}/>
           <Details/>
           <p className='hour mx-5 bg-inherit'>HOURLY FORECAST</p>
           <Hours/>
           <p className='hour mx-5 bg-inherit'>DAILY FORECAST</p>
           <Days/>
    </div>
    </>
  )
}
