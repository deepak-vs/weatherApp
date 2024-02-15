import React from 'react'
import './Styles/Hours.css'
import Card from './Card'
import { useForecastContext } from '../ApiContext/ForecastContext'

export default function Days() {

  //Getting Daily forecast array from the Forecast context
  let {forecastDaily,loading}=useForecastContext();

  //Array to store Days name
  const daysName=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  //function to get days name from the date 
  const getDayName=(date)=>{
    const day=new Date(date).getDay();
      return daysName[day]; 
  }

  // Display loader if data is still loading
  if ( loading) {
   return <div></div>
  }

  return (
    <>
    <div className='hours-box bg-inherit'>
        {forecastDaily.map((item)=>{
          return <Card key={item.valid_date}  day={getDayName(item.valid_date)} temp={item.temp} image={item.icon} />
        }
        )}
    </div>
    </>
  )
}
