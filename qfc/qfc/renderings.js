console.log( "renderings.js is up!" );

var Renderings = {
	envs: [],
	ents: [],
	guis: [],
	effs: [],
	txts: [],
	screens: [],
	scrguis: [],
	screffs: [],
	scrtxts: []
};


Renderings.styles = { 
	selected: {
		neutral: {
			strokeColor: "rgb( 160, 160, 30 )"
		},
		loot: {
			strokeColor: "rgb( 160, 160, 30 )"
		},
		friend: {
			strokeColor: "rgb( 30, 160, 30 )"
		},
		foe: {
			strokeColor: "rgb( 160, 30, 30 )"
		},
	},
	available: {
		move: {
			fillColor: "rgba( 30, 30, 160, .3 )"
		},
		friend: {
			fillColor: "rgba( 30, 160, 30, .3 )"
		},
		foe: {
			fillColor: "rgba( 160, 30, 30, .3 )"
		},
		attack: {
			fillColor: "rgba( 160, 160, 30, .3 )"
		},
		loot: {
			fillColor: "rgba( 160, 160, 30, .3 )"
		},
		both: {
			fillColor: "rgba( 160, 30, 160, .3 )"
		},
		impass: {
			//fillColor: "rgba( 0, 0, 0, .3 )"
		}
	},
	attack: {
		move: {
			fillColor: "rgba( 160, 160, 30, .3 )"
		},
		friend: {
			fillColor: "rgba( 30, 160, 30, .3 )"
		},
		foe: {
			fillColor: "rgba( 160, 30, 30, .3 )"
		},
		attack: {
			fillColor: "rgba( 160, 160, 30, .3 )"
		},
		loot: {
			fillColor: "rgba( 160, 160, 30, .3 )"
		},
		impass: {
			//fillColor: "rgba( 0, 0, 0, .3 )"
		}
	}
	
}


Renderings.renderAll = function() {
	var renders = [];
	Array.prototype.push.apply( renders, this.scrtxts );
	Array.prototype.push.apply( renders, this.screffs );
	Array.prototype.push.apply( renders, this.scrguis );
	Array.prototype.push.apply( renders, this.screens );
	Array.prototype.push.apply( renders, this.txts );
	Array.prototype.push.apply( renders, this.effs );
	Array.prototype.push.apply( renders, this.guis );
	Array.prototype.push.apply( renders, this.ents );
	Array.prototype.push.apply( renders, this.envs );
	
	this.envs = [];
	this.ents = [];
	this.guis = [];
	this.effs = [];
	this.txts = [];
	this.screens = [],
	this.scrguis = [],
	this.screffs = [],
	this.scrtxts = []
	
	return renders;
}

Renderings.stage = function( obj ) {
	this.envs.push( {
		x: obj.x,
		y: obj.y,
		w: obj.w,
		h: obj.h,
		fillColor: "black"
	} )
}

Renderings.env = function( obj ) {
	var env = Data.enviorments[ obj.env ];

	this.envs.push( {
		x: obj.col * tileManager.size,
		y: obj.row * tileManager.size,
		w: tileManager.size,
		h: tileManager.size,
		fillColor: env.fillColor,
		spriteData: {
			sprite: env.sprite,
			index: obj.index || 0,
			w: 16,
			h: 16
		}
	} )
}

Renderings.ent = function( obj ) {
	var ent = Data.entities[ obj.ent ];

	if ( obj.cycle ) {
		if ( obj.changed == 1 ) {

			obj.index = ( obj.index < 3 ) ? obj.index + 1 : 0;
			obj.changed = 0;
		}
		if ( obj.last != Math.floor( obj.cycle ) ) {
			obj.last = Math.floor( obj.cycle );
			obj.changed = 1;
		}
	}
	
	var	w = tileManager.size,
		h = tileManager.size * .5,
		x = obj.x - w * .5,
		y = obj.y - h * .5;
	
	var flip = false,
		rotate = false;
	if ( obj.facing == "l" ) flip = true;
	if ( obj.facing == "u" ) rotate = ( 3 * Math.PI ) / 2;
	if ( obj.facing == "d" ) rotate = Math.PI / 2;
	
	this.ents.push( {
		x: x,
		y: y,
		w: w,
		h: h,
		flip: flip,
		r: rotate,
		spriteData: {
			sprite: ent.sprite,
			index: obj.index || 0,
			w: 16,
			h: 8
		}
	} )
}

Renderings.corpse = function( obj ) {

	var	w = obj.w,
		h = obj.h,
		x = obj.x - w * .5,
		y = obj.y - h * .5;
	
	var temp = {
		w: w,
		h: h,
		x: x,
		y: y,
	}
	
	if ( obj.sprite ) {
		temp.spriteData = {
			sprite: obj.sprite,
			index: obj.index || 0,
			w: 16,
			h: 16
		}
	}
	
	this.ents.push( temp )
}

Renderings.doodad = function( obj ) {

	var	w = obj.w,
		h = obj.h,
		x = obj.x - w * .5,
		y = obj.y - h * .5;
	
	var temp = {
		w: w,
		h: h,
		x: x,
		y: y,
	}
	
	if ( obj.sprite ) {
		temp.spriteData = {
			sprite: obj.sprite,
			index: obj.index || 0,
			w: 16,
			h: 16
		}
	}
	
	this.ents.push( temp )
}



Renderings.portrait = function( obj ) {
	var pdat = obj.ent ? Data.entities[ obj.ent ] : Data.enviorments[ obj.env ],
		sideCenter = viewPort.w + ( stage.w - viewPort.w ) * .5;
	this.guis.push( {
		w: tileManager.size * 2,
		h: tileManager.size * 2,
		x: sideCenter - ( tileManager.size * 2 ) * .5,
		y: tileManager.size,
		fillColor: pdat.fillColor,
		spriteData: {
			sprite: pdat.portrait,
			index: obj.sheetIndex || 0,
			w: 32,
			h: 32
		}
	} )
}

Renderings.myTurn = function( obj ) {
	obj.spriteData = {
			sprite: obj.sprite,
			index: obj.index || 0,
			w: 8,
			h: 8
		}
	this.effs.push( obj );
}

Renderings.selected = function( obj ) {
	
	obj.strokeColor = Renderings.styles.selected[ obj.styleType ].strokeColor;
	
	delete obj.styleType;

	this.guis.push( obj );
}

Renderings.screenSelected = function( obj ) {
	
	obj.strokeColor = Renderings.styles.selected.neutral.strokeColor;
	
	//delete obj.styleType;

	this.scrguis.push( obj );
}

Renderings.available = function( obj ) {
	
	obj.fillColor = Renderings.styles.available[ obj.styleType ].fillColor;
	
	delete obj.styleType;

	this.guis.push( obj );
}

Renderings.txt = function( obj ) {
	var font = obj.font;
	
	ctx.font = font;

	var txt = obj.txt,
		x = obj.x,
		y = obj.y;
		
		obj.w = ctx.measureText( txt ).width;
		obj.h = font.match(/\d+/);
	
	if ( obj.alignment ) {
		x = Helper.alignments[ obj.alignment ]( { pos: x, size: obj.w } );
	}
	
	this.txts.push( {
		x: x,
		y: y,
		w: obj.w,
		h: obj.h,
		txt: txt,
		font: font,
		fillColor: obj.fillColor
	} )
}

Renderings.ui = function( obj ) {
	
	var temp = {
		w: obj.w,
		h: obj.h,
		x: obj.x,
		y: obj.y,
	}
	
	if ( obj.sprite ) {
		temp.spriteData = {
			sprite: obj.sprite,
			index: obj.index || 0,
			w: 32,
			h: 32
		}
	}
	
	if ( obj.fillColor ) {
		temp.fillColor = obj.fillColor;
	}
	
	this.guis.push( temp )
}

Renderings.invScreen = function( obj ) {
	
	var temp = {
		w: obj.w,
		h: obj.h,
		x: obj.x,
		y: obj.y,
	}
	
	if ( obj.sprite ) {
		temp.spriteData = {
			sprite: obj.sprite,
			index: obj.index || 0,
			w: 288,
			h: 288
		}
	}
	
	if ( obj.fillColor ) {
		temp.fillColor = obj.fillColor;
	}
	
	this.screens.push( temp )
}

Renderings.spellsScreen = function( obj ) {
	
	var temp = {
		w: obj.w,
		h: obj.h,
		x: obj.x,
		y: obj.y,
	}
	
	if ( obj.sprite ) {
		temp.spriteData = {
			sprite: obj.sprite,
			index: obj.index || 0,
			w: 128,
			h: 128
		}
	}
	
	if ( obj.fillColor ) {
		temp.fillColor = obj.fillColor;
	}
	
	this.screens.push( temp )
}

Renderings.invItem = function( obj ) {

	if ( obj.cycle ) {
		if ( obj.changed == 1 ) {

			obj.index = ( obj.index < 3 ) ? obj.index + 1 : 0;
			obj.changed = 0;
		}
		if ( obj.last != Math.floor( obj.cycle ) ) {
			obj.last = Math.floor( obj.cycle );
			obj.changed = 1;
		}
	}
	
	var	w = 32,
		h = 32,
		x = obj.x + obj.w * .5 - w * .5,
		y = obj.y + obj.h * .5 - h * .5;
	
	var temp = {
		w: w,
		h: h,
		x: x,
		y: y,
	}
	
	if ( obj.sprite ) {
		temp.spriteData = {
			sprite: obj.sprite,
			index: obj.index || 0,
			w: 32,
			h: 32
		}
	}
	
	if ( obj.fillColor ) {
		temp.fillColor = obj.fillColor;
	}
	if ( obj.strokeColor ) {
		temp.strokeColor = obj.strokeColor;
	}
	
	this.scrguis.push( temp )
}

Renderings.invButton = function( obj ) {

	var	w = obj.w,
		h = 16,
		x = obj.x + obj.w * .5 - w * .5,
		y = obj.y + obj.h * .5 - h * .5;
	
	var temp = {
		w: w,
		h: h,
		x: x,
		y: y,
	}
	
	if ( obj.sprite ) {
		temp.spriteData = {
			sprite: obj.sprite,
			index: obj.index || 0,
			w: w,
			h: h
		}
	}
	
	if ( obj.fillColor ) {
		temp.fillColor = obj.fillColor;
	}
	
	if ( obj.strokeColor ) {
		temp.strokeColor = obj.strokeColor;
	}
	
	this.scrguis.push( temp )
}

Renderings.spellItem = function( obj ) {
	
	if ( obj.cycle ) {
		if ( obj.changed == 1 ) {

			obj.index = ( obj.index < 3 ) ? obj.index + 1 : 0;
			obj.changed = 0;
		}
		if ( obj.last != Math.floor( obj.cycle ) ) {
			obj.last = Math.floor( obj.cycle );
			obj.changed = 1;
		}
	}
	
	var	w = 16,
		h = 8,
		x = obj.x + obj.w * .5 - w * .5,
		y = obj.y + obj.h * .5 - h * .5;
	
	var temp = {
		w: w,
		h: h,
		x: x,
		y: y,
	}
	
	if ( obj.sprite ) {
		temp.spriteData = {
			sprite: obj.sprite,
			index: obj.index || 0,
			w: 16,
			h: 8
		}
	}
	
	if ( obj.fillColor ) {
		temp.fillColor = obj.fillColor;
	}
	
	this.scrguis.push( temp )
}

Renderings.spellItemTxt = function( obj ) {
	var font = obj.font;
	
	ctx.font = font;

	var txt = obj.txt,
		x = obj.x,
		y = obj.y;
		
		obj.w = ctx.measureText( txt ).width;
		obj.h = font.match(/\d+/);
	
	if ( obj.alignment ) {
		x = Helper.alignments[ obj.alignment ]( { pos: x, size: obj.w } );
	}
	
	this.scrtxts.push( {
		x: x,
		y: y,
		w: obj.w,
		h: obj.h,
		txt: txt,
		font: font,
		fillColor: obj.fillColor
	} )
}

Renderings.sprites = function( obj ) {
	if ( obj.cycle ) {
		if ( obj.last != Math.floor( obj.cycle ) ) {
			obj.last = Math.floor( obj.cycle );
			obj.changed = 1;
		}
		if ( obj.changed == 1 ) {
			obj.index = ( obj.index < 3 ) ? obj.index + 1 : 0;
			obj.changed = 0;
		}
	}
	
	var	w = tileManager.size,
		h = tileManager.size * .5,
		x = obj.x - w * .5,
		y = obj.y - h * .5;
	
	this.effs.push( {
		x: x,
		y: y,
		w: w,
		h: h,
		flip: obj.flip || false,
		r: obj.r,
		spriteData: {
			sprite: obj.sprite,
			index: obj.index || 0,
			w: 16,
			h: 8
		}
	} );
	
}

