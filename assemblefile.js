var assemble = require( "assemble" );
var _assemble = {
	layout: "./src/layout/default.hbs",
	pages: "./src/pages/*.hbs",
	partials: "./src/partials/**/*.hbs",
	data: [ "./src/data/**/*.{json,yml}", "./src/assets/**/*.{json,yml}" ],
	assets: "./dist/assets"
};

var app = assemble();

// expose your instance of assemble
module.exports = app;

/** Defines the "load" task for Gulp. */

app.task( "load", function( cb ) {
	app.partials( _assemble.partials );
	app.layouts( _assemble.layout );
	app.data( _assemble.data );
	app.pages( _assemble.pages );
	app.option( "layout", "default");
  cb();
});

/** Defines the "clean" task for Gulp. */

app.task( "clean", function( cb ) {
	var del = require( "del" );
	return del([ "./dist/*.html", "./dist/**/*.{js,css,map,html}" ], cb );
});

require( "./tasks/sass" );
require( "./tasks/jscs" );
require( "./tasks/jshint" );
require( "./tasks/browserify" );
/*require( "./tasks/vendors" );*/

/** Defines the "validate" task for Gulp. */

app.task( "validate", [ "jshint", "jscs" ]);

/** Defines the "build" task for Gulp. */

app.task( "build", [ "clean", "load", "sass", "browserify", "validate" ], function() {
	var extname = require( "gulp-extname" );

	return app.toStream( "pages" )
		.pipe( app.renderFile() )
		.pipe( extname() )
		.pipe( app.dest( "dist" ) );
});

/** Defines the "dev" task for Gulp. */

app.task( "dev", [ /*"vendors",*/ "build", "sass", "browserify" ], function() {
	var livereload = require( "gulp-livereload" );
	var path = require( "path" );

  livereload.listen();

	var watch = require( "base-watch" );
	app.use( watch() );

  // Watch stylesheets
  app.watch([ "./**/*.scss" ], [ "sass" ]);

  // Watchify handles the scripts
  app.watch([ "./src/js/**/*.js", "./tasks/*.js", "./assemblefile.js" ], function( event ) {
		if ( event.type == "changed" ) {
			if ( path.extname( event.path ) == ".js" ) {
				var jscs = require( "gulp-jscs" );
				var jshint = require( "gulp-jshint" );

				app.src([ event.path ])
					.pipe( jshint() )
					.pipe( jshint.reporter( "jshint-stylish" ) )
					.pipe( jscs({ fix: true }) )
					.pipe( jscs.reporter( "jscs-stylish" ) );
			}
		}
	});

  // When compile tasks finish, trigger livereload
  app.watch([ "./src/assets/**/*.css", "./src/assets/**/*.js" ], function( event ) {
    livereload.changed( event.path );
  });
});

/** Default is "dev". */
app.task( "default", [ "dev" ]);

