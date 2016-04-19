<?php

namespace App\DBModels;

use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Cviebrock\EloquentSluggable\SluggableInterface;
use Cviebrock\EloquentSluggable\SluggableTrait;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable;
use App\Traits\SearchableTrait;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract, SluggableInterface
{
    use Authenticatable, CanResetPassword, SluggableTrait, SearchableTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'profile_image',
        'background_image',
        'bio',
    ];

    /**
     * The searchable fields.
     *
     * @var array
     */
    protected $searchableFields = ['name', 'username', 'email', 'bio', 'location', 'website'];

    /**
     * Using eloquent-sluggable package to slug the names. Duplicate
     * names will be appended with an incrementing number.
     *
     * @var array
     */
    protected $sluggable = [
        'build_from' => 'name',
        'save_to'    => 'username'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * Update the users bio attribute.
     *
     * @param $string
     * @return $this
     */
    public function setBio($string)
    {
        $this->setAttribute('bio', $string);

        return $this;
    }

    /**
     * Update the users username attribute.
     *
     * @param $string
     * @return mixed
     */
    public function setUsername($string)
    {
        $this->setAttribute('username', $string);

        return $this;
    }

    /**
     * Store a user password to the database
     * with automatic encryption.
     *
     * @param $string
     * @return $this
     */
    public function setPassword($string)
    {
        $this->setAttribute('password', bcrypt($string));

        return $this;
    }

    /**
     * A user can have many articles.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function articles()
    {
        return $this->hasMany('App\DBModels\Article');
    }

    /**
     * A user can have many drafts.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function drafts()
    {
        return $this->hasMany('App\DBModels\Draft');
    }
}
