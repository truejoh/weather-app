import chroma from 'chroma-js';

export const getWeatherIconUrl = (weatherState: string | undefined): string =>
  `https://www.metaweather.com/static/img/weather/${weatherState}.svg`;

export const getColorByTemp = (temp: number | undefined): string => {
  if (!temp) return '#ffffff';
  const coldScale = chroma.scale(['#00ffff', '#fff700']).domain([-10, 10]);
  const warmScale = chroma.scale(['#fff700', '#ff8c00']).domain([10, 30]);
  if (temp < -10) {
    return '#00ffff';
  }
  if (temp <= 10) {
    return coldScale(temp).hex();
  }
  if (temp <= 30) {
    return warmScale(temp).hex();
  }
  return '#ff8c00';
};
