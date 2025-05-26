'use client';

import { useState } from 'react';
import ErrorDisplay from './components/ErrorDisplay';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { fetchCurrentWeather, fetchForecast } from './services/weatherService';
import { ForecastData, WeatherData } from './types/WeatherData';

/**
 * Home page component for the weather app.
 */
export default function Home() {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    try {
      const [currentData, forecastData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);
      setWeather(currentData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />
        <ErrorDisplay message={error} />
        {weather && <WeatherCard data={weather} isCurrent={true} />}
        {forecast && (
          <div>
            <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {forecast.forecast.map((day, index) => (
                <WeatherCard key={index} data={day} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}