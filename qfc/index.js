console.log( "index.js up!" );

var sprite = new Sprite();
var render = new Render();
var tween = new Tween();
var input = new Input();
var tileManager = new TileManager( 16 );
var creatureManager = new CreatureManager();
var effect = new Effect();


var stage = document.createElement( "canvas" ),
	ctx = stage.getContext( "2d" );

stage.w = tileManager.size * 40;
stage.h = tileManager.size * 32;
stage.x = 0;
stage.y = 0;
stage.width = stage.w;
stage.height = stage.h;

var viewPort = { x: 0, y: 0, w: tileManager.size * 34, h: tileManager.size * 24 };
viewPort.cx = viewPort.x + viewPort.w * .5;
viewPort.cy = viewPort.y + viewPort.h * .5;
var sideBar = { x: viewPort.w, y: 0, w: stage.w - viewPort.w, h: stage.h };
sideBar.cx = sideBar.x + sideBar.w * .5;
sideBar.cy = sideBar.y + sideBar.h * .5;

sideBar.slots = {};
sideBar.slots.portrait = {
	x: sideBar.cx - tileManager.size,
	y: tileManager.size,
	w: tileManager.size * 2,
	h: tileManager.size * 2
};

sideBar.slots.name = {
	x: sideBar.cx,
	y: sideBar.slots.portrait.y + sideBar.slots.portrait.h + tileManager.size,
	h: 12,
	w: tileManager.size
};

sideBar.slots.actionPool = {
	x: sideBar.x + tileManager.size * .25,
	y: sideBar.slots.name.y + sideBar.slots.name.h + tileManager.size * .25,
	h: 10,
	w: tileManager.size
};
	
sideBar.slots.health = {
	x: sideBar.x + tileManager.size * .25,
	y: sideBar.slots.actionPool.y + sideBar.slots.actionPool.h + tileManager.size * .5,
	h: 10,
	w: tileManager.size
};

sideBar.slots.lHand = {
	x: sideBar.cx - tileManager.size * 2.5,
	y: sideBar.slots.health.y + sideBar.slots.health.h + tileManager.size,
	h: tileManager.size * 2,
	w: tileManager.size * 2
}

sideBar.slots.rHand = {
	x: sideBar.cx + tileManager.size * .5,
	y: sideBar.slots.health.y + sideBar.slots.health.h + tileManager.size,
	h: tileManager.size * 2,
	w: tileManager.size * 2
}

sideBar.slots.weaponName = {
	x: sideBar.cx,
	y: sideBar.slots.lHand.y + sideBar.slots.lHand.h + tileManager.size,
	h: 12,
	w: tileManager.size
};
	
sideBar.slots.weaponDamage = {
	x: sideBar.x + tileManager.size * .25,
	y: sideBar.slots.weaponName.y + sideBar.slots.weaponName.h + tileManager.size * .25,
	h: 10,
	w: tileManager.size
};

sideBar.slots.weaponDefense = {
	x: sideBar.x + tileManager.size * .25,
	y: sideBar.slots.weaponDamage.y + sideBar.slots.weaponDamage.h + tileManager.size * .25,
	h: 10,
	w: tileManager.size
};

sideBar.slots.weaponRange = {
	x: sideBar.x + tileManager.size * .25,
	y: sideBar.slots.weaponDefense.y + sideBar.slots.weaponDefense.h + tileManager.size * .25,
	h: 10,
	w: tileManager.size
};

sideBar.slots.weaponCost = {
	x: sideBar.x + tileManager.size * .25,
	y: sideBar.slots.weaponRange.y + sideBar.slots.weaponRange.h + tileManager.size * .25,
	h: 10,
	w: tileManager.size
};
	
sideBar.slots.inventoryButton = {
	sprite: "backPack",
	x: sideBar.cx - tileManager.size,
	y: sideBar.slots.weaponCost.y + sideBar.slots.weaponCost.h + tileManager.size * 2,
	h: tileManager.size * 2,
	w: tileManager.size * 2
};

sideBar.slots.spellBookButton = {
	sprite: "spellBook",
	x: sideBar.cx - tileManager.size,
	y: sideBar.slots.inventoryButton.y + sideBar.slots.inventoryButton.h + tileManager.size * 2,
	h: tileManager.size * 2,
	w: tileManager.size * 2
};

var log = {
	screen: {
		x: tileManager.size * .5,
		y: viewPort.h + tileManager.size * .5,
		w: stage.w - tileManager.size,
		h: stage.h - ( viewPort.h + tileManager.size ),
		fillColor: "grey"
	},
	lines: [],
	toLog: function( txt ) {
		if ( log.lines.length > 11 ) log.lines.shift();
		log.lines.push( txt );
	}
}

//on click screen handler, tile handler etc..
var screen = {
	inventory: {
		up: 0,
		x: viewPort.cx - tileManager.size * 9,
		y: viewPort.cy - tileManager.size * 9,
		w: tileManager.size * 18,
		h: tileManager.size * 18,
		sprite: "invScreen",
		slots: {
			head: {
				x: ( viewPort.cx - tileManager.size * 9 ) + tileManager.size * 9 - tileManager.size,
				y: viewPort.cy - tileManager.size * 9 + tileManager.size,
				w: tileManager.size * 2,
				h: tileManager.size * 2
			},
			torso:{
				x: ( viewPort.cx - tileManager.size * 9 ) + tileManager.size * 9 - tileManager.size,
				y: viewPort.cy - tileManager.size * 9 + tileManager.size * 3 + 2,
				w: tileManager.size * 2,
				h: tileManager.size * 2
			},
			rHand: {
				x: ( viewPort.cx - tileManager.size * 9 ) + tileManager.size * 9 + tileManager.size + 2,
				y: viewPort.cy - tileManager.size * 9 + tileManager.size * 3 + 2,
				w: tileManager.size * 2,
				h: tileManager.size * 2
			},
			lHand:{
				x: ( viewPort.cx - tileManager.size * 9 ) + tileManager.size * 9 - tileManager.size * 3 - 2,
				y: viewPort.cy - tileManager.size * 9 + tileManager.size * 3 + 2,
				w: tileManager.size * 2,
				h: tileManager.size * 2
			},
			tail: {
				x: ( viewPort.cx - tileManager.size * 9 ) + tileManager.size * 9 - tileManager.size,
				y: viewPort.cy - tileManager.size * 9 + tileManager.size * 5 + 4,
				w: tileManager.size * 2,
				h: tileManager.size * 2
			},
			selected: {
				item: null,
				id: null,
				type: null,
				x: ( viewPort.cx - tileManager.size * 9 ) + tileManager.size * 15 + 5,
				y: viewPort.cy - tileManager.size * 9 + 4,
				w: tileManager.size * 2,
				h: tileManager.size * 2
			},
			equip: {
				sprite: "equip",
				x: ( viewPort.cx - tileManager.size * 9 ) + tileManager.size * 13 - 1,
				y: viewPort.cy - tileManager.size * 8.5 + 3,
				w: tileManager.size * 2,
				h: tileManager.size
			},
			equL: {
				sprite: "equL",
				x: ( viewPort.cx - tileManager.size * 9 ) + tileManager.size * 13 - 3,
				y: viewPort.cy - tileManager.size * 8.5 + 3,
				w: tileManager.size,
				h: tileManager.size
			},
			equR: {
				sprite: "equR",
				x: ( viewPort.cx - tileManager.size * 9 ) + tileManager.size * 14,
				y: viewPort.cy - tileManager.size * 8.5 + 3,
				w: tileManager.size,
				h: tileManager.size
			},
			pack: []
		},
		selectInv: function( XYObj, creature ) { 
			for ( var slot in screen.inventory.slots ) {
				if ( slot == "pack" ) {
					var cil = creature.inventory.length;
					for ( var i = 0; i < cil; ++i ) {
						var item = creature.inventory[ i ],
							slot = screen.inventory.slots.pack[ i ];

						var name = item;
						item = Data.weapons[ item ];
						if ( Helper.XYCollide( XYObj, slot ) ) {
							screen.inventory.slots.selected.id = i;
							screen.inventory.slots.selected.type = "inventory";
							screen.inventory.slots.selected.item = screen.inventory.slots.selected.item == name ? null : name;
						}
					}
				}  
				else if ( slot == "equip" ) {
					var slotName = slot;
					slot = screen.inventory.slots[ slot ];
					if ( Helper.XYCollide( XYObj, slot ) ) {
						if ( screen.inventory.slots.selected.item && screen.inventory.slots.selected.type == "inventory" ) {
							var source = screen.inventory.slots.selected.item;
							var sourceData = Data.weapons[ source ];
							if ( sourceData.hands != 1 ) {
								if ( creature.actionPool > 0 && sourceData.equiptable ) {
	
									unmarkRanges( creature );
									
									var equipped = creature.equip( source );
									
									if ( equipped ) {
										creature.inventory.splice( screen.inventory.slots.selected.id, 1 );
										screen.inventory.slots.selected.item = null;
									}
									
									markRanges( creature );
									
									return;
								}
							}
						}
					}
				}
				else if ( slot == "equL" || slot == "equR" ) {
					var slotName = slot;
					slot = screen.inventory.slots[ slot ];
					if ( Helper.XYCollide( XYObj, slot ) ) {
						if ( screen.inventory.slots.selected.item && screen.inventory.slots.selected.type == "inventory" ) {
							var source = screen.inventory.slots.selected.item;
							var sourceData = Data.weapons[ source ];
							if ( sourceData.hands == 1 ) {
								if ( creature.actionPool > 0 && sourceData.equiptable ) {
	
									unmarkRanges( creature );
									
									if ( slotName == "equL" ) { 
										equipped = creature.equip( source, "lHand" );
									}
									else if ( slotName == "equR" ) {
										equipped = creature.equip( source, "rHand" );
									}
									
									if ( equipped ) {
										creature.inventory.splice( screen.inventory.slots.selected.id, 1 );
										screen.inventory.slots.selected.item = null;
									}
									
									markRanges( creature );
									
									return;
								}
							}
						}
					}
				}
				else if ( slot != "selected" ) {
					var item = creature.equipted[ slot ];
					slotObj = screen.inventory.slots[ slot ];
					if ( Helper.XYCollide( XYObj, slotObj ) ) {
						screen.inventory.slots.selected.item = item;
						screen.inventory.slots.selected.id = slot;
						screen.inventory.slots.selected.type = "equipted";
					}
				}
			}
		},
		toggleScreen: function() {
			screen.inventory.up = screen.inventory.up ? 0 : 1;
			screen.inventory.slots.selected.item = null;
			if ( screen.inventory.up ) {
				if ( !screen.inventory.slots.pack.length ) {
					var col = 0,
					row = 0,
					xSpacer = 4,
					ySpacer = 4;
					var spaces = 28;
					for ( var i = 0; i < spaces; ++i ) {
						var space = {
							x: screen.inventory.x + 16 + col * tileManager.size * 2 + xSpacer,
							y: screen.inventory.y + tileManager.size * 8 + 4 + row * tileManager.size * 2 + ySpacer,
							w: tileManager.size * 2,
							h: tileManager.size * 2
						}
						xSpacer += 4;
						
						screen.inventory.slots.pack.push( space );
						++col;
						if ( col * tileManager.size * 2 >= screen.inventory.w - tileManager.size * 2 - xSpacer - 6 )  {
							col = 0;
							xSpacer = 4;
							ySpacer += 4;
							++row;
						}
					}
				}
			}
		},
		screenDown: function() {
			screen.inventory.up = 0;
			screen.inventory.slots.selected.item = null;
			screen.inventory.slots.selected.id = null;
			screen.inventory.slots.selected.type = null;
		}
	},
	loot: {
		up: 0,
		x: viewPort.cx - tileManager.size * 9,
		y: viewPort.cy - tileManager.size * 9,
		w: tileManager.size * 18,
		h: tileManager.size * 18,
		sprite: "lootScreen",
		slots: {
			head: {
				x: ( viewPort.cx - tileManager.size * 9 ) + tileManager.size * 9 - tileManager.size,
				y: viewPort.cy - tileManager.size * 9 + tileManager.size,
				w: tileManager.size * 2,
				h: tileManager.size * 2
			},
			torso:{
				x: ( viewPort.cx - tileManager.size * 9 ) + tileManager.size * 9 - tileManager.size,
				y: viewPort.cy - tileManager.size * 9 + tileManager.size * 3 + 2,
				w: tileManager.size * 2,
				h: tileManager.size * 2
			},
			rHand: {
				x: ( viewPort.cx - tileManager.size * 9 ) + tileManager.size * 9 + tileManager.size + 2,
				y: viewPort.cy - tileManager.size * 9 + tileManager.size * 3 + 2,
				w: tileManager.size * 2,
				h: tileManager.size * 2
			},
			lHand:{
				x: ( viewPort.cx - tileManager.size * 9 ) + tileManager.size * 9 - tileManager.size * 3 - 2,
				y: viewPort.cy - tileManager.size * 9 + tileManager.size * 3 + 2,
				w: tileManager.size * 2,
				h: tileManager.size * 2
			},
			tail: {
				x: ( viewPort.cx - tileManager.size * 9 ) + tileManager.size * 9 - tileManager.size,
				y: viewPort.cy - tileManager.size * 9 + tileManager.size * 5 + 4,
				w: tileManager.size * 2,
				h: tileManager.size * 2
			},
			selected: {
				item: null,
				id: null,
				type: null,
				x: ( viewPort.cx - tileManager.size * 9 ) + tileManager.size * 15 + 5,
				y: viewPort.cy - tileManager.size * 9 + 4,
				w: tileManager.size * 2,
				h: tileManager.size * 2
			},
			take: {
				sprite: "take",
				x: ( viewPort.cx - tileManager.size * 9 ) + tileManager.size * 13 - 1,
				y: viewPort.cy - tileManager.size * 9 + 3,
				w: tileManager.size * 2,
				h: tileManager.size * 2
			},
			pack: []
		},
		selectInv: function( XYObj, newCreature, oldCreature ) { 
			for ( var slot in screen.loot.slots ) {
				if ( slot == "pack" ) {
					var cil = newCreature.inventory.length;
					for ( var i = 0; i < cil; ++i ) {
						var item = newCreature.inventory[ i ],
							slot = screen.loot.slots.pack[ i ];

						var name = item;
						item = Data.weapons[ item ];
						if ( Helper.XYCollide( XYObj, slot ) ) {
							screen.loot.slots.selected.id = i;
							screen.loot.slots.selected.type = "inventory";
							screen.loot.slots.selected.item = screen.loot.slots.selected.item == name ? null : name;
						}
					}
				}
				else if ( slot == "take" ) {
					if ( screen.loot.slots.selected.item ) {
					slot = screen.loot.slots[ slot ];
						if ( Helper.XYCollide( XYObj, slot ) ) {
							var source = screen.loot.slots.selected.item;
	
							if ( oldCreature.actionPool > 0 ) {
								unmarkRanges( oldCreature );
								--oldCreature.actionPool;
								if ( screen.loot.slots.selected.type == "inventory" ) {
									oldCreature.inventory.push( source );
									newCreature.inventory.splice( screen.loot.slots.selected.id, 1 );
								}
								else {
									oldCreature.inventory.push( source );
									newCreature.equipted[ screen.loot.slots.selected.id ] = null;
								}	
								screen.loot.slots.selected.item = null;
								return;
							}
						}
					}
				}
				else if ( slot != "selected" ) {
					var item = newCreature.equipted[ slot ];
					slotObj = screen.inventory.slots[ slot ];
					if ( Helper.XYCollide( XYObj, slotObj ) ) {
						screen.loot.slots.selected.item = item;
						screen.loot.slots.selected.id = slot;
						screen.loot.slots.selected.type = "equipted";
					}
				}
			}
		},
		toggleScreen: function() {
			screen.loot.up = screen.loot.up ? 0 : 1;
			screen.loot.slots.selected.item = null;
			if ( screen.loot.up ) {
				if ( !screen.loot.slots.pack.length ) {
					var col = 0,
					row = 0,
					xSpacer = 4,
					ySpacer = 4;
					var spaces = 28;
					for ( var i = 0; i < spaces; ++i ) {
						var space = {
							x: screen.loot.x + 16 + col * tileManager.size * 2 + xSpacer,
							y: screen.loot.y + tileManager.size * 8 + 4 + row * tileManager.size * 2 + ySpacer,
							w: tileManager.size * 2,
							h: tileManager.size * 2
						}
						xSpacer += 4;
						
						screen.loot.slots.pack.push( space );
						++col;
						if ( col * tileManager.size * 2 >= screen.loot.w - tileManager.size * 2 - xSpacer - 6 )  {
							col = 0;
							xSpacer = 4;
							ySpacer += 4;
							++row;
						}
					}
				}
			}
		},
		screenDown: function() {
			screen.loot.up = 0;
			screen.loot.slots.selected.item = null;
		}
	},
	spells: {
		up: 0,
		x: viewPort.x + viewPort.w * .5 - tileManager.size * 4,
		y: viewPort.y + viewPort.h * .5 - tileManager.size * 4,
		w: tileManager.size * 8,
		h: tileManager.size * 8,
		sprite: "spellScreen",
		slots: {
			selected: {
				x: viewPort.x + viewPort.w * .5 - tileManager.size * 3 + 1,
				y: viewPort.y + viewPort.h * .5 - tileManager.size * 3 + 1,
				w: 32,
				h: 32
			},
			0: {
				x: viewPort.x + viewPort.w * .5 - tileManager.size * 3.5 + 2,
				y: viewPort.y + viewPort.h * .5 + tileManager.size - 1,
				w: tileManager.size * 2,
				h: tileManager.size * 2,
			},
			1: {
				x: viewPort.x + viewPort.w * .5 - tileManager.size,
				y: viewPort.y + viewPort.h * .5 + tileManager.size - 1,
				w: tileManager.size * 2,
				h: tileManager.size * 2,
			},
			2: {
				x: viewPort.x + viewPort.w * .5 + tileManager.size * 1.5 - 2,
				y: viewPort.y + viewPort.h * .5 + tileManager.size - 1,
				w: tileManager.size * 2,
				h: tileManager.size * 2,
			},
		},
		selectSpell: function( XYObj, creature ) {
			var slots = 3;
			var oldTileCR = creature.getCR();			
			for ( var i = 0; i < slots; ++i ) {
				var slot = screen.spells.slots[ i ];
				if ( XYObj.x > slot.x && XYObj.x < slot.x + slot.w
					 && XYObj.y > slot.y && XYObj.y < slot.y + slot.h ) {
					var spell = Data.entities[ creature.ent ].spells[ i ];
					unmarkRanges( creature );
					if ( creature.casting ) {
						if ( creature.casting == spell ) {
							creature.casting = false;
							return;
						}
					}
					creature.casting = spell;
					markRanges( creature );
				}
			}
		},
		toggleScreen: function() {
			screen.spells.up = screen.spells.up ? 0 : 1;
		},
		screenDown: function() {
			screen.spells.up = 0;
		}
	}
}


stage.render = function() {
	return { x: 0, y: 0, w: stage.w, h: stage.h, fillColor: "black" };
};

document.body.appendChild( stage );

input.listen( stage );

tileManager.spawnTiles( viewPort );


var turns = {
	current: null,
	notGone: [],
	gone: []
}

turns.buildList = function( list ) {
	var tempList = [];
	var slot = 0;
	for ( var i = list.length - 1; i >= 0; --i ) {
		var turn = list[ i ];

		for ( var j = tempList.length - 1; j >= 0; --j ) {
			var temp = tempList[ j ];
			
			if ( turn.initiative < temp.initiative ) {
				slot = j;
			}
			
		}
		
		tempList.splice( slot, 0, turn );
		slot = tempList.length;
	}
	this.notGone = tempList;
}

turns.next = false;

turns.update = function() {
	if ( this.next ) {
		input.mouseState.left.down = true;
		input.mouseState.left.pos.x = this.current.x;
		input.mouseState.left.pos.y = this.current.y;
		turns.next = false;
	}
}

turns.nextTurn = function() {
	screen.inventory.up = false;
	if ( this.current ) {
		unmarkRanges( this.current );
		this.current.actionPool = 0;
		this.gone.push( this.current );
		
		//this.current.actionPool = 0;
		this.current.turn = false;
	}
	
	if ( !this.notGone.length ) {
		turns.buildList( turns.gone );
		this.gone = [];
	}
	
	this.current = this.notGone.shift();
	
	var CR = Helper.XYtoCR( this.current.x, this.current.y );
	tl = tileManager.getTile( CR );
	
	this.current.myTurn( tl );
	if ( this.current.AI ) AI( this.current );
	this.next = true;
}


var globalInput = true;
var AI = function( ent ) {
	globalInput = false;
	input.AImouseState.left.down = true;
	input.AImouseState.left.pos = { x: ent.x, y: ent.y };
	var tiles = tileManager.getTilesInRange( ent.getCR(), ent.actionPool );
	var foes = [];
	for ( var occupied in tiles.occupied ) {
		var tile = tiles.occupied[ occupied ];
		var cr = creatureManager.getCreature( tile.getXY() );

		var isFoe = Relationships.getRelationship( Data.entities[ cr.ent ].affiliation, Data.entities[ ent.ent ].affiliation );

		if ( isFoe == "foe" ) {
			if ( !creatureManager.getCreature( tile.getXY() ).dead ) foes.push( tile );
		}
	}

	var walkMap = tileManager.getWalkMap();
	var paths = [];
	for ( var i = foes.length - 1; i >= 0; --i ) {
		var tileCR = ent.getCR();
		var dest = foes[ i ];
		for ( var j = 7; j >= 0; --j ) {
			var adjacent;
			var orthogonal = false;
			var value = 0;
			if ( j == 7 ) { 
				adjacent = { col: dest.col - 1, row: dest.row - 1 };
			}
			if ( j == 6 ) { 
				adjacent = { col: dest.col, row: dest.row - 1 };
				value = 3;
				orthogonal = true;
			}
			if ( j == 5 ) { 
				adjacent = { col: dest.col + 1, row: dest.row - 1 };
			}
			if ( j == 4 ) { 
				adjacent = { col: dest.col + 1, row: dest.row };
				value = 3;
				orthogonal = true;
			}
			if ( j == 3 ) { 
				adjacent = { col: dest.col - 1, row: dest.row };
				value = 3;
				orthogonal = true;
			}
			if ( j == 2 ) { 
				adjacent = { col: dest.col - 1, row: dest.row + 1 };
			}
			if ( j == 1 ) { 
				adjacent = { col: dest.col, row: dest.row + 1 };
				value = 3;
				orthogonal = true;
			}
			if ( j == 0 ) { 
				adjacent = { col: dest.col + 1, row: dest.row + 1 };
			}
			
			var terrain = Data.enviorments[ tileManager.getTile( adjacent ).env ].terrain;

			if ( terrain != "impass" ) {
				var path = AStar.findPath( walkMap, tileCR.col, tileCR.row, adjacent.col, adjacent.row, [ 0 ] );
				if ( tileCR.col == adjacent.col && tileCR.row == adjacent.row && orthogonal ) {
					path = [ { '0': tileCR.col, '1': tileCR.row } ];
					value = 10;
					paths.push( { target: dest, path: path, value: value } );
				}
				else if ( path && path.length <= ent.actionPool + 1 ) {
					paths.push( { target: dest, path: path, value: value } );
				}
			}
		}
	}
	
	var lowest = -1;
	for ( var j = paths.length - 1; j >= 0; --j ) {
		var path = paths[ j ];
		if ( lowest == -1 ) {
			lowest = path;
		}
		else if ( path.path.length < lowest.path.length ) {
			lowest = path;
		}
	}
	
	if ( lowest == -1 ) lowest = paths[ 0 ];
	
	lowest.value += 2;
	
	var value = 0;
	for ( var j = paths.length - 1; j >= 0; --j ) {
		var path = paths[ j ];
		if ( value == 0 ) {
			value = path;
		}
		else if ( path.value > value.value ) {
			value = path;
		}
	}
	
	if ( value ) lowest = value;
	
	
	var ctl = lowest.path[ lowest.path.length - 1 ];

	var AIMove = {
		XY: tileManager.getTile( { col: ctl[ '0' ], row: ctl[ '1' ] } ).getXY(),
		creature: ent,
		target: lowest.target.getXY()
	}
	
	tween.createTween( AIMove, {}, 1000, "circIn", function() {

		var match = false;
		if ( AIMove.XY.x == AIMove.creature.x && AIMove.XY.y == AIMove.creature.y ) {
			match = true;
		}
		
		if ( match ) {
			input.AImouseState.left.down = true;
			input.AImouseState.left.pos = { x: AIMove.target.x, y: AIMove.target.y };
			tween.createTween( AIMove, {}, 1000, "circIn", function() {
				globalInput = true;
				turns.nextTurn();
			} );
		}
		else { 
			input.AImouseState.left.down = true;
			input.AImouseState.left.pos = { x: AIMove.XY.x, y: AIMove.XY.y };
			tween.createTween( AIMove, {}, 4000, "circIn", function() {
				var active = AIMove.creature.equipted.active;
				var weapData = AIMove.creature.casting ? Data.spells[ AIMove.creature.casting ] : Data.weapons[ AIMove.creature.equipted[ active ] ];
				if ( AIMove.creature.actionPool >= weapData.cost ) {
					input.AImouseState.left.down = true;
					input.AImouseState.left.pos = { x: AIMove.target.x, y: AIMove.target.y };
					tween.createTween( AIMove, {}, 1000, "circIn", function() {
						globalInput = true;
						turns.nextTurn();
					} );
				}
				else {
					tween.createTween( AIMove, {}, 500, "circIn", function() {
						globalInput = true;
						turns.nextTurn();
					} );
				}
			} );
		}
	} );
}




var keyboardState = {
	keys: [],
	limit: 9
}

keyboardState.update = function() {
	if ( !globalInput ) return;
	var l = input.keyState[ 37 ],
		u = input.keyState[ 38 ],
		r = input.keyState[ 39 ],
		da = input.keyState[ 40 ],
		a = input.keyState[ 65 ],
		w = input.keyState[ 87 ],
		d = input.keyState[ 68 ],
		s = input.keyState[ 83 ],
		space = input.keyState[ 32 ],
		shift = input.keyState[ 16 ];
		
	if ( l || u || r || da || a || w || d || s ) {
		
		var last = clickState.clicks[ 0 ],
			x = null,
			y = null;
		
		if ( l || a ) {
			x = ( last.col - 1 ) * tileManager.size;
			y = last.row * tileManager.size;
		}
		
		if ( u || w ) {
			x = last.col * tileManager.size;
			y = ( last.row - 1 ) * tileManager.size;
		}
		
		if ( r || d ) {
			x = ( last.col + 1 ) * tileManager.size;
			y = last.row * tileManager.size;
		}
		
		if ( da || s ) {
			x = last.col * tileManager.size;
			y = ( last.row + 1 ) * tileManager.size;
		}

		if( x >= 0 && y >= 0 ) {
			input.mouseState.left.down = true;
			input.mouseState.left.pos = {
				x: x,
				y: y
			};
		}
		
		input.keyState[ 37 ] = false;
		input.keyState[ 38 ] = false;
		input.keyState[ 39 ] = false;
		input.keyState[ 40 ] = false;
		input.keyState[ 65 ] = false;
		input.keyState[ 87 ] = false;
		input.keyState[ 68 ] = false;
		input.keyState[ 83 ] = false;

	}
	
	if ( shift ) {
		
		turns.nextTurn();
		input.keyState[ 16 ] = false;
	}
	
	// if ( space ) {
		// var x = sideBar.slots.backPack.x,
			// y = sideBar.slots.backPack.y;
		
		// input.mouseState.left.down = true;
		// input.mouseState.left.pos = {
			// x: x,
			// y: y
		// };		
		
		// input.keyState[ 32 ] = false;
	// }
}


// var lines = [];

var los = function( CRObj, range ) {
	var CRs = [];
	// lines = [];
	var inc = 0;
	for ( var i = range; i > -1; --i ) {
		var pCol = CRObj.col + i,
			mCol = CRObj.col - i,
			pRow = CRObj.row + inc,
			mRow = CRObj.row - inc;
		var viewMC = viewPort.w / tileManager.size,
			viewMR = viewPort.h / tileManager.size;
		
		if ( mCol < 0 ) mCol = 0;
		if ( mRow < 0 ) mRow = 0;
		if ( pCol > viewMC ) pCol = viewMC;
		if ( pRow > viewMR ) pRow = viewMR;
		
		CRs.push( { col: pCol, row: pRow } );
		CRs.push( { col: pCol, row: mRow } );
		CRs.push( { col: mCol, row: pRow } );
		CRs.push( { col: mCol, row: mRow } );
		if ( inc < range ) {
			++inc;
		}
		else {
			inc = 0;
		}
	}
	
	
	var tiles = [];
	var occupied = [];
	var tilesObj = {},
		occupiedObj = {};
	var origin = tileManager.getTile( CRObj ),
		originXY = origin.getXY();
	for ( var i = CRs.length - 1; i >= 0; --i ) {
		var CR = CRs[ i ];
		var tile = tileManager.getTile( CR );
		if ( tile ) {
			var tileXY = tile.getXY();
			var xyArray = calcStraightLine( originXY, tileXY );
			
			var xyl = xyArray.length;
			for( var j = 0; j < xyl; ++j ) {
				var xy = xyArray[ j ];
				

				var col = Math.floor( ( xy.x + 1 ) / tileManager.size ),
					row = Math.floor( ( xy.y + 1 ) / tileManager.size );
				
				if ( col == CRObj.col && row == CRObj.row ) continue;
				
				var cr = { col: col, row: row };
				
				var t = tileManager.getTile( cr );
				
				if ( t.env == "wall" )	break;
				
				var key = "" + col + row;
				t.occupied ? occupiedObj[ key ] = t : tilesObj[ key ] = t;
				// lines.push( { origin: originXY, dest: xy } );
			}
		}
	}
	
	for( var key in occupiedObj ) {
		occupied.push( occupiedObj[ key ] );
	}
	for( var key in tilesObj ) {
		tiles.push( tilesObj[ key ] );
	}
	
	return { tiles: tiles, occupied: occupied };
}

  function calcStraightLine (startCoordinates, endCoordinates) {
    var coordinatesArray = new Array();
    // Translate coordinates
    var x1 = startCoordinates.x;
    var y1 = startCoordinates.y;
    var x2 = endCoordinates.x;
    var y2 = endCoordinates.y;
    // Define differences and error check
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var sx = (x1 < x2) ? 1 : -1;
    var sy = (y1 < y2) ? 1 : -1;
    var err = dx - dy;
    // Set first coordinates
    coordinatesArray.push( { y: y1, x: x1 } );
    // Main loop
    while (!((x1 == x2) && (y1 == y2))) {
      var e2 = err << 1;
      if (e2 > -dy) {
        err -= dy;
        x1 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y1 += sy;
      }
      // Set coordinates
      coordinatesArray.push( { y: y1, x: x1 } );
    }
    // Return the result
    return coordinatesArray;
  }
  
var markRanges = function( creature ) {
	var tileCR = creature.getCR();
	var active = creature.equipted.active;
	var weapData = creature.casting ? Data.spells[ creature.casting ] : Data.weapons[ creature.equipted[ active ] ];
	if ( weapData ) {
		var newMoveRange = tileManager.getTilesInRange( tileCR, creature.actionPool );
		var newWeapRange = tileManager.getTilesInRange( tileCR, weapData.range );
		
		var walkMap = tileManager.getWalkMap();
		
		for ( var i = newMoveRange.tiles.length - 1; i >= 0; --i ) {
			var dest = newMoveRange.tiles[ i ];
			var path = AStar.findPath( walkMap, tileCR.col, tileCR.row, dest.col, dest.row, [ 0 ] );
			if ( path ) {
				path.shift();
				if ( path.length > creature.actionPool ) {
					newMoveRange.tiles.splice( i, 1 );
				}
			}
			else {
				newMoveRange.tiles.splice( i, 1 );
			}
		}
		
		var sight = los( tileCR, weapData.range );
		
		if ( creature.actionPool ) tileManager.markTiles( newMoveRange.tiles );
		if ( creature.actionPool >= weapData.cost + creature.tempCost[ active ] ) tileManager.markTiles( sight.tiles, "attack" );
		if ( creature.actionPool >= weapData.cost + creature.tempCost[ active ] ) creatureManager.markOccupied( creature, sight.occupied );
		var newLootRange = tileManager.getTilesInRange( tileCR, 1  );
		if ( creature.actionPool >= 1 ) creatureManager.markOccupied( creature, newLootRange.occupied, "loot" );
	}
}

var unmarkRanges = function( creature ) {
	var tileCR = creature.getCR();
	var newMoveRange = tileManager.getTilesInRange( tileCR, creature.actionPool );
	tileManager.unmarkTiles( newMoveRange.tiles );
	tileManager.unmarkTiles( newMoveRange.occupied );

	
	var active = creature.equipted.active;
	var weapData = creature.casting ? Data.spells[ creature.casting ] : Data.weapons[ creature.equipted[ active ] ];
	if ( weapData ) {
		var newWeapRange = tileManager.getTilesInRange( tileCR, weapData.range );
		tileManager.unmarkTiles( newWeapRange.tiles );
		tileManager.unmarkTiles( newWeapRange.occupied );
	}
}

var clickState = {
	clicks: [ { col: 0,  row: 0 } ],
	limit: 9
}

clickState.update = function() {
	if ( !globalInput && input.AImouseState.left.down ) {
		runClick( "AImouseState" );
	}
	else if ( globalInput && input.mouseState.left.down ) {
		runClick( "mouseState" );
	}
}


var runClick = function( control ) {
	
	var mouseX = input[ control ].left.pos.x,
			mouseY = input[ control ].left.pos.y,
			tiles = ( mouseX < viewPort.w && mouseY < viewPort.h ),
			sideDisp = ( mouseX > sideBar.x && mouseX < sideBar.x + sideBar.w
				&& mouseY > sideBar.y && mouseY < sideBar.y + sideBar.h ),
			lootScreen = ( screen.loot.up && 
						mouseX > screen.loot.x && mouseX < screen.loot.x + screen.loot.w
						&& mouseY > screen.loot.y && mouseY < screen.loot.y + screen.loot.h ),
			invScreen = ( screen.inventory.up && 
						mouseX > screen.inventory.x && mouseX < screen.inventory.x + screen.inventory.w
						&& mouseY > screen.inventory.y && mouseY < screen.inventory.y + screen.inventory.h ),
			spellsScreen = ( screen.spells.up && 
				mouseX > screen.spells.x && mouseX < screen.spells.x + screen.spells.w
				&& mouseY > screen.spells.y && mouseY < screen.spells.y + screen.spells.h ),
			nextTurn = ( mouseX > log.screen.x && mouseX < log.screen.x + log.screen.w
						&& mouseY > log.screen.y && mouseY < log.screen.y + log.screen.h );
		
	if ( nextTurn ) turns.nextTurn();
	
	if ( tiles && !invScreen && !spellsScreen && !lootScreen ) {
		screen.spells.screenDown();
		screen.loot.screenDown();
		screen.inventory.screenDown();
		var newTileCR = Helper.XYtoCR( mouseX, mouseY, tileManager.size ),
			oldTileCR = clickState.clicks[ 0 ],
			newTileXY = Helper.CRtoXY( newTileCR.col, newTileCR.row ),
			oldTileXY = Helper.CRtoXY( oldTileCR.col, oldTileCR.row );

		var tiles = tileManager.clicked( newTileCR, oldTileCR );
		
		var newTile = tiles.newTile;
		var oldTile = tiles.oldTile;

		var creatures = creatureManager.clicked( newTileXY, oldTileXY );
		
		var newCreature = creatures.newCreature;
		var oldCreature = creatures.oldCreature;
					
		if ( oldCreature ) {
			var active = oldCreature.equipted.active;
			var oldWeapData = oldCreature.casting ? Data.spells[ oldCreature.casting ] : Data.weapons[ oldCreature.equipted[ active ] ];

			if ( oldWeapData ) {
				screen.spells.up = false;
				if ( oldCreature.turn ) {
					if ( newTile.available == "move" || newTile.available == "both" ) {
						unmarkRanges( oldCreature );
						oldCreature.queueMove( oldTile, newTile );
					}
					
					if ( newTile.available == "loot" ) { 
						screen.inventory.up = false;
						screen.spells.up = false;
						screen.loot.toggleScreen();
					}
					
					if ( !oldWeapData.target || oldWeapData.target == "foe" ) {
						if ( newTile.available == "foe" ) {
							unmarkRanges( oldCreature );
							
							var	weapDam = Helper.rng( oldWeapData.damage.min, oldWeapData.damage.max ),
								oldEntData = Data.entities[ oldCreature.ent ],
								newEntData = Data.entities[ newCreature.ent ];
							
							if ( oldEntData.active ) {
								weapDam = ability.active[ oldEntData.active ]( oldCreature, newCreature, weapDam );
							}
							
							// if ( oldWeapData.active ) {
								// weapDam = ability.active[ oldWeapData.active ]( oldCreature, newCreature, weapDam, oldWeapData );
							// }
							
							for ( var i = oldCreature.aBuffs.length - 1; i >= 0; --i ) {
								var buff = oldCreature.aBuffs[ i ],
									buffData = Data.spells[ buff ];

								weapDam = ability.active[ buffData.active ]( oldCreature, newCreature, weapDam, buffData );
								oldCreature.aBuffs.splice( i, 1 );
							}
							
							if ( newTile.col < oldTile.col ) { oldCreature.facing = "l"; newCreature.facing = "r"; }
							if ( newTile.row < oldTile.row ) { oldCreature.facing = "u"; newCreature.facing = "d"; }
							if ( newTile.col > oldTile.col ) { oldCreature.facing = "r"; newCreature.facing = "l"; }
							if ( newTile.row > oldTile.row ) { oldCreature.facing = "d"; newCreature.facing = "u"; }
							
							if ( oldWeapData.range > 1 ) {
								effect.projectile( { damage: weapDam, tile: newTile, weapData: oldWeapData, cycle: 3, last: 3, sprite: oldWeapData.sprite, x: oldCreature.x, y: oldCreature.y, target: newCreature } );
							}
							else {
								effect.stab( { facing: oldCreature.facing, weapData: oldWeapData, damage: weapDam, tile: newTile, cycle: 3, last: 3, sprite: oldWeapData.sprite, x: newCreature.x, y: newCreature.y, target: newCreature } );
							}
							
							newCreature = false;
							
							var tempCostSlot = oldCreature.equipted.active;
							var tempCost = oldCreature.tempCost[ tempCostSlot ];
							oldCreature.actionPool -= oldWeapData.cost + tempCost;
							if ( oldWeapData.hands ) {
								if ( oldWeapData.hands < 2 ) {
									oldCreature.tempCost[ tempCostSlot ] += 1;
								}
								else {
									oldCreature.tempCost.lHand += 1;
									oldCreature.tempCost.rHand += 1;
								}
							}
							else {
								oldCreature.tempCost[ tempCostSlot ] += 1;
							}
						}
					}
					else if ( oldWeapData.target == "friend" ) {
						if ( oldCreature.actionPool >= oldWeapData.cost ) {
							if ( newTile.available == "friend" ) {
								unmarkRanges( oldCreature );
								oldCreature.actionPool -= oldWeapData.cost;
								if ( oldWeapData.active && !oldWeapData.aBuff ) {
									var damage = ability.active[ oldWeapData.active ]( oldCreature, newCreature, oldWeapData );
								}
								if ( damage ) {
									effect.heal( { facing: oldCreature.facing, damage: damage, tile: newTile, cycle: 3, last: 3, sprite: oldWeapData.sprite, x: newCreature.x, y: newCreature.y, target: newCreature } );
								}
								if ( oldWeapData.aBuff ) {
									var buff = oldWeapData.aBuff;

									//var buff = ability.buff[ oldWeapData.buff ]( oldCreature, newCreature, oldWeapData );
									effect.buff( { facing: oldCreature.facing, aBuff: buff, tile: newTile, cycle: 3, last: 3, sprite: oldWeapData.sprite, x: newCreature.x, y: newCreature.y, target: newCreature } );
								}
								if ( oldWeapData.rBuff ) {
									var buff = oldWeapData.rBuff;

									//var buff = ability.buff[ oldWeapData.buff ]( oldCreature, newCreature, oldWeapData );
									effect.buff( { facing: oldCreature.facing, rBuff: buff, tile: newTile, cycle: 3, last: 3, sprite: oldWeapData.sprite, x: newCreature.x, y: newCreature.y, target: newCreature } );
								}
								if ( oldWeapData.tBuff ) {
									var buff = oldWeapData.tBuff;

									//var buff = ability.buff[ oldWeapData.buff ]( oldCreature, newCreature, oldWeapData );
									effect.buff( { facing: oldCreature.facing, rBuff: buff, tile: newTile, cycle: 3, last: 3, sprite: oldWeapData.sprite, x: newCreature.x, y: newCreature.y, target: newCreature } );
								}
							}
						}
					}
				}
				unmarkRanges( oldCreature );
				oldCreature.casting = false;
			}
		}
		
		if ( newCreature ) {
			if ( newCreature.selected ) {
				markRanges( newCreature );
			}
			else {
				unmarkRanges( newCreature );
			}
		}

		
		if( clickState.clicks.unshift( newTileCR ) > clickState.limit ) clickState.clicks.pop();
	}
	
	if ( sideDisp ) {
		var newTileCR = Helper.XYtoCR( mouseX, mouseY, tileManager.size ),
			oldTileCR = clickState.clicks[ 0 ],
			newTileXY = Helper.CRtoXY( newTileCR.col, newTileCR.row ),
			oldTileXY = Helper.CRtoXY( oldTileCR.col, oldTileCR.row );

		var newCreature = creatureManager.getCreature( newTileXY );
		var oldCreature = creatureManager.getCreature( oldTileXY );

		if ( oldCreature.selected ) {
			var lHand = sideBar.slots.lHand;
			if ( mouseX > lHand.x && mouseX < lHand.x + lHand.w
				&& mouseY > lHand.y && mouseY < lHand.y + lHand.h ) {
				if ( oldCreature.equipted.lHand ) {
					unmarkRanges( oldCreature );
					oldCreature.equipted.active = "lHand";
					markRanges( oldCreature );
				}
			}
			var rHand = sideBar.slots.rHand;
			if ( mouseX > rHand.x && mouseX < rHand.x + rHand.w
				&& mouseY > rHand.y && mouseY < rHand.y + rHand.h ) {
				if ( oldCreature.equipted.rHand ) {
					unmarkRanges( oldCreature );
					oldCreature.equipted.active = "rHand";
					markRanges( oldCreature );
				}
			}
		}
		
		var invButton = sideBar.slots.inventoryButton;
		if ( mouseX > invButton.x && mouseX < invButton.x + invButton.w
			&& mouseY > invButton.y && mouseY < invButton.y + invButton.h ) {
			screen.loot.up = false;
			screen.spells.up = false;
			screen.inventory.toggleScreen();
		}
		
		var spellButton = sideBar.slots.spellBookButton;
		if ( mouseX > spellButton.x && mouseX < spellButton.x + spellButton.w
			&& mouseY > spellButton.y && mouseY < spellButton.y + spellButton.h ) {
			var oldTileCR = clickState.clicks[ 0 ],
				oldTileXY = Helper.CRtoXY( oldTileCR.col, oldTileCR.row ),
				creature = creatureManager.getCreature( oldTileXY );
			if ( creature && Data.entities[ creature.ent ].spells ) {
				screen.loot.up = false;
				screen.inventory.up = false;
				screen.spells.toggleScreen();
			}
		}
		
	}
	
	if ( invScreen ) {
		var oldTileCR = clickState.clicks[ 0 ],
			oldTileXY = Helper.CRtoXY( oldTileCR.col, oldTileCR.row ),
			creature = creatureManager.getCreature( oldTileXY );

		screen.inventory.selectInv( { x: mouseX, y: mouseY }, creature );
	}
	
	if ( lootScreen ) {
		var newTileCR = clickState.clicks[ 0 ],
			newTileXY = Helper.CRtoXY( newTileCR.col, newTileCR.row ),
			newCreature = creatureManager.getCreature( newTileXY );
		var oldTileCR = clickState.clicks[ 1 ],
			oldTileXY = Helper.CRtoXY( oldTileCR.col, oldTileCR.row ),
			oldCreature = creatureManager.getCreature( oldTileXY );

		screen.loot.selectInv( { x: mouseX, y: mouseY }, newCreature, oldCreature );
	}
			
	if ( spellsScreen ) {
		var oldTileCR = clickState.clicks[ 0 ],
			oldTileXY = Helper.CRtoXY( oldTileCR.col, oldTileCR.row ),
			creature = creatureManager.getCreature( oldTileXY );
		
		screen.spells.selectSpell( { x: mouseX, y: mouseY }, creature );
	}
	
	input[ control ].left.down = false;
}






var lvl1 = function() {
	var a = creatureManager.spawnCreature( tileManager.getTile( { col: 1, row: 1 } ), "Archibald", { rHand: "staff", torso: "robe", tail: "candle" } );
	a.inventory.push( "dagger" );
	creatureManager.spawnCreature( tileManager.getTile( { col: 2, row: 1 } ), "Urial", { rHand: "maul", torso: "armor" } );
	var t = creatureManager.spawnCreature( tileManager.getTile( { col: 3, row: 1 } ), "Thomas", { rHand: "sword", lHand: "shield", torso: "armor" } );
	t.inventory.push( "greatSword", "spear", "shield" );
	var rye = creatureManager.spawnCreature( tileManager.getTile( { col: 4, row: 2 } ), "Rye", { rHand: "dagger", lHand: "dagger" } );
	rye.inventory.push( "bow" );
	
	var ant = creatureManager.spawnCreature( tileManager.getTile( { col: 2, row: 6 } ), "Mandiblar", { head: "mandibles", active: "head", torso: "chitin" } );
	ant.inventory.push( "mask" );
	ant.AI = true;
	ant.vision = 8;
	ant = creatureManager.spawnCreature( tileManager.getTile( { col: 5, row: 6 } ), "Mandiblar", { head: "mandibles", active: "head", torso: "chitin" } );
	ant.AI = true;
	ant.vision = 8;
	
	ant = creatureManager.spawnCreature( tileManager.getTile( { col: 6, row: 6 } ), "Mandiblar", { head: "mandibles", active: "head", torso: "chitin" } );
	ant.AI = true;
	ant.vision = 8;
	
	var tile = tileManager.getTile( { col: 1, row: 3 } );
	tile.env = "wall";
	var tile = tileManager.getTile( { col: 2, row: 3 } );
	tile.env = "wall";
	var tile = tileManager.getTile( { col: 3, row: 3 } );
	tile.env = "wall";
	var tile = tileManager.getTile( { col: 10, row: 13 } );
	tile.env = "wall";
	var tile = tileManager.getTile( { col: 11, row: 12 } );
	tile.env = "wall";
	var tile = tileManager.getTile( { col: 12, row: 12 } );
	tile.env = "wall";
	
	// var a = creatureManager.spawnCreature( tileManager.getTile( { col: 32, row: 22 } ), "Vex", { rHand: "staff", torso: "robe", tail: "candle" } );
	// a.inventory.push( "dagger" );
	// a.facing = "l";
	// var c = creatureManager.spawnCreature( tileManager.getTile( { col: 31, row: 22 } ), "Cora", { rHand: "maul", torso: "armor" } );
	// c.facing = "l";
	// var t = creatureManager.spawnCreature( tileManager.getTile( { col: 30, row: 22 } ), "Minsc", { rHand: "greatSword", torso: "armor" } );
	// t.inventory.push( "sword", "shield", "spear" );
	// t.facing = "l";
	// var rye = creatureManager.spawnCreature( tileManager.getTile( { col: 29, row: 21 } ), "Cade", { rHand: "dagger", lHand: "dagger" } );
	// rye.inventory.push( "bow" );
	// rye.facing = "l";
	
	// var ant = creatureManager.spawnCreature( tileManager.getTile( { col: 31, row: 17 } ), "Mandiblar", { head: "mandibles", active: "head", torso: "chitin" } );
	// ant.inventory.push( "mask" );
	// ant.facing = "l";
	// var ant = creatureManager.spawnCreature( tileManager.getTile( { col: 28, row: 17 } ), "Mandiblar", { head: "mandibles", active: "head", torso: "chitin" } );
	// ant.facing = "l";
	// var ant = creatureManager.spawnCreature( tileManager.getTile( { col: 27, row: 17 } ), "Mandiblar", { head: "mandibles", active: "head", torso: "chitin" } );
	// ant.facing = "l";
	
	var tile = tileManager.getTile( { col: 32, row: 20 } );
	tile.env = "wall";
	var tile = tileManager.getTile( { col: 31, row: 20 } );
	tile.env = "wall";
	var tile = tileManager.getTile( { col: 30, row: 20 } );
	tile.env = "wall";
	var tile = tileManager.getTile( { col: 23, row: 10 } );
	tile.env = "wall";
	var tile = tileManager.getTile( { col: 22, row: 11 } );
	tile.env = "wall";
	var tile = tileManager.getTile( { col: 21, row: 11 } );
	tile.env = "wall";
	var tile = tileManager.getTile( { col: 16, row: 11 } );
	tile.doodad = "mushroom";
}

lvl1();

turns.buildList( creatureManager.creatures );


var cullDead = function() {
	for ( var i = creatureManager.creatures.length - 1; i >= 0; --i ) {
		var creature = creatureManager.creatures[ i ];
		if ( !creature.dead ) {
			if ( creature.stats.health <= 0 ) {
				var tile = tileManager.getTile( creature.getCR() );
				tile.occupied = "corpse";
				for ( var j = turns.notGone.length - 1; j >= 0; --j ) {
					var notGone = turns.notGone[ j ];
					if ( notGone.x == creature.x && notGone.y == creature.y ) {
						turns.notGone.splice( j, 1 );
					}
					if ( turns.current.x == creature.x && turns.current.y == creature.y ) {
						turns.next = false;
						turns.current = false;
					}
				}
				for ( var j = turns.gone.length - 1; j >= 0; --j ) {
					var gone = turns.gone[ j ];
					if ( gone.x == creature.x && gone.y == creature.y ) {
						turns.gone.splice( j, 1 );
					}
					if ( turns.current.x == creature.x && turns.current.y == creature.y ) {
						turns.next = false;
						turns.current = false;
					}
				}
				creature.die();
			}
		}
	}
}

var spellTweens = {
		tweens: {}
	}
	
var itemTweens = {
		tweens: {}
	}
	
var lastTime = 0;
var loop = function( t ) {
	requestAnimationFrame( loop );
	
	var dt = t - lastTime;
	lastTime = t;
	
	keyboardState.update();
	clickState.update();
	
	
	for( var i = tileManager.tiles.length - 1; i >= 0; --i ) {
		var tl = tileManager.tiles[ i ];
		
		Renderings.env( tl );
		
		if ( tl.doodad ) {
			
			var xy = tl.getXY();
			
			
			var temp = {
				x: xy.x,
				y: xy.y,
				w: 16,
				h: 16,
				sprite: tl.doodad
			}
			
			Renderings.doodad( temp );
		}
		
		if ( tl.selected && !tl.occupied ) {
			
			var tileXY = Helper.CRtoXY( tl.col, tl.row );
			
			Renderings.portrait( tl );
			
			Renderings.selected( {
				x: tileXY.x - tileManager.size * .5,
				y: tileXY.y - tileManager.size * .5,
				w: tileManager.size,
				h: tileManager.size,
				styleType: Data.enviorments[ tl.env ].affiliation
			} );
			
			var name = Data.enviorments[ tl.env ].name;
			
			var txt = name,
				font = "12px Arial";
			
			var dispName = {
				txt: txt,
				font: font,
				fillColor: "white",
				x: sideBar.slots.name.x,
				y: sideBar.slots.name.y,
				alignment: "center"
			}
			
			Renderings.txt( dispName );
		}
		if ( tl.available ) {
			var tileXY = tl.getXY();
			Renderings.available( {
				x: tileXY.x - tileManager.size * .5,
				y: tileXY.y - tileManager.size * .5,
				w: tileManager.size,
				h: tileManager.size,
				styleType: tl.available
			} );
		}
	}
	
	for ( var i = creatureManager.creatures.length - 1; i >= 0; --i ) {
		var creature = creatureManager.creatures[ i ];
		if( !creature.dead ) { 
			Renderings.ent( creature );
		}
		else {
			var renderCorpse = {
				x: creature.x,
				y: creature.y,
				w: tileManager.size,
				h: tileManager.size,
				sprite: "corpse"
			}

			Renderings.corpse( renderCorpse );
		}
		
		if ( creature.selected ) {
			Renderings.portrait( creature );
			
			Renderings.selected( {
				x: creature.x - tileManager.size * .5,
				y: creature.y - tileManager.size * .5,
				w: tileManager.size,
				h: tileManager.size,
				styleType: creature.dead ? "loot" : Relationships.getRelationship( Data.entities[ creature.ent ].affiliation )
			} );

			var name = Data.entities[ creature.ent ].name;
			
			var txt = name,
				font = "12px Arial";
			
			var dispName = {
				txt: txt,
				font: font,
				fillColor: "white",
				x: sideBar.slots.name.x,
				y: sideBar.slots.name.y,
				alignment: "center"
			}
			
			Renderings.txt( dispName );
			
			var txt = "Actions: " + creature.actionPool,
				font = "10px Arial";
			
			var dispActionPool = {
				txt: txt,
				font: font,
				fillColor: "white",
				x: sideBar.slots.actionPool.x,
				y: sideBar.slots.actionPool.y,
			}
			
			Renderings.txt( dispActionPool );
			
			var hp = creature.stats.health,
				maxHp = creature.stats.maxHealth;
			
			var txt = "Health: " + hp + "/" + maxHp,
				font = "10px Arial";
			
			var dispHp = {
				txt: txt,
				font: font,
				fillColor: "white",
				x: sideBar.slots.health.x,
				y: sideBar.slots.health.y
			}
			
			Renderings.txt( dispHp );
			
			var lHand = creature.equipted.lHand;
			if ( lHand ) {
				var item = Data.weapons[ lHand ],
					slot = sideBar.slots.lHand;
				var renderLHand = {
					x: slot.x,
					y: slot.y,
					w: slot.w,
					h: slot.h,
					//fillColor: "rgb( 60, 60, 40 )",
					sprite: item.portrait
				}
				if ( creature.equipted.active == "lHand" ) renderLHand.strokeColor = "rgb(100, 100, 0 )";
				Renderings.invItem( renderLHand );
				
			}
			
			var rHand = creature.equipted.rHand;
			if ( rHand ) {
				var item = Data.weapons[ rHand ],
					slot = sideBar.slots.rHand;
				var renderRHand = {
					x: slot.x,
					y: slot.y,
					w: slot.w,
					h: slot.h,
					//fillColor: "rgb( 60, 60, 40 )",
					sprite: item.portrait
				}
				if ( creature.equipted.active == "rHand" ) renderRHand.strokeColor = "rgb(100, 100, 0 )";
				
				Renderings.invItem( renderRHand );
			}
			
			var active = creature.equipted.active;
			var weapData = creature.casting ? Data.spells[ creature.casting ] : Data.weapons[ creature.equipted[ active ] ];
			if ( weapData ) {
				var txt = weapData.name,
					font = "10px Arial";
				
				var dispWeaponName = {
					txt: txt,
					font: font,
					fillColor: "white",
					x: sideBar.slots.weaponName.x,
					y: sideBar.slots.weaponName.y,
					alignment: "center"
					
				}
				
				Renderings.txt( dispWeaponName );
				if ( weapData.damage ) {
					var txt = "Dam: " + weapData.damage.min + "-" + weapData.damage.max,
						font = "10px Arial";
					
					var dispDamage = {
						txt: txt,
						font: font,
						fillColor: "white",
						x: sideBar.slots.weaponDamage.x,
						y: sideBar.slots.weaponDamage.y
					}
					
					Renderings.txt( dispDamage );
				}
				
				if ( weapData.defense ) {
					var txt = "Def: " + weapData.defense.min + "-" + weapData.defense.max,
						font = "10px Arial";
					
					var dispDefense = {
						txt: txt,
						font: font,
						fillColor: "white",
						x: sideBar.slots.weaponDefense.x,
						y: sideBar.slots.weaponDefense.y
					}
					
					Renderings.txt( dispDefense );
				}
					
				var txt = "Range: " + weapData.range,
					font = "10px Arial";
				
				var dispCost = {
					txt: txt,
					font: font,
					fillColor: "white",
					x: sideBar.slots.weaponRange.x,
					y: sideBar.slots.weaponRange.y
				}
				
				Renderings.txt( dispCost );
				
				
				var tempCostSlot = creature.equipted.active;
				var tempCost = creature.tempCost[ tempCostSlot ];
				//var totalCost = weapData.cost + tempCost;
				var txt = "Cost: " + weapData.cost + " + " + tempCost,
					font = "10px Arial";
				
				var dispCost = {
					txt: txt,
					font: font,
					fillColor: "white",
					x: sideBar.slots.weaponCost.x,
					y: sideBar.slots.weaponCost.y
				}
				
				Renderings.txt( dispCost );
			}
			
			if( !creature.dead ) {
				Renderings.ui( sideBar.slots.inventoryButton );
			
				if ( Data.entities[ creature.ent ].spells ) {
					sideBar.slots.spellBookButton.sprite = ( screen.spells.up ) ? "spellBookOpen" : "spellBook";
					Renderings.ui( sideBar.slots.spellBookButton );
				}
			}
			
			if ( screen.inventory.up ) {
				Renderings.invScreen( screen.inventory );
				
				
				if ( screen.inventory.slots.selected.item ) {
					var item = Data.weapons[ screen.inventory.slots.selected.item ];
					if ( screen.inventory.slots.selected.type == "inventory" && item.equiptable && item.hands != 1 ) {
						var slot = screen.inventory.slots.equip;
						var renderObj = {
							x: slot.x,
							y: slot.y,
							w: slot.w,
							h: slot.h,
							sprite: slot.sprite
						};
						Renderings.invButton( renderObj );
						
						var txt = "Cost: 1",
							font = "8px Arial";
						
						var renderObj = {
							txt: txt,
							font: font,
							fillColor: "white",
							x: slot.x + tileManager.size * .75 + 4,
							y: slot.y + tileManager.size * .25 - 5,
							alignment: "center"
						}
						Renderings.spellItemTxt( renderObj );
					}
					else if ( screen.inventory.slots.selected.type == "inventory" && item.equiptable ){
						var slot = screen.inventory.slots.equL;

						var renderObj = {
							x: slot.x,
							y: slot.y,
							w: slot.w,
							h: slot.h,
							sprite: slot.sprite
						};
						Renderings.invButton( renderObj );
						
						var slot = screen.inventory.slots.equR;
						var renderObj = {
							x: slot.x,
							y: slot.y,
							w: slot.w,
							h: slot.h,
							sprite: slot.sprite
						};
						Renderings.invButton( renderObj );
						
						var slot = screen.inventory.slots.equip;
						var txt = "Cost: 1",
							font = "8px Arial";
						
						var renderObj = {
							txt: txt,
							font: font,
							fillColor: "white",
							x: slot.x + tileManager.size * .75 + 4,
							y: slot.y + tileManager.size * .25 - 5,
							alignment: "center"
						}
						Renderings.spellItemTxt( renderObj )
					}
					
					
					var slot = screen.inventory.slots.selected;
					var spell = slot.item;

					if ( itemTweens.tweens[ "sel" + spell ] ) {
						var spell = itemTweens.tweens[ "sel" + spell ];
						if ( spell.cycle == 0 ) { 
							spell.cycle = 3;							
							spell.last = 3;							
							tween.createTween( spell, { cycle: 0 }, 500 );
						}
						Renderings.invItem( spell )
					}
					else {
						var spellName = "sel" + spell,
							spell = Data.weapons[ spell ];
						var renderObj = {
							x: slot.x,
							y: slot.y,
							w: slot.w,
							h: slot.h,
							cycle: 3,
							last: 3,
							sprite: item.portrait
						};
						if ( spell.anim ) {
							Renderings.invItem( renderObj );
							itemTweens.tweens[ spellName ] = renderObj;
							
							tween.createTween( renderObj, { cycle: 0 }, 500 );
						}
						tween.createTween( renderObj, { cycle: 0 }, 500 );
						Renderings.invItem( renderObj );
					}
					
					var txt = item.name,
						font = "9px Arial";
					
					var renderName = {
						txt: txt,
						font: font,
						fillColor: "white",
						x: slot.x - tileManager.size * .5 + 4,
						y: slot.y + tileManager.size * 3,
						alignment: "center"
					}
					Renderings.spellItemTxt( renderName )
					
					
					if ( item.range ) {
						var txt = "Range: " + item.range,
							font = "9px Arial";
						
						var renderObj = {
							txt: txt,
							font: font,
							fillColor: "white",
							x: slot.x - tileManager.size * .5 + 4,
							y: slot.y + tileManager.size * 3.5,
							alignment: "center"
						}
						Renderings.spellItemTxt( renderObj )
					}
					
					if ( item.cost ) {
						var txt = "Cost: " + item.cost,
							font = "9px Arial";
						
						var renderObj = {
							txt: txt,
							font: font,
							fillColor: "white",
							x: slot.x - tileManager.size * .5 + 4,
							y: slot.y + tileManager.size * 4,
							alignment: "center"
						}
						Renderings.spellItemTxt( renderObj )
					}
					
					if ( item.damage ) {
						var txt = "Damage: " + item.damage.min + "-" + item.damage.max,
							font = "9px Arial";
						
						var renderObj = {
							txt: txt,
							font: font,
							fillColor: "white",
							x: slot.x - tileManager.size * .5 + 4,
							y: slot.y + tileManager.size * 4.5,
							alignment: "center"
						}
						Renderings.spellItemTxt( renderObj )
					}
					
					if ( item.defense ) {
						var txt = "Defense: " + item.defense.min + "-" + item.defense.max,
							font = "9px Arial";
						
						var renderObj = {
							txt: txt,
							font: font,
							fillColor: "white",
							x: slot.x - tileManager.size * .5 + 4,
							y: slot.y + tileManager.size * 5,
							alignment: "center"
						}
						Renderings.spellItemTxt( renderObj )
					}
				}
				
				
				var cil = creature.inventory.length;
				for ( var j = 0; j < cil; ++j ) {
					var slot = screen.inventory.slots.pack[ j ];
					var itemName = creature.inventory[ j ];
					if ( itemName ) {
						var spell = itemName;
	
						if ( itemTweens.tweens[ "inv" + spell ] ) {
							var spell = itemTweens.tweens[ "inv" + spell ];
								spell.x = slot.x;
								spell.y = slot.y;
								spell.w = slot.w;
								spell.h = slot.h;
							if ( spell.cycle == 0 ) { 
								spell.cycle = 3;							
								spell.last = 3;
								tween.createTween( spell, { cycle: 0 }, 500 );
							}
							Renderings.invItem( spell )
						}
						else {
							
							var spellName = "inv" + spell,
								spell = Data.weapons[ spell ];
							var renderObj = {
								x: slot.x,
								y: slot.y,
								w: slot.w,
								h: slot.h,
								cycle: 3,
								last: 3,
								sprite: spell.portrait
							};
							if ( spell.anim ) {
								Renderings.invItem( renderObj );
								itemTweens.tweens[ spellName ] = renderObj;
								
								tween.createTween( renderObj, { cycle: 0 }, 500 );
							}
							Renderings.invItem( renderObj );
						}
					}
				}

				if ( creature.equipted.head ) {
					var renderHead = Data.weapons[ creature.equipted.head ];
					var renderObj = {
							x: screen.inventory.slots.head.x,
							y: screen.inventory.slots.head.y,
							w: screen.inventory.slots.head.w,
							h: screen.inventory.slots.head.h,
							sprite: renderHead.portrait
						};
					Renderings.invItem( renderObj );
				}
				
				if ( creature.equipted.torso ) {
					var renderTorso = Data.weapons[ creature.equipted.torso ];
					var renderObj = {
							x: screen.inventory.slots.torso.x,
							y: screen.inventory.slots.torso.y,
							w: screen.inventory.slots.torso.w,
							h: screen.inventory.slots.torso.h,
							sprite: renderTorso.portrait
						};
					Renderings.invItem( renderObj );
				}
				
				if ( creature.equipted.rHand ) {
					var renderRight = Data.weapons[ creature.equipted.rHand ];
					var renderObj = {
							x: screen.inventory.slots.rHand.x,
							y: screen.inventory.slots.rHand.y,
							w: screen.inventory.slots.rHand.w,
							h: screen.inventory.slots.rHand.h,
							sprite: renderRight.portrait
						};
					Renderings.invItem( renderObj );
					if ( renderRight.hands > 1 ) {
						var renderLeft = Data.weapons[ creature.equipted.rHand ];
						var renderObj = {
								x: screen.inventory.slots.lHand.x,
								y: screen.inventory.slots.lHand.y,
								w: screen.inventory.slots.lHand.w,
								h: screen.inventory.slots.lHand.h,
								sprite: renderLeft.portrait
							};
						Renderings.invItem( renderObj );
					}
				}
				
				if ( creature.equipted.lHand ) {
					var renderLeft = Data.weapons[ creature.equipted.lHand ];
					var renderObj = {
							x: screen.inventory.slots.lHand.x,
							y: screen.inventory.slots.lHand.y,
							w: screen.inventory.slots.lHand.w,
							h: screen.inventory.slots.lHand.h,
							sprite: renderLeft.portrait
						};
					Renderings.invItem( renderObj );
				}
				
				if ( creature.equipted.tail ) {
					var spell = creature.equipted.tail;
					var renderTail = Data.weapons[ spell ];
					
					
					if ( itemTweens.tweens[ spell ] ) {
						var spell = itemTweens.tweens[ spell ];
						if ( spell.cycle == 0 ) { 
							spell.cycle = 3;							
							spell.last = 3;							
							tween.createTween( spell, { cycle: 0 }, 500 );
						}
						Renderings.invItem( spell )
					}
					else {
						var spellName = spell,
							spell = Data.weapons[ spell ];
						var renderObj = {
								x: screen.inventory.slots.tail.x,
								y: screen.inventory.slots.tail.y,
								w: screen.inventory.slots.tail.w,
								h: screen.inventory.slots.tail.h,
								last: 3,
								sprite: spell.portrait,
								cycle: 3
							};
						itemTweens.tweens[ spellName ] = renderObj;

						tween.createTween( renderObj, { cycle: 0 }, 500 );
						Renderings.invItem( renderObj );
					}
				}
				
			}
			else {
				if( !screen.loot.up ) {
					itemTweens.tweens = [];
				}
			}
			
			if ( screen.loot.up ) {
				Renderings.invScreen( screen.loot );
				
				
				if ( screen.loot.slots.selected.item ) {
					var slot = screen.loot.slots.take;
					var renderObj = {
						x: slot.x,
						y: slot.y,
						w: slot.w,
						h: slot.h,
						sprite: slot.sprite
					};
					Renderings.invButton( renderObj );
					
					var txt = "Cost: 1",
						font = "8px Arial";
					
					var renderObj = {
						txt: txt,
						font: font,
						fillColor: "white",
						x: slot.x + tileManager.size * .75 + 4,
						y: slot.y + tileManager.size * .25 + 3,
						alignment: "center"
					}
					Renderings.spellItemTxt( renderObj )
					
					var slot = screen.loot.slots.selected;
					var spell = slot.item;
					var item = Data.weapons[ spell ];
					if ( itemTweens.tweens[ "sel" + spell ] ) {
						var spell = itemTweens.tweens[ "sel" + spell ];
						if ( spell.cycle == 0 ) { 
							spell.cycle = 3;							
							spell.last = 3;							
							tween.createTween( spell, { cycle: 0 }, 500 );
						}
						Renderings.invItem( spell )
					}
					else {
						var spellName = "sel" + spell,
							spell = Data.weapons[ spell ];
						var renderObj = {
							x: slot.x,
							y: slot.y,
							w: slot.w,
							h: slot.h,
							cycle: 3,
							last: 3,
							sprite: spell.portrait
						};
						if ( spell.anim ) {
							Renderings.invItem( renderObj );
							itemTweens.tweens[ spellName ] = renderObj;
							
							tween.createTween( renderObj, { cycle: 0 }, 500 );
						}
						tween.createTween( renderObj, { cycle: 0 }, 500 );
						Renderings.invItem( renderObj );
					}
					
					var txt = item.name,
						font = "9px Arial";
					
					var renderName = {
						txt: txt,
						font: font,
						fillColor: "white",
						x: slot.x - tileManager.size * .5 + 4,
						y: slot.y + tileManager.size * 3,
						alignment: "center"
					}
					Renderings.spellItemTxt( renderName )
					
					
					if ( item.range ) {
						var txt = "Range: " + item.range,
							font = "9px Arial";
						
						var renderObj = {
							txt: txt,
							font: font,
							fillColor: "white",
							x: slot.x - tileManager.size * .5 + 4,
							y: slot.y + tileManager.size * 3.5,
							alignment: "center"
						}
						Renderings.spellItemTxt( renderObj )
					}
					
					if ( item.cost ) {

						var txt = "Cost: " + item.cost,
							font = "9px Arial";
						
						var renderObj = {
							txt: txt,
							font: font,
							fillColor: "white",
							x: slot.x - tileManager.size * .5 + 4,
							y: slot.y + tileManager.size * 4,
							alignment: "center"
						}
						Renderings.spellItemTxt( renderObj )
					}
					
					if ( item.damage ) {
						var txt = "Damage: " + item.damage.min + "-" + item.damage.max,
							font = "9px Arial";
						
						var renderObj = {
							txt: txt,
							font: font,
							fillColor: "white",
							x: slot.x - tileManager.size * .5 + 4,
							y: slot.y + tileManager.size * 4.5,
							alignment: "center"
						}
						Renderings.spellItemTxt( renderObj )
					}
					
					if ( item.defense ) {
						var txt = "Defense: " + item.defense.min + "-" + item.defense.max,
							font = "9px Arial";
						
						var renderObj = {
							txt: txt,
							font: font,
							fillColor: "white",
							x: slot.x - tileManager.size * .5 + 4,
							y: slot.y + tileManager.size * 5,
							alignment: "center"
						}
						Renderings.spellItemTxt( renderObj )
					}
				}
				
				var cil = creature.inventory.length;
				for ( var j = 0; j < cil; ++j ) {
					var slot = screen.loot.slots.pack[ j ];
					var itemName = creature.inventory[ j ];
					if ( itemName ) {
						var spell = itemName;
	
						if ( itemTweens.tweens[ "inv" + spell ] ) {
							var spell = itemTweens.tweens[ "inv" + spell ];
							if ( spell.cycle == 0 ) { 
								spell.cycle = 3;							
								spell.last = 3;							
								tween.createTween( spell, { cycle: 0 }, 500 );
							}
							Renderings.invItem( spell )
						}
						else {
							
							var spellName = "inv" + spell,
								spell = Data.weapons[ spell ];
							var renderObj = {
								x: slot.x,
								y: slot.y,
								w: slot.w,
								h: slot.h,
								cycle: 3,
								last: 3,
								sprite: spell.portrait
							};
							if ( spell.anim ) {
								Renderings.invItem( renderObj );
								itemTweens.tweens[ spellName ] = renderObj;
								
								tween.createTween( renderObj, { cycle: 0 }, 500 );
							}
							Renderings.invItem( renderObj );
						}
					}
				}
				
				if ( creature.equipted.head ) {
					var renderHead = Data.weapons[ creature.equipted.head ];
					var renderObj = {
							x: screen.loot.slots.head.x,
							y: screen.loot.slots.head.y,
							w: screen.loot.slots.head.w,
							h: screen.loot.slots.head.h,
							sprite: renderHead.portrait
						};
					Renderings.invItem( renderObj );
				}
				
				if ( creature.equipted.torso ) {
					var renderTorso = Data.weapons[ creature.equipted.torso ];
					var renderObj = {
							x: screen.loot.slots.torso.x,
							y: screen.loot.slots.torso.y,
							w: screen.loot.slots.torso.w,
							h: screen.loot.slots.torso.h,
							sprite: renderTorso.portrait
						};
					Renderings.invItem( renderObj );
				}
				
				if ( creature.equipted.rHand ) {
					var renderRight = Data.weapons[ creature.equipted.rHand ];
					var renderObj = {
							x: screen.loot.slots.rHand.x,
							y: screen.loot.slots.rHand.y,
							w: screen.loot.slots.rHand.w,
							h: screen.loot.slots.rHand.h,
							sprite: renderRight.portrait
						};
					Renderings.invItem( renderObj );
					if ( renderRight.hands > 1 ) {
						var renderLeft = Data.weapons[ creature.equipted.rHand ];
						var renderObj = {
								x: screen.loot.slots.lHand.x,
								y: screen.loot.slots.lHand.y,
								w: screen.loot.slots.lHand.w,
								h: screen.loot.slots.lHand.h,
								sprite: renderLeft.portrait
							};
						Renderings.invItem( renderObj );
					}
				}
				
				if ( creature.equipted.lHand ) {
					var renderLeft = Data.weapons[ creature.equipted.lHand ];
					var renderObj = {
							x: screen.loot.slots.lHand.x,
							y: screen.loot.slots.lHand.y,
							w: screen.loot.slots.lHand.w,
							h: screen.loot.slots.lHand.h,
							sprite: renderLeft.portrait
						};
					Renderings.invItem( renderObj );
				}
				
				
				if ( creature.equipted.tail ) {
					var spell = creature.equipted.tail;
					var renderTail = Data.weapons[ spell ];
					
					
					if ( itemTweens.tweens[ spell ] ) {
						var spell = itemTweens.tweens[ spell ];
						if ( spell.cycle == 0 ) { 
							spell.cycle = 3;							
							spell.last = 3;							
							tween.createTween( spell, { cycle: 0 }, 500 );
						}
						Renderings.invItem( spell )
					}
					else {
						var spellName = spell,
							spell = Data.weapons[ spell ];
						var renderObj = {
								x: screen.loot.slots.tail.x,
								y: screen.loot.slots.tail.y,
								w: screen.loot.slots.tail.w,
								h: screen.loot.slots.tail.h,
								last: 3,
								sprite: spell.portrait,
								cycle: 3
							};
						itemTweens.tweens[ spellName ] = renderObj;

						tween.createTween( renderObj, { cycle: 0 }, 500 );
						Renderings.invItem( renderObj );
					}
				}
				
			}
			
			if ( screen.spells.up ) {
				Renderings.spellsScreen( screen.spells );
				
				var oldTileCR = clickState.clicks[ 0 ],
					oldTileXY = Helper.CRtoXY( oldTileCR.col, oldTileCR.row ),
					creature = creatureManager.getCreature( oldTileXY );
				if ( creature.casting ) {
					
					if ( spellTweens.tweens[ "sel" + creature.casting ] ) {
						var spell = spellTweens.tweens[ "sel" + creature.casting ];

						spell.sprite = Data.spells[ creature.casting ].portrait;
						if ( spell.cycle == 0 ) { 
							spell.cycle = 3;
							spell.last = 3;
							tween.createTween( spell, { cycle: 0 }, 500 );
						}
						Renderings.spellItem( spell )
					}
					else {
						var slot = screen.spells.slots.selected,
							spellName = creature.casting,
							spell = Data.spells[ spellName ];
						var renderObj = {
								x: slot.x,
								y: slot.y,
								w: slot.w,
								h: slot.h,
								last: 3,
								sprite: spell.portrait,
								cycle: 3
							};
						++col;
						spellTweens.tweens[ "sel" + spellName ] = renderObj;
						tween.createTween( renderObj, { cycle: 0 }, 500 );
						Renderings.spellItem( renderObj );
					}
					
					var slot = screen.spells.slots.selected;
					var txt = Data.spells[ creature.casting ].name,
						font = "9px Arial";
					
					var renderObj = {
						txt: txt,
						font: font,
						fillColor: "white",
						x: slot.x + tileManager.size * 5 - 3,
						y: slot.y - tileManager.size * .25,
						alignment: "center"
					}
					Renderings.spellItemTxt( renderObj )
					
					var txt = "Range: " + Data.spells[ creature.casting ].range,
						font = "9px Arial";
					
					var renderObj = {
						txt: txt,
						font: font,
						fillColor: "white",
						x: slot.x + tileManager.size * 5 - 3,
						y: slot.y + tileManager.size * .5,
						alignment: "center"
					}
					
					Renderings.spellItemTxt( renderObj )
					
					var txt = "Cost: " + Data.spells[ creature.casting ].cost,
						font = "9px Arial";
					
					var renderObj = {
						txt: txt,
						font: font,
						fillColor: "white",
						x: slot.x + tileManager.size * 5 - 3,
						y: slot.y + tileManager.size,
						alignment: "center"
					}
					Renderings.spellItemTxt( renderObj )
					
					if ( Data.spells[ creature.casting ].damage ) {
						var txt = "Dam: " + Data.spells[ creature.casting ].damage.min + "-" + Data.spells[ creature.casting ].damage.max,
							font = "9px Arial";
						
						var renderObj = {
							txt: txt,
							font: font,
							fillColor: "white",
							x: slot.x + tileManager.size * 5 - 3,
							y: slot.y + tileManager.size * 1.5,
							alignment: "center"
						}
						Renderings.spellItemTxt( renderObj );
					}
					if ( Data.spells[ creature.casting ].defense ) {
						var txt = "Def: " + Data.spells[ creature.casting ].defense.min + "-" + Data.spells[ creature.casting ].defense.max,
							font = "9px Arial";
						
						var renderObj = {
							txt: txt,
							font: font,
							fillColor: "white",
							x: slot.x + tileManager.size * 5 - 3,
							y: slot.y + tileManager.size * 2,
							alignment: "center"
						}
						Renderings.spellItemTxt( renderObj );
					}
				}
				
				
				var spellsData = Data.entities[ creature.ent ];
				var csl = spellsData.spells.length;
				var col = 0,
					xSpacer = 4;
				for ( var j = 0; j < csl; ++j ) {

					var spell = spellsData.spells[ j ];
					var slot = screen.spells.slots[ j ];
					if ( spellTweens.tweens[ spell ] ) {
						var spell = spellTweens.tweens[ spell ];
						if ( spell.cycle == 0 ) { 
							spell.cycle = 3;							
							spell.last = 3;							
							tween.createTween( spell, { cycle: 0 }, 500 );
						}
						Renderings.spellItem( spell )
					}
					else {
						spellName = spell;
						spell = Data.spells[ spell ];
						var renderObj = {
								x: slot.x,
								y: slot.y,
								w: slot.w,
								h: slot.h,
								last: 3,
								sprite: spell.portrait,
								cycle: 3
							};
						++col;
						spellTweens.tweens[ spellName ] = renderObj;
						tween.createTween( renderObj, { cycle: 0 }, 500 );
						Renderings.spellItem( renderObj );
					}
				}
			}
			else {
				spellTweens.tweens = [];
			}
		}
	}
	
	if( turns.current ) {
		var creature = turns.current,
			tile = tileManager.getTile( creature.getCR() );
		var turnObj = {
			x: creature.x - 4,
			y: creature.y - tileManager.size,
			w: 8,
			h: 8,
			sprite: "myTurn"
		}
		Renderings.myTurn( turnObj );
	}
	
	
	Renderings.stage( stage );
	Renderings.ui( log.screen );
	
	var lll = log.lines.length;
	for ( var i = 0; i < log.lines.length; ++i ) {
		var txt = log.lines[ i ];
		var line = {
			font: "9px Arial",
			txt: txt,
			x: log.screen.x + 3,
			y: log.screen.y + 10 + 9 * i
		}
		Renderings.txt( line );
	}
	
	for( var i = effect.effects.length - 1; i >= 0; --i ) {
		var eff = effect.effects[ i ];
		if ( eff.txt ) {
			Renderings.txt( eff );
		}
		
		if ( eff.sprite ) {
			Renderings.sprites( eff );
		}
	}
	
	render.createRender( Renderings.renderAll() );
	
	render.update();
	tween.update( dt );
	effect.update();
	cullDead();
	turns.update();
}


var sprites = [
	"dirt.png",
	"shieldBash.png",
	"corpse.png",
	"bow.png",
	"chitin.png",
	"equip.png",
	"equL.png",
	"equR.png",
	"take.png",
	"spear.png",
	"spearStab.png",
	"staffSwipe.png",
	"armor.png",
	"spellBook.png",
	"spellBookOpen.png",
	"missile.png",
	"noxiousOrb.png",
	"moltenOrb.png",
	"healingTouch.png",
	"protection.png",
	"fervor.png",
	"staff.png",
	"sword.png",
	"maul.png",
	"maulSwipe.png",
	"dagger.png",
	"shield.png",
	"candle.png",
	"robe.png",
	"lootScreen.png",
	"invScreen.png",
	"spellScreen.png",
	"mask.png",
	"archibald.png",
	"urial.png",
	"bite.png",
	"backPack.png",
	"arrow.png",
	"swordSwipe.png",
	"greatSword.png",
	"daggerStab.png",
	"mouse.png",
	"mouse0.png",
	"wall.png",
	"thomas.png",
	"mandiblar.png",
	"mandibles.png",
	"ant.png",
	"move.png",
	"attack.png",
	"rye.png",
	"myTurn.png",
	"mushroom.png"
];

sprite.setSpriteFolder( "sprites/" );

sprite.queuePath( sprites );
log.toLog( "Press shift, or tap this log box to begin." );
sprite.loadSprites( loop );

//requestAnimationFrame( loop );