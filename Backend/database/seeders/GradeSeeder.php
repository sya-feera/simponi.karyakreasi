<?php

namespace Database\Seeders;

use App\Models\Grade;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Grade::create([
            'santri_id' => 1,
            'subject_id' => 1,
            'grade' => 85,
        ]);

        Grade::create([
            'santri_id' => 2,
            'subject_id' => 2,
            'grade' => 90,
        ]);

        Grade::create([
            'santri_id' => 3,
            'subject_id' => 3,
            'grade' => 88,
        ]);
    }
}
