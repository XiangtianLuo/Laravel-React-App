<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['trackingNumber','description','status','freightCompany','customer_name'];
    public function user() { //this name is an access to get value from the table according to the relationship defined
        return $this->belongsTo(User::class);
    }
}
