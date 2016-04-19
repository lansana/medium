<?php

namespace App\Transformers\Image;

use App\Transformers\Transformer;

class ImageTransformer extends Transformer
{
    /**
     * @param $image
     * @return array
     */
    public function transform($image)
    {
        return [
            'path'      => $image['path'],
            'createdAt' => $image['created_at']
        ];
    }
}