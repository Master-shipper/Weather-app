import Image from 'next/image';
import { ForecastData, WeatherData } from '../types/WeatherData';

interface WeatherCardProps {
  data: WeatherData | ForecastData['forecast'][0];
  isCurrent?: boolean;
}

export default function WeatherCard({ data, isCurrent = false }: WeatherCardProps) {
  const { temperature, condition, icon } = data;
  const city = 'city' in data ? data.city : '';
  const humidity = 'humidity' in data ? data.humidity : null;
  const wind_speed = 'wind_speed' in data ? data.wind_speed : null;
  const date = 'date' in data ? new Date(data.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }) : '';

  return (
    <div className={`card bg-base-100 shadow-md p-4 ${isCurrent ? 'mb-6' : ''}`}>
      {isCurrent && <h2 className="text-2xl font-bold">{city}</h2>}
      {!isCurrent && <p className="font-semibold">{date}</p>}
      <div className="flex items-center">
        <Image
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt="Weather icon"
          width={isCurrent ? 50 : 40}
          height={isCurrent ? 50 : 40}
        />
        <div className="ml-4">
          <p className={isCurrent ? 'text-xl' : 'text-base'}>{temperature}°C</p>
          <p>{condition}</p>
          {isCurrent && humidity !== null && <p>Humidity: {humidity}%</p>}
          {isCurrent && wind_speed !== null && <p>Wind: {wind_speed} m/s</p>}
        </div>
      </div>
    </div>
  );
}
