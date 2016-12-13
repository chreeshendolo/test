console.log( "effect.js" );

var Effect = function() {
	this.effects = [];
	this.batches = {};
}

var proto = Effect.prototype;

proto.add = function( eff ) {
	this.effects.push( eff );
}

proto.update = function() {
	for( var i = this.effects.length - 1; i >= 0; --i ) {
		var eff = this.effects[ i ];
		if ( eff.ttl <= 0 ) {
			if ( eff.batch ) {
				var batch = this.batches[ eff.batch ];
				batch.next = null;
			}
			this.effects.splice( i, 1 );
		}
	}
	
	for( var batch in this.batches ) {

		batch = this.batches[ batch ];

		if ( batch.next == null ) {
			if( batch.queue.length ) {
				batch.next = batch.queue.shift();
				tween.createTween( batch.next, { y: batch.next.y - batch.next.raise, ttl: 0 }, batch.next.ttl, "circOut" );
				this.effects.push( batch.next );
			}
		}
	}
}

proto.raiseText = function( txts ) {
	
	if ( !txts ) {
		txts = {};
	}
	
	txts.raise = txts.raise || tileManager.size * .5;
	
	txts.font = txts.font || 8;
	txts.font = txts.font + "px Arial";
	
	txts.fillColor = txts.fillColor || "white";

	txts.txt = txts.txt;
	
	txts.ttl = txts.ttl || 1000;
	txts.alignment = txts.alignment || "center";
	
	txts.x = txts.x || 100;
	txts.y = txts.y || 100;
	var batch = txts.x + "" + txts.y;
	txts.batch = batch;

	if( !this.batches[ batch ] ) this.batches[ batch ] = { next: null, queue: [] };
	this.batches[ batch ].queue.push( txts );
}

proto.projectile = function( obj ) {
	if ( !obj ) {
		obj = {};
	}
	
	obj.sprite = obj.sprite || "missle";
	obj.ttl = obj.ttl || 500;
	
	var targetX  = obj.target.x - obj.x,
		targetY  = obj.target.y - obj.y;
		
	obj.r = Math.atan2( targetY, targetX );

	tween.createTween( obj, { y: obj.target.y, x: obj.target.x, ttl: 0, cycle: 0 }, obj.ttl, "circIn", function() {
		obj.target.takeDamage( obj.tile, obj.damage, obj.weapData );
	} );
	this.effects.push( obj );
}

proto.heal = function( obj ) {
	if ( !obj ) {
		obj = {};
	}
	
	obj.sprite = obj.sprite || "healingTouch";
	obj.ttl = obj.ttl || 500;
	
	//var targetX  = obj.target.x - obj.x,
	//	targetY  = obj.target.y - obj.y;
	//	
	//obj.r = Math.atan2( targetY, targetX );
	obj.y = obj.target.y;
	obj.x = obj.target.x;
	tween.createTween( obj, { y: obj.target.y - 8, ttl: 0, cycle: 0 }, obj.ttl, "circIn", function() {
		obj.target.healDamage( obj.tile, obj.damage );
	} );
	this.effects.push( obj );
}

proto.buff = function( obj ) {
	if ( !obj ) {
		obj = {};
	}
	
	obj.sprite = obj.sprite || "healingTouch";
	obj.ttl = obj.ttl || 500;
	
	//var targetX  = obj.target.x - obj.x,
	//	targetY  = obj.target.y - obj.y;
	//	
	//obj.r = Math.atan2( targetY, targetX );
	obj.y = obj.target.y;
	obj.x = obj.target.x;
	tween.createTween( obj, { y: obj.target.y - 8, ttl: 0, cycle: 0 }, obj.ttl, "circIn", function() {
		if ( obj.aBuff ) obj.target.getABuff( obj.tile, obj.aBuff );
		if ( obj.rBuff ) obj.target.getRBuff( obj.tile, obj.rBuff );
		if ( obj.tBuff ) obj.target.getTBuff( obj.tile, obj.tBuff );
	} );
	this.effects.push( obj );
}

proto.slice = function( obj ) {
	if ( !obj ) {
		obj = {};
	}

	var tweenProps = {
		cycle: 0,
		ttl: 0
	};
	
	var	rotate = 0;
	if ( obj.facing == "l" ) {
		rotate = Math.PI;
		obj.y = obj.target.y - 4;
		tweenProps.y = obj.target.y + 4;
	}
	if ( obj.facing == "u" ) { 
		rotate = ( 3 * Math.PI ) / 2;
		obj.x = obj.target.x - 4;
		tweenProps.x = obj.target.x + 4;
	}
	
	if ( obj.facing == "r" ) { 
		obj.y = obj.target.y - 4;
		tweenProps.y = obj.target.y + 4;
	}
	if ( obj.facing == "d" ) { 
		rotate = Math.PI / 2;
		obj.x = obj.target.x - 4;
		tweenProps.x = obj.target.x + 4;
	}

	obj.sprite = obj.sprite || "bite";
	obj.ttl = obj.ttl || 250;
	
	
		
	obj.r = rotate;

	tween.createTween( obj, tweenProps, obj.ttl, "expoInOut", function() {
		obj.target.takeDamage( obj.tile, obj.damage, obj.weapData );
	} );
	
	this.effects.push( obj );
}

proto.stab = function( obj ) {
	if ( !obj ) {
		obj = {};
	}

	var tweenProps = {
		cycle: 0,
		ttl: 0
	};
	
	var	rotate = 0;
	if ( obj.facing == "l" ) {
		//rotate = Math.PI;
		obj.flip = true;
		obj.x = obj.target.x + 8;
		tweenProps.x = obj.target.x - 4;
	}
	if ( obj.facing == "u" ) { 
		rotate = ( 3 * Math.PI ) / 2;
		obj.y = obj.target.y + 8;
		tweenProps.y = obj.target.y - 4;
	}
	
	if ( obj.facing == "r" ) { 
		obj.x = obj.target.x - 8;
		tweenProps.x = obj.target.x + 4;
	}
	if ( obj.facing == "d" ) { 
		rotate = Math.PI / 2;
		obj.y = obj.target.y - 8;
		tweenProps.y = obj.target.y + 4;
	}

	obj.sprite = obj.sprite || "bite";
	obj.ttl = obj.ttl || 250;
	
	
		
	obj.r = rotate;

	tween.createTween( obj, tweenProps, obj.ttl, "expoInOut", function() {
		obj.target.takeDamage( obj.tile, obj.damage, obj.weapData );
	} );
	
	this.effects.push( obj );
}














