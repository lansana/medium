<?php

namespace App\Http\Controllers\Auth;

use App\DBModels\User;
use App\Http\Requests\Auth\EmailRequest;
use App\Http\Requests\Auth\ResetRequest;
use Illuminate\Support\Facades\Password;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\DB;
use Illuminate\Mail\Message;
use Carbon\Carbon;

class PasswordController extends ApiController
{
    /**
     * Send a reset link to the given user.
     *
     * @param EmailRequest $request
     * @return \Illuminate\Http\JsonResponse|void
     */
    public function postEmail(EmailRequest $request)
    {
        $response = Password::sendResetLink($request->only('email'), function (Message $message) {
            $message->subject($this->getEmailSubject());
        });

        switch ($response) {
            case Password::RESET_LINK_SENT:
                return $this->respondWithMessage('Your password reset link has been successfully sent!');
            case Password::INVALID_USER:
                return $this->respondUnprocessableEntity("We couldn't find your account with that information.");
        }
    }

    /**
     * Get the e-mail subject line to be used for the reset link email.
     *
     * @return string
     */
    protected function getEmailSubject()
    {
        return property_exists($this, 'subject') ? $this->subject : 'Your Password Reset Link';
    }

    /**
     * Validate the token sent in the reset url.
     *
     * @param $token
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyToken($token)
    {
        $token = DB::table('password_resets')->where('token', $token)->first();

        if ($token) {
            if ($token->created_at > Carbon::now()->subHours(2)) {
                return; // Token is valid and not expired. Simply return; sends 200 respond code.
            }

            return $this->respondUnauthorized("Token is valid but it's expired.");
        }

        return $this->respondUnauthorized("Token is invalid.");
    }

    /**
     * Reset the given user's password.
     *
     * @param ResetRequest $request
     * @return \Illuminate\Http\JsonResponse|void
     */
    public function postReset(ResetRequest $request)
    {
        $credentials = $request->only('password', 'passwordConfirmation', 'token');

        $snakeCaseCredentials = [
            'password'              => $credentials['password'],
            'password_confirmation' => $credentials['passwordConfirmation'],
            'token'                 => $credentials['token']
        ];

        $response = Password::reset($snakeCaseCredentials, function ($user, $password) {
            $this->resetPassword($user, $password);
        });

        switch ($response) {
            case Password::PASSWORD_RESET:
                return $this->respondWithMessage('Your password has been successfully reset!');
            default:
                return $this->respondBadRequest("To reset your password again, please submit a new password reset request.");
        }
    }

    /**
     * Reset the users password.
     *
     * @param User $user
     * @param $password
     * @return bool
     */
    protected function resetPassword(User $user, $password)
    {
        $user->setPassword($password)->save();
    }
}