import React, { useEffect } from 'react';
import { useAppContext } from '../context/App';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const useStyles = makeStyles({
  container: {
    height: '60vh',
    width: '100%',
    background: 'whitesmoke',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  topContainer: {},
  bottomContainer: {},
});

export default function WeatherBox() {
  const classes = useStyles();
  const { data } = useAppContext();
  const dayWeather = 'https://cdn.pixabay.com/photo/2023/06/03/11/46/sky-8037515_1280.jpg';
  const nightWeather = 'https://cdn.pixabay.com/photo/2023/06/03/11/46/sky-8037515_1280.jpg';

  useEffect(() => {
    setCurrentLocation();
  }, []);

  function setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const city = await getCityName(latitude, longitude);
        console.log(city);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  async function getCityName(latitude: number, longitude: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      const address = data.address;
      const city = address.city || address.town || address.village || address.state;
      return city;
    } catch (error) {
      console.error(error);
      toast.error('Error fetching data.');
    }
  }

  const backgroundImage = data?.is_day ? dayWeather : nightWeather;

  return (
    <>
      <div
        className={classes.container}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className={classes.topContainer}>
          <div></div>
          <div></div>
        </div>
        <div className={classes.bottomContainer}></div>
      </div>
      <ToastContainer closeOnClick={true} />
    </>
  );
}
