<?php

// Private routes (token required for access to controllers)
Route::group([
    'middleware' => ['cors', 'jwt.auth'],
    'prefix'     => 'api/v1'
], function () {

    // Settings
    Route::group(['namespace' => 'Settings'], function () {

        Route::put('settings/password', 'PasswordController@updatePassword');

        Route::put('settings/account/username', 'AccountController@updateUsername');
        Route::put('settings/account/bio', 'AccountController@updateBio');

    });

    // Article
    Route::group(['namespace' => 'Article'], function () {

        Route::get('articles/{slug}/draft', 'PrivateArticleController@getDraft');

        Route::post('articles/create/public', 'PrivateArticleController@createPublic');
        Route::put('articles/save/draft', 'PrivateArticleController@saveDraft');

        Route::put('articles/{slug}/edit', 'PrivateArticleController@edit');
        Route::post('articles/{slug}/edit/verify', 'PrivateArticleController@verifyEdit');

        Route::get('articles/draft', 'PrivateArticleController@draftList');

        Route::get('articles/published', 'PrivateArticleController@publishedList');
        Route::get('articles/unpublished', 'PrivateArticleController@unpublishedList');

        Route::put('articles/{slug}/unpublish', 'PrivateArticleController@unpublish');
        Route::put('articles/{slug}/publish', 'PrivateArticleController@publish');

        Route::put('articles/{slug}/delete', 'PrivateArticleController@delete');

    });

});

// Public routes (no token needed unless otherwise specified in controller constructor)
Route::group([
    'middleware' => 'cors',
    'prefix'     => 'api/v1'
], function () {

    // Authentication
    Route::group(['namespace' => 'Auth'], function () {

        Route::post('signup', 'SignupController@createUser');

        Route::post('authenticate', 'LoginController@authenticate');
        Route::get('authenticate/user', 'LoginController@getAuthenticatedUser');

        Route::post('logout', 'LogoutController@logout');

        Route::post('reset', 'PasswordController@postEmail');
        Route::post('reset/{token}', 'PasswordController@postReset');
        Route::get('reset/verify/{token}', 'PasswordController@verifyToken');

    });

    // Profile
    Route::group(['namespace' => 'Profile'], function () {

        Route::get('profile/user/{username}', 'ProfileController@getUser');

    });

    // Article
    Route::group(['namespace' => 'Article'], function () {

        Route::get('top-stories', 'PublicArticleController@topStories');
        Route::get('articles', 'PublicArticleController@get');
        Route::get('articles/{slug}', 'PublicArticleController@one');

        Route::put('articles/{id}/heart', 'PublicArticleController@heart');
        Route::put('articles/{id}/unheart', 'PublicArticleController@unheart');

    });

    // Category
    Route::group(['namespace' => 'Category'], function() {

        Route::get('category/{slug}', 'CategoryController@getArticles');

    });

    // Search
    Route::group(['namespace' => 'Search'], function() {

        Route::get('search', 'SearchController@searchAll');
        Route::get('search/users', 'SearchController@searchUsers');
        Route::get('search/articles', 'SearchController@searchArticles');
        Route::get('search/categories', 'SearchController@searchCategories');

    });

});

// Catch all route for UI-Router in front end
Route::get('{catchall}', function () {
    return view('index');
})->where('catchall', '(.*)');