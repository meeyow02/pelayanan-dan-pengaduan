<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServiceCategory;

class ServiceCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'name' => 'Surat Keterangan & Dokumen',
                'description' => 'Layanan pembuatan surat keterangan, legalisasi dokumen, atau penerbitan dokumen administratif lainnya.',
            ],
            [
                'name' => 'Perizinan & Rekomendasi',
                'description' => 'Layanan permohonan izin, rekomendasi kegiatan, penggunaan fasilitas, atau perizinan resmi lainnya.',
            ],
            [
                'name' => 'Administrasi Kependudukan',
                'description' => 'Layanan yang berkaitan dengan data dan dokumen kependudukan seperti KTP, KK, atau surat domisili.',
            ],
            [
                'name' => 'Pertanahan & Bangunan',
                'description' => 'Layanan pengurusan dokumen pertanahan, IMB, sertifikat tanah, atau izin renovasi dan pembangunan.',
            ],
            [
                'name' => 'Kegiatan Sosial & Kemasyarakatan',
                'description' => 'Layanan terkait kegiatan sosial, pengabdian masyarakat, event kemasyarakatan, dan dukungan sosial lainnya.',
            ],
        ];

        foreach ($services as $service) {
            ServiceCategory::create($service);
        }
    }
}
