<?php

namespace App\Providers;

use App\Models\ComplaintCategory;
use App\Repositories\ComplaintCategoryRepository;
use App\Repositories\ComplaintCategoryRepositoryInterface;
use App\Repositories\ComplaintRepository;
use App\Repositories\ComplaintRepositoryInterface;
use App\Repositories\ServiceCategoryRepository;
use App\Repositories\ServiceCategoryRepositoryInterface;
use App\Repositories\ServiceFileRepository;
use App\Repositories\ServiceFileRepositoryInterface;
use App\Repositories\ServiceRepository;
use App\Repositories\ServiceRepositoryInterface;
use App\Services\ComplaintCategoryService;
use App\Services\ComplaintService;
use App\Services\ServiceCategoryService;
use App\Services\ServiceFileService;
use App\Services\ServiceService;
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

        // Complaint Category
        $this->app->bind(ComplaintCategoryRepositoryInterface::class, ComplaintCategoryRepository::class);
        $this->app->bind(ComplaintCategoryService::class, function ($app) { // ✅ benar
            return new ComplaintCategoryService($app->make(ComplaintCategoryRepositoryInterface::class));
        });

        // Service Category
        $this->app->bind(ServiceCategoryRepositoryInterface::class, ServiceCategoryRepository::class);
        $this->app->bind(ServiceCategoryService::class, function ($app) {
            return new ServiceCategoryService($app->make(ServiceCategoryRepositoryInterface::class));
        });

        // Service
        $this->app->bind(ServiceRepositoryInterface::class, ServiceRepository::class);
        $this->app->bind(ServiceService::class, function ($app) {
            return new ServiceService($app->make(ServiceRepositoryInterface::class));
        });

        // Service File Upload
        $this->app->bind(ServiceFileRepositoryInterface::class, ServiceFileRepository::class);
        $this->app->bind(ServiceFileService::class, function ($app) {
            return new ServiceFileService($app->make(ServiceFileRepositoryInterface::class));
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
