# Medium

This is my rendition of Medium (medium.com). I built it in AngularJS and Laravel, and it took about 2-3 months.

Check out the walkthrough [here](https://youtu.be/YI9ojL-MrtQ).

## Features
- users
- profiles (settings, update profile, etc.)
- stories (drafts, published stories, unpublished stories, etc.)
- categories 
- global search (users, stories, categories, etc.)
- and more

## Architecture Overview

The whole app is a single page application, using a REST API built in PHP.

Data storage in MySQL.

Authentication is done using a JWT.

The front end is composed of modules, such that everything is done once and reused in multiple places. I also use Gulp for build automation.
