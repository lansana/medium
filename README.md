# Medium

This is a Medium.com clone. I built it in AngularJS and Laravel, and it took about 2-3 months.

Check out the walk-through [here](https://www.youtube.com/watch?v=n-vsNmj5AcY&feature=youtu.be).

## Features
- users
- profiles (settings, update profile, etc.)
- stories (drafts, published stories, unpublished stories, etc.)
- categories 
- global search (users, stories, categories, etc.)
- and more

## Getting Started

First, clone the repository and cd into it:

```bash
git clone https://github.com/lansana/medium
cd medium
```

Next, update and install with composer:

```bash
composer update --no-scripts
composer install
```

Next, create a .env file off of the .env.example and set the `APP_KEY` variable to the result of the following command:

```bash
php artisan key:generate
```

Next, edit the .env file to hold your MySQL database credentials/host information.

Lastly, run the following command to migrate your database using the credentials:

```bash
php artisan migrate
```

You should now be able to start the server using `php artisan serve --port=80` and go to http://localhost to view the app!

## UI Development

In order to develop in the UI, you will need to install the node modules"

```bash
npm install
```

Once you do that, you can use `gulp watch` to rebuild the front end assets when developing, and `gulp --production` to bundle a production-ready asset bundle.

## Architecture Overview

The whole app is a single page application, using a REST API built in PHP.

Data storage in MySQL.

Authentication is done using a JWT.

The front end is composed of modules, such that everything is done once and reused in multiple places. I also use Gulp for build automation.

## Contributing

Feel free to contribute to anything~ There are plenty of small bugs that I am aware of but have forgotten to take care of. Go ahead and make the first pull request to fix them. ;)
