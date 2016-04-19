<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Auth;
use JWTAuth;

class LogoutController extends ApiController
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    public function logout()
    {
        // Log out user from laravel session if logged in (shouldn't be).
        if (Auth::user()) Auth::logout();

        // When the user logs out in the front end, their token is removed
        // from the local storage so it cannot be sent with any more requests.
        // We need to also invalidate the token here in the back end to prevent
        // any malicious activity.
        if (JWTAuth::parseToken()->invalidate()) return;

        return $this->respondUnauthorized("No authorizable token found in request.");
    }
}
