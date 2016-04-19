<?php

use Illuminate\Database\Seeder;
use App\DBModels\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();

        User::create([
            'name'     => 'Lansana Camara',
            'email'    => 'lxc5296@gmail.com',
            'password' => bcrypt(env('PASSWORD')),
            'is_admin' => true
        ]);
    }
}
