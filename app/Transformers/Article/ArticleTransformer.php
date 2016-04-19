<?php

namespace App\Transformers\Article;

use App\Transformers\Category\CategoryTransformer;
use App\Transformers\Image\ImageTransformer;
use App\Transformers\User\UserTransformer;
use App\Transformers\Transformer;

class ArticleTransformer extends Transformer
{
    /**
     * @var CategoryTransformer
     */
    protected $categoryTransformer;

    /**
     * @var UserTransformer
     */
    protected $userTransformer;

    /**
     * @var ImageTransformer
     */
    protected $imageTransformer;

    /**
     * ArticleTransformer constructor.
     * @param CategoryTransformer $categoryTransformer
     * @param UserTransformer $userTransformer
     * @param ImageTransformer $imageTransformer
     */
    public function __construct(
        CategoryTransformer $categoryTransformer,
        UserTransformer $userTransformer,
        ImageTransformer $imageTransformer
    )
    {
        $this->categoryTransformer = $categoryTransformer;
        $this->userTransformer = $userTransformer;
        $this->imageTransformer = $imageTransformer;
    }

    /**
     * Transform a single article.
     *
     * @param $article
     * @return array
     */
    public function transform($article)
    {
        $transformedArticle = [
            'id'               => (int)$article['id'],
            'authorId'         => (int)$article['user_id'],
            'title'            => $article['title'],
            'slug'             => $article['slug'],
            'description'      => $article['meta_description'],
            'body'             => $article['body'],
            'viewCount'        => (int)$article['view_count'],
            'likeCount'        => (int)$article['like_count'],
            'createdAt'        => $article['created_at'],
            'updatedAt'        => $article['updated_at'],
            'publishedAt'      => $article['published_at'],
            'humanCreatedAt'   => humanReadable($article['created_at']),
            'humanUpdatedAt'   => humanReadable($article['updated_at']),
            'humanPublishedAt' => humanReadable($article['published_at']),
            'humanDeletedAt' => humanReadable($article['deleted_at'])
        ];

        // If 'user' property exists, transform the user
        if (data_get($article, 'user')) {
            $transformedArticle['author'] = $this->userTransformer->transform($article['user']);
        }

        // If 'images' property exists, transform the user
        if (data_get($article, 'images')) {
            $transformedArticle['image'] = $this->imageTransformer->transform($article['images']);
        }

        // If 'categories' property exists, transform each
        // category within the categories property.
        if (data_get($article, 'categories')) {
            $transformedArticle = $this->categoryTransformer->transformChildCollection(
                $article, $transformedArticle, 'categories'
            );
        }

        return $transformedArticle;
    }
}