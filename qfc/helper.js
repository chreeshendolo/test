console.log( "helpers.js" );

var Helper = {};

Helper.XYtoCR = function( x, y, tileSize ) {
	tileSize = tileSize || 16;

	return { col: Math.floor( x / tileSize ), row: Math.floor( y / tileSize ) };
};

Helper.CRtoXY = function( c, r, tileSize ) {
	tileSize = tileSize || 16;
	var hts = tileSize * .5;
	
	return { x: c * tileSize + hts, y: r * tileSize + hts };
};

Helper.XYCollide = function( XYPoint, XYobj ) {
	return ( XYPoint.x > XYobj.x && XYPoint.x < XYobj.x + XYobj.w
			&& XYPoint.y > XYobj.y && XYPoint.y < XYobj.y + XYobj.h );
};

Helper.rng = function( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

Helper.alignments = {
	center: function( obj ) {
		return obj.pos - obj.size * .5;
	}
};

