import { Box, Typography } from '@mui/material';
import React from 'react';

interface CityProps {
  city: {
    id: number;
    name: string;
  };
}

export default function City({ city }: CityProps) {
  return (
    <Box sx={{ padding: 1, border: '1px solid #ccc', borderRadius: 2, textAlign: 'center', minWidth: 100 }}>
      <Typography variant="h6">{city.name}</Typography>
    </Box>
  );
}
