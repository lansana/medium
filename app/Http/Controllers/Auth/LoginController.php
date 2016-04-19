<?php

namespace App\Http\Controllers\Auth;

use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

use App\Http\Requests\Auth\AuthenticateRequest;
use App\Transformers\User\UserTransformer;
use App\Http\Controllers\ApiController;
use App\Http\Requests;
use JWTAuth;

class LoginController extends ApiController
{
    private $userTransformer = null;

    /**
     * LoginController constructor.
     * @param UserTransformer $userTransformer
     */
    public function __construct(UserTransformer $userTransformer)
    {
        $this->middleware('jwt.auth', [
            'except' => ['authenticate']
        ]);

        $this->userTransformer = $userTransformer;
    }

    /**
     * Authenticate credentials and return a JWT corresponding to that user.
     * If a user just registered, use those credentials. Otherwise, use the
     * credentials of the request (an already existing user).
     *
     * @param AuthenticateRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticate(AuthenticateRequest $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials))
                return $this->respondUnauthorized('Your credentials don\'t match our records.');
        } catch (JWTException $e) {
            return $this->respondInternalError('Could not create token.');
        }

        return $this->respond(['token' => $token]);
    }

    /**
     * Use the JWT to find a user and return its JSON if no errors occur.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate())
                return $this->respondNotFound('User not found!');
        } catch (TokenExpiredException $e) {
            return $this->respond(['token_expired'], $e->getStatusCode());
        } catch (TokenInvalidException $e) {
            return $this->respond(['token_invalid'], $e->getStatusCode());
        } catch (JWTException $e) {
            return $this->respond(['token_absent'], $e->getStatusCode());
        }

        // The token is valid and we have found the user via the sub claim
        return $this->respond([
            'user' => $this->userTransformer->transform($user)
        ]);
    }
}
