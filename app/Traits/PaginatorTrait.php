<?php

namespace App\Traits;

trait PaginatorTrait
{
    /**
     * Simple paginator. Takes in query string param of page number.
     * Returns sets of specified amount of results, or default 5.
     *
     * @param $query
     * @param int $page
     * @param int $take
     * @return mixed
     */
    public function scopePaginator($query, $page = 1, $take = 5)
    {
        $skipAmount = $page * 5; // Turn 1 to 5, 2 to 10, etc. Intervals of 5.

        return $query->skip($skipAmount)->take($take)->get();
    }
}