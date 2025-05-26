<?php

namespace App\Providers;

use App\Services\OpenWeatherService;
use Illuminate\Support\ServiceProvider;

/**
 * Service provider for OpenWeatherService.
 */
class OpenWeatherServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(OpenWeatherService::class, function ($app) {
            return new OpenWeatherService();
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}