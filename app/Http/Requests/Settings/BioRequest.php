<?php

namespace App\Http\Requests\Settings;

use App\Http\Requests\ApiRequest;

class BioRequest extends ApiRequest
{
    /**
     * @return array
     */
    public function rules()
    {
        return [
            'bio' => 'required'
        ];
    }
}