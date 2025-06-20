<?php

namespace Database\Seeders;

use App\Models\Classroom;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassroomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Classroom::create([
            'name' => 'Kelas A',
            'location' => 'Gedung 1 Lantai 1',
        ]);

        Classroom::create([
            'name' => 'Kelas B',
            'location' => 'Gedung 1 Lantai 2',
        ]);

        Classroom::create([
            'name' => 'Kelas C',
            'location' => 'Gedung 2 Lantai 1',
        ]);

        Classroom::create([
            'name' => 'Kelas D',
            'location' => 'Gedung 2 Lantai 2',
        ]);

        Classroom::create([
            'name' => 'Kelas E',
            'location' => 'Gedung 3 Lantai 1',
        ]);
    }
}
