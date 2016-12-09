console.log( "tileManager.js is up!" );

var TileManager = function( size ) {
	this.size = size || 16;
	this.tiles = [];
};

var proto = TileManager.prototype;

proto.clicked = function( newCR, oldCR ) {
	var tiles = {
		newTile: false,
		oldTile: false
	};
	
	if ( newCR.col == oldCR.col && newCR.row == oldCR.row ) {
		tiles.newTile = this.getTile( newCR );
		tiles.newTile.clicked();
	}
	else {
		tiles.newTile = this.getTile( newCR ),
		tiles.oldTile = this.getTile( oldCR );
		
		tiles.oldTile.selected = false;
		tiles.newTile.selected = true;
	}

	return tiles;
}

proto.getWalkMap = function() {
	var walkMap = [];
	
	var mapW = Math.floor( viewPort.w / this.size ),
		mapH = Math.floor( viewPort.h / this.size );
	for ( var y = 0; y < mapH; ++y ) {
		var row = [];
		for( var x = 0; x < mapW; ++x ) {
		var tile = this.getTile( { col: x, row: y } );
			var value = 0;
			if ( tile.occupied != "corpse" ) {
				if ( tile.occupied ) {
					value = 1;
				}
				if ( Data.enviorments[ tile.env ].terrain == "impass" ) {
					value = 2;
				}
			}
			row.push( value );
		}
		walkMap.push( row );
	}
	return walkMap;
}

proto.getTilesInRange = function( CRObj, range ) {
	var CRs = [];

	var fill = 0;
	for ( var i = range; i > 0; --i ) {
		CRs.push( { col: CRObj.col + i, row: CRObj.row } );
		CRs.push( { col: CRObj.col - i, row: CRObj.row } );
		
		CRs.push( { col: CRObj.col, row: CRObj.row + i } );
		CRs.push( { col: CRObj.col, row: CRObj.row - i } );
		
		for ( var j = fill; j > 0; --j ) {
			CRs.push( { col: CRObj.col + i, row: CRObj.row + j} );
			CRs.push( { col: CRObj.col - i, row: CRObj.row - j} );
			CRs.push( { col: CRObj.col + i, row: CRObj.row - j} );
			CRs.push( { col: CRObj.col - i, row: CRObj.row + j} );
		}
		++fill;
	}
	
	var tiles = [];
	var occupied = [];
	
	for ( var i = CRs.length - 1; i >= 0; --i ) {
		var CR = CRs[ i ];
		var tile = this.getTile( CR );
		if ( tile ) {
			tile.occupied ? occupied.push( tile ) : tiles.push( tile );
		}
	}
	return { tiles: tiles, occupied: occupied };
}

proto.markTiles = function( tileArray, mode ) {

	for ( var i = tileArray.length - 1; i >= 0; --i ) {
		var tile = tileArray[ i ];
		if ( mode == "attack" ) {
			if ( tile.available == "move" ) tile.available = "both";
			var terrain = Data.enviorments[ tile.env ].terrain;
			if ( !tile.available && terrain != "impass" ) tile.available = "attack";
		}
		else {
			tile.available = Data.enviorments[ tile.env ].terrain;
		}
	}
}

proto.unmarkTiles = function( tileArray ) {
	for ( var i = tileArray.length - 1; i >= 0; --i ) {
		var tile = tileArray[ i ];
		tile.available = false;
	}
}

proto.spawnTiles = function( map ) {
	var col = 0,
		row = 0;
	var cols = map.w / this.size,
		rows = map.h / this.size;
		
	while( col < cols ) {
		
		var tile = new Tile();
		
		tile.env = ( col == 0 || col == cols - 1 || row == 0 || row == rows - 1 ) ? "wall" : "dirt";
		tile.col = col;
		tile.row = row;
		tile.index = Helper.rng( 0, 3 );
		
		this.tiles.push( tile );
		
		++col;
		
		if( col == cols && row < rows - 1 ) {
			col = 0;
			++row;
		}
	}
}

proto.getTile = function( CRObj ) {

	for( var i = this.tiles.length - 1; i >= 0; --i ) {
		var tile = this.tiles[ i ];
		if ( tile.col == CRObj.col && tile.row == CRObj.row ) return tile;
	}
	return false;
}


var Tile = function() {
	this.env;
	this.col;
	this.row;
	this.index;
}

var tprot = Tile.prototype;

tprot.clicked = function() {
	this.selected = this.selected ? false : true;
	return this.selected;
}

tprot.getXY = function() {
	return Helper.CRtoXY( this.col, this.row );
}



