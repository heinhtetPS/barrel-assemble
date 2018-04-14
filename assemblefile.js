'use strict';

var assemble = require( 'assemble' );
var helpers = require( 'handlebars-helpers' );
var extname = require( 'gulp-extname' );
var watch = require( 'base-watch' );

var files = {
  layout: 'src/layout/*.hbs',
  pages: 'src/pages/*.hbs',
  partials: 'src/partials/**/*.hbs',
  data: [ 'src/data/**/*.{json,yml}', 'src/assets/**/*.{json,yml}' ]
};

var app = assemble();

app.use( watch() );

app.helpers( helpers() );

app.task( 'files:build', function() {
  app.partials( files.partials );
  app.layouts( files.layout );
  app.data( files.data );
  app.pages( files.pages );

  return app.toStream( 'pages' )
    .pipe( app.renderFile() )
    .pipe( extname('.htm') )
    .pipe( app.dest( 'dist/bloom/plantpower' ) );
} );

app.task('assets', function() {
  // return, to let assemble know when the task has completed
  return app.copy('src/assets/**', process.env.npm_package_config_assetpath);
} );

app.task( 'files:watch', function() {
  app.watch( [ 'src/**/*.hbs', ], [ 'files:build', 'assets' ] );
} );

app.task( 'default', [ 'files:build', 'assets' ] );
module.exports = app;
