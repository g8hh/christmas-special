const dbBuilding = {
	buy() {
		if (player.db.building) 
			player.db.building = 0;
		else
			player.db.building = this.id;
	},
	canAfford() {
		return !player.db.building || player.db.building == this.id;
	},
	update(d) {
		if (player.db.building != this.id) return;
		player.db.buildProgress[this.id] = player.db.buildProgress[this.id].add(tmp.db.shardGain.mul(d).min(player.db.shards));
		if (player.db.buildProgress[this.id].gte(this.tmp.cost)) {
			player.db.buildProgress[this.id] = new Decimal(0);
			incBuyable("db", this.id);
			player.db.building = 0;
		}
	}
}
addLayer("db", {
	name: "dimension booster",
	symbol: "DB",
	position: 1,
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		autoTSE: false,
		shards: new Decimal(0),
		buildProgress: {
			11: new Decimal(0),
			41: new Decimal(0)
		},
		building: 0
	}},
	color: "#08f",
	requires() {
		if (row3unlocks() > 0) return "1e5700";
		else return new Decimal("1e6000");
	},
	resource: "dimension boosters",
	baseResource() {
		if (row3unlocks() > 0) return "AD * PT points";
		else return "festive energy"
	},
	baseAmount() {
		if (row3unlocks() > 0) return player.ad.points.mul(player.pt.points);
		else return player.ie.points;
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
			requirementDescription: "1 dimension booster",
			effectDescription: "Autobuy time, space and enhance inductors.",
			toggles: [["db", "autoTSE"]],
			done() {
				return player.db.points.gte(1);
			}
		}
	},
	upgrades: {
		11: {
			title: "Other Dimensionality",
			description: "Expand into the present dimension.",
			cost: "1e2600",
			currencyLayer: "ad",
			currencyInternalName: "points",
			currencyDisplayName: "antimatter",
			unlocked() {
				return !hasUpgrade("db", 11)
			}
		}
	},
	/* Buildings. You can build them but it takes time. You can build multiple. They use up present shards during building.
	Build progress is based on present shards. */
	buyables: {
		rows: 2,
		cols: 3,
		11: {
			title: "Present Machine",
			display() {
				return `Gift the PTverse and ADverse deities to make them happy.<br>
				Currently: x${format(this.tmp.effect)} 8th dimension multiplier and prestige point gain<br>
				${player.db.building == this.id ? "Currently building. " : ""}Build Progress: ${format(player.db.buildProgress[this.id])}/${format(this.tmp.cost)} shards`
			},
			cost() {
				let base = Decimal.pow(10, this.player.pow(1.5)).mul(20);
				return base;
			},
			effect() {
				return Decimal.pow(1e20, this.player);
			},
			...dbBuilding
		},
		41: {
			title: "Fix the generator",
			display() {
				return `Fix the broken generator, so that it provides a constant boost instead of a sinusoidal boost.<br>
				${player.db.building == this.id ? "Currently building. " : ""}Build Progress: ${format(player.db.buildProgress[this.id])}/${format(this.tmp.cost)} shards`
			},
			cost() {
				return new Decimal(40);
			},
			purchaseLimit: 1,
			...dbBuilding
		}
	},

	effect() {
		return Decimal.pow(10, player.db.points);
	},
	effectDescription() {
		return `increasing DI, PT, AD and IE gain by ${format(tmp.db.effect)}`
	},
	shardGain() {
		if (player.db.points.lt(1)) return decimalZero;
		let base = Decimal.pow(2, player.db.points);
		return base;
	},

	automate() {
		if (player.db.autoTSE) {
			buyBuyable("pt", 21);
			buyBuyable("pt", 22);
			buyBuyable("pt", 23);
		}
	},
	update(d) {
		if (!hasUpgrade("db", 11)) return;
		if (!player.db.building)
			player.db.shards = player.db.shards.add(tmp.db.shardGain.mul(d));
		else
			player.db.shards = player.db.shards.sub(tmp.db.shardGain.mul(d)).max(0);

		for (let i in layers.db.buyables) {
			layers.db.buyables[i].update?.(d);
		}
	},

	microtabs: {
		dimension: {
			"Set 1": {
				content: [["buyables", [1, 2, 3]]]
			},
			"Set 2": {
				content: [["buyables", [4, 5, 6]]]
			}
		}
	},
	tabFormat: {
		Milestones: {
			content: ["main-display", "prestige-button", "resource-display", "milestones"]
		},
		Content: {
			content: ["main-display", "prestige-button", "resource-display", ["upgrade", 11], ["column", [
			"blank", ["currency-display", {resource: "present shards", resourceAmt() {return player.db.shards}, precision: 2}],
			["raw-html", () => `You are gaining ${player.db.building ? "-" : ""}${format(tmp.db.shardGain)} shards/s based on dimension boosters.`],
			"blank", ["microtabs", "dimension"]
			], () => hasUpgrade("db", 11)]],
			unlocked() {
				return player.db.unlocked
			}
		}
	},
	branches: ["pt", "ad"],
	onPrestige() {
		player.rb.pseudoDist = new Decimal(0);
	}
})