import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import Sidebar from './components/Sidebar';

const baseUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [query, setQuery] = useState('Toshkent');
  const [weather, setWeather] = useState({});
  const [isError, setIsError] = useState(false);

  const bgStyle = {
    backgroundImage: `url(
      ${isError
        ? 'https://cdn.pixabay.com/photo/2021/02/03/20/06/hot-air-balloon-5979187_960_720.jpg'
        : (weather.weather[0].main  === 'Clouds'
        ? 'https://cdn.pixabay.com/photo/2021/09/13/10/05/hot-air-balloon-6620880_960_720.jpg'
        : 'https://cdn.pixabay.com/photo/2015/07/29/12/07/hot-air-balloon-865817_960_720.jpg' ) 
      }
    )`
  };

  useEffect(() => {
    async function fetchApi() {
      const response = await fetch(`${baseUrl}weather?q=${query}&units=metrics&APPID=${apiKey}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      
      const data = await response.json();
      setWeather(data);
    }
    
    fetchApi().then(() => setIsError(false)).catch(error => {
      setIsError(true);
      console.log(error.message);
    })
  }, [query]);

  return (
    <div className="app">
      <div className="wrapper" style={bgStyle}>
        <Banner isError={isError} weather={weather} />
        <Sidebar isError={isError} setQuery={setQuery} weather={weather} />
      </div>
    </div>
  );
}

export default App;
