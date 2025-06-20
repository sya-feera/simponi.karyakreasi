<?php

namespace Database\Seeders;

use App\Models\DormAssignment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DormAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DormAssignment::create([
            'santri_id'  => 1,
            'dorm_id'   => 1,
            'entry_date' => '2024-08-01',
            'exit_date'  => null,
        ]);
        DormAssignment::create([
            'santri_id'  => 2,
            'dorm_id'   => 1,
            'entry_date' => '2024-08-01',
            'exit_date'  => null,
        ]);
        DormAssignment::create([
            'santri_id'  => 3,
            'dorm_id'   => 1,
            'entry_date' => '2024-08-01',
            'exit_date'  => null,
        ]);
    }
}
