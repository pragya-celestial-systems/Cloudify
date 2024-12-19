import React from 'react';
import City from './City';
import './css/cities.css';

const cities = [
  { id: 1, name: 'Noida' },
  { id: 2, name: 'Delhi' },
  { id: 3, name: 'Agra' },
  { id: 4, name: 'Gurgaon' },
  { id: 5, name: 'Bareilly' },
  { id: 6, name: 'Rishikesh' },
  { id: 7, name: 'Jammu Kashmir' },
];

export default function Cities() {
  return (
    <div id='citiesContainer'>
      {cities.map((city) => (
        <City key={city.id} city={city} />
      ))}
    </div>
  );
}
