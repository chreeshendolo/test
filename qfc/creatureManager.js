console.log( "creatureManager.js is up!" );

var CreatureManager = function() {
	this.creatures = [];
};

var proto = CreatureManager.prototype;

proto.clicked = function( newXY, oldXY ) {
	var creatures = {
		newCreature: null,
		oldCreature: null		
	};
	
	if ( newXY.x == oldXY.x && newXY.y == oldXY.y ) {
		creatures.newCreature = this.getCreature( newXY );
		if ( creatures.newCreature ) creatures.newCreature.clicked();
	}
	else {
		creatures.newCreature = this.getCreature( newXY );
		creatures.oldCreature = this.getCreature( oldXY );
		if ( creatures.oldCreature ) creatures.oldCreature.selected = false;
		if ( creatures.newCreature ) creatures.newCreature.selected = true;
	}
	
	return creatures;
}

proto.spawnCreature = function( tile, ent, equipted ) {
	var creature = new Creature();
	creature.ent = ent;
	creature.stats.health = Data.entities[ ent ].health;
	creature.stats.maxHealth = Data.entities[ ent ].health;
	//creature.weapons = [equipted.rHand];
	creature.x = Helper.CRtoXY( tile.col, tile.row ).x;
	creature.y = Helper.CRtoXY( tile.col, tile.row ).y;
	creature.index = 0;
	creature.cycle = 0;
	creature.last = 0;
	creature.changed = 0;
	creature.facing = "r";
	creature.actionPool = 0;
	creature.initiative = Helper.rng( 1, 20 );
	creature.tBuffs = [];
	creature.aBuffs = [];
	creature.rBuffs = [];
	creature.equipted = {
		active: equipted.active || "rHand",
		head: equipted.head || null,
		lHand: equipted.lHand || null,
		rHand: equipted.rHand || null,
		torso: equipted.torso || null,
		tail: equipted.tail || null
	}
	creature.tempCost = {
		head: 0,
		lHand: 0,
		rHand: 0,
		torso: 0,
		tail: 0
	}
	
	
	tile.occupied = "creature";

	this.creatures.push( creature );
	return creature;
}

proto.getCreature = function( XYobj ) {
	for ( var i = this.creatures.length - 1; i >= 0; --i ) {
		var creature = this.creatures[ i ];
		if ( creature.x == XYobj.x && creature.y == XYobj.y ) {
			return creature;
		}
	}
	return false;
}

proto.markOccupied = function( creature, tileArray, mode ) {
	for ( var i = tileArray.length - 1; i >= 0; --i ) {
		var tile = tileArray[ i ];
		
		if ( tile.occupied == "creature" && mode != "loot" ) {
			var target = this.getCreature( tile.getXY() );
		
			tile.available = tile.available ? false :
			Relationships.getRelationship( Data.entities[ creature.ent ].affiliation, Data.entities[ target.ent ].affiliation );
		}
		if ( tile.occupied == "corpse" && mode == "loot" ) {
			tile.available = "loot";
		}
	}
}


var Creature = function() {
	this.stats = {
		health: null
	};
	this.ent = null;
	this.x = 0;
	this.y = 0;
	this.index = 0;
	this.cycle = 0;
	this.last = 0;
	this.changed = 0;
	this.facing = "r";
	this.initiative = Helper.rng( 1, 20 );
	this.inventory = [];
	this.moveQueue = [];
	this.equipted = {
		active: "rHand",
		head: "mask",
		lHand: null,
		rHand: "staff",
		torso: "cloak",
		tail: "candle"
	}
}
	

var cprot = Creature.prototype;

cprot.queueMove = function( oldTile, newTile ) {
	var walkMap = tileManager.getWalkMap();
	
	var path = AStar.findPath( walkMap, oldTile.col, oldTile.row, newTile.col, newTile.row, [0] );
	if ( path ) {
		path.shift();
		var pl = path.length;
		for( var i = 0; i < pl; ++i ) {
			var p = path[ i ];
			this.moveQueue.push( { col: p[ 0 ], row: p[ 1 ] } );
		}
	}
	this.move();
}

cprot.move = function() {
	var nextMove = this.moveQueue.shift(),
		oldTile = tileManager.getTile( this.getCR() ),
		newTile = tileManager.getTile( nextMove ),
		newTileXY = newTile.getXY();
	
	if ( newTile.occupied != "corpse" )	newTile.occupied = "creature";
	if ( oldTile.occupied != "corpse" ) oldTile.occupied = false;
	
	if ( newTile.col < oldTile.col ) this.facing = "l";
	if ( newTile.row < oldTile.row ) this.facing = "u";
	if ( newTile.col > oldTile.col ) this.facing = "r";
	if ( newTile.row > oldTile.row ) this.facing = "d";
	
	this.cycle = 7;	
	
	tween.createTween( this, { x: newTileXY.x, y: newTileXY.y, cycle: 0 }, 500, "quadInOut", function( target ) {
		
			if ( target.moveQueue.length <= 0 ) {
				var CR = target.getCR();
				input.mouseState.left.down = true;
				input.mouseState.left.pos.x = target.x;
				input.mouseState.left.pos.y = target.y;
				log.toLog( Data.entities[ target.ent ].name + " moved to " + CR.col + ", " + CR.row );
			}
			else {
				target.move();
				var CR = target.getCR();
				log.toLog( Data.entities[ target.ent ].name + " moved to " + CR.col + ", " + CR.row );
			}
		} );
	
	--this.actionPool;
}

cprot.clicked = function() {
	this.selected = this.selected ? false : true;
	return this.selected;
}

cprot.getCR = function() {
	return Helper.XYtoCR( this.x, this.y );
}

cprot.unequip = function( slot ) {
	if( this.equipted[ slot ] ) {
		var creatureData = Data.entities[ this.ent ],
			item = Data.weapons[ this.equipted[ slot ] ];
		this.inventory.push( this.equipted[ slot ] );
		this.equipted[ slot ] = null;
		log.toLog( creatureData.name + " unequipped " + item.name + "." );
	}
}

cprot.equip = function( item, slot ) {
	var itemName = item,
		item = Data.weapons[ item ],
		rHand = this.equipted.rHand ? Data.weapons[ this.equipted.rHand ] : null,
		lHand = this.equipted.lHand ? Data.weapons[ this.equipted.lHand ] : null,
		creatureData = Data.entities[ this.ent ];
	
	if ( slot && itemName != this.equipted[ slot ] ) {
		--this.actionPool;
		this.unequip( slot );
		if ( rHand && rHand.hands > 1 ) this.unequip( "rHand" );
		if ( lHand && lHand.hands > 1 ) this.unequip( "lHand" );

		this.equipted[ slot ] = itemName;
		log.toLog( creatureData.name + " equipped " + item.name + "." );
		return true;
	}
	else if ( itemName != this.equipted[ item.slot ] ) {
		--this.actionPool;
		this.unequip( item.slot );
		if ( item.hands > 1 ) {
			this.unequip( "lHand" );
		}
		
		if ( item.slot == "lHand" ) {
			if ( rHand && rHand.hands > 1 ) {
				this.unequip( "rHand" );
			}
		}
		
		this.equipted[ item.slot ] = itemName;
		log.toLog( creatureData.name + " equipped " + item.name + "." );
		return true;
	}
	return false;
}

cprot.takeDamage = function( tl, damage, weapData ) {
	var creatureData = Data.entities[ this.ent ];
	for ( var eqpt in this.equipted ) {
		eqpt = this.equipted[ eqpt ];
		eqpt = Data.weapons[ eqpt ];
		if ( eqpt ) {
			if ( eqpt.reactive ) {
				damage = ability.reactive[ eqpt.reactive ]( this, eqpt, damage );
			}
		}
	}
	
	for ( var i = this.rBuffs.length - 1; i >= 0; --i ) {
		var rBuff = this.rBuffs[ i ],
			buffData = Data.spells[ rBuff ];

		damage = ability.reactive[ buffData.reactive ]( this, buffData, damage );
		this.rBuffs.splice( i, 1 );
	}
	
	if ( weapData && weapData.active ) {
		ability.active[ weapData.active ]( this, weapData, damage );
	}
	
	this.stats.health -= damage;
	log.toLog( creatureData.name + " took " + damage + " damage." );
	effect.raiseText( { x: this.x, y: this.y, txt: "-" + damage, font: 8, ttl: 750 } );
}

cprot.healDamage = function( tl, damage ) {
	var creatureData = Data.entities[ this.ent ];
	if ( this.stats.health + damage > this.stats.maxHealth ) {
		damage = this.stats.maxHealth - this.stats.health;
	}
	this.stats.health += damage;
	log.toLog( creatureData.name + " healed " + damage + " damage." );
	effect.raiseText( { x: this.x, y: this.y, txt: "+" + damage, font: 8, ttl: 750 } );
}

cprot.getTBuff = function( tl, buff ) {
	var creatureData = Data.entities[ this.ent ];


	this.tBuffs.push( buff );
	log.toLog( creatureData.name + " recieved " + buff + "." );
	effect.raiseText( { x: this.x, y: this.y, txt: buff, font: 8, ttl: 750 } );
}

cprot.getABuff = function( tl, buff ) {
	var creatureData = Data.entities[ this.ent ];


	this.aBuffs.push( buff );
	log.toLog( creatureData.name + " recieved " + buff + "." );
	effect.raiseText( { x: this.x, y: this.y, txt: buff, font: 8, ttl: 750 } );
}

cprot.getRBuff = function( tl, buff ) {
	var creatureData = Data.entities[ this.ent ];

	this.rBuffs.push( buff );
	log.toLog( creatureData.name + " recieved " + buff + "." );
	effect.raiseText( { x: this.x, y: this.y, txt: buff, font: 8, ttl: 750 } );
}

cprot.die = function() {
	var creatureData = Data.entities[ this.ent ];
	this.stats.health = 0;
	this.actionPool = 0;
	this.dead = true;
	log.toLog( creatureData.name + " has breathed its last breathe..." );
}

cprot.myTurn = function( tl ) {
	var creatureData = Data.entities[ this.ent ];
	this.actionPool = 6;
	this.tempCost = {
		head: 0,
		lHand: 0,
		rHand: 0,
		torso: 0,
		tail: 0
	}
	this.turn = true;
	effect.raiseText( { x: this.x, y: this.y, txt: "My Turn!" } );
	log.toLog( Data.entities[ this.ent ].name + "'s turn has begun." );

	for( var item in this.equipted ) {

		var item = Data.weapons[ this.equipted[ item ] ];
		if( item && item.onTurn ) ability.onTurn[ item.onTurn ]( item, this );
	}
	
	var tbl = this.tBuffs
	for( var i = this.tBuffs.length - 1; i >= 0; --i ) {
		var buff = this.tBuffs[ i ];
		var item = Data.spells[ buff ];
		if( item && item.onTurn ) {
			ability.onTurn[ item.onTurn ]( item, this );
			if ( item.remove ) {
				var fail = Helper.rng( 0, item.remove );

				if ( !fail ) {
					effect.raiseText( { x: this.x, y: this.y, txt: "-" + item.active, font: 8, ttl: 750 } );
					log.toLog( item.active + " has passed from " + creatureData.name + "." );
					this.tBuffs.splice( i, 1 );
				}
			}
		}
	}
}

cprot.endTurn = function( tl ) {
	this.turn = false;
	input.keyState[ 16 ] = true;
}

