<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dorm extends Model
{
    protected $table = 'dorms';

    protected $fillable = [
        'name', 'capacity', 'mudaris_id'
    ];

    public function mudaris()
    {
        return $this->belongsTo(Mudaris::class);
    }

    public function dormAssignments()
    {
        return $this->hasMany(DormAssignment::class);
    }
}
