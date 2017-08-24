const plugins = require('gulp-plugins')()

const defaultOptions = {
    htmlFile: 'index.html',
    angularScripts: ['/**/*.js', '!/node_modules', '!/build'],
    htmlDestinationFolder: '/build',
    jsDestinationFolder: '/build/js',
    uglify: false,
    concat: false,
    ignorePath: ['/build']
}

module.exports = (gulp, options) => {
    options = Object.assign(defaultOptions, options)

    gulp.task('angular-sort-annotate', () => {
        let buildScript = gulp
            .src(options.angularScripts)
            .pipe(plugins.plumber())
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.angularFilesort())

        if (options.concat) {
            buildScript = buildScript.pipe(plugins.concat())
        }

        if (options.uglify) {
            buildScript = buildScript.pipe(plugins.uglify())
        }

        buildScript = buildScript.pipe(gulp.dest(`${options.jsDestinationFolder}/js`))

        return gulp
            .src(options.htmlFile)
            .pipe(plugins.plumber())
            .pipe(
                plugins.inject(buildScript, {
                    relative: false,
                    ignorePath: options.ignorePath,
                    addRootSlash: true,
                    name: 'angular-sort-annotate'
                })
            )
            .pipe(gulp.dest(options.htmlDestinationFolder))
    })
}