<?php

namespace Database\Seeders;

use App\Models\Dorm;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Dorm::create([
            'name' => 'Asrama Putra 1',
            'capacity' => 3,
            'mudaris_id' => 1,
        ]);
        Dorm::create([
            'name' => 'Asrama Putra 2',
            'capacity' => 15,
            'mudaris_id' => 2,
        ]);
        Dorm::create([
            'name' => 'Asrama Putra 3',
            'capacity' => 25,
            'mudaris_id' => 3,
        ]);
    }
}
