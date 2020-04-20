<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    public function tasks() {
        return $this->belongsToMany(Task::class)->withTimestamps()->withPivot('quantity');
    }
}
