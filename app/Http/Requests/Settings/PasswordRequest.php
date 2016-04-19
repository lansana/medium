<?php

namespace App\Http\Requests\Settings;

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
            'password'                => 'required',
            'newPassword'             => 'required|min:8',
            'newPasswordConfirmation' => 'required|min:8|same:newPassword'
        ];
    }
}
