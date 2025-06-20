<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'mudaris',
            'email' => 'mudaris@example.com',
            'password' => bcrypt('mudaris123'),
            'role' => 'mudaris'
        ]);

        User::create([
            'name' => 'santri',
            'email' => 'santri@example.com',
            'password' => bcrypt('santri123'),
            'role' => 'santri'
        ]);
    }
}
