<?php

namespace App\DBModels;

use Illuminate\Database\Eloquent\Model;
use App\Traits\SearchableTrait;

class Category extends Model
{
    use SearchableTrait;

    /**
     * Fillable fields for a category.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'meta_description'
    ];

    /**
     * The searchable fields.
     *
     * @var array
     */
    protected $searchableFields = ['name', 'meta_description'];

    /**
     * Capitalizing the first letters of all category names
     *
     * Be careful with this as you may want something to be
     * specifically lowercase, for example, and this get-accessor
     * will still capitalize the first letters.
     *
     * @param $value
     * @return string
     */
    public function getNameAttribute($value)
    {
        return ucwords($value);
    }

    /**
     * Get the articles associated with the given category.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function articles()
    {
        return $this->belongsToMany('App\DBModels\Article');
    }

    /**
     * Get the drafts associated with the given category.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function drafts()
    {
        return $this->belongsToMany('App\DBModels\Draft');
    }
}
