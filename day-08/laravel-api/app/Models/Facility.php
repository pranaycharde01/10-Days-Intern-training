<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Inspection;

class Facility extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location',
        'cleanliness_score',
        'status',
    ];

    public function inspections()
    {
        return $this->hasMany(Inspection::class);
    }
}
