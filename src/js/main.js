var initializeModules = require( "./lib/init-modules.js" );

if ( document.readyState !== "loading" ) {
	initializeModules();
} else {
	document.addEventListener( "DOMContentLoaded", initializeModules );
}
