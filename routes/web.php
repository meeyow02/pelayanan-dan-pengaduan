<?php

use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\ProfileController;
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


Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->prefix('pengaduan')->group(function () {
    Route::get('/', [ComplaintController::class, 'index'])->name('complaint.index');

    Route::get('/buat_aduan', [ComplaintController::class, 'create'])->name('complaint.create');
    Route::post('/buat_aduan', [ComplaintController::class, 'store'])->name('complaint.store');

    Route::get('/detail_aduan/{id}', [ComplaintController::class, 'show'])->name('complaint.detail');
});


Route::get('/pelayanan', function () {
    return Inertia::render('Service/Index');
});

Route::get('/pelayanan/buat_permohonan_layanan', function () {
    return Inertia::render('Service/Create');
});

Route::get('/pelayanan/detail_permohonan_layanan', function () {
    return Inertia::render('Service/Detail');
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
