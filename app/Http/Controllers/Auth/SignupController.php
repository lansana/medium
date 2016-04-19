<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\Auth\SignupRequest;
use App\Http\Controllers\ApiController;
use App\DBModels\User;

class SignupController extends ApiController
{
    /**
     * @param SignupRequest $request
     * @return \Illuminate\Http\JsonResponse|void
     */
    public function createUser(SignupRequest $request)
    {
        $newUser = $request->only('name', 'email', 'password');
        $securePassword = bcrypt($request->input('password'));
        $newUser['password'] = $securePassword;

        if (User::create($newUser)) return;

        return $this->respondInternalError("User could not be created");
    }
}
