var app = require( "../assemblefile.js" );
var jshint = require( "gulp-jshint" );

app.task( "jshint", function() {
  return app.src([ "assemblefile.js", "tasks/*.js", "src/js/**/*.js" ])
    .pipe( jshint() )
    .pipe( jshint.reporter( "jshint-stylish" ) )
    .pipe( jshint.reporter( "fail" ) );
});
