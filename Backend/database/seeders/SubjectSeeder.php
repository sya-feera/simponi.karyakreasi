<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Subject::create([
            'name' => 'Tauhid',
            'day' => 'Senin',
            'year' => 2025,
            'jenjang' => 'Aliyah',
            'classroom_id' => 1,
            'mudaris_id' => 1,
        ]);

        Subject::create([
            'name' => 'Fiqih',
            'day' => 'Selasa',
            'year' => 2025,
            'jenjang' => 'Aliyah',
            'classroom_id' => 2,
            'mudaris_id' => 2,
        ]);

        Subject::create([
            'name' => 'Nahwu',
            'day' => 'Rabu',
            'year' => 2025,
            'jenjang' => 'Tsanawiyah',
            'classroom_id' => 3,
            'mudaris_id' => 3,
        ]);
    }
}
