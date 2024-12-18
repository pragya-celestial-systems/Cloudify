import React from 'react';
import { useAppContext } from './context/App';
import { makeStyles } from '@mui/styles';
import WeatherBox from './components/WeatherBox';
import Header from './components/Header';
import Cities from './components/Cities';

const useStyles = makeStyles({
  content: {
    height: '100svh',
    width: '100svw',
  },
  container: {
    width: '90vw',
    margin: 'auto',
  },
  boxContainer: {
    display: 'flex',
    height: '85vh',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  leftBox: {
    width: '50%',
    height: '100%',
    backdropFilter: 'blur(6px)',
    background: '#4747475',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightBox: {
    width: '30%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function App() {
  const classes = useStyles();
  const { data } = useAppContext();
  const dayWeather =
    'https://cdn.pixabay.com/photo/2023/06/03/11/46/sky-8037515_1280.jpg';
  const nightWeather =
    'https://c1.wallpaperflare.com/preview/748/977/304/storm-sky-cloudy-weather.jpg';

  const backgroundImage = data?.is_day === 'yes' ? dayWeather : nightWeather;

  return (
    <div className={classes.content} style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}>
      <main className={classes.container}>
        <Header />
        <div className={classes.boxContainer}>
          <div className={classes.leftBox}>
            <WeatherBox />
          </div>
          <div className={classes.rightBox}>
            <Cities />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
