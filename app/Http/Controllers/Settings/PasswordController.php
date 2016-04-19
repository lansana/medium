<?php

namespace App\Http\Controllers\Settings;

use App\Http\Requests\Settings\PasswordRequest;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use App\DBModels\User;

class PasswordController extends ApiController
{
    /**
     * @param PasswordRequest $request
     * @return \Illuminate\Http\JsonResponse|void
     */
    public function updatePassword(PasswordRequest $request)
    {
        $user = User::where('username', $request->input('username'))->first();

        if ($user) {
            $credentials = [
                'email'    => $request->input('email'),
                'password' => $request->input('password')
            ];

            if (Auth::validate($credentials)) {
                $user->setPassword($request['new_password'])->save();

                return $this->respondWithMessage('Your password has been successfully updated!');
            }

            return $this->respondUnauthorized("Incorrect password! Please enter your current password.");
        }

        return $this->respondNotFound("User not found!");
    }
}
