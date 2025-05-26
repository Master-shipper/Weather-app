export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  wind_speed: number;
}

export interface ForecastData {
  city: string;
  forecast: {
    date: string;
    temperature: number;
    condition: string;
    icon: string;
  }[];
}