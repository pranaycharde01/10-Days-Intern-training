<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inspection extends Model
{
    use HasFactory;

    protected $fillable = [
        'facility_id',
        'inspector_name',
        'inspection_date',
        'score',
        'remarks',
    ];

    public function facility()
    {
        return $this->belongsTo(Facility::class);
    }
}
