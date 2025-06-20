<?php

namespace Database\Seeders;

use App\Models\Santri;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SantriSeeder extends Seeder
{
        /**
         * Run the database seeds.
         */
        public function run(): void
        {
                Santri::create([
                        'name' => 'Ahmad Fauzi',
                        // 'gender' => 'Laki-laki',
                        'tgl_lahir' => '2005-04-10',
                        'address' => 'Jl. Merpati No. 12, Surabaya',
                        'no_hp' => '081234567890',
                        'user_id' => null,

                ]);
                Santri::create([
                        'name' => 'Budi Santoso',
                        // 'gender' => 'Laki-laki',
                        'tgl_lahir' => '2004-12-05',
                        'address' => 'Jl. Melati No. 10, Jakarta',
                        'no_hp' => '082112345678',
                        'user_id' => null,
                ]);
                Santri::create([
                        'name' => 'Joko Widodo',
                        // 'gender' => 'Laki-laki',
                        'tgl_lahir' => '2006-01-15',
                        'address' => 'Jl. Sudirman No. 45, Bandung',
                        'no_hp' => '083312345678',
                        'user_id' => null,
                ]);
        }
}
