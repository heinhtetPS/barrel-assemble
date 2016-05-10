// throttle function from Remy Sharp
// https://remysharp.com/2010/07/21/throttling-function-calls
module.exports = function( fn, threshold, scope ) {
	if ( !threshold ) {
		threshold = 250;
	}

	var last, deferTimer;

	return function() {
		var context = scope || this,
			now  = +new Date(),
			args = arguments;

		if ( last && now < last + threshold ) {
			// hold on to it
			clearTimeout( deferTimer );
			deferTimer = setTimeout(function() {
				last = now;
				fn.apply( context, args );
			}, threshold );
		} else {
			last = now;
			fn.apply( context, args );
		}
	};
};
