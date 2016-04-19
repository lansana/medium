<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('is_admin')->default(false);

            $table->string('username');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password', 60);

            // TODO: Social authentication
            // http://www.codeanchor.net/blog/complete-laravel-socialite-tutorial/

            $table->string('profile_image')->default('/images/defaults/default-profile-image.png');
            $table->string('background_image');
            $table->string('bio');
            $table->string('dob');
            $table->string('location');
            $table->string('website');

            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
