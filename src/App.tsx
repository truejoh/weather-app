import React, { ReactElement, useEffect, useState } from 'react';

import { Container } from './styles';

import './App.css';

import { getColorByTemp, getWeatherIconUrl } from './utils/helper';
import { getLocations, getWeather } from './api/apis';

// eslint-disable
type WeatherType = {
  id: number;
  applicable_date: Date;
  weather_state_name: string;
  weather_state_abbr: string;
  wind_speed: number;
  wind_direction: number;
  wind_direction_compass: string;
  min_temp: number;
  max_temp: number;
  the_temp: number;
};

function App(): ReactElement {
  const [weather, setWeather] = useState<WeatherType>();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position): Promise<void> => {
        try {
          const { latitude, longitude } = position.coords;
          const locations = await getLocations(latitude, longitude);

          const { woeid } = locations.data[0];

          const weatherResponse = await getWeather(woeid);

          console.log('res: ', weatherResponse);
          const currentWeather = weatherResponse.data.consolidated_weather[0];
          setWeather(currentWeather);
        } catch (e) {
          console.log('e: ', e);
        }
      },
      (): void => {
        alert('deny');
      },
    );
  }, []);

  return (
    <Container bgColor={getColorByTemp(weather?.the_temp)}>
      <p>{weather?.the_temp}</p>
      <img
        src={getWeatherIconUrl(weather?.weather_state_abbr)}
        alt="weather-icon"
      />
    </Container>
  );
}

export default App;
