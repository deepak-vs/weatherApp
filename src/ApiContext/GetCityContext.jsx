import { createContext,useContext, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import errorLogs from "../Components/Utils/Constants";

//context
const GetCityContext=createContext();


//context Provider
 const CityProvider=(props)=> {
    
    //fetching api key 
    const apiKey = import.meta.env.VITE_API_KEY;
    
    //States for city, country, latitude, longitude
    const [city,setCity]=useState();
    const [country,setCountry]=useState();
    const [latitude,setLatitude]=useState(0);
    const [longitude,setLongitude]=useState(0);

    
    //Function to fetch city details{cityname, country name, latitude, longitude} from city name 
    const getCityLocation=async(cityName="Delhi")=>{


        const url=`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`

        try{
            const response=await fetch(url);
            const data=await response.json();
            
            // Check if the city was found or if there was an error in the response
            if(data.length===0 || !response.ok){
                throw new Error("City not Found !");
            }

            // Set state values based on fetched data
            setCity(cityName);
            setCountry(data[0].country);
            setLatitude(data[0].lat);
            setLongitude(data[0].lon);
        
       }
       catch(error){
        // Display error toast notification if the city is not found
        toast.error(`${errorLogs['404']}`,{
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
        <GetCityContext.Provider value={{getCityLocation,city,setCity,country,setCountry,latitude,longitude,setLatitude,setLongitude}}>
            {props.children}
        </GetCityContext.Provider>
  )
}


//custom hook 
 const useGetCityContext=()=>{
    return useContext(GetCityContext)
}


export {CityProvider,useGetCityContext}

