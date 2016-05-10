var app = require( "../assemblefile.js" );
var concat = require( "gulp-concat" );
var uglify = require( "gulp-uglify" );
var sourcemaps = require( "gulp-sourcemaps" );
var vendorScripts = [
	// place vendor scripts in this array
];

app.task( "vendors", function() {
	if ( vendorScripts.length > 0 ) {
		return app.src( vendorScripts )
			.pipe( sourcemaps.init() )
			.pipe( concat( "vendor.min.js" ) )
			.pipe( uglify() )
			.pipe( sourcemaps.write() )
			.pipe( app.dest( "assets/js" ) );
	}
});
