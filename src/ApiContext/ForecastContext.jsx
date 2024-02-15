import { createContext,useContext, useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import errorLogs from "../Components/Utils/Constants";

//context
const ForecastContext=createContext();


//context Provider
 const ForecastProvider=(props)=> {
    
     //Fetching api key from the environment variable
    const apiKey = import.meta.env.VITE_API_KEY_WEATHERBIT;

    //States for Daily forecast array, Hourly forecast array and loading status
    const [forecastDaily,setForecastDaily]=useState([]);
    const [forecastHourly,setForecastHourly]=useState([]);
    const [loading,setLoading]=useState(true)


    //Function fetch daily forecast details from the API
    const getDailyForecast=async (latitude,longitude)=>{
        setLoading(true);
        const forecastArray = [];

        try{
             //Fetching Daily forecast details   
             const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&NC&key=${apiKey}`);
             
             //Throws Error when API response fails
             if (!response.ok) {
                throw new Error();
            }
            const parsedData = await response.json();

            const dayForecast = parsedData.data.slice(1,6);
            dayForecast.forEach(async element => {
            const {temp,valid_date} = element;
            const {icon} = element.weather;

            forecastArray.push({
                temp,
                valid_date,
                icon,

            })
            })

            setForecastDaily(forecastArray);
            setLoading(false)
        }
        catch(error){
            // Display error toast notification for a bad request
            toast.error(`${errorLogs['400']}`,{
            position:"top-right",
            autoCLose:3000,
            hiddenProgressBar:false,
            closeOnClick:true,
            pauesOnHover:true,
            draggable:true,
            progress:undefined
            })
        }

    }

    // Function to fetch hourly forecast details from the API
    const getHourlyForecast = async (latitude, longitude) =>{
         setLoading(true);
      try{
        //Fetching Hourly (5 Hours) forecast details 
        const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?&lat=${latitude}&lon=${longitude}&hours=5&NC&key=${apiKey}`);
        const responseData = await response.json();

        //Throws Error when API response fails
        if (!response.ok) {
            throw new Error();
        }

        const data = responseData.data;
        const forecastArray = data.reduce((accumulator, current) => {
            const {temp} = current;
            const time = new Date(current.timestamp_local).getHours()+":00";
            const {icon} = current.weather;
    
            accumulator.push({
                temp,
                time,
                icon
            });
    
            return accumulator;
        },[]);

        setForecastHourly(forecastArray);
        setLoading(false)
      }
      catch(error){
        // Display error toast notification for a bad request   
        toast.error(`${errorLogs['400']}`,{
        position:"top-right",
        autoCLose:3000,
        hiddenProgressBar:false,
        closeOnClick:true,
        pauesOnHover:true,
        draggable:true,
        progress:undefined
        })
    }

    }


    return (
        <ForecastContext.Provider value={{getDailyForecast,forecastDaily,getHourlyForecast,forecastHourly,loading,setLoading}}>
            {props.children}
        </ForecastContext.Provider>
  )
}


//custom hook 
 const useForecastContext=()=>{
    return useContext(ForecastContext)
}


export {ForecastProvider,useForecastContext}

