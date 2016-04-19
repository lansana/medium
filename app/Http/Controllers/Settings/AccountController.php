<?php

namespace App\Http\Controllers\Settings;

use App\Http\Requests\Settings\UsernameRequest;
use App\Http\Requests\Settings\BioRequest;
use App\Transformers\User\UserTransformer;
use App\Http\Controllers\ApiController;
use JWTAuth;

class AccountController extends ApiController
{
    /**
     * @var UserTransformer
     */
    protected $userTransformer;

    /**
     * @var
     */
    protected $user;

    /**
     * AccountController constructor.
     * @param UserTransformer $userTransformer
     */
    public function __construct(UserTransformer $userTransformer)
    {
        $this->userTransformer = $userTransformer;
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    /**
     * @param UsernameRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateUsername(UsernameRequest $request)
    {
        $usernameUpdated = $this->user->setUsername($request->input('username'))->save();

        if ($usernameUpdated) {
            return $this->respond($this->userAndMessage('Your username has been successfully updated!'));
        }

        return $this->respondInternalError('There was a problem updating the username');
    }

    /**
     * @param BioRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateBio(BioRequest $request)
    {
        $bioUpdated = $this->user->setBio($request->input('bio'))->save();

        if ($bioUpdated) {
            return $this->respond($this->userAndMessage('Your bio has been successfully updated!'));
        }

        return $this->respondInternalError('There was a problem updating the bio');
    }

    /**
     * @param $message
     * @return array
     */
    private function userAndMessage($message)
    {
        return [
            'user'    => $this->userTransformer->transform($this->user),
            'message' => $message
        ];
    }
}