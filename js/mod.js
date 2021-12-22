let modInfo = {
	name: "The Christmas^2 Tree",
	id: "ScarletDystopia181-2122christmastree",
	author: "Scarlet",
	pointsName: "christmas points",
	modFiles: ["layers/gifts.js", "layers/money.js",
	"layers/distance.js", "layers/prestige.js", "layers/ad.js", "layers/energy.js",
	"layers/rocketboosters.js", "layers/dimensionboosters.js","layers/hyperinfinities.js",
	"tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "2.3",
	name: "Christmas",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("pt", 11);
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1);
	if (hasUpgrade("pt", 12)) gain = gain.mul(tmp.pt.upgrades[12].effect);
	if (hasUpgrade("pt", 13)) gain = gain.mul(tmp.pt.upgrades[13].effect);
	gain = gain.mul(tmp.pt.buyables[11].effect).mul(tmp.pt.buyables[12].effect);
	gain = gain.mul(tmp.pt.ind.coalBoostPoints);
	gain = gain.mul(tmp.pt.timeSpeed);
	gain = gain.mul(tmp.pt.buyables[23].effect);
	if (hasUpgrade("ad", "e14")) gain = gain.mul(tmp.ad.upgrades.e14.effect);
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}
function row3unlocks() {
	return player.rb.unlocked + player.db.unlocked + player.hi.unlocked
}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return row3unlocks() > 2;
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
	if (oldVersion == "2.2") {
		player.ie.points = player.ie.points.min(1e20);
		player.ie.lumin = player.ie.lumin.min(10);
		player.ie.luminTimes = player.ie.luminTimes.min(5);
		player.ie.totalLuExpInput = player.ie.totalLuExpInput.min(60);
		player.ie.buyables[101] = new Decimal(0);
		player.ie.buyables[102] = new Decimal(0);
	}
	if (oldVersion == "2.1") {
		player.points = new Decimal(0);
	}
	if (oldVersion == "2.0") {
		player.m.points = player.m.points.min(3);
		player.m.total = player.m.points;
		if (player.m.upgrades.includes(11) || player.m.upgrades.includes("11")) player.m.total = player.m.total.add(1);
		if (player.m.upgrades.includes(12) || player.m.upgrades.includes("12")) player.m.total = player.m.total.add(2);
		player.m.best = player.m.best.min(3);
		player.g.buyables[11] = player.g.buyables[11].min(100);
	}
}