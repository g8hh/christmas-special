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
		13: {
			title: "Capital investment",
			description: "Buy some machines.",
			cost: 8,
			onPurchase() {
				player.mc.unlocked = true;
				addPoints("mc", new Decimal(1).sub(player.mc.total).max(0))
			}
		},
		14: {
			title: "Toy investment",
			description: "Buy some toys.<br><i>It'll work out, somehow</i>",
			cost: 32
		}
	},

	branches: ["g"],
	tabFormat: {
		Main: {
			content: [["main-display", 2], ["resource-display", 2], "blank", ["layer-proxy", ["g", [["clickable", 51]]]],
			"blank", ["upgrades", 1]]
		}
	},
	doReset() {}
})

addLayer("mc", {
	name: "machines",
	symbol: "MC",
	position: 0,
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		total: new Decimal(0),
		best: new Decimal(0),
		giftAuto: false
	}},
	color: "#c73",
	resource: "machine parts",
	row: 1,
	requires: new Decimal(8),
	baseResource: "money",
	baseAmount() {return player.m.points},
	type: "normal",
	exponent: 0.5,
	layerShown() {return player.mc.unlocked},

	upgrades: {
		printer: {
			title: "Printer go brr",
			description: "Printing money has definitely never gone wrong before.",
			cost: 1,
			unlocked() {
				return !hasUpgrade("mc", "printer")
			},
			style: {width: "150px", height: "150px"}
		},
		giftAuto: {
			title: "Blade",
			description() {
				return `After opening ${formatWhole(player.g.total.sub(player.g.points))} gifts, maybe it's time to build something to do it for you.`
			},
			cost: 10,
			unlocked() {
				return !hasUpgrade("mc", "giftAuto");
			},
			style: {width: "150px", height: "150px"}
		}
	},
	buyables: {
		printer: {
			title: "Brrrrrrr",
			display() {
				return `Moar money.<br>
				x${format(tmp.mc.buyables.printer.effect)} money gain
				${formatWhole(player.mc.points)}/${formatWhole(tmp.mc.buyables.printer.cost)} machine parts`
			},
			buy() {
				player.mc.points = player.mc.points.sub(tmp.mc.buyables.printer.cost);
				player.mc.buyables.printer = player.mc.buyables.printer.add(1);
			},
			cost() {
				return Decimal.pow(2, player.mc.buyables.printer.add(1).pow(1.2)).floor();
			},
			canAfford() {
				return player.mc.points.gte(tmp.mc.buyables.printer.cost);
			},
			effect() {
				if (!hasUpgrade("mc", "printer")) return decimalOne;
				return Decimal.pow(2, player.mc.buyables.printer.add(1));
			},
			unlocked() {
				return hasUpgrade("mc", "printer");
			},
			style: {width: "150px", height: "150px"}
		},
		giftAuto: {
			title: "Blade",
			display() {
				return `Make it sharper!<br>
				Automatically opens ${tmp.mc.buyables.giftAuto.effect} gifts per tick
				${formatWhole(player.mc.points)}/${formatWhole(tmp.mc.buyables.giftAuto.cost)} machine parts`
			},
			buy() {
				player.mc.points = player.mc.points.sub(tmp.mc.buyables.giftAuto.cost);
				player.mc.buyables.giftAuto = player.mc.buyables.giftAuto.add(1);
			},
			cost() {
				return Decimal.pow(5, player.mc.buyables.giftAuto.pow(1.5)).mul(20).floor();
			},
			canAfford() {
				return player.mc.points.gte(tmp.mc.buyables.giftAuto.cost);
			},
			effect() {
				if (!hasUpgrade("mc", "giftAuto")) return 0;
				return player.mc.buyables.giftAuto.toNumber() + 1;
			},
			unlocked() {
				return hasUpgrade("mc", "giftAuto");
			},
			purchaseLimit: 19,
			style: {width: "150px", height: "150px"}
		}
	},
	milestones: {
		0: {
			requirementDescription: "Blade",
			effectDescription: "Automatically open gifts.",
			done() {
				return hasUpgrade("mc", "giftAuto");
			},
			unlocked() {
				return hasUpgrade("mc", "giftAuto");
			},
			toggles: [["mc", "giftAuto"]]
		}
	},

	branches: ["g", "m"],
	tabFormat: {
		Main: {
			content: ["main-display", "prestige-button", "resource-display", "blank", "milestones", "blank", ["row", [
			["column", [["raw-html", "<h2>Money Printer</h2>"], ["upgrade", "printer"], ["buyable", "printer"]], true, {border: '2px solid', padding: "20px", width: "200px", margin: "2px"}],
			["column", [["raw-html", "<h2>Sharp Blade</h2>"], ["upgrade", "giftAuto"], ["buyable", "giftAuto"]], true, {border: '2px solid', padding: "20px", width: "200px", margin: "2px"}]
			]], ["row", [
			["column", [["raw-html", "<h2>Money Printer</h2>"], ["upgrade", "printer"], ["buyable", "printer"]], true, {border: '2px solid', padding: "20px", width: "200px", margin: "2px"}]
			]]
			]
		}
	},
	onPrestige() {
		player.m.points = new Decimal(0);
	},
	doReset() {}
})