<?php

namespace App\Http\Controllers\Search;

use App\Transformers\Category\CategoryTransformer;
use App\Transformers\Article\ArticleTransformer;
use App\Transformers\User\UserTransformer;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\DBModels\Category;
use App\DBModels\Article;
use App\DBModels\User;

class SearchController extends ApiController
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
     * @var CategoryTransformer
     */
    protected $categoryTransformer;

    /**
     * @var array|string
     */
    protected $q;

    /**
     * SearchController constructor.
     * @param UserTransformer $userTransformer
     * @param ArticleTransformer $articleTransformer
     * @param CategoryTransformer $categoryTransformer
     * @param Request $request
     */
    public function __construct(
        UserTransformer $userTransformer,
        ArticleTransformer $articleTransformer,
        CategoryTransformer $categoryTransformer,
        Request $request
    )
    {
        $this->userTransformer = $userTransformer;
        $this->articleTransformer = $articleTransformer;
        $this->categoryTransformer = $categoryTransformer;
        $this->q = $request->input('q');
    }

    /**
     * Return JSON response of transformed users, articles and categories.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchAll()
    {
        return $this->respond([
            'users'      => $this->userTransformer->transformCollection($this->users()),
            'articles'   => $this->articleTransformer->transformCollection($this->articles()),
            'categories' => $this->categoryTransformer->transformCollection($this->categories())
        ]);
    }

    /**
     * Return JSON response of users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchUsers()
    {
        return $this->respond([
            'users' => $this->userTransformer->transformCollection($this->users())
        ]);
    }

    /**
     * Return JSON response of articles.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchArticles()
    {
        return $this->respond([
            'articles' => $this->articleTransformer->transformCollection($this->articles())
        ]);
    }

    /**
     * Return JSON response of categories.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchCategories()
    {
        return $this->respond([
            'categories' => $this->categoryTransformer->transformCollection($this->categories())
        ]);
    }

    /**
     * Return user(s) for given search string and searchable fields.
     *
     * @return mixed
     */
    private function users()
    {
        return User::search($this->q)->get();
    }

    /**
     * Return article(s) for given search string and searchable fields.
     *
     * @return mixed
     */
    private function articles()
    {
        return Article::search($this->q)->latest()->with('images', 'user')->get();
    }

    /**
     * Return category(s) for given search string and searchable fields.
     *
     * @return mixed
     */
    private function categories()
    {
        return Category::search($this->q)->get();
    }
}