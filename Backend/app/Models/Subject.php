<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $table = 'subjects';

    protected $fillable = [
        'name',
        'day',
        'year',
        'jenjang',
        'classroom_id',
        'mudaris_id',
    ];

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }

    public function mudaris()
    {
        return $this->belongsTo(Mudaris::class);
    }

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }
}
