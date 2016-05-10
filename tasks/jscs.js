var app = require( "../assemblefile.js" );
var jscs = require( "gulp-jscs" );

/** the jscs and jshint tasks need improvement */
app.task( "jscs", function() {
	return app.src([ "assemblefile.js", "tasks/*.js", "src/js/**/*.js" ])
		.pipe( jscs({ fix: true }) )
		.pipe( jscs.reporter( "jscs-stylish" ) )
		.pipe( app.dest(function( file ) {
			return file.base;
		}) )
    .pipe( jscs.reporter( "fail") );
});
