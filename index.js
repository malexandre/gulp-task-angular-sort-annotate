const plugins = require('gulp-load-plugins')()

const defaultOptions = {
    htmlFile: 'index.html',
    angularScripts: ['/**/*.js', '!/node_modules', '!/build'],
    htmlDestinationFolder: 'build',
    jsDestinationFolder: 'build/js',
    injectOptions: {
        relative: false,
        ignorePath: ['build'],
        addRootSlash: true,
        starttag: '<!-- inject:angular-sort-annotate:js -->'
    }
}

const task = (gulp, options, concat=false, uglify=false) => {
    let buildScript = gulp
        .src(options.angularScripts)
        .pipe(plugins.plumber())
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.angularFilesort())

    if (concat) {
        buildScript = buildScript.pipe(plugins.concat())
    }

    if (uglify) {
        buildScript = buildScript.pipe(plugins.uglify())
    }

    buildScript = buildScript.pipe(gulp.dest(`${options.jsDestinationFolder}`))

    return gulp
        .src(options.htmlFile)
        .pipe(plugins.plumber())
        .pipe(plugins.inject(buildScript, options.injectOptions))
        .pipe(gulp.dest(options.htmlDestinationFolder))
}

module.exports = (gulp, options) => {
    options = Object.assign(defaultOptions, options)
    options.injectOptions = Object.assign(defaultOptions.injectOptions, options.injectOptions)

    gulp.task('angular-sort-annotate', () => task(gulp, options))
    gulp.task('angular-sort-annotate-concat', () => task(gulp, options, false, true))
    gulp.task('angular-sort-annotate-uglify', () => task(gulp, options, false, true))
    gulp.task('angular-sort-annotate-concat-uglify', () => task(gulp, options, true, true))
}
