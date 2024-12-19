import React from 'react';
import { Typography } from '@mui/material';
import './css/city.css';

interface CityProps {
  city: {
    id: number;
    name: string;
  };
}

export default function City({ city }: CityProps) {
  return (
    <div className='city-name'>
      <Typography variant="h6">{city.name}</Typography>
    </div>
  );
}
