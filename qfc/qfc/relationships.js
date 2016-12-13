console.log( "relationships.js is up!" );

Relationships = {
	friend: {
		friends: [
			"friend"
		],
		foes: [
			"foe",
			"mandiblar"
		]
	},
	foe: {
		friends: [
			"foe"
		],
		foes: [
			"friend",
			"mandiblar"
		]
	},
	mandiblar: {
		friends: [
			"mandiblar"
		],
		foes: [
			"friend",
			"foe"
		]
	}
}

Relationships.getRelationship = function( affiliation0, affiliation1 ) {
	var friends = this[ affiliation0 ].friends,
		foes = this[ affiliation0 ].foes;
	for ( var i = friends.length - 1; i >= 0; --i ) {
		var friend = friends[ i ];
		if( friend == affiliation1 ) return "friend"
	}
	
	for ( var i = foes.length - 1; i >= 0; --i ) {
		var foe = foes[ i ];
		if( foe == affiliation1 ) return "foe"
	}
	
	return "neutral";
}