<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Category\CategoryController;
use App\Transformers\Article\ArticleTransformer;
use App\Http\Controllers\ApiController;
use App\DBModels\Article;
use Illuminate\Http\Request;

class PublicArticleController extends ApiController
{
    /**
     * @var ArticleTransformer
     */
    protected $articleTransformer;

    /**
     * @var CategoryController
     */
    protected $categoryController;

    /**
     * ArticleController constructor.
     * @param ArticleTransformer $articleTransformer
     * @param CategoryController $categoryController
     */
    public function __construct(ArticleTransformer $articleTransformer, CategoryController $categoryController)
    {
        $this->articleTransformer = $articleTransformer;
        $this->categoryController = $categoryController;
    }

    /**
     * Return a collection of articles, categories and top articles.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function get(Request $request)
    {
        $articles = Article::latest()->public()->with('images', 'categories', 'user')->paginator($request->input('page'));

        if (count($articles)) {
            // 'page' query string is available; add one to it for next page.
            if ($request->input('page')) {
                $nextPage = $request->input('page') + 1;
            }
            // 'page' query string param is not available. Default the next page to 2.
            else {
                $nextPage = 2;
            }

            return $this->respond([
                'articles'    => $this->articleTransformer->transformCollection($articles),
                'nextPageUrl' => '/articles?page=' . $nextPage
            ]);
        }

        return $this->respondWithMessage('No more pages to load!');
    }

    /**
     * @param $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function one($slug)
    {
        $article = Article::where('slug', $slug)->public()->with('images', 'categories', 'user')->first();

        if ($article) {
            $article->increment('view_count', 1);

            return $this->respond([
                'article' => $this->articleTransformer->transform($article)
            ]);
        }

        return $this->respondNotFound('Article does not exist.');
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function topStories()
    {
        $articles = Article::orderBy('like_count', 'desc')->public()->with('user')->take(5)->get();

        return $this->respond([
            'articles' => $this->articleTransformer->transformCollection($articles)
        ]);
    }

    /**
     * @param $id
     */
    public function heart($id)
    {
        $article = Article::where('id', $id)->first();

        $article->increment('like_count');
    }

    /**
     * @param $id
     */
    public function unheart($id)
    {
        $article = Article::where('id', $id)->first();

        $article->decrement('like_count');
    }
}