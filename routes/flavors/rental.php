<?php

use App\Http\Controllers\Web\RentalController;
use Illuminate\Support\Facades\Route;

/** Flavor RENTAL MOBIL (didaftarkan oleh worker routes/web.php). */
Route::prefix('rental')->name('rental.')->group(function () {
    Route::get('/', [RentalController::class, 'index'])->name('index');
    Route::get('/kendaraan', [RentalController::class, 'kendaraan'])->name('kendaraan');
    Route::get('/booking', [RentalController::class, 'booking'])->name('booking');
    Route::get('/pelanggan', [RentalController::class, 'pelanggan'])->name('pelanggan');
    Route::get('/kalender', [RentalController::class, 'kalender'])->name('kalender');
    Route::get('/laporan', [RentalController::class, 'laporan'])->name('laporan');
});
