import { ForecastData, WeatherData } from '../types/WeatherData';

/**
 * Fetches current weather data for a city from the Laravel API.
 * @param city - The city name to query
 * @returns Promise resolving to WeatherData or throws an error
 */
export const fetchCurrentWeather = async (city: string): Promise<WeatherData> => {
  const response = await fetch(`http://localhost:8000/api/weather/current?city=${encodeURIComponent(city)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch current weather');
  }
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
};

/**
 * Fetches 5-day forecast data for a city from the Laravel API.
 * @param city - The city name to query
 * @returns Promise resolving to ForecastData or throws an error
 */
export const fetchForecast = async (city: string): Promise<ForecastData> => {
  const response = await fetch(`http://localhost:8000/api/weather/forecast?city=${encodeURIComponent(city)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch forecast');
  }
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
};