import React  from "react";
import "./Styles/Details.css";
import { FaThermometerEmpty } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FaWind } from "react-icons/fa6";
import { TbTemperatureCelsius } from "react-icons/tb";
import { useGetCityContext } from '../ApiContext/GetCityContext'
import { useGetWeatherContext } from "../ApiContext/GetWeatherContext";

export default function Details() {

  //Getting city and country from city context
  const {city,country}=useGetCityContext();

  //Getting weather related data from weather context
  const {temp,felt,humidity,speed,sun,status}=useGetWeatherContext();



  return (
    <div className="bg-inherit ">
      <div className="location">{city},{country}</div>
      <div className="weather-status  bg-inherit">{status}</div>

      <div className="details bg-inherit ">
        
        <div className="sun box bg-inherit "><img id='sun' src={sun} alt="" /></div>

        <div className="degree bg-inherit ">
          {temp} 
          <TbTemperatureCelsius className="icon" style={{background:"none",fontSize:"1.75rem",marginBottom:"5px"}}/>
        </div>

        <div className="info box bg-inherit">
          <ul className="bg-inherit" style={{ listStyleType: "none" }}>
            <li className="bg-inherit">
              <FaThermometerEmpty
                className="bg-inherit"
                style={{ fontSize: "1rem" }}
              />{" "}
              Real Felt : {felt}
            </li>
            <li className="bg-inherit">
              <FaDroplet className="mx-2 bg-inherit" />
               Humidity : {humidity} %
            </li>
            <li className="bg-inherit">
              <FaWind className="mx-1 bg-inherit" />
              Wind:{speed}km/hr
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
