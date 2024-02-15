import React,{useState,useEffect} from 'react'
import './Styles/Header.css'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { useGetCityContext } from '../ApiContext/GetCityContext'

export default function Header({getLocation}) {

  //States to manage input value, current date and current time
  const [inputvalue, setInputvalue] = useState('')
  const [currentDate,setCurrentDate]=useState()
  const [currentTime,setCurrentTime]=useState()


  //Getting get city function from the context
  const {getCityLocation}=useGetCityContext();

  //Function to set current date and current time
  const getDateAndTime=()=>{
    let dateString =new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = dateString.toLocaleDateString('en-US', options);
    setCurrentDate(formattedDate);
    let time=dateString.toLocaleTimeString()
    setCurrentTime(time);
  }


  //Function to getting the location of the searched city
  const handleCity=(e)=>{
    getCityLocation(e.target.innerHTML);
  }

  //Function to handle input change
  const handleInput=(e)=>{
      setInputvalue(e.target.value)
    }


  //Funcion  to search the city enetered by the user  
  const searchCity=()=>{
      getCityLocation(inputvalue);
      let inputBox=document.getElementById('searchField')
      inputBox.value='';
  }


//Fetchinig current date and time  
useEffect(()=>{
  getDateAndTime();
},[])

  return (
    <>
      <div className="search-area bg-inherit">
        <div className="city bg-inherit">
          <ul className="city-list  bg-inherit">
            <li onClick={handleCity} className="bg-inherit">Mumbai</li>
            <li onClick={handleCity} className="bg-inherit">Tokyo</li>
            <li onClick={handleCity} className="bg-inherit">Chennai</li>
            <li onClick={handleCity} className="bg-inherit">London</li>
          </ul>
        </div>
        <div className="input-area  bg-inherit">
          <span className="bg-inherit">
            <input
              type="text"
              name="cityname"
              id="searchField"
              placeholder="Search....."
              onChange={handleInput}
            />
            <span className="bg-inherit">
              <FaMagnifyingGlass onClick={searchCity} className="mx-2 icon bg-inherit " />
              <IoLocationOutline onClick={getLocation} className="icon bg-inherit" />
            </span>
          </span>
         </div>
        <p className="date-time bg-inherit">
          {currentDate}  | Local Time {currentTime}
        </p>
      </div>
    </>
  );
}
