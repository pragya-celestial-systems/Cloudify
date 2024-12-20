import React from 'react';
import { Typography } from '@mui/material';
import './css/city.css';
import fetchData from './services';
import { useAppContext } from '../context/App';

interface CityProps {
  city: {
    id: number;
    name: string;
  };
}

export default function City({ city }: CityProps) {
  const { setData } = useAppContext();

  function handleDisplayData(e: React.MouseEvent<HTMLDivElement>) {
    const cityName = (e.target as HTMLElement).closest(
      '.city-name',
    )?.textContent;

    if (cityName) {
      fetchData(cityName).then((res) => {
        if (res && res.data) {
          setData(res.data);
        }
      });
    }
  }

  return (
    <div className="city-name-container" onClick={handleDisplayData}>
      <Typography variant="h6" className="city-name">
        {city.name}
      </Typography>
    </div>
  );
}
