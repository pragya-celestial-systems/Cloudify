import React from 'react';
import { useAppContext } from './context/App';
import WeatherBox from './components/WeatherBox';
import Header from './components/Header';
import Cities from './components/Cities';
import './app.css';

function App() {
  const { data } = useAppContext();
  const dayWeather =
    'https://cdn.pixabay.com/photo/2023/06/03/11/46/sky-8037515_1280.jpg';
  const nightWeather =
    'https://c1.wallpaperflare.com/preview/748/977/304/storm-sky-cloudy-weather.jpg';

  const backgroundImage = data?.is_day === 'yes' ? dayWeather : nightWeather;

  return (
    <div id='content' style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}>
      <main id='appContainer'>
        <Header />
        <div id='appBoxContainer'>
          <div id='appLeftBox'>
            <WeatherBox />
          </div>
          <div id='appRightBox'>
            <Cities />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
