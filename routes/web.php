<?php


Auth::routes();

Route::group(['middleware' => 'auth'], function () {
    Route::get('/', 'TimelineController@index');
    Route::post('/posts', 'PostController@create');

    Route::get('/users/{user}', 'UserController@index');
    Route::get('/users/{user}/follow', 'UserController@follow')->name('users.follow');
});
