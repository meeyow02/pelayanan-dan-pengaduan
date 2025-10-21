<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComplaintCategoryController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceCategoryController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/ubah-password', [AuthController::class, 'changePassword'])->middleware(['auth', 'verified'])->name('change-password');
Route::put('/ubah-password', [AuthController::class, 'updatePassword'])->middleware(['auth', 'verified'])->name('password.update');

Route::middleware('auth')->prefix('master_data/kategori_pelayanan')->group(function () {
    Route::get('/', [ServiceCategoryController::class, 'index'])->name('service-category.index');
    Route::get('/buat_kategori_pelayanan', [ServiceCategoryController::class, 'create'])->name('service-category.create');
    Route::post('/', [ServiceCategoryController::class, 'store'])->name('service-category.store');
    Route::get('/{id}/edit', [ServiceCategoryController::class, 'edit'])->name('service-category.edit');
    Route::put('/{id}', [ServiceCategoryController::class, 'update'])->name('service-category.update');
    Route::delete('/{id}', [ServiceCategoryController::class, 'destroy'])->name('service-category.destroy');
});

Route::middleware('auth')->prefix('master_data/kategori_aduan')->group(function () {
    Route::get('/', [ComplaintCategoryController::class, 'index'])->name('complaint-category.index');
    Route::get('/buat_kategori_aduan', [ComplaintCategoryController::class, 'create'])->name('complaint-category.create');
    Route::post('/', [ComplaintCategoryController::class, 'store'])->name('complaint-category.store');
    Route::get('/{id}/edit', [ComplaintCategoryController::class, 'edit'])->name('complaint-category.edit');
    Route::put('/{id}', [ComplaintCategoryController::class, 'update'])->name('complaint-category.update');
    Route::delete('/{id}', [ComplaintCategoryController::class, 'destroy'])->name('complaint-category.destroy');
});

Route::middleware('auth')->prefix('pengaduan')->group(function () {
    Route::get('/', [ComplaintController::class, 'index'])->name('complaint.index');
    Route::get('/buat_aduan', [ComplaintController::class, 'create'])->name('complaint.create');
    Route::post('/buat_aduan', [ComplaintController::class, 'store'])->name('complaint.store');
    Route::put('/{id}/status', [ComplaintController::class, 'updateStatus'])->name('complaint.update-status');
    Route::get('/detail_aduan/{id}', [ComplaintController::class, 'show'])->name('complaint.detail');
    Route::delete('/{id}', [ComplaintController::class, 'destroy'])->name('complaint.destroy');
});

Route::middleware('auth')->prefix('pelayanan')->group(function () {
    Route::get('/', [ServiceController::class, 'index'])->name('service.index');
    Route::get('/buat_permohonan_layanan', [ServiceController::class, 'create'])->name('service.create');
    Route::post('/', [ServiceController::class, 'store'])->name('service.store');
    Route::put('/{id}/status', [ServiceController::class, 'updateStatus'])->name('service.update-status');
    Route::get('/detail_permohonan_layanan/{id}', [ServiceController::class, 'show'])->name('service.detail');
    Route::delete('/{id}', [ServiceController::class, 'destroy'])->name('service.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
