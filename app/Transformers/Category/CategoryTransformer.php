<?php

namespace App\Transformers\Category;

use App\Transformers\Transformer;

class CategoryTransformer extends Transformer
{
    /**
     * @param $category
     * @return array
     */
    public function transform($category)
    {
        return [
            'id'          => $category['id'],
            'name'        => $category['name'],
            'slug'        => $category['slug'],
            'description' => $category['meta_description'],
        ];
    }
}