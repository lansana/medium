<?php

use Carbon\Carbon;

/**
 * Turn '2016-02-17 08:27:32' into '1 week ago'
 *
 * @param $date
 * @return string
 */
function humanReadable($date)
{
    return Carbon::parse($date)->diffForHumans();
}

/**
 * Remove common words from an array.
 *
 * For example, ['steve', 'the', 'jobs'] will return as ['steve', 'jobs']
 *
 * @param array $words
 * @return array
 */
function removeIgnoredWords(array $words)
{
    $ignoredWords = config('constants.IGNORED_WORDS');

    $wordsCount = sizeof($words);

    for ($i = 0; $i < $wordsCount; $i++) {
        if (in_array($words[$i], $ignoredWords)) unset($words[$i]);
    }

    return $words;
}

/**
 * Generate a "random" alpha-numeric string. NOT meant for security purposes.
 *
 * @param int $length
 * @return string
 */
function randomString($length = 20)
{
    $pool = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return substr(str_shuffle(str_repeat($pool, $length)),0, $length);
}

/**
 * Make SEO friendly. Turn HTML to unicode, limit to 150 chars.
 *
 * @param $html
 * @return string
 */
function seoFriendlyMetaDescription($html)
{
    $string = htmlspecialchars($html);

    return str_limit($string, 150);
}

/**
 * Remove script tags from HTML to prevent XSS attacks.
 *
 * @param $html
 * @return string
 */
function removeScriptTags($html)
{
    $doc = new DOMDocument();

    if ($html !== '') {
        // Load the HTML string we want to strip
        $doc->loadHTML($html);

        // Get all script tags
        $scriptTags = $doc->getElementsByTagName('script');

        $length = $scriptTags->length;

        // For each tag, remove it from the DOM
        for ($i = 0; $i < $length; $i++) {
            $scriptTags->item($i)->parentNode->removeChild($scriptTags->item($i));
        }

        // Get the HTML string back (cleaned of script tags)
        $noScriptHtmlString = $doc->saveHTML();

        return $noScriptHtmlString;
    }

    return $html;
}