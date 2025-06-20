<?php

namespace Database\Seeders;

use App\Models\Mudaris;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MudarisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Mudaris::create([
            'name' => 'Ustadz Ahmad',
            // 'gender' => 'Laki-laki',
            'address' => 'Jl. Merpati No. 10, Surabaya',
            'no_hp' => '081234567890',
            'user_id' => null,
        ]);

        Mudaris::create([
            'name' => 'Ustadz Budi',
            // 'gender' => 'Laki-laki',
            'address' => 'Jl. Melati No. 25, Malang',
            'no_hp' => '082345678901',
            'user_id' => null,
        ]);

        Mudaris::create([
            'name' => 'Ustadz Joko',
            // 'gender' => 'Laki-laki',
            'address' => 'Jl. Kenanga No. 15, Jakarta',
            'no_hp' => '083456789012',
            'user_id' => null,
        ]);
    }
}
