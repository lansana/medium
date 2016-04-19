<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ApiRequest;

class PasswordRequest extends ApiRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'password'    => 'required|min:8',
            'newPassword' => 'required|min:8|same:password'
        ];
    }
}
