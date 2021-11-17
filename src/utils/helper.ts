export const getWeatherIconUrl = (weatherState: string | undefined): string =>
  `https://www.metaweather.com/static/img/weather/${weatherState}.svg`;
