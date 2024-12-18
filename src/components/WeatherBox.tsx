import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/App';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Box, Typography } from '@mui/material';
import fetchData from './services';
import CompressIcon from '@mui/icons-material/Compress';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsIcon from '@mui/icons-material/Directions';
import AirIcon from '@mui/icons-material/Air';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';

const useStyles = makeStyles({
  container: {
    height: '65vh',
    width: '100%',
    backdropFilter: 'blur(3px)',
    background: '#ffffff26',
  },
  topContainer: {
    padding: '1rem',
    color: '#fff',
    textAlign: 'center',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  bottomContainer: {
    padding: '1rem',
    color: '#fff',
    textAlign: 'center',
    boxSizing: 'border-box',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  bottomBox: {
    display: 'flex',
    width: '100%',
  },
  box: {
    display: 'flex',
    width: '25%',
    maxHeight: '60px',
    minHeight: '50px',
    padding: '1rem',
    margin: '0.3rem 0.5rem',
    background: '#f5f5f536',
  },
});

export default function WeatherBox() {
  const classes = useStyles();
  const { data, setData } = useAppContext();
  const [city, setCity] = useState<string>('');

  useEffect(() => {
    setCurrentLocation();
  }, []);

  useEffect(() => {
    if (city) {
      setCurrentWeather();
    }
  }, [city]);

  async function setCurrentWeather() {
    try {
      const response = await fetchData(city);
      if (response?.status !== 200) {
        toast.error("Error fetching current location's data.");
        return;
      }
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const cityName = await getCityName(latitude, longitude);
          if (cityName) {
            setCity(cityName);
          } else {
            toast.error('Unable to fetch city');
          }
        },
        () => {
          toast.error('Geolocation access denied.');
        },
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      toast.error('Geolocation is not supported by this browser.');
    }
  }

  async function getCityName(latitude: number, longitude: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      const address = data.address;
      return (
        address.city ||
        address.town ||
        address.village ||
        address.state ||
        'Unknown'
      );
    } catch (error) {
      console.error(error);
      toast.error('Error fetching city name.');
      return null;
    }
  }

  return (
    <>
      <Box
        className={classes.container}
      >
        <Box className={classes.topContainer}>
          {data ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h3">{data.city}</Typography>
                <Typography variant="h6">{data.country}</Typography>
                <Typography variant="h5" sx={{ color: '#A7DEFA' }}>{data.localtime}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h1">{data.temperature}℃</Typography>
                <Typography variant="h5">{data.weather_description}</Typography>
              </Box>
            </>
          ) : (
            <Typography variant="h6">Loading data...</Typography>
          )}
        </Box>
        <Box className={classes.bottomContainer}>
          <div className={classes.bottomBox}>
            <div className={classes.box}>
              <div>
                <CompressIcon />
              </div>
              <div><b>Pressure:</b> {data.pressure}</div>
            </div>
            <div className={classes.box}>
              <div>
                <VisibilityIcon />
              </div>
              <div><b>Visibility:</b> {data.visibility}</div>
            </div>
            <div className={classes.box}>
              <div>
                <AccessTimeIcon />
              </div>
              <div><b>Time Zone:</b> {data.timezone}</div>
            </div>
            <div className={classes.box}>
              <div>
                <DirectionsIcon />
              </div>
              <div><b>Wind Dir:</b> {data.wind_dir}</div>
            </div>
          </div>
          <div className={classes.bottomBox}>
            <div className={classes.box}>
              <div>
                <AirIcon />
              </div>
              <div><b>Wind Speed:</b> {data.wind_speed}km/hour</div>
            </div>
            <div className={classes.box}>
              <div>
                <LightModeIcon />
              </div>
              <div><b>Day:</b> {data.is_day}</div>
            </div>
            <div className={classes.box}>
              <div>
                <SentimentSatisfiedIcon />
              </div>
              <div><b>Feels Like:</b> {data.feelslike}&deg;C</div>
            </div>
            <div className={classes.box}>
              <div>
                <WaterDropIcon />
              </div>
              <div><b>Humidity:</b> {data.humidity}&deg;</div>
            </div>
          </div>
        </Box>
      </Box>
      <ToastContainer closeOnClick={true} />
    </>
  );
}
