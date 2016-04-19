<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ApiRequest;

class AuthenticateRequest extends ApiRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email'    => 'required|email',
            'password' => 'required'
        ];
    }
}
