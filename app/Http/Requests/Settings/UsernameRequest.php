<?php

namespace App\Http\Requests\Settings;

use App\Http\Requests\ApiRequest;

class UsernameRequest extends ApiRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => 'required|unique:users,username'
        ];
    }
}
