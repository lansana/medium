<?php

namespace App\Transformers\User;

use App\Transformers\Transformer;

class UserTransformer extends Transformer
{
    /**
     * Transform a user.
     *
     * @param $user
     * @return array
     */
    public function transform($user)
    {
        return [
            'name'            => $user['name'],
            'username'        => $user['username'],
            'email'           => $user['email'],
            'profileImage'    => $user['profile_image'],
            'backgroundImage' => $user['background_image'],
            'bio'             => $user['bio']
        ];
    }
}