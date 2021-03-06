console.log( "ease.js up!" );

var Ease = {};

//simple linear tweening - no easing, no acceleration
Ease.lerp = function( t, b, c, d ) {
	var c = c - b;
	
	return c * ( t / d ) + b;
};

// quadratic easing in - accelerating from zero velocity
Ease.quadIn = function( t, b, c, d ) {
	var c = c - b,
		t = t / d;
		
	return c * t * t + b;
};

// quadratic easing out - decelerating to zero velocity
Ease.quadOut = function ( t, b, c, d ) {
	var c = c - b,
		t = t / d;
		
	return -c * t * ( t-2 ) + b;
};

// quadratic easing in/out - acceleration until halfway, then deceleration
Ease.quadInOut = function ( t, b, c, d ) {
	var c = c - b,
		t = t / ( d / 2 );
	
	if ( t < 1 ) return c / 2 * t * t + b;
	
	t--;
	
	return -c / 2 * ( t * ( t - 2 ) - 1 ) + b;
};

// cubic easing in - accelerating from zero velocity
Ease.cubicIn = function ( t, b, c, d ) {
	var c = c - b,
		t = t / d;
		
	return c * t * t * t + b;
};

// cubic easing out - decelerating to zero velocity
Ease.cubicOut = function ( t, b, c, d ) {
	var c = c - b,
		t = t / d;
	t--;
	return c * ( t * t * t + 1 ) + b;
};

// cubic easing in/out - acceleration until halfway, then deceleration
Ease.cubicInOut = function (t, b, c, d) {
	var c = c - b,
		t = t / ( d / 2 );
		
	if ( t < 1 ) return c / 2 * t * t * t + b;
	t -= 2;
	return c / 2 * ( t * t * t + 2 ) + b;
};

// quartic easing in - accelerating from zero velocity
Ease.quartIn = function ( t, b, c, d ) {
	var c = c - b,
		t = t / d;
	return c * t * t * t * t + b;
};

// quartic easing out - decelerating to zero velocity
Ease.quartOut = function ( t, b, c, d ) {
	var c = c - b,
		t = t / d;
	t--;
	return -c * ( t * t * t * t - 1 ) + b;

};

// quartic easing in/out - acceleration until halfway, then deceleration
Ease.quartInOut = function ( t, b, c, d ) {
	var c = c - b,
		t = t / ( d / 2 );
	if ( t < 1 ) return c / 2 * t * t * t * t + b;
	t -= 2;
	return -c / 2 * ( t * t * t * t - 2 ) + b;
};

// quintic easing in - accelerating from zero velocity
Ease.quintIn = function ( t, b, c, d ) {
	var c = c - b,
		t = t / d;
	return c * t * t * t * t * t + b;
};

// quintic easing out - decelerating to zero velocity
Ease.quintOut = function ( t, b, c, d ) {
	var c = c - b,
		t = t / d;
	t--;
	return c * ( t * t * t * t * t + 1 ) + b;
};

// quintic easing in/out - acceleration until halfway, then deceleration
Ease.quintInOut = function ( t, b, c, d ) {
	var c = c - b,
		t = t / ( d / 2 );
	if ( t < 1 ) return c / 2 * t * t * t * t * t + b;
	t -= 2;
	return c / 2 * ( t * t * t * t * t + 2 ) + b;
};

// sinusoidal easing in - accelerating from zero velocity
Ease.sineIn = function ( t, b, c, d ) {
	var c = c - b;
	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
};

// sinusoidal easing out - decelerating to zero velocity
Ease.sineOut = function ( t, b, c, d ) {
	var c = c - b;
	return c * Math.sin( t / d * ( Math.PI / 2 ) ) + b;
};

// sinusoidal easing in/out - accelerating until halfway, then decelerating
Ease.sineInOut = function ( t, b, c, d ) {
	var c = c - b;
	return -c / 2 * ( Math.cos( Math.PI * t / d ) - 1 ) + b;
};

// exponential easing in - accelerating from zero velocity
Ease.expoIn = function ( t, b, c, d ) {
	var c = c - b;
	return c * Math.pow( 2, 10 * ( t / d - 1 ) ) + b;
};

// exponential easing out - decelerating to zero velocity
Ease.expoOut = function ( t, b, c, d ) {
	var c = c - b;
	return c * ( -Math.pow( 2, -10 * t / d ) + 1 ) + b;
};

// exponential easing in/out - accelerating until halfway, then decelerating
Ease.expoInOut = function ( t, b, c, d ) {
	var c = c - b,
		t = t / ( d / 2 );
	if ( t < 1 ) return c / 2 * Math.pow( 2, 10 * ( t - 1 ) ) + b;
	t--;
	return c / 2 * ( -Math.pow( 2, -10 * t ) + 2 ) + b;
};

// circular easing in - accelerating from zero velocity
Ease.circIn = function ( t, b, c, d ) {
	var c = c - b,
		t = t / d;
	return -c * ( Math.sqrt( 1 - t * t ) - 1 ) + b;
};

// circular easing out - decelerating to zero velocity
Ease.circOut = function ( t, b, c, d ) {
	var c = c - b,
		t = t / d;
	t--;
	return c * Math.sqrt( 1 - t * t) + b;
};

// circular easing in/out - acceleration until halfway, then deceleration
Ease.circInOut = function ( t, b, c, d ) {
	var c = c - b,
		t = t / ( d / 2 );
	if ( t < 1 ) return -c / 2 * ( Math.sqrt( 1 - t * t ) - 1 ) + b;
	t -= 2;
	return c / 2 * ( Math.sqrt( 1 - t * t ) + 1 ) + b;
};
