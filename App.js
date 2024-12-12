import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

//step 1 : ui first
// step 2:intigration part

function App() {
  const [city,setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null)
  const currentDate = new Date();
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day} ,${year}`

  const API_key = "bcda10ba323e88e96cb486015a104d1d";
  const fetchWeatherData = async() => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
        );

        const data = await response.json();
        console.log(data)
        setWeatherData(data)

    } catch (error) {
      
        console.log(error)

    }
  }

  useEffect(() =>{
    fetchWeatherData();
  },[])

  const handleInputhange = (event) =>{
    console.log(event.target.value);
    setCity(event.target.value);
  }

  const handleSubmit= (event) => {
    event.preventDefault();
    fetchWeatherData();
  }

  const getWeatherIconUrl = (main) => {
    switch(main){
      case "Clouds":
        return"/thunder.png";
      case "Rain" :
        return"/rain_with_cloud.png";
      case "Mist":
        return"/Tornado.png";
      case "Haze":
        return"/sun.png";
      default:
        return null;
    }
  };
  
return (
    <div className="App">
      <div className='container'>
        {weatherData && (

          <>
          <h1 className='container_date'>{formattedDate}</h1>   
        <div className='weather_data'>
          <h2 className='container_city'>{weatherData.name}</h2>
        
         <img 
          className='container_img'
           src={getWeatherIconUrl(weatherData.weather[0].main)}
           width="180px"
           alt='weather Icon'
           /> 

           
              <h2 className='container_degree'>{weatherData.main.temp}</h2>
              <h2 className='country_per'>{weatherData.weather[0].main}</h2>
                <form className='form' onSubmit={handleSubmit}>
                  <input type='text' className='input' placeholder='enter city name' onChange={handleInputhange}/>
                  <button type='submit '>Get</button>
                </form>
        </div>
          </>

        )}
        
      </div>
    </div>
  );
}

export default App;






