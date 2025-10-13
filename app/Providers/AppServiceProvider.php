<?php

namespace App\Providers;

use App\Repositories\ComplaintRepository;
use App\Repositories\ComplaintRepositoryInterface;
use App\Services\ComplaintService;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Complaint
        $this->app->bind(ComplaintRepositoryInterface::class, ComplaintRepository::class);
        $this->app->bind(ComplaintService::class, function ($app) {
            return new ComplaintService($app->make(ComplaintRepositoryInterface::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
