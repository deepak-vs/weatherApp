
import './App.css'
import Home from './Components/Home'
import { CityProvider } from './ApiContext/GetCityContext'
import { WeatherProvider } from './ApiContext/GetWeatherContext'
import { ForecastProvider } from './ApiContext/ForecastContext' 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <ForecastProvider>
      <WeatherProvider>
        <CityProvider>
            <ToastContainer/>
            // Git comment 
            // sdkjbvkjsn jkfsndsvndsJnvjlds
            <Home/>
        </CityProvider>
      </WeatherProvider>
    </ForecastProvider>
    </>
  )
}

export default App;
