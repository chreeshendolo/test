console.log( "ability.js is up" );

var ability = {};

ability.active = {
	backstab: function( creature, target, damage ) {
		var behind = false;

		if ( creature.x < target.x ) {
			if ( target.facing == "r" ) behind = true;
		}
		if ( creature.x > target.x ) {
			if ( target.facing == "l" ) behind = true;
		}
		
		if ( creature.y < target.y ) {
			if ( target.facing == "d" ) behind = true;
		}
		if ( creature.y > target.y ) {
			if ( target.facing == "u" ) behind = true;
		}

		if ( behind ) {
			log.toLog( Data.entities[ creature.ent ].name + "'s BACKSTAB " + damage + " damage x 2 = " + damage * 2 + "!" );
			effect.raiseText( {
				x: target.x,
				y: target.y,
				txt: "BACKSTAB!",
				font: 10,
				fillColor: "white",
				ttl: 1000,
				raise: tileManager.size
			} );
			
			return ( damage * 2 );
		}
		else {
			return damage;
		}
	},
	heal: function( creature, target, creatureWeap ) {
		var creatureData = Data.entities[ creature.ent ],
			targetData = Data.entities[ target.ent ];
		var damage = Helper.rng( creatureWeap.damage.min, creatureWeap.damage.max );
		log.toLog( creatureData.name + " has cast " + creatureWeap.name + " on " + targetData.name + "." );
		return damage;
	},
	damageUp: function( creature, target, damage, buffData ) {
		var creatureData = Data.entities[ creature.ent ],
			targetData = Data.entities[ target.ent ];
		var damUp = Helper.rng( buffData.damage.min, buffData.damage.max );
		damage += damUp;
		
		effect.raiseText( {
			x: creature.x,
			y: creature.y,
			txt: buffData.name + " +" + damUp + "!",
			font: 10,
			fillColor: "white",
			ttl: 750,
			raise: tileManager.size
		} );

		log.toLog( creatureData.name + " has gained" + damUp + "damage from " + buffData.name + "!" );
		return damage;
	},
	sickened: function( creature, weapData, damage ) {
		var creatureData = Data.entities[ creature.ent ];
		effect.raiseText( {
			x: creature.x,
			y: creature.y,
			txt: weapData.active,
			font: 10,
			fillColor: "white",
			ttl: 750,
			raise: tileManager.size
		} );

		creature.tBuffs.push( weapData.key );

		log.toLog( creatureData.name + " has been " + weapData.active + " from " + weapData.name + "!" );
		return damage;
	},
	burning: function( creature, weapData, damage ) {
		var creatureData = Data.entities[ creature.ent ];
		effect.raiseText( {
			x: creature.x,
			y: creature.y,
			txt: weapData.active,
			font: 10,
			fillColor: "white",
			ttl: 750,
			raise: tileManager.size
		} );

		creature.tBuffs.push( weapData.key );

		log.toLog( creatureData.name + " has been " + weapData.active + " from " + weapData.name + "!" );
		return damage;
	}
};

ability.buff = {
	damageUp: function( creature, target, creatureWeap ) {
		var creatureData = Data.entities[ creature.ent ],
			targetData = Data.entities[ target.ent ];
		var add = true;
		for ( var i = target.aBuffs.length - 1; i >= 0; --i ) {
			var buff = target.aBuffs[ i ];
			if ( buff == "damageUp" ) {
				add = false;
			}
		}
		if ( add ) target.aBuffs.push( "damageUp" );
		log.toLog( creatureData.name + " has cast " + creatureWeap.name + " on " + targetData.name + "." );
		return creatureWeap.name;
	},
	defenseUp: function( creature, target, creatureWeap ) {
		var creatureData = Data.entities[ creature.ent ],
			targetData = Data.entities[ target.ent ];
		var add = true;
		for ( var i = target.rBuffs.length - 1; i >= 0; --i ) {
			var buff = target.rBuffs[ i ];
			if ( buff == "defenseUp" ) {
				add = false;
			}
		}
		if ( add ) target.rBuffs.push( "defenseUp" );
		log.toLog( creatureData.name + " has cast " + creatureWeap.name + " on " + targetData.name + "." );
		return creatureWeap.name;
	},
}

ability.onTurn = {
	extraAction: function( source, target ) {
		target.actionPool += source.value;
		log.toLog( Data.entities[ target.ent ].name + " has gained " + source.value + " action points from " + source.name + "!" );
		var txt = source.name + " +" + source.value + " AP!";
		effect.raiseText( {
			x: target.x,
			y: target.y,
			txt: txt,
			font: 10,
			fillColor: "white",
			ttl: 1000,
			raise: tileManager.size
		} );
	},
	randomAction: function( source, target ) {
		var value = Helper.rng( -source.value, source.value );
		if ( value != 0 ) {
			target.actionPool += value;
			var symbol = " + ";
			var term = "gained ";
			if ( value < 0 ) {
				value *= -1;
				symbol = " -";
				term = "lost ";
			}
			
			log.toLog( Data.entities[ target.ent ].name + " has " + term + value + " action points from " + source.name + "!" );
			var txt = source.name + symbol + value + " AP!";
			effect.raiseText( {
				x: target.x,
				y: target.y,
				txt: txt,
				font: 10,
				fillColor: "white",
				ttl: 1000,
				raise: tileManager.size
			} );
		}
	},
	loseAction: function( source, target ) {
		target.actionPool -= source.value;
		var name = source.name;
		if ( source.active ) name = source.active;
		log.toLog( Data.entities[ target.ent ].name + " has lost " + source.value + " action points from " + name + "!" );

		var txt = name + " -" + source.value + " AP";
		effect.raiseText( {
			x: target.x,
			y: target.y,
			txt: txt,
			font: 10,
			fillColor: "white",
			ttl: 1000,
			raise: tileManager.size
		} );
	},
	takeDamage:  function( source, target ) {
		target.stats.health -= source.value;
		log.toLog( Data.entities[ target.ent ].name + " has lost " + source.value + " health from " + source.active + "!" );
		var txt = source.active + " -" + source.value + "HP";
		effect.raiseText( {
			x: target.x,
			y: target.y,
			txt: txt,
			font: 10,
			fillColor: "white",
			ttl: 1000,
			raise: tileManager.size
		} );
		
	},
};

ability.reactive = {
	block: function( target, shield, damage ) {
		var defend = Helper.rng( shield.defense.min, shield.defense.max );
		if ( defend ) {
			log.toLog( Data.entities[ target.ent ].name + "'s " + shield.name + " BLOCKED " + defend + " of the " + damage + " damage!" );
			var txt = "BLOCKED " + defend + "!";
			effect.raiseText( {
				x: target.x,
				y: target.y,
				txt: txt,
				font: 10,
				fillColor: "white",
				ttl: 1000,
				raise: tileManager.size
			} );
			
			damage -= defend;
			damage = damage < 0 ? 0 : damage;
		}
		return ( damage );
	},
	defend: function( target, shield, damage ) {
		var defend = Helper.rng( shield.defense.min, shield.defense.max );
		if ( defend ) {
			log.toLog( Data.entities[ target.ent ].name + "'s " + shield.name + " DEFENDED " + defend + " of the " + damage + " damage!" );
			var txt = shield.name + " " + defend + "!";
			effect.raiseText( {
				x: target.x,
				y: target.y,
				txt: txt,
				font: 10,
				fillColor: "white",
				ttl: 1000,
				raise: tileManager.size
			} );
			
			damage -= defend;
			damage = damage < 0 ? 0 : damage;
		}
		return ( damage );
	},
	defenseUp: function( target, shield, damage ) {
		var creatureData = Data.entities[ target.ent ];
		damage -= 2
		if ( damage <= 0 ) damage = 0;
		
		effect.raiseText( {
			x: target.x,
			y: target.y,
			txt: "Protection -2",
			font: 10,
			fillColor: "white",
			ttl: 750,
			raise: tileManager.size
		} );

		log.toLog( creatureData.name + " has gained 2 defense from Protection!" );
		return damage;
	}
};

