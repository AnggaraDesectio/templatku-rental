<?php

namespace App\Support\Demo;

/**
 * Data demo flavor RENTAL MOBIL: armada, booking, pelanggan, kalender.
 * Kontrak: status berbentuk ['label' => .., 'tone' => ..]
 * (tanpa HTML), tone: success | warning | destructive | info.
 * Harga per hari dan total booking ditulis eksplisit supaya konsisten.
 */
class RentalData
{
    public static function kendaraans(): array
    {
        return [
            ['id' =>  1, 'nama' => 'Toyota Avanza',     'plat' => 'B 1234 ABC', 'tipe' => 'MPV',        'hargaHari' => 350000, 'gambar' => '/images/rental/avanza.jpg',   'status' => ['label' => 'Disewa',    'tone' => 'info']],
            ['id' =>  2, 'nama' => 'Honda Brio',        'plat' => 'B 5678 DEF', 'tipe' => 'City Car',   'hargaHari' => 300000, 'gambar' => '/images/rental/brio.jpg',     'status' => ['label' => 'Tersedia',  'tone' => 'success']],
            ['id' =>  3, 'nama' => 'Daihatsu Xenia',    'plat' => 'B 9101 GHI', 'tipe' => 'MPV',        'hargaHari' => 350000, 'gambar' => '/images/rental/xenia.jpg',    'status' => ['label' => 'Tersedia',  'tone' => 'success']],
            ['id' =>  4, 'nama' => 'Toyota Innova',     'plat' => 'B 1121 JKL', 'tipe' => 'MPV Premium','hargaHari' => 550000, 'gambar' => '/images/rental/innova.jpg',   'status' => ['label' => 'Disewa',    'tone' => 'info']],
            ['id' =>  5, 'nama' => 'Honda Jazz',        'plat' => 'B 3141 MNO', 'tipe' => 'Hatchback',  'hargaHari' => 325000, 'gambar' => '/images/rental/jazz.jpg',     'status' => ['label' => 'Perawatan', 'tone' => 'warning']],
            ['id' =>  6, 'nama' => 'Suzuki Ertiga',     'plat' => 'B 5161 PQR', 'tipe' => 'MPV',        'hargaHari' => 350000, 'gambar' => '/images/rental/ertiga.jpg',   'status' => ['label' => 'Tersedia',  'tone' => 'success']],
            ['id' =>  7, 'nama' => 'Toyota Fortuner',   'plat' => 'B 7181 STU', 'tipe' => 'SUV',        'hargaHari' => 850000, 'gambar' => '/images/rental/fortuner.jpg', 'status' => ['label' => 'Tersedia',  'tone' => 'success']],
            ['id' =>  8, 'nama' => 'Daihatsu Gran Max', 'plat' => 'B 9202 VWX', 'tipe' => 'Blind Van',  'hargaHari' => 400000, 'gambar' => '/images/rental/gran-max.jpg', 'status' => ['label' => 'Disewa',    'tone' => 'info']],
            ['id' =>  9, 'nama' => 'Honda Mobilio',     'plat' => 'B 2232 YZA', 'tipe' => 'MPV',        'hargaHari' => 350000, 'gambar' => '/images/rental/mobilio.jpg',  'status' => ['label' => 'Perawatan', 'tone' => 'warning']],
            ['id' => 10, 'nama' => 'Mitsubishi Xpander','plat' => 'B 4252 BCD', 'tipe' => 'MPV',        'hargaHari' => 375000, 'gambar' => '/images/rental/xpander.jpg',  'status' => ['label' => 'Tersedia',  'tone' => 'success']],
        ];
    }

    public static function bookings(): array
    {
        return [
            ['id' =>  1, 'kode' => 'BK-2026-10-01', 'kendaraan' => 'Toyota Avanza',      'pelanggan' => 'Rudi Hartono',     'pinjam' => '2026-10-05', 'kembali' => '2026-10-08', 'hari' => 3, 'total' => 1050000, 'status' => ['label' => 'Berjalan', 'tone' => 'info']],
            ['id' =>  2, 'kode' => 'BK-2026-10-02', 'kendaraan' => 'Toyota Innova',      'pelanggan' => 'PT Maju Jaya Abadi','pinjam' => '2026-10-06', 'kembali' => '2026-10-09', 'hari' => 3, 'total' => 1650000, 'status' => ['label' => 'Berjalan', 'tone' => 'info']],
            ['id' =>  3, 'kode' => 'BK-2026-10-03', 'kendaraan' => 'Daihatsu Gran Max',  'pelanggan' => 'Budi Santoso',     'pinjam' => '2026-10-04', 'kembali' => '2026-10-07', 'hari' => 3, 'total' => 1200000, 'status' => ['label' => 'Selesai',  'tone' => 'success']],
            ['id' =>  4, 'kode' => 'BK-2026-10-04', 'kendaraan' => 'Honda Brio',         'pelanggan' => 'Siti Aminah',      'pinjam' => '2026-10-08', 'kembali' => '2026-10-10', 'hari' => 2, 'total' =>  600000, 'status' => ['label' => 'Dipesan',  'tone' => 'warning']],
            ['id' =>  5, 'kode' => 'BK-2026-10-05', 'kendaraan' => 'Toyota Fortuner',    'pelanggan' => 'Hendra Gunawan',   'pinjam' => '2026-10-09', 'kembali' => '2026-10-12', 'hari' => 3, 'total' => 2550000, 'status' => ['label' => 'Dipesan',  'tone' => 'warning']],
            ['id' =>  6, 'kode' => 'BK-2026-10-06', 'kendaraan' => 'Daihatsu Xenia',     'pelanggan' => 'Maya Putri',       'pinjam' => '2026-10-01', 'kembali' => '2026-10-03', 'hari' => 2, 'total' =>  700000, 'status' => ['label' => 'Selesai',  'tone' => 'success']],
            ['id' =>  7, 'kode' => 'BK-2026-10-07', 'kendaraan' => 'Mitsubishi Xpander', 'pelanggan' => 'Agus Wijaya',      'pinjam' => '2026-10-08', 'kembali' => '2026-10-09', 'hari' => 1, 'total' =>  375000, 'status' => ['label' => 'Berjalan', 'tone' => 'info']],
            ['id' =>  8, 'kode' => 'BK-2026-10-08', 'kendaraan' => 'Honda Jazz',         'pelanggan' => 'Dewi Lestari',     'pinjam' => '2026-10-10', 'kembali' => '2026-10-12', 'hari' => 2, 'total' =>  650000, 'status' => ['label' => 'Batal',    'tone' => 'destructive']],
            ['id' =>  9, 'kode' => 'BK-2026-10-09', 'kendaraan' => 'Suzuki Ertiga',      'pelanggan' => 'Joko Prasetyo',    'pinjam' => '2026-10-07', 'kembali' => '2026-10-11', 'hari' => 4, 'total' => 1400000, 'status' => ['label' => 'Berjalan', 'tone' => 'info']],
            ['id' => 10, 'kode' => 'BK-2026-10-10', 'kendaraan' => 'Honda Mobilio',      'pelanggan' => 'Rina Wulandari',   'pinjam' => '2026-10-02', 'kembali' => '2026-10-04', 'hari' => 2, 'total' =>  700000, 'status' => ['label' => 'Selesai',  'tone' => 'success']],
        ];
    }

    public static function pelanggans(): array
    {
        return [
            ['id' => 1, 'nama' => 'Rudi Hartono',      'telepon' => '081234567890', 'tipe' => 'Perorangan', 'sewa' => 6],
            ['id' => 2, 'nama' => 'PT Maju Jaya Abadi','telepon' => '02155667788',  'tipe' => 'Perusahaan', 'sewa' => 12],
            ['id' => 3, 'nama' => 'Budi Santoso',      'telepon' => '081298765432', 'tipe' => 'Perorangan', 'sewa' => 4],
            ['id' => 4, 'nama' => 'Siti Aminah',       'telepon' => '081322334455', 'tipe' => 'Perorangan', 'sewa' => 3],
            ['id' => 5, 'nama' => 'Hendra Gunawan',    'telepon' => '081355667788', 'tipe' => 'Perorangan', 'sewa' => 5],
            ['id' => 6, 'nama' => 'Maya Putri',        'telepon' => '081377889900', 'tipe' => 'Perorangan', 'sewa' => 2],
            ['id' => 7, 'nama' => 'Agus Wijaya',       'telepon' => '081344556677', 'tipe' => 'Perorangan', 'sewa' => 7],
            ['id' => 8, 'nama' => 'CV Berkah Logistik','telepon' => '02177889900',  'tipe' => 'Perusahaan', 'sewa' => 9],
        ];
    }

    public static function ringkasan(): array
    {
        $kendaraans = self::kendaraans();
        $bookings   = self::bookings();
        $count = function (string $label) use ($kendaraans) {
            return count(array_filter($kendaraans, fn ($k) => $k['status']['label'] === $label));
        };
        $pendapatan = array_sum(array_map(
            fn ($b) => in_array($b['status']['label'], ['Berjalan', 'Selesai']) ? $b['total'] : 0,
            $bookings
        ));

        return [
            'totalKendaraan' => count($kendaraans), // 10
            'tersedia'       => $count('Tersedia'), // 5
            'disewa'         => $count('Disewa'),   // 3
            'perawatan'      => $count('Perawatan'), // 2
            'bookingAktif'   => count(array_filter($bookings, fn ($b) => in_array($b['status']['label'], ['Berjalan', 'Dipesan']))), // 6
            'pendapatan'     => $pendapatan, // 7.075.000
        ];
    }

    /** Booking per kendaraan (tidak batal) untuk kalender: [kendaraanId => [pinjam, kembali, pelanggan]]. */
    public static function kalender(): array
    {
        $namaKeId = [];
        foreach (self::kendaraans() as $k) {
            $namaKeId[$k['nama']] = $k['id'];
        }
        $hasil = [];
        foreach (self::bookings() as $b) {
            if ($b['status']['label'] === 'Batal') {
                continue;
            }
            $hasil[] = [
                'kendaraanId' => $namaKeId[$b['kendaraan']] ?? null,
                'kode'        => $b['kode'],
                'pinjam'      => $b['pinjam'],
                'kembali'     => $b['kembali'],
                'pelanggan'   => $b['pelanggan'],
                'status'      => $b['status'],
            ];
        }
        return $hasil;
    }

    /** Pendapatan per bulan untuk grafik (eksplisit, contoh Jan-Sep). */
    public static function pendapatanBulanan(): array
    {
        return [
            'labels'   => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
            'datasets' => [[
                'label' => 'Pendapatan (juta Rp)',
                'data'  => [8.2, 7.6, 9.1, 10.4, 9.8, 11.2, 12.6, 11.9, 10.8, 7.1],
            ]],
        ];
    }
}
