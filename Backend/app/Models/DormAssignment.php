<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DormAssignment extends Model
{
    protected $table = 'dorm_assignments';

    protected $fillable = [
        'santri_id',
        'dorm_id',
        'entry_date',
        'exit_date'
    ];

    public function santri()
    {
        return $this->belongsTo(Santri::class);
    }

    public function dorm()
    {
        return $this->belongsTo(Dorm::class);
    }
}
