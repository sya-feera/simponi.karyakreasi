<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('santri', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            // $table->enum('gender', ['Laki-laki', 'Perempuan']);
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->date('tgl_lahir')->nullable();
            $table->string('address')->nullable();
            $table->string('no_hp')->nullable();
            $table->string('pp_santri')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('santris');
    }
};
