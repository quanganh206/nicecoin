const gulp = require('gulp');
const ts = require('gulp-typescript');

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
    const tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('serve', gulp.series('scripts', () => {
    gulp.watch('src/**/*.ts')
        .on('change', gulp.series('scripts'));
}));
