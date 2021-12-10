let modInfo = {
	name: "The Christmas^2 Tree",
	id: "ScarletDystopia181-2122christmastree",
	author: "Scarlet",
	pointsName: "christmas points",
	modFiles: ["layers/gifts.js", "layers/money.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "2.1",
	name: "Christmas",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(20) 
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
	if (oldVersion == "2.0") {
		player.m.points = player.m.points.min(3);
		player.m.total = player.m.points;
		if (player.m.upgrades.includes(11) || player.m.upgrades.includes("11")) player.m.total = player.m.total.add(1);
		if (player.m.upgrades.includes(12) || player.m.upgrades.includes("12")) player.m.total = player.m.total.add(2);
		player.m.best = player.m.best.min(3);
		player.g.buyables[11] = player.g.buyables[11].min(100);
	}
}