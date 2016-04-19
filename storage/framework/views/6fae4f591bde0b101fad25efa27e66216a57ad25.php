<!doctype html>
<html lang="en" ng-app="app" nav-open>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">

        <title ng-bind="viewTitle ? viewTitle : 'App'">App</title>

        <base href="/">

        <link href="//fonts.googleapis.com/css?family=Lato:100,300,400,700" media="all" rel="stylesheet" type="text/css"/>
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha256-3dkvEK0WLHRJ7/Csr0BZjAWxERc5WH7bdeUya2aXxdU= sha512-+L4yy6FRcDGbXJ9mPG8MT/3UCDzwR9gPeyFNMCtInsol++5m3bk2bXWKdZjvybmohrAsn3Ua5x8gfLnbE1YkOg==" crossorigin="anonymous">
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha256-7s5uDGW3AHqw6xtJmNNtr+OBRJUlgkNJEo78P4b0yRw= sha512-nNo+yCHEyn0smMxSswnf/OnX6/KwJuZTlNZBjauKhTK0c+zT+q5JOCx0UFhXQ6rJR9jg6Es8gPuD2uZcYDLqSw==" crossorigin="anonymous">

        <link rel="stylesheet" href="<?php echo e(asset('css/app.css')); ?>">
    </head>

    <body nav-open>
        <div ui-view></div>

        <script type="text/javascript" src="<?php echo e(asset('bower_components/dependencies.min.js')); ?>"></script>

        <script type="text/javascript" src="<?php echo e(asset('app/views-and-partials.min.js')); ?>"></script>

        <script type="text/javascript" src="<?php echo e(asset('app/app.min.js')); ?>"></script>
    </body>
</html>
