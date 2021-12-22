const magic = {
	buy() {
		player.hi.buyables[this.id] = new Decimal(1);
		player.hi.leaves = player.hi.leaves.sub(1);
	},
	canAfford() {
		return player.hi.leaves.gte(1) && this.player.lte(0.0001);
	},
	style: {height: "150px", width: "150px"},
	magic: true
}
addLayer("hi", {
	name: "hyper-infinity",
	symbol: "HI",
	position: 2,
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		autoPhotonic: false,
		leaves: new Decimal(0)
	}},
	color: "#8f8",
	requires() {
		if (row3unlocks() > 0) return "1e8000";
		else return "1e6000";
	},
	resource: "hyper-infinities",
	baseResource: "festive energy",
	baseAmount() {
		return player.ie.points;
	},
	type: "static",
	base: "1e9e15",
	exponent: 200,
	row: 3,
	layerShown() {return hasMilestone("ie", 2)},
	componentStyles: {
		milestone: {
			width: "400px"
		}
	},

	milestones: {
		0: {
			requirementDescription: "1 hyper-infinity",
			effectDescription: "Gain the equivalent resources of 1 luminal energy reset every second.",
			done() {
				return player.hi.points.gte(1);
			}
		}
	},
	upgrades: {
		11: {
			description: "Reach into the infinity and unlock something new.",
			cost: "1e15000",
			currencyLayer: "ie",
			currencyInternalName: "points",
			currencyDisplayName: "Festive Energy",
			unlocked() {
				return !hasUpgrade("hi", 11)
			}
		}
	},
	// spells
	buyables: {
		rows: 2,
		cols: 1,
		11: {
			title: "Plantation",
			display() {
				return `Produce 0.02 leaves/s.
				Units: ${formatWhole(this.player)}<br>
				${format(this.tmp.effect)} leaves/s<br>
				${format(player.ie.points)}/${format(this.tmp.cost)} festive energy`
			},
			buy() {
				incBuyable("hi", 11);
			},
			cost() {
				let base = Decimal.pow("1e5000", this.player.pow(2.8)).mul("1e20000");
				return base;
			},
			canAfford() {
				return player.ie.points.gte(this.tmp.cost);
			},
			effect() {
				return this.player.mul(0.02);
			},
			style: {
				"margin": "20px 0"
			}
		},
		21: {
			title: "Energical warp",
			display() {
				return `Increase effective photonic and antimatter condensers by x${format(this.tmp.effect)}
				<br>Time left: ${format(this.player.mul(15))}s`
			},
			effect() {
				if (this.player.lte(0.0001)) return decimalOne;
				return new Decimal(1.4);
			},
			...magic
		}
	},

	effect() {
		return Decimal.pow(10, player.hi.points);
	},
	effectDescription() {
		return `increasing DI, PT, AD and IE gain by ${format(tmp.hi.effect)}`
	},
	leafGain() {
		if (!hasUpgrade("hi", 11)) return decimalZero;
		let base = tmp.hi.buyables[11].effect;
		return base;
	},

	update(d) {
		player.hi.leaves = player.hi.leaves.add(tmp.hi.leafGain.mul(d));
		for (let i in player.hi.buyables) {
			if (tmp.hi.buyables[i].magic)
				player.hi.buyables[i] = player.hi.buyables[i].sub(d/15).max(0);
		}
	},

	tabFormat: {
		Milestones: {
			content: ["main-display", "prestige-button", "resource-display", "milestones"]
		},
		Content: {
			content: ["main-display", "prestige-button", "resource-display", "blank",
			["upgrade", 11], ["column", [
			["raw-html", "<h1>Magical Forest in the Middle of Nowhere</h1>"], ["currency-display", {resource: "magical leaves", resourceAmt() {return player.hi.leaves}}],
			"buyables"], () => hasUpgrade("hi", 11)]],
			unlocked() {
				return player.hi.unlocked;
			}
		}
	},
	branches: ["ad", "ie"]
})