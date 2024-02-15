import React from 'react'
import './Styles/Card.css'

export default function Card({day,temp,image}) {


  return (
    <div className='card bg-inherit'>
        <span className='bg-inherit'>{day}</span>
        <span className='bg-inherit'>
          <img className='images' src={`https://www.weatherbit.io/static/img/icons/${image}.png`} alt="image.." />
        </span>
        <span className='bg-inherit'>{temp}</span>
    </div>
  )
}
