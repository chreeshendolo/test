console.log( "tween.js up!" );

var Tween = function() {
	this.tweens = [];
};
	
var proto = Tween.prototype;

proto.renderAll = function () {
	return this.tweens;
}

proto.createTween = function( target, props, duration, ease, callback ) {
			if ( !ease ) ease = "lerp";
			
			var start = {};
			
			for( var key in props ) {
				start[ key ] = target[ key ];
			};

			this.tweens.push( {
				target: target,
				start: start,
				end: props,
				duration: duration,
				elapsed: 0,
				ease: ease,
				callback: callback
			} );
		};

proto.update = function( dt ) {
	for( var i = this.tweens.length - 1; i >= 0; --i ) {
		var tween = this.tweens[ i ];
		
		tween.elapsed += dt;
		
		tween.target.tweening = 1;
		
		for( var key in  tween.start ) {
			tween.target[ key ] = Ease[ tween.ease ]( tween.elapsed, tween.start[ key ], tween.end[ key ], tween.duration );
		}
		
		if ( tween.elapsed >= tween.duration ) {
			
			for( var key in  tween.start ) {
				tween.target[ key ] = tween.end[ key ];
			}
			if ( tween.callback ) {
				tween.callback( tween.target );
			}
			tween.target.tweening = 0;
			
			this.tweens.splice( i, 1 );
		}
	}
}
