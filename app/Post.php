<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['body'];
    // Post belongs to User Relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
