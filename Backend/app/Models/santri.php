<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Santri extends Model
{
    protected $table = 'santri';

    protected $fillable = [
        'name',
        // 'gender',
        'tgl_lahir',
        'address',
        'no_hp',
        'pp_santri',
        'user_id'
    ];

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    public function dormAssignments()
    {
        return $this->hasMany(DormAssignment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
