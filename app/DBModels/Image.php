<?php

namespace App\DBModels;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Image extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'images';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'path', 'article_id'
    ];


    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['created_at'];


    /**
     * Change the formatting of created_at on all images to 2015/01 for example, for the upload path.
     *
     * @param $date
     * @return mixed
     */
    public function getCreatedAtAttribute($date)
    {
        return Carbon::parse($date)->format('Y/m');
    }


    /**
     * Get the article associated with the given images.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function articles()
    {
        return $this->belongsTo('App\DBModels\Article');
    }
}
