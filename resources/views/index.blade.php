<!doctype html>
<html lang="en" data-ng-app="app">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">

        <title data-ng-bind="viewTitle ? viewTitle : 'The Art &amp; Science of Self Improvement'"></title>

        <link href='http://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>

        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">

        <link rel="stylesheet" href="{{ asset('app/app.css') }}">
    </head>

    <body>
        <div data-ui-view></div>

        <script type="text/javascript" src="{{ asset('app/dependencies.min.js') }}"></script>

        <script type="text/javascript" src="{{ asset('app/views-and-partials.min.js') }}"></script>

        <script type="text/javascript" src="{{ asset('app/app.min.js') }}"></script>
    </body>
</html>