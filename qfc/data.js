console.log( "data.js is up!" );

var Data = {};

Data.enviorments = {
	dirt: {
		name: "Dirt",
		fillColor: "rgb( 120, 80, 60 )",
		sprite: "dirt",
		portrait: "dirt",
		strokeColor: "rgb( 80, 80, 80 )",
		affiliation: "neutral",
		terrain: "move"
	},
	wall: {
		name: "Wall",
		fillColor: "rgb( 60, 60, 60 )",
		sprite: "wall",
		portrait: "wall",
		affiliation: "neutral",
		terrain: "impass"
	}
}

Data.doodads = {
	mushroom: {
		name: "Mushroom",
		fillColor: "rgb( 120, 80, 60 )",
		sprite: "mushroom",
		portrait: "mushroom",
		strokeColor: "rgb( 80, 80, 80 )",
		affiliation: "neutral",
		terrain: "move"
	}
}

Data.entities = {
	Rye: {
		name: "Rye",
		actives: [ "rHand", "lHand" ],
		fillColor: "rgb( 60, 80, 80 )",
		offset: 2,
		move: 1,
		actions: 3,
		health: 6,
		active: "backstab",
		sprite: "mouse",
		portrait: "rye",
		affiliation: "friend"
	},
	Thomas: {
		name: "Thomas",
		actives: [ "rHand", "lHand" ],
		fillColor: "rgb( 60, 80, 80 )",
		offset: 2,
		move: 1,
		actions: 3,
		health: 10,
		sprite: "mouse",
		portrait: "thomas",
		affiliation: "friend"
	},
	Archibald: {
		name: "Archibald",
		actives: [ "rHand", "lHand" ],
		fillColor: "rgb( 60, 80, 80 )",
		offset: 2,
		move: 1,
		actions: 3,
		health: 4,
		spells: [ "magicMissile", "noxiousOrb", "moltenOrb" ],
		weapon: "magicMissile",
		sprite: "mouse",
		portrait: "archibald",
		affiliation: "friend"
	},
	Urial: {
		name: "Urial",
		actives: [ "rHand", "lHand" ],
		fillColor: "rgb( 60, 80, 80 )",
		offset: 2,
		move: 1,
		actions: 3,
		health: 6,
		spells: [ "healingTouch", "protection", "fervor" ],
		weapon: "magicMissile",
		sprite: "mouse",
		portrait: "urial",
		affiliation: "friend"
	},
	Cade: {
		name: "Cade",
		actives: [ "rHand", "lHand" ],
		fillColor: "rgb( 80, 80, 60 )",
		offset: 2,
		move: 1,
		actions: 3,
		health: 6,
		active: "backstab",
		sprite: "mouse0",
		portrait: "rye",
		affiliation: "foe"
	},
	Minsc: {
		name: "Minsc",
		actives: [ "rHand", "lHand" ],
		fillColor: "rgb( 80, 80, 60 )",
		offset: 2,
		move: 1,
		actions: 3,
		health: 10,
		sprite: "mouse0",
		portrait: "thomas",
		affiliation: "foe"
	},
	Vex: {
		name: "Vex",
		actives: [ "rHand", "lHand" ],
		fillColor: "rgb( 80, 80, 60 )",
		offset: 2,
		move: 1,
		actions: 3,
		health: 4,
		spells: [ "magicMissile", "noxiousOrb", "moltenOrb" ],
		weapon: "magicMissile",
		sprite: "mouse0",
		portrait: "archibald",
		affiliation: "foe"
	},
	Cora: {
		name: "Cora",
		actives: [ "rHand", "lHand" ],
		fillColor: "rgb( 80, 80, 60 )",
		offset: 2,
		move: 1,
		actions: 3,
		health: 6,
		spells: [ "healingTouch", "protection", "fervor" ],
		weapon: "magicMissile",
		sprite: "mouse0",
		portrait: "urial",
		affiliation: "foe"
	},	
	Mandiblar: {
		name: "Mandiblar",
		fillColor: "rgb( 100, 60, 60 )",
		offset: 2,
		move: 1,
		actions: 3,
		actives: [ "head" ],
		health: 8,
		weapon: "bite",
		sprite: "ant",
		portrait: "mandiblar",
		affiliation: "mandiblar"
	}
}

//anything can be on any body part technically (tail scorpion sting)
Data.weapons = {
	sword: {
		name: "Sword",
		slot: "rHand",
		equiptable: true,
		hands: 1,
		range: 1,
		cost: 3,
		sprite: "swordSwipe",
		portrait: "sword",
		damage: {
			min: 2,
			max: 4
		}
	},
	greatSword: {
		name: "Great Sword",
		slot: "rHand",
		equiptable: true,
		hands: 2,
		range: 1,
		cost: 4,
		sprite: "swordSwipe",
		portrait: "greatSword",
		damage: {
			min: 2,
			max: 8
		}
	},
	shield: {
		name: "Shield",
		slot: "lHand",
		equiptable: true,
		hands: 1,
		range: 1,
		cost: 3,
		reactive: "block",
		sprite: "shieldBash",
		portrait: "shield",
		defense: {
			min: 0,
			max: 1
		},
		damage: {
			min: 0,
			max: 1
		}
	},
	bow: {
		name: "Bow",
		slot: "rHand",
		equiptable: true,
		hands: 2,
		range: 6,
		cost: 4,
		sprite: "arrow",
		portrait: "bow",
		damage: {
			min: 1,
			max: 3
		}
	},
	staff: {
		name: "Staff",
		slot: "rHand",
		equiptable: true,
		hands: 2,
		range: 1,
		cost: 4,
		reactive: "block",
		defense: {
			min: 0,
			max: 1
		}, 
		sprite: "staffSwipe",
		portrait: "staff",
		damage: {
			min: 1,
			max: 3
		}
	},
	maul: {
		name: "Maul",
		slot: "rHand",
		equiptable: true,
		hands: 2,
		range: 1,
		cost: 5,
		sprite: "maulSwipe",
		portrait: "maul",
		damage: {
			min: 1,
			max: 10
		}
	},
	spear: {
		name: "Spear",
		slot: "rHand",
		equiptable: true,
		hands: 2,
		range: 2,
		cost: 4,
		sprite: "spearStab",
		portrait: "spear",
		damage: {
			min: 2,
			max: 4
		}
	},
	dagger: {
		name: "Dagger",
		slot: "rHand",
		equiptable: true,
		hands: 1,
		type: "light",
		range: 1,
		cost: 2,
		sprite: "daggerStab",
		portrait: "dagger",
		damage: {
			min: 1,
			max: 3
		}
	},
	mandibles: {
		name: "Mandibles",
		slot: "head",
		equiptable: false,
		hands: 1,
		range: 1,
		cost: 3,
		sprite: "bite",
		portrait: "mandibles",
		damage: {
			min: 3,
			max: 4
		}
	},
	//armor?
	armor: {
		name: "Armor",
		slot: "torso",
		equiptable: true,
		onTurn: "loseAction",
		value: 1,
		reactive: "defend",
		sprite: "armor",
		portrait: "armor",
		defense: {
			min: 0,
			max: 2
		},
	},
	chitin: {
		name: "Chitin",
		slot: "torso",
		equiptable: false,
		reactive: "defend",
		sprite: "chitin",
		portrait: "chitin",
		defense: {
			min: 0,
			max: 1
		},
	},
	robe: {
		name: "Robe",
		slot: "torso",
		equiptable: true,
		sprite: "robe",
		portrait: "robe",
	},
	candle: {
		name: "Candle",
		slot: "tail",
		equiptable: true,
		sprite: "candle",
		onTurn: "extraAction",
		value: 1,
		anim: 1,
		portrait: "candle"
	},
	mask: {
		name: "Mask",
		slot: "head",
		equiptable: true,
		sprite: "mask",
		portrait: "mask",
		onTurn: "randomAction",
		value: 2
	}
}

Data.spells = {
	magicMissile: {
		name: "Magic Missile",
		type: "spell",
		range: 7,
		cost: 5,
		sprite: "missile",
		portrait: "missile",
		damage: {
			min: 1,
			max: 1
		}
	},
	noxiousOrb: {
		key: "noxiousOrb",
		name: "Noxious Orb",
		type: "spell",
		active: "sickened",
		onTurn: "loseAction",
		remove: 2,
		value: 2,
		range: 3,
		cost: 5,
		sprite: "noxiousOrb",
		portrait: "noxiousOrb",
		damage: {
			min: 1,
			max: 3
		}
	},
	moltenOrb: {
		key: "moltenOrb",
		name: "Molten Orb",
		active: "burning",
		remove: 1,
		onTurn: "takeDamage",
		type: "spell",
		value: 1,
		range: 3,
		cost: 5,
		sprite: "moltenOrb",
		portrait: "moltenOrb",
		damage: {
			min: 1,
			max: 3
		}
	},
	healingTouch: {
		name: "Healing Touch",
		type: "spell",
		active: "heal",
		target: "friend",
		range: 1,
		cost: 3,
		sprite: "healingTouch",
		portrait: "healingTouch",
		damage: {
			min: 2,
			max: 4
		}
	},
	protection: {
		name: "Protection",
		type: "spell",
		target: "friend",
		reactive: "defend",
		rBuff: "protection",
		range: 1,
		cost: 3,
		sprite: "protection",
		portrait: "protection",
		defense: {
			min: 1,
			max: 2
		}
	},
	fervor: {
		name: "Fervor",
		type: "spell",
		target: "friend",
		active: "damageUp",
		aBuff: "fervor",
		range: 1,
		cost: 3,
		sprite: "fervor",
		portrait: "fervor",
		damage: {
			min: 1,
			max: 2
		}
	},
}
