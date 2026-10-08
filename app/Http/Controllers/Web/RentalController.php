<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\Demo\RentalData;
use Inertia\Inertia;
use Inertia\Response;

/** Flavor RENTAL MOBIL: armada, booking, pelanggan, kalender, laporan. */
class RentalController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('rental/index', [
            'ringkasan'   => RentalData::ringkasan(),
            'pendapatan'  => RentalData::pendapatanBulanan(),
            'bookings'    => RentalData::bookings(),
        ]);
    }

    public function kendaraan(): Response
    {
        return Inertia::render('rental/kendaraan', [
            'kendaraans' => RentalData::kendaraans(),
        ]);
    }

    public function booking(): Response
    {
        return Inertia::render('rental/booking', [
            'bookings' => RentalData::bookings(),
        ]);
    }

    public function pelanggan(): Response
    {
        return Inertia::render('rental/pelanggan', [
            'pelanggans' => RentalData::pelanggans(),
        ]);
    }

    public function kalender(): Response
    {
        return Inertia::render('rental/kalender', [
            'kendaraans' => RentalData::kendaraans(),
            'kalender'   => RentalData::kalender(),
        ]);
    }

    public function laporan(): Response
    {
        return Inertia::render('rental/laporan', [
            'ringkasan'  => RentalData::ringkasan(),
            'pendapatan' => RentalData::pendapatanBulanan(),
            'kendaraans' => RentalData::kendaraans(),
        ]);
    }
}
