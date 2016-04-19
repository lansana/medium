<?php

namespace App\Http\Controllers\Article;

use App\Transformers\Article\ArticleTransformer;
use App\Http\Requests\Article\ArticleRequest;
use App\Http\Controllers\ApiController;
use App\DBModels\Article;
use Carbon\Carbon;
use Illuminate\Http\Request;
use JWTAuth;

class PrivateArticleController extends ApiController
{
    /**
     * @var ArticleTransformer
     */
    protected $articleTransformer;

    /**
     * @var
     */
    protected $user;

    /**
     * ArticleController constructor.
     * @param ArticleTransformer $articleTransformer
     */
    public function __construct(ArticleTransformer $articleTransformer)
    {
        $this->articleTransformer = $articleTransformer;
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function getDraft($slug)
    {
        $article = Article::where('slug', $slug)->draft()->with('images', 'categories', 'user')->first();

        if ($article) {
            $article->increment('view_count', 1);

            return $this->respond([
                'article' => $this->articleTransformer->transform($article)
            ]);
        }

        return $this->respondNotFound('Article does not exist.');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createPublic(Request $request)
    {
        $article = $this->user->articles()->create($request->all());

        $article->categories()->sync($request->input('categoryIdList'));

        $article->published_at = Carbon::now();

        $article->save();

        return $this->respond([
            'article' => $this->articleTransformer->transform($article->load('user'))
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveDraft(Request $request)
    {
        $article = Article::where('id', $request->input('id'))->draft()->first();

        // Draft exists, update it
        if ($article) {
            $article->update($request->all());
        }
        // Draft does not exist, create it
        else {
            $article = $this->user->articles()->create($request->all());
            $article->slug = randomString();
            $article->save();
        }

        $article->categories()->sync($request->input('categoryIdList'));

        return $this->respond([
            'article' => $this->articleTransformer->transform($article),
            'message' => 'Your changes have been saved.'
        ]);
    }

    /**
     * Verify the user with the article and update the article.
     *
     * @param Request $request
     * @param $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request, $slug)
    {
        $article = Article::where('slug', $slug)->first();

        if ($article->user_id == $this->user->id) {
            $article->update($request->all());

            $article->categories()->sync($request->input('categoryIdList'));

            return $this->respond([
                'article' => $this->articleTransformer->transform($article->load('images', 'user', 'categories')),
                'message' => 'Your changes have been published.'
            ]);
        }

        return $this->respondUnauthorized("You are not the owner of this article. Only the owner can make edits!");
    }

    /**
     * Verify the user with the public article. This is used solely for
     * access-control purposes.
     *
     * @param $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyEdit($slug)
    {
        $article = Article::where('slug', $slug)->first();

        if ($article->user_id == $this->user->id) {
            return $this->respondWithMessage("User has access to edit this article!");
        }

        return $this->respondUnauthorized("You are not the owner of this article. Only the owner can make edits!");
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function draftList()
    {
        $articles = Article::where('user_id', $this->user->id)->draft()->latest()->with('user')->get();

        if (count($articles)) {
            return $this->respond([
                'drafts' => $this->articleTransformer->transformCollection($articles)
            ]);
        }

        return $this->respondWithMessage("You have no drafts.");
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function publishedList()
    {
        $articles = Article::where('user_id', $this->user->id)->public()->latest()->with('user')->get();

        if (count($articles)) {
            return $this->respond([
                'articles' => $this->articleTransformer->transformCollection($articles)
            ]);
        }

        return $this->respondWithMessage("You haven't published any stories yet.");
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function unpublishedList()
    {
        $articles = Article::onlyTrashed()->where('user_id', $this->user->id)->latest()->with('user')->get();

        if (count($articles)) {
            return $this->respond([
                'articles' => $this->articleTransformer->transformCollection($articles)
            ]);
        }

        return $this->respondWithMessage("You don't have any unpublished stories.");
    }

    /**
     * @param $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function publish($slug)
    {
        $article = Article::onlyTrashed()->where('slug', $slug)->first();

        if ($article->restore()) {
            return $this->respondWithMessage('"' . $article->title . '" has been published.');
        }
    }

    /**
     * @param $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function unpublish($slug)
    {
        $article = Article::where('slug', $slug)->first();

        $article->delete();

        if ($article->trashed()) {
            return $this->respondWithMessage('"' . $article->title . '" has been unpublished.');
        }
    }

    /**
     * @param $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($slug)
    {
        $article = Article::withTrashed()->where('slug', $slug)->first();

        $article->forceDelete();

        return $this->respondWithMessage('"'. $article->title . '" has been deleted.');
    }
}