addLayer("m", {
	name: "money",
	symbol: "M",
	position: 1,
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		total: new Decimal(0),
		best: new Decimal(0)
	}},
	color: "#ff0",
	resource: "money",
	row: 0,
	layerShown() {return player.m.unlocked},

	upgrades: {
		11: {
			title: "Money <i>can</i> buy happiness",
			description: "Start off strong by adding +4 to joy.",
			cost: 1
		},
		12: {
			title: "Money can buy gifts too",
			description: "What's wrong with buying some gifts every now and then?<br>Nothing. Decrease wait time by x2.",
			cost: 2
		},
		/*13: {
			title: "Capital investment",
			description: "Buy some machines.",
			cost: 10,
			onPurchase() {
				player.mc.unlocked = true;
			}
		}*/
	},

	branches: ["g"],
	tabFormat: {
		Main: {
			content: [["main-display", 2], ["resource-display", 2], "blank", ["layer-proxy", ["g", [["clickable", 51]]]],
			"blank", ["upgrades", 1]]
		}
	}
})

/*addLayer("mc", {
	name: "machines",
	symbol: "MC",
	position: 1,
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		total: new Decimal(0),
		best: new Decimal(0)
	}},
	color: "#c73",
	resource: "machine parts",
	row: 0,
	layerShown() {return player.m.unlocked},

	upgrades: {
		11: {
			title: "Money <i>can</i> buy happiness",
			description: "Start off strong by adding +4 to joy.",
			cost: 1
		},
		12: {
			title: "Money can buy gifts too",
			description: "What's wrong with buying some gifts every now and then?<br>Nothing. Decrease wait time by x2.",
			cost: 2
		},
		13: {
			title: "Capital investment",
			description: "Buy some machines.",
			cost: 10,
			onPurchase() {
				player.mc.unlocked = true;
			}
		}
	},

	branches: ["g"],
	tabFormat: {
		Main: {
			content: [["main-display", 2], ["resource-display", 2], "blank", ["layer-proxy", ["g", [["clickable", 51]]]],
			"blank", ["upgrades", 1]]
		}
	}
})*/