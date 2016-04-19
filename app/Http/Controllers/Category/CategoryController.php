<?php

namespace App\Http\Controllers\Category;

use App\Transformers\Article\ArticleTransformer;
use App\Transformers\Category\CategoryTransformer;
use App\Http\Controllers\ApiController;
use App\DBModels\Category;

class CategoryController extends ApiController
{
    /**
     * @var CategoryTransformer
     */
    protected $categoryTransformer;

    /**
     * @var ArticleTransformer
     */
    protected $articleTransformer;

    /**
     * CategoryController constructor.
     * @param CategoryTransformer $categoryTransformer
     * @param ArticleTransformer $articleTransformer
     */
    public function __construct(CategoryTransformer $categoryTransformer, ArticleTransformer $articleTransformer)
    {
        $this->categoryTransformer = $categoryTransformer;
        $this->articleTransformer = $articleTransformer;
    }

    /**
     * @param $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function getArticles($slug)
    {
        $category = Category::where('slug', $slug)->first();

        if ($category) {
            $articles = $category->articles()->latest()->with('categories', 'images', 'user')->get();

            if ($articles) {
                return $this->respond([
                    'category' => $this->categoryTransformer->transform($category),
                    'articles' => $this->articleTransformer->transformCollection($articles)
                ]);
            }

            return $this->respondNotFound('No articles found for the category: ' . $category->name . '.');
        }

        return $this->respondNotFound('No category found for the slug: ' . $slug . '.');
    }

    /**
     * @return array
     */
    public function getCategories()
    {
        $categories = Category::all();

        return $this->categoryTransformer->transformCollection($categories);
    }
}