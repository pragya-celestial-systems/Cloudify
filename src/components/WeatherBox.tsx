import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/App';
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
import './css/weather.box.css';

export default function WeatherBox() {
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
      <Box id="container">
        <Box id="topContainer">
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
                <Typography variant="h5" sx={{ color: '#A7DEFA' }}>
                  {data.localtime}
                </Typography>
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
        <Box id="bottomContainer">
          <div className="bottomBox">
            <div className="box">
              <div>
                <CompressIcon className="icon" />
              </div>
              <div>
                <b>Pressure:</b> {data.pressure}
              </div>
            </div>
            <div className="box">
              <div>
                <VisibilityIcon className="icon" />
              </div>
              <div>
                <b>Visibility:</b> {data.visibility}
              </div>
            </div>
            <div className="box">
              <div>
                <AccessTimeIcon className="icon" />
              </div>
              <div>
                <b>Time Zone:</b> {data.timezone}
              </div>
            </div>
            <div className="box">
              <div>
                <DirectionsIcon className="icon" />
              </div>
              <div>
                <b>Wind Dir:</b> {data.wind_dir}
              </div>
            </div>
          </div>
          <div className="bottomBox">
            <div className="box">
              <div>
                <AirIcon className="icon" />
              </div>
              <div>
                <b>Wind Speed:</b> {data.wind_speed}km/hour
              </div>
            </div>
            <div className="box">
              <div>
                <LightModeIcon className="icon" />
              </div>
              <div>
                <b>Day:</b> {data.is_day}
              </div>
            </div>
            <div className="box">
              <div>
                <SentimentSatisfiedIcon className="icon" />
              </div>
              <div>
                <b>Feels Like:</b> {data.feelslike}&deg;C
              </div>
            </div>
            <div className="box">
              <div>
                <WaterDropIcon className="icon" />
              </div>
              <div>
                <b>Humidity:</b> {data.humidity}&deg;
              </div>
            </div>
          </div>
        </Box>
      </Box>
      <ToastContainer closeOnClick={true} />
    </>
  );
}
