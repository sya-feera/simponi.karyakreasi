<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mudaris extends Model
{
    protected $table = 'mudaris';

    protected $fillable = [
        'name',
        // 'gender',
        'address',
        'no_hp',
        'pp_mudaris',
        'user_id'
    ];

    public function dorms()
    {
        return $this->hasMany(Dorm::class);
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
