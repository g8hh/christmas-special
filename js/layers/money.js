addLayer("m", {
	name: "money",
	symbol: "M",
	position: 1,
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		total: new Decimal(0),
		best: new Decimal(0),
		nullEffects: []
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
		},
		15: {
			title: "Generous-er donations",
			description: "Unlock money buyables. You still don't know what a buyable is.",
			cost: 55555
		}
	},
	buyables: {
		rows: 1,
		cols: 1,
		11: {
			title: "Null",
			display() {
				const ln1 = player.m.nullEffects.includes("gift") ? `x${format(tmp.m.buyables[11].effect.gift)} to gift rewards<br>` : "";
				const ln2 = player.m.nullEffects.includes("money") ? `x${format(tmp.m.buyables[11].effect.money)} to money gain<br>` : "";
				const ln3 = player.m.nullEffects.includes("machine") ? `x${format(tmp.m.buyables[11].effect.machine)} to machine parts gain<br>` : "";
				const ln4 = player.m.nullEffects.length < 1 ? "No Effects<br>" : "";
				return `${ln1}${ln2}${ln3}${ln4}
				${format(player.m.points)}/${format(tmp.m.buyables[11].cost)} money`
			},
			buy() {
				player.m.points = player.m.points.sub(tmp.m.buyables[this.id].cost);
				player.m.spentOnBuyables = player.m.spentOnBuyables.add(tmp.m.buyables[this.id].cost);
				player.m.buyables[this.id] = player.m.buyables[this.id].add(1);
			},
			cost() {
				return Decimal.pow(2, player.m.buyables[11]).mul(10000);
			},
			canAfford() {
				return player.m.points.gte(tmp.m.buyables[11].cost);
			},
			effect() {
				return {
					gift: player.m.nullEffects.includes("gift") ? Decimal.pow(2, player.m.buyables[11].pow(0.7)) : decimalOne,
					money: player.m.nullEffects.includes("money") ? Decimal.pow(3, player.m.buyables[11].pow(0.7)) : decimalOne,
					machine: player.m.nullEffects.includes("machine") ? Decimal.pow(1.5, player.m.buyables[11].pow(0.7)) : decimalOne
				}
			},
			unlocked() {
				return hasUpgrade("m", 15)
			}
		}
	},
	clickables: {
		rows: 1,
		cols: 3,
		maxLen() {
			let base = 1;
			if (hasUpgrade("g", 91)) base++;
			return base;
		},
		11: {
			display() {
				return "Make <b>Null</b> boost gift rewards: " + (player.m.nullEffects.includes("gift") ? "ON" : "OFF");
			},
			canClick() {
				return player.m.nullEffects.length < tmp.m.clickables.maxLen || player.m.nullEffects.includes("gift")
			},
			onClick() {
				if (!player.m.nullEffects.includes("gift")) player.m.nullEffects.push("gift");
				else player.m.nullEffects.splice(player.m.nullEffects.indexOf("gift"), 1);
			},
			color() {
				return player.m.nullEffects.includes("gift") ? "#77bf5f" : "#4BDC13";
			},
			style: {"min-height": "75px", margin: "3px", "font-size": "12px"},
			unlocked() {
				return hasUpgrade("m", 15)
			}
		},
		12: {
			display() {
				return "Make <b>Null</b> boost money gain: " + (player.m.nullEffects.includes("money") ? "ON" : "OFF");
			},
			canClick() {
				return player.m.nullEffects.length < tmp.m.clickables.maxLen || player.m.nullEffects.includes("money")
			},
			onClick() {
				if (!player.m.nullEffects.includes("money")) player.m.nullEffects.push("money");
				else player.m.nullEffects.splice(player.m.nullEffects.indexOf("money"), 1);
			},
			color() {
				return player.m.nullEffects.includes("money") ? "#77bf5f" : "#ff0";
			},
			style: {"min-height": "75px", margin: "3px", "font-size": "12px"},
			unlocked() {
				return hasUpgrade("m", 15)
			}
		},
		13: {
			display() {
				return "Make <b>Null</b> boost machine parts gain: " + (player.m.nullEffects.includes("machine") ? "ON" : "OFF");
			},
			canClick() {
				return player.m.nullEffects.length < tmp.m.clickables.maxLen || player.m.nullEffects.includes("machine")
			},
			onClick() {
				if (!player.m.nullEffects.includes("machine")) player.m.nullEffects.push("machine");
				else player.m.nullEffects.splice(player.m.nullEffects.indexOf("machine"), 1);
			},
			color() {
				return player.m.nullEffects.includes("machine") ? "#77bf5f" : "#c73";
			},
			style: {"min-height": "75px", margin: "3px", "font-size": "12px"},
			unlocked() {
				return hasUpgrade("m", 15)
			}
		},
		masterButtonText: "Reset Effects",
		masterButtonPress() {player.m.nullEffects = []}
	},

	hotkeys: [
		{key: "m", description: "M: Sell toy collection", onPress(){clickClickable("g", 51)}}
	],
	branches: ["g"],
	tabFormat: {
		Main: {
			content: [["main-display", 2], ["resource-display", 2], "blank", ["layer-proxy", ["g", [["clickable", 51]]]],
			"blank", "clickables", "buyables", "blank", ["upgrades", 1]]
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
	exponent: 0.8,
	gainMult() {
		let base = decimalOne;
		base = base.mul(tmp.m.buyables[11].effect.machine);
		return base;
	},
	layerShown() {return player.mc.unlocked},
	componentStyles: {
		milestone: {
			width: "400px"
		}
	},

	upgrades: {
		rows: 1,
		cols: 1,
		11: {
			title: "Opus Magnum",
			description: "Make Santa impressed enough to give up a hundred times more gifts.",
			cost: 1e30
		},
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
		},
		timeWarp: {
			title: "Whoops!",
			description: "You've broken the fabric of spacetime. What have you done?",
			cost: 100,
			unlocked() {
				return !hasUpgrade("mc", "timeWarp");
			},
			style: {width: "150px", height: "150px"}
		},
		mine: {
			title: "Worker ploitation",
			description: "Maybe it's about time to find other sources of coal.",
			cost: 1e10,
			unlocked() {
				return !hasUpgrade("mc", "mine");
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
		},
		timeWarp: {
			title: "Time warp",
			display() {
				return `Make Einstein angrier.<br>
				x${format(tmp.mc.buyables.timeWarp.effect)} present gain speed
				${formatWhole(player.mc.points)}/${formatWhole(tmp.mc.buyables.timeWarp.cost)} machine parts`
			},
			buy() {
				player.mc.points = player.mc.points.sub(tmp.mc.buyables.timeWarp.cost);
				player.mc.buyables.timeWarp = player.mc.buyables.timeWarp.add(1);
			},
			cost() {
				return Decimal.pow(3.5, player.mc.buyables.timeWarp.pow(1.3)).mul(200).floor();
			},
			canAfford() {
				return player.mc.points.gte(tmp.mc.buyables.timeWarp.cost);
			},
			effect() {
				if (!hasUpgrade("mc", "timeWarp")) return decimalOne;
				return Decimal.pow(2, player.mc.buyables.timeWarp.add(1).pow(0.87654321));
			},
			unlocked() {
				return hasUpgrade("mc", "timeWarp");
			},
			style: {width: "150px", height: "150px"}
		},
		mine: {
			title: "Build another",
			display() {
				return `But remember to treat the miners nicely.<br>
				${format(tmp.mc.buyables.mine.effect.coal)} coal/s
				x${format(tmp.mc.buyables.mine.effect.toys)} increase to chance of getting toys instead of coal<br>
				${formatWhole(player.mc.points)}/${formatWhole(tmp.mc.buyables.mine.cost)} machine parts`
			},
			buy() {
				player.mc.points = player.mc.points.sub(tmp.mc.buyables.mine.cost);
				player.mc.buyables.mine = player.mc.buyables.mine.add(1);
			},
			cost() {
				return Decimal.pow(10, player.mc.buyables.mine.pow(1.3)).mul(2e10).floor();
			},
			canAfford() {
				return player.mc.points.gte(tmp.mc.buyables.mine.cost);
			},
			effect() {
				return {
					coal: hasUpgrade("mc", "mine") ? tmp.g.giftTypes.coal.gain.mul(tmp.g.globalRewardMulti).mul(Decimal.pow(2, player.mc.buyables.mine)).mul(100) : decimalZero,
					toys: 9 - (player.mc.buyables.mine.add(1).sqrt().recip().mul(8)).toNumber()
				}
			},
			unlocked() {
				return hasUpgrade("mc", "mine");
			},
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

	hotkeys: [
		{key: "M", description: "Shift + M: Reset for machine parts", onPress(){if (canReset(this.layer)) doReset(this.layer)}}
	],
	update(d) {
		addGiftRewards("coal", tmp.mc.buyables.mine.effect.coal.mul(d));
	},
	branches: ["g", "m"],
	tabFormat: {
		Main: {
			content: ["main-display", "prestige-button", "resource-display", "blank", "milestones", "blank", "upgrades", "blank", ["row", [
			["column", [["raw-html", "<h2>Money Printer</h2>"], ["upgrade", "printer"], ["buyable", "printer"]], true, {border: '2px solid', padding: "20px", width: "200px", margin: "2px"}],
			["column", [["raw-html", "<h2>Sharp Blade</h2>"], ["upgrade", "giftAuto"], ["buyable", "giftAuto"]], true, {border: '2px solid', padding: "20px", width: "200px", margin: "2px"}]
			]], ["row", [
			["column", [["raw-html", "<h2>Time Warp</h2>"], ["upgrade", "timeWarp"], ["buyable", "timeWarp"]], true, {border: '2px solid', padding: "20px", width: "200px", margin: "2px"}],
			["column", [["raw-html", "<h2>Coal Mine</h2>"], ["upgrade", "mine"], ["buyable", "mine"]], true, {border: '2px solid', padding: "20px", width: "200px", margin: "2px"}]
			]]
			]
		}
	},
	onPrestige() {
		player.m.points = decimalZero;
	},
	doReset() {}
})
