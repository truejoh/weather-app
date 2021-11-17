import React, { ReactElement, useEffect, useState } from 'react';
import Slider, { Handle, SliderTooltip } from 'rc-slider';
import PuffLoader from 'react-spinners/PuffLoader';

import { Container, WeatherContainer, Error } from './styles';

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

const App: React.FC = function () {
  const [weather, setWeather] = useState<WeatherType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position): Promise<void> => {
        try {
          setLoading(true);
          const { latitude, longitude } = position.coords;
          const locations = await getLocations(latitude, longitude);

          const { woeid } = locations.data[0];

          const weatherResponse = await getWeather(woeid);

          console.log('res: ', weatherResponse);
          const currentWeather = weatherResponse.data.consolidated_weather[0];
          setWeather(currentWeather);
          setLoading(false);
        } catch (e) {
          setError('Something went wrong in API call!');
        }
      },
      (): void => {
        setError('Location denied!');
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

  if (error) {
    return (
      <Container>
        <Error>{error}</Error>
      </Container>
    );
  }

  if (weather) {
    return (
      <Container bgColor={getColorByTemp(weather?.the_temp)}>
        <WeatherContainer>
          <img
            width="100"
            height="100"
            src={getWeatherIconUrl(weather?.weather_state_abbr)}
            alt="weather-icon"
          />

          <p>{Math.round(weather.the_temp || 0)}&nbsp;&#8451;</p>
        </WeatherContainer>
        <Slider
          className="slider"
          min={-50}
          max={50}
          value={Math.round(weather.the_temp || 0)}
          handle={handle}
          onChange={handleChange}
        />
      </Container>
    );
  }

  return (
    <Container>
      <PuffLoader color="#36D7B7" loading={loading} size={60} />
    </Container>
  );
};

export default App;
