<?php

namespace App\Http\Controllers\Profile;

use App\Transformers\Article\ArticleTransformer;
use App\Transformers\User\UserTransformer;
use App\Http\Controllers\ApiController;
use App\DBModels\User;

class ProfileController extends ApiController
{
    /**
     * @var UserTransformer
     */
    protected $userTransformer;

    /**
     * @var ArticleTransformer
     */
    protected $articleTransformer;

    /**
     * UserController constructor.
     * @param UserTransformer $userTransformer
     * @param ArticleTransformer $articleTransformer
     */
    public function __construct(UserTransformer $userTransformer, ArticleTransformer $articleTransformer)
    {
        $this->userTransformer = $userTransformer;
        $this->articleTransformer = $articleTransformer;
    }

    /**
     * @param $username
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUser($username)
    {
        $user = User::where('username', $username)->first();

        if ($user) {
            $articles = $user->articles()->latest()->with('categories', 'images', 'user')->get();

            return $this->respond([
                'user'     => $this->userTransformer->transform($user),
                'articles' => $this->articleTransformer->transformCollection($articles)
            ]);
        }

        return $this->respondNotFound("We couldn't find the user you were looking for!");
    }
}