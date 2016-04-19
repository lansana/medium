<?php

namespace App\Traits;

trait SearchableTrait
{
    /**
     * Search scope to be used on any model.
     *
     * @param $query
     * @param $searchString ; Query string: "steve jobs inspirational quotes"
     * @return mixed
     */
    public function scopeSearch($query, $searchString)
    {
        $searchTerms = $this->createSearchTerms($searchString);

        $query->where(function ($q) use ($searchTerms) {
            foreach ($this->searchableFields as $field) {
                foreach ($searchTerms as $word) {
                    $q->orWhere($field, 'LIKE', "%$word%");
                }
            }
        });

        return $query;
    }

    /**
     * Turn the search string into an array of words that are cleaned of ignored words.
     *
     * Ex: "Steve Jobs and Les Brown inspiration" = ['Steve', 'Jobs', ''Les', 'Brown', 'inspiration']
     *
     * @param $searchString
     * @return array
     */
    private function createSearchTerms($searchString)
    {
        $searchTermArray = explode(' ', $searchString);

        $cleanedSearchTermArray = removeIgnoredWords($searchTermArray);

        return $cleanedSearchTermArray;
    }
}