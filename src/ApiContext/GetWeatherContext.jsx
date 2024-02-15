import { createContext,useContext, useEffect, useState } from "react";
import { useForecastContext } from "./ForecastContext";


//context
const GetWeatherContext=createContext();


//context Provider
 const WeatherProvider=(props)=> {

    //Fetching api key from the environment variable
    const apiKey = import.meta.env.VITE_API_KEY;
    
    //Getting dailyforecast and hourlyforecast from the Forecast context
    const {getDailyForecast,getHourlyForecast}=useForecastContext();


    //States for setting temperature, felt_temperature, humidity, speed, sun, status(Condition)
    const [temp,setTemp]=useState();
    const [felt,setFelt]=useState();
    const [humidity,setHumidity]=useState();
    const [speed,setSpeed]=useState();
    const [sun,setSun]=useState();
    const [status,setStatus]=useState();


    //Function to fetch current weather details
    const getCurrentWeather=async (latitude,longitude)=>{
        
        //Fetching daily and hourly forecasts asynchronously
         getDailyForecast(latitude,longitude);
         getHourlyForecast(latitude,longitude);

        // API endpoint for current weather
        const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        // Fetch data from the API
        const response = await fetch(url);
        const data = await response.json();

        // Extract relevant data from the API
        const {main,icon} = data.weather[0];
        const {temp, feels_like,humidity} = data.main;
        const {speed} = data.wind;

        const imgUrl=`http://openweathermap.org/img/w/${icon}.png`
        const img=await fetch(imgUrl);
        const image=img.url;

        // Set state values with the extracted data
        setStatus(main);setHumidity(humidity);
        setSpeed(speed);setSun(image);
        let celsius=temp-273.15;
        setTemp(celsius.toFixed(2))
        let feltCelsius=feels_like-273.15;
        setFelt(feltCelsius.toFixed(2));

    }

 
    return (
        <GetWeatherContext.Provider value={{getCurrentWeather,temp,setTemp,felt,setFelt,humidity,speed,sun,status}}>
            {props.children}
        </GetWeatherContext.Provider>
  )
}


//custom hook 
 const useGetWeatherContext=()=>{
    return useContext(GetWeatherContext)
}


export {WeatherProvider,useGetWeatherContext}

