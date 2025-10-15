<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ComplaintCategory;

class ComplaintCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Keamanan & Ketertiban',
                'description' => 'Laporan terkait isu keamanan, kehilangan barang, tindakan tidak tertib, atau potensi gangguan di lingkungan kampus.',
            ],
            [
                'name' => 'Kebersihan & Lingkungan',
                'description' => 'Laporan mengenai kebersihan area kampus, pengelolaan sampah, kondisi taman, atau lingkungan sekitar kampus.',
            ],
            [
                'name' => 'Infrastruktur & Fasilitas Umum',
                'description' => 'Laporan tentang kerusakan atau perbaikan fasilitas umum seperti gedung, jalan, lampu, air, dan sarana pendukung lainnya.',
            ],
            [
                'name' => 'Pelayanan Publik',
                'description' => 'Laporan terkait kualitas pelayanan kampus seperti administrasi, perizinan, layanan mahasiswa, atau pelayanan akademik.',
            ],
            [
                'name' => 'Sosial & Kesejahteraan',
                'description' => 'Laporan mengenai kegiatan sosial, kesejahteraan sivitas akademika, bantuan kemahasiswaan, atau dukungan sosial lainnya.',
            ],
        ];

        foreach ($categories as $category) {
            ComplaintCategory::create($category);
        }
    }
}
