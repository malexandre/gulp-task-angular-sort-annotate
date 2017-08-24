# GULP-TASK-ANGULAR-SORT-ANNOTATE

This module create a gulp task `angular-sort-annotate` that find all the angular files, annotate them, sort them, and inject them in your html file.

## Installation

```bash
npm install --save-dev gulp-task-angular-sort-annotate
yarn add -D gulp-task-angular-sort-annotate
```

## Usage

```javascript
const gulp = require('gulp')

require('gulp-task-angular-sort-annotate')(gulp, {
    htmlFile: 'app/client/index.html',
    angularScripts: ['app/client/**/*.js', '!/node_modules', '!/build'],
    htmlDestinationFolder: '/build',
    jsDestinationFolder: '/build/js',
    uglify: true,
    concat: true,
    ignorePath: ['/build']
})
```

For the injection to work, you need this in your html file:

```html
<!-- inject:angular-sort-annotate:js -->
<!-- endinject -->
```
