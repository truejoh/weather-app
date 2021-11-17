import React, { ReactElement, useEffect, useState } from 'react';
import Slider, { Handle, SliderTooltip } from 'rc-slider';

import { Container, WeatherContainer } from './styles';

import './App.css';
import 'rc-slider/assets/index.css';

import { getColorByTemp, getWeatherIconUrl } from './utils/helper';
import { getLocations, getWeather } from './api/apis';

// eslint-disable
type WeatherType = {
  id?: number;
  applicable_date?: Date;
  weather_state_name?: string;
  weather_state_abbr?: string;
  wind_speed?: number;
  wind_direction?: number;
  wind_direction_compass?: string;
  min_temp?: number;
  max_temp?: number;
  the_temp?: number;
};

interface ISliderHandleProps {
  className: string;
  prefixCls?: string;
  vertical?: boolean;
  offset: number;
  value: number;
  dragging?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  reverse?: boolean;
  index: number;
  tabIndex?: number;
  ariaLabel: string;
  ariaLabelledBy: string;
  ariaValueTextFormatter: string;
  style?: React.CSSProperties;
  ref?: React.Ref<any>;
}

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

  const handle = (props: ISliderHandleProps): ReactElement => {
    const { value, dragging, index, ariaValueTextFormatter, ...restProps } =
      props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} C`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };

  const handleChange = (value: number): void => {
    setWeather({ ...weather, the_temp: value });
  };

  return (
    <Container bgColor={getColorByTemp(weather?.the_temp)}>
      <WeatherContainer>
        <img
          src={getWeatherIconUrl(weather?.weather_state_abbr)}
          alt="weather-icon"
        />
        <br />
        <p>{weather?.the_temp}</p>
      </WeatherContainer>
      <Slider
        className="slider"
        min={-50}
        max={50}
        handle={handle}
        onChange={handleChange}
      />
    </Container>
  );
}

export default App;
