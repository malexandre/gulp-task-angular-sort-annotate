# GULP-TASK-ANGULAR-SORT-ANNOTATE

This module create a gulp task `angular-sort-annotate` that find all the angular files, annotate them, sort them, and inject them in your html file.

## Installation

```bash
npm install --save-dev gulp-task-angular-sort-annotate
yarn add -D gulp-task-angular-sort-annotate
```

## Usage

This is the default options :

```javascript
const gulp = require('gulp')

require('gulp-task-angular-sort-annotate')(gulp, {
    htmlFile: 'index.html',
    angularScripts: ['/**/*.js', '!/node_modules', '!/build'],
    htmlDestinationFolder: 'build',
    jsDestinationFolder: 'build/js',
    concatName: 'app.js',
    uglifySuffix: '.min',
    injectOptions: {
        relative: false,
        ignorePath: ['build'],
        addRootSlash: true,
        starttag: '<!-- inject:angular-sort-annotate:js -->'
    }
})
```

For the injection to work, you need this in your html file:

```html
<!-- inject:angular-sort-annotate:js -->
<!-- endinject -->
```
