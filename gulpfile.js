/* eslint-disable */
const
  gulp = require('gulp'),
  newer = require('gulp-newer'),
  fs = require('fs');
  jeditor = require("gulp-json-editor");
  minimist = require('minimist'),
  bump = require('lee-fs-utility-debugger').updateVersion,

  devBuild = (process.env.NODE_ENV !== 'production'),

  folder = {
    root: ['!node_modules/', '!test/', './package.json', './README.md'],
    src: 'src/*',
    build:'build/'
  },

  packageJson = () => {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  },

  releaseType = {
    string: 'r',
    default: 'patch'
  },

  options = minimist(process.argv.slice(2), releaseType);

gulp.task('run', ['versionbump', 'build', 'src']);

gulp.task('versionbump', function() {
  const pkg = packageJson();
  const version = pkg.version;
  console.log('Upgrading from v' + version);
  const newVersion = bump(version,options.r);
  console.log('to new version, ' + newVersion);
  pkg.version = newVersion;

  return gulp.src('./package.json', {base:'./package.json'})
    .pipe(jeditor({
      'version':newVersion
    }))
    .pipe(gulp.dest('./package.json'));
});

gulp.task('build', function() {
  const output = folder.build;
  return gulp.src(folder.root, {base: './'})
    .pipe(newer(output))
    .pipe(gulp.dest(output));
});

gulp.task('src', function() {
  const output = folder.build + 'src/';
  return gulp.src(folder.src)
    .pipe(newer(output))
    .pipe(gulp.dest(output));
});
