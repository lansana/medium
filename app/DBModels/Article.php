<?php

namespace App\DBModels;

use Cviebrock\EloquentSluggable\SluggableInterface;
use Cviebrock\EloquentSluggable\SluggableTrait;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use App\Traits\SearchableTrait;
use App\Traits\PaginatorTrait;

class Article extends Model implements SluggableInterface
{
    use SluggableTrait, SearchableTrait, PaginatorTrait, SoftDeletes;

    /**
     * @var string
     */
    protected $table = 'articles';

    /**
     * @var array
     */
    protected $fillable = ['title', 'body'];

    /**
     * The searchable fields.
     *
     * @var array
     */
    protected $searchableFields = ['title', 'body'];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['published_at', 'deleted_at'];

    /**
     * Using eloquent-sluggable package to slug the titles. Duplicate
     * titles will be appended with an incrementing number.
     *
     * @var array
     */
    protected $sluggable = [
        'build_from' => 'title',
        'save_to'    => 'slug'
    ];

    /**
     * Create an SEO friendly meta description from the body.
     */
    public function setMetaDescriptionAttribute()
    {
        $this->attributes['meta_description'] = seoFriendlyMetaDescription($this->attributes['body']);
    }

    /**
     * Remove all script tags from the body (prevent XSS attacks)
     * since we are trusting all html in the AngularJS views.
     *
     * @param $value
     */
    public function setBodyAttribute($value)
    {
        $this->attributes['body'] = removeScriptTags($value);
    }

    /**
     * @param $query
     * @return mixed
     */
    public function scopePublic($query)
    {
        return $query->whereNotNull('published_at');
    }

    /**
     * @param $query
     * @return mixed
     */
    public function scopeDraft($query)
    {
        return $query->whereNull('published_at');
    }

    /**
     * An article is owned by a user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\DBModels\User');
    }

    /**
     * Get the tags associated with the given article.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function categories()
    {
        return $this->belongsToMany('App\DBModels\Category');
    }

    /**
     * Get the images associated with the given article.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function images()
    {
        return $this->hasOne('App\DBModels\Image');
    }
}
