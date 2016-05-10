/* globals document */
/**
 * Finds all elements with a "data-module-init" attribute
 * and calls the corresponding script
 */
function initializeModules() {
  var modules = document.querySelectorAll( "[data-module-init]" );

  for ( var i = 0; i < modules.length; i++ ) {
    var el = modules[ i ];
    var names = el.getAttribute( "data-module-init" ).split( " " );
    var Module;

    for ( var j = 0; j < names.length; j++ ) {
      // Find the module script
      try {
        Module = require( "modules/" + names[ j ] );
      } catch ( e ) {
        Module = false;
        console.log( names[ j ] + " module does not exist." );
      }

      // Initialize the module with the calling element
      if ( Module ) {
        new Module( el );
      }
    }
  }
}

module.exports = initializeModules;
