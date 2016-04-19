<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ApiRequest;

class SignupRequest extends ApiRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'                 => 'required|min:5',
            'email'                => 'required|email|unique:users',
            'password'             => 'required|min:8',
            'passwordConfirmation' => 'required|min:8|same:password'
        ];
    }
}
