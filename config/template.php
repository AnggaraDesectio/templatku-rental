<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "rental".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'rental'),

    'flavors' => array (
  'rental' => 
  array (
    'label' => 'Rental',
    'brand_name' => 'Rental',
    'brand_tagline' => 'Sewa kendaraan',
    'brand_initials' => 'RN',
    'accent' => '#ea580c',
    'category' => 'properti',
    'home' => 'rental.index',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Rental',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Dashboard',
              'to' => '/rental',
              'icon' => 'LayoutDashboard',
            ),
            1 => 
            array (
              'label' => 'Kendaraan',
              'to' => '/rental/kendaraan',
              'icon' => 'Car',
            ),
            2 => 
            array (
              'label' => 'Booking',
              'to' => '/rental/booking',
              'icon' => 'KeyRound',
            ),
            3 => 
            array (
              'label' => 'Pelanggan',
              'to' => '/rental/pelanggan',
              'icon' => 'Users',
            ),
            4 => 
            array (
              'label' => 'Kalender',
              'to' => '/rental/kalender',
              'icon' => 'CalendarDays',
            ),
            5 => 
            array (
              'label' => 'Laporan',
              'to' => '/rental/laporan',
              'icon' => 'ChartLine',
            ),
          ),
        ),
        1 => 
        array (
          'label' => 'Umum',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Pengguna',
              'to' => '/users',
              'icon' => 'Users',
            ),
            1 => 
            array (
              'label' => 'Peran',
              'to' => '/roles',
              'icon' => 'ShieldCheck',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
            3 => 
            array (
              'label' => 'Profil',
              'to' => '/profile',
              'icon' => 'User',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
