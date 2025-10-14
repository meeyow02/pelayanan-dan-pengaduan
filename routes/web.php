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

Route::middleware('auth')->group(function () {
    Route::get('/pengaduan', [ComplaintController::class, 'index'])->name('complaint.index');
});

Route::get('/pengaduan/buat_aduan', function () {
    return Inertia::render('Complaint/Create');
});

Route::get('/pengaduan/detail_aduan', function () {
    return Inertia::render('Complaint/Detail');
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
