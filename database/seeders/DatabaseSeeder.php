<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Hash;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash as FacadesHash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'username' => 'admin',
            'phone_number' => '08958005040',
            'role' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => FacadesHash::make('admin'),
        ]);
        $this->call(ComplaintCategorySeeder::class);
        $this->call(ServiceCategorySeeder::class);
    }
}
