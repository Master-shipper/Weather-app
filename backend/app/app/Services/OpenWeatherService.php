<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;

/**
 * Service for interacting with the OpenWeatherMap API.
 */
class OpenWeatherService
{
    /**
     * @var Client Guzzle HTTP client for API requests.
     */
    private $client;

    /**
     * @var string OpenWeatherMap API key.
     */
    private $apiKey;

    /**
     * OpenWeatherService constructor.
     */
    public function __construct()
    {
        $this->client = new Client(['base_uri' => 'https://api.openweathermap.org/data/2.5/']);
        $this->apiKey = env('OPENWEATHER_API_KEY', 'YOUR_API_KEY');
    }

    /**
     * Fetch current weather data for a city.
     *
     * @param string $city City name
     * @return array Weather data
     * @throws \Exception If the API request fails
     */
    public function getCurrentWeather(string $city): array
    {
        try {
            $response = $this->client->get('weather', [
                'query' => [
                    'q' => $city,
                    'appid' => $this->apiKey,
                    'units' => 'metric',
                ],
            ]);


            $data = json_decode($response->getBody(), true);

            // Log the raw API response for debugging
            Log::info('OpenWeather current weather response', $data);

            if (isset($data['cod']) && (int) $data['cod'] !== 200) {
                throw new \Exception($data['message'] ?? 'Unexpected API error');
            }

            return [
                'city' => $data['name'],
                'temperature' => $data['main']['temp'],
                'condition' => $data['weather'][0]['main'],
                'icon' => $data['weather'][0]['icon'],
                'humidity' => $data['main']['humidity'],
                'wind_speed' => $data['wind']['speed'],
            ];
        } catch (RequestException $e) {
            Log::error('RequestException (current weather): ' . $e->getMessage());
            throw new \Exception('Unable to fetch current weather: ' . $e->getMessage());
        }
    }

    /**
     * Fetch 5-day weather forecast for a city.
     *
     * @param string $city City name
     * @return array Forecast data
     * @throws \Exception If the API request fails
     */
    public function getForecast(string $city): array
    {
        try {
            $response = $this->client->get('forecast', [
                'query' => [
                    'q' => $city,
                    'appid' => $this->apiKey,
                    'units' => 'metric',
                ],
            ]);

            $data = json_decode($response->getBody(), true);

            // Log the raw API response for debugging
            Log::info('OpenWeather forecast response', $data);

            if (isset($data['cod']) && (int) $data['cod'] !== 200) {
                throw new \Exception($data['message'] ?? 'Unexpected API error');
            }

            $dailyForecast = [];
            foreach ($data['list'] as $entry) {
                if (str_contains($entry['dt_txt'], '12:00:00')) {
                    $dailyForecast[] = [
                        'date' => date('Y-m-d', strtotime($entry['dt_txt'])),
                        'temperature' => $entry['main']['temp'],
                        'condition' => $entry['weather'][0]['main'],
                        'icon' => $entry['weather'][0]['icon'],
                    ];
                }
            }

            return [
                'city' => $data['city']['name'],
                'forecast' => array_slice($dailyForecast, 0, 5),
            ];
        } catch (RequestException $e) {
            Log::error('RequestException (forecast): ' . $e->getMessage());
            throw new \Exception('Unable to fetch forecast: ' . $e->getMessage());
        }
    }
}
