<?php

use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\ProfileController;
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

Route::get('/', function () {
    return Inertia::render('Dashboard');
});

Route::get('/master_data/kategori_aduan', function () {
    return Inertia::render('Master Data/Complaint Category/Index');
});
Route::get('/master_data/kategori_aduan/buat_kategori_aduan', function () {
    return Inertia::render('Master Data/Complaint Category/Create');
});

Route::get('/master_data/kategori_pelayanan', function () {
    return Inertia::render('Master Data/Service Category/Index');
});
Route::get('/master_data/kategori_pelayanan/buat_kategori_pelayanan', function () {
    return Inertia::render('Master Data/Service Category/Create');
});

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->prefix('pengaduan')->group(function () {
    Route::get('/', [ComplaintController::class, 'index'])->name('complaint.index');
    Route::get('/buat_aduan', [ComplaintController::class, 'create'])->name('complaint.create');
    Route::post('/buat_aduan', [ComplaintController::class, 'store'])->name('complaint.store');
    Route::get('/detail_aduan/{id}', [ComplaintController::class, 'show'])->name('complaint.detail');
    Route::delete('/{id}', [ComplaintController::class, 'destroy'])->name('complaint.destroy');
});

Route::middleware('auth')->prefix('pelayanan')->group(function () {
    Route::get('/', [ServiceController::class, 'index'])->name('service.index');
    Route::get('/buat_permohonan_layanan', [ServiceController::class, 'create'])->name('service.create');
    Route::post('/', [ServiceController::class, 'store'])->name('service.store');
    Route::get('/detail_permohonan_layanan/{id}', [ServiceController::class, 'show'])->name('service.detail');
    Route::delete('/{id}', [ServiceController::class, 'destroy'])->name('service.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
