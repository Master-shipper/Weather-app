<?php

   namespace App\Http\Controllers;

   use App\Services\OpenWeatherService;
   use Illuminate\Http\JsonResponse;
   use Illuminate\Http\Request;
   use Illuminate\Support\Facades\Validator;

   class WeatherController extends Controller
   {
       private $weatherService;

       public function __construct(OpenWeatherService $weatherService)
       {
           $this->weatherService = $weatherService;
       }

       public function getCurrentWeather(Request $request): JsonResponse
       {
           $validator = Validator::make($request->all(), [
               'city' => 'required|string|min:2',
           ]);

           if ($validator->fails()) {
               return response()->json([
                   'error' => 'Invalid city name',
                   'details' => $validator->errors(),
               ], 400);
           }

           try {
               $data = $this->weatherService->getCurrentWeather($request->query('city'));
               return response()->json($data);
           } catch (\Exception $e) {
               return response()->json([
                   'error' => 'Unable to fetch weather data',
                   'details' => $e->getMessage(),
               ], 500);
           }
       }

       public function getForecast(Request $request): JsonResponse
       {
           $validator = Validator::make($request->all(), [
               'city' => 'required|string|min:2',
           ]);

           if ($validator->fails()) {
               return response()->json([
                   'error' => 'Invalid city name',
                   'details' => $validator->errors(),
               ], 400);
           }

           try {
               $data = $this->weatherService->getForecast($request->query('city'));
               return response()->json($data);
           } catch (\Exception $e) {
               return response()->json([
                   'error' => 'Unable to fetch forecast data',
                   'details' => $e->getMessage(),
               ], 500);
           }
       }
   }