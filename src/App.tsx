import React, { useEffect, useState } from 'react';

function App() {
  const [coords, setCoords] = useState<object>({
    longitude : '',
    latitude: ''
  });

  useEffect(() => {
    setLocation();
  }, [])

  useEffect(() => {

  }, [coords])

  function setLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        setCoords({longitude : position.coords.longitude, latitude: position.coords.latitude});
      });
    }
  
    console.error("Geolocation is not supported by your browser.");
  }

  return (
   <h1>Hello World</h1>
  );
}

export default App;