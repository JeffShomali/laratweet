<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $appends = ['avatar']; // ?

    // User has many post relationship also we need inversion relationship in Post modal
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function getAvatar()
    {
        return 'https://gravatar.com/avatar/'. md5($this->email). '/?s=45&=mm';
    }

    public function getAvatarAttribute() // ?
    {
        return $this->getAvatar();
    }
    public function getRouteKeyName()
    {
        return 'username';
    }
}
