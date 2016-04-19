<?php

namespace App\Transformers;

abstract class Transformer
{
    /**
     * @param $item
     * @return mixed
     */
    public abstract function transform($item);

    /**
     * Transform a collection of items.
     *
     * @param $items
     * @return array
     */
    public function transformCollection($items)
    {
        return array_map([$this, 'transform'], $items->toArray());
    }

    /**
     * Transform a collection of an items child items.
     *
     * @param $item
     * @param $transformedItem
     * @param $property
     * @return mixed
     */
    public function transformChildCollection($item, $transformedItem, $property)
    {
        if (count($item[$property])) {
            $transformedItem[$property] = [];

            foreach ($item[$property] as $child) {
                $transformedItem[$property][] = $this->transform($child);
            }
        }

        return $transformedItem;
    }
}