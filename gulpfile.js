var elixir = require('laravel-elixir');

require('./resources/tasks/ngHtml2Js.task.js');
require('laravel-elixir-angular');

elixir(function(mix) {
        mix.sass([

            // Main
            './angular/assets/sass/app.scss',

            // Util
            './angular/assets/sass/util/loading-bar.scss',
            './angular/assets/sass/util/tooltips.scss',
            './angular/assets/sass/util/animations.scss'

        ], 'public/app/app.css');

        mix.ngHtml2Js('./angular/**/*.html', 'public/app/views-and-partials.min.js', {
            moduleName: 'viewsAndPartials',
            prefix: 'app/'
        });

        mix.scripts([

            // Bootstrap and jQuery
            'jquery/dist/jquery.min.js',
            'bootstrap/dist/js/bootstrap.min.js',

            // AngularJS
            'angular/angular.js',

            // Angular modules
            'angular-animate/angular-animate.min.js',
            'angular-sanitize/angular-sanitize.min.js',
            'angular-bootstrap/ui-bootstrap-tpls.min.js',

            // 3rd-party modules
            'angular-ui-router/release/angular-ui-router.min.js',
            'angular-permission/dist/angular-permission.js',
            'satellizer/satellizer.min.js',
            'angular-jwt/dist/angular-jwt.min.js',
            'angular-loading-bar/build/loading-bar.min.js',
            'angular-tooltips/dist/angular-tooltips.min.js'

        ], 'public/app/dependencies.min.js', './bower_components/');

        mix.angular('./angular/', 'public/app', 'app.min.js');
});
