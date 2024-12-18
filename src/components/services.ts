import axios from 'axios';

export default async function fetchData(query: string) {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}?access_key=${process.env.REACT_APP_API_KEY}&query=${query}`,
    );

    if (data.error) {
      return { status: 404, message: 'Invalid city name' };
    }

    const { current, location } = data;
    const weatherData = {
      weather_icon: current.weather_icons[0],
      is_day: current.is_day,
      feelslike: current.feelslike,
      humidity: current.humidity,
      pressure: current.pressure,
      temperature: current.temperature,
      visibility: current.visibility,
      weather_descriptions: current.weather_descriptions,
      wind_dir: current.wind_dir,
      wind_speed: current.wind_speed,
      country: location.country,
      localtime: location.localtime,
      city: location.name,
      state: location.region,
    };

    return { status: 200, data: weatherData };
  } catch (error) {
    console.log(error);
  }
}
