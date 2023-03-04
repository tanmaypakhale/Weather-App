import React, { useEffect, useState } from 'react'
import './style.css'
import Weathercard from './weathercard';
const Temp = () => {
  const [searchValue,setSearchValue] = useState("delhi");
  const [tempInfo, setTempInfo] = useState("");
   const getWeatherInfo = async () => {
      try {
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=522154760aada0d2c0ffc18cd5441a56`;
        let res = await fetch(url);
        let data = await res.json();

         const {temp,pressure,humidity} = data.main;
         const {main: weathermood} = data.weather[0];
         const {name} = data;
         const {speed} = data.wind;
         const { country, sunset} = data.sys;
         
         const myNewWeatherInfo = {
          temp,
          humidity,
          pressure,
          weathermood,
          name,
          speed,
          country,
          sunset,
         };
         setTempInfo(myNewWeatherInfo);
      } catch(error){
        console.log(error);
      }

   };

   useEffect(() => {
    getWeatherInfo();
   });

  return (
    <>
    <div className='warp'>
      <div className='search'>
        <input type='search' placeholder='search...' autoFocus id='search' className='searchTerm'
               value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
        </div>      
    </div>

    <Weathercard tempInfo={tempInfo}/>
    </>
  )
}

export default Temp
