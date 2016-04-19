<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ApiRequest;

class ResetRequest extends ApiRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'token'                => 'required',
            'password'             => 'required|min:8',
            'passwordConfirmation' => 'required|min:8|same:password'
        ];
    }
}
