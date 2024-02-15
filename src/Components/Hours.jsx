import React, { useEffect,useState } from 'react'
import './Styles/Hours.css'
import Card from './Card'
import { useForecastContext } from '../ApiContext/ForecastContext'

export default function Hours() {

  //Getting hourly forecast array from the Forecast context
  const {forecastHourly,loading}=useForecastContext();
  
  // Display loader if data is still loading
  if (loading) {
    return <span className="loader"></span>;
  }

    return (
      <div className='hours-box bg-inherit'>
        {forecastHourly.map((item)=>{
            return <Card key={item.time}  day={item.time} temp={item.temp} image={item.icon} />
          }
          )}
      </div>
    )
  
}
