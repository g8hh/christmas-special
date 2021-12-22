addLayer("pt", {
	name: "prestige",
	symbol: "PT",
	position: 1,
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		total: new Decimal(0),
		gResetTime: new Decimal(0),
		autoBooster: false,
		autoGenerator: false
	}},
	color: "#3AB",
	requires: new Decimal(10),
	resource: "prestige points",
	baseResource: "points",
	baseAmount() {
		return player.points;
	},
	gainMult() {
		let base = decimalOne;
		base = base.mul(tmp.rb.effect);
		if (hasMilestone("di", 101)) base = base.mul(10);
		base = base.mul(tmp.pt.ind.machineBoostPrestige);
		if (hasUpgrade("pt", 32)) base = base.mul(tmp.pt.upgrades[32].effect[1]);
		base = base.mul(tmp.rb.effect).mul(tmp.db.effect).mul(tmp.hi.effect);
		base = base.mul(tmp.rb.buyables[14].effect);
		base = base.mul(tmp.db.buyables[11].effect);
		return base;
	},
	gainExp() {
		let base = decimalOne;
		base = base.mul(tmp.rb.buyables[24].effect);
		return base;
	},
	type: "normal",
	exponent: 0.5,
	row: 2,
	hotkeys: [{
		key: "p",
		description: "Press P to reset for prestige points.",
		onPress() {
			if (canReset(this.layer))
				doReset(this.layer)
		}
	}],
	layerShown() {return hasUpgrade("mc", 41)},
	componentStyles: {
		milestone: {
			width: "400px"
		}
	},

	timeSpeed() {
		let base = new Decimal(1);
		base = base.mul(tmp.pt.buyables[21].effect2);
		if (hasUpgrade("ad", "e13")) base = base.mul(tmp.ad.upgrades.e13.effect);
		if (hasUpgrade("ad", "e24")) base = base.mul(tmp.ad.upgrades.e24.effect);
		return base;
	},

	upgrades: {
		rows: 5,
		cols: 5,
		11: {
			title: "Begin (For real)",
			description: "1 christmas point/sec. Yay!",
			cost: 1
		},
		12: {
			title: "tsooB egitserP",
			description: "Boost christmas point gain based on prestige points.",
			cost: 1,
			unlocked() {
				return hasUpgrade("pt", 11)
			},
			effect() {
				let base = softcap(player.pt.points.add(2).pow(0.5), new Decimal(1.79e308), 0.2);
				return base;
			},
			effectDisplay() {
				return `x${format(this.tmp.effect)}`
			}
		},
		13: {
			title: "Other Synergy",
			description: "Boost christmas point gain based on rockets.",
			cost: 10,
			unlocked() {
				return hasUpgrade("pt", 11)
			},
			effect() {
				let base = player.di.buyables.rockets.add(1).log10().pow(2).add(1);
				return base;
			},
			effectDisplay() {
				return `x${format(this.tmp.effect)}`
			}
		},
		14: {
			title: "Other Other Syngergy",
			description: "Boost velocity based on christmas points.",
			cost: 100,
			unlocked() {
				return hasUpgrade("pt", 11)
			},
			effect() {
				let base = player.points.add(1).log10().pow(3).add(1);
				return base;
			},
			effectDisplay() {
				return `x${format(this.tmp.effect)}`
			}
		},
		21: {
			title: "Mathematics Proof",
			description: "Unlock induction.",
			cost: 1e5,
			unlocked() {
				return hasUpgrade("pt", 14);
			}
		},
		22: {
			title: "Physics Proof",
			description: "Unlock Space and Time inductors.",
			cost: 1e25,
			unlocked() {
				return hasUpgrade("pt", 21);
			}
		},
		23: {
			title: "Magical Proof",
			description: "Unlock Enhance inductors.",
			cost: 1e60,
			unlocked() {
				return hasUpgrade("pt", 21);
			}
		},
		24: {
			title: "Missing Pair",
			description: "Unlock a backward induction.",
			cost: 1e100,
			unlocked() {
				return hasUpgrade("pt", 21);
			}
		},
		31: {
			title: "Sideways Induction",
			description: "Rocket gain is multiplied by rocket engines + 1.",
			cost: 1e170,
			unlocked() {
				return hasUpgrade("pt", 24);
			},
			effect() {
				return player.di.buyables.engines.add(1);
			},
			effectDisplay() {
				return `x${format(this.tmp.effect)}`
			}
		},
		32: {
			title: "Row 2 Synergy",
			description: "Scraps and prestige points boost each other.",
			cost: 1e178,
			unlocked() {
				return hasUpgrade("pt", 31);
			},
			effect() {
				return [player.pt.points.add(10).log10(), player.di.scraps.add(1)];
			},
			effectDisplay() {
				return `S: x${format(this.tmp.effect[0])}, P: x${format(this.tmp.effect[1])}`
			}
		},
		33: {
			title: "Induction Synergy",
			description: "Add a new induction pair.",
			cost: 1e263,
			unlocked() {
				return hasUpgrade("pt", 31);
			}
		},
		34: {
			title: "Forward-Backward Induction",
			description: "Both forward and backward induction are active at the same time.",
			cost: "1e1090",
			unlocked() {
				return hasUpgrade("pt", 31);
			}
		}
	},
	milestones: {
		0: {
			requirementDescription: "20 time inductors",
			effectDescription: "Autobuy boosters.",
			toggles: [["pt", "autoBooster"]],
			done() {
				return player.pt.buyables[21].gte(20);
			}
		},
		1: {
			requirementDescription: "20 space inductors",
			effectDescription: "Autobuy generators.",
			toggles: [["pt", "autoGenerator"]],
			done() {
				return player.pt.buyables[22].gte(20);
			}
		},
		2: {
			requirementDescription: "18 time and space inductors",
			effectDescription: "Gain 18.1% of prestige points gained on reset every second.",
			done() {
				return player.pt.buyables[21].gte(18) && player.pt.buyables[22].gte(18);
			}
		}
	},
	buyables: {
		rows: 2,
		cols: 3,
		11: {
			title() { return `<span>${formatWhole(this.player)} boosters</span>`; },
			display() { return `Boost christmas point gain by x${format(this.tmp.effect)}<br>
			Req: ${formatWhole(player.pt.points)}/${format(this.tmp.cost)} prestige points`; },
			buy() {
				incBuyable("pt", 11);
				player.pt.gResetTime = decimalZero;
			},
			cost() {
				let costBase = new Decimal(2), costExp = new Decimal(1.5);
				let amt = this.player;
				if (amt.gte(270)) amt = amt.pow(2).div(270);
				let base = Decimal.pow(costBase, amt.pow(costExp)).mul(1000).floor();
				return base;
			},
			canAfford() {
				return player.pt.points.gte(this.tmp.cost);
			},
			effect() {
				let base = new Decimal(2);
				base = base.mul(tmp.pt.ind.joyBoostBooster);
				return Decimal.pow(base, this.player);
			},
			unlocked() {
				return hasUpgrade("pt", 14);
			},
			color: "#75B"
		},
		12: {
			title() { return `<span>${formatWhole(this.player)} generators</span>`; },
			display() { return `Boost christmas point gain by x${format(this.tmp.effect)}<br>
			Req: ${formatWhole(player.pt.points)}/${format(this.tmp.cost)} prestige points`; },
			buy() {
				incBuyable("pt", 12);
				player.pt.gResetTime = decimalZero;
			},
			cost() {
				let costBase = new Decimal(2), costExp = new Decimal(1.5);
				let amt = this.player;
				if (amt.gte(270)) amt = amt.pow(2).div(270);
				let base = Decimal.pow(costBase, amt.pow(costExp)).mul(1000).floor();
				return base;
			},
			canAfford() {
				return player.pt.points.gte(this.tmp.cost);
			},
			effect() {
				let base = new Decimal(2);
				if (hasUpgrade("ad", "e11")) base = base.mul(tmp.ad.upgrades.e11.effect);
				return Decimal.pow(base, this.player).sub(1).mul(player.pt.gResetTime).pow(0.25).add(1);
			},
			unlocked() {
				return hasUpgrade("pt", 14);
			},
			color: "#BD8"
		},
		21: {
			title() { return `<span>${formatWhole(this.player)} time inductors</span>`; },
			display() { return `Increase induction frequency by x${format(this.tmp.effect1)}
			Increase time speed by x${format(this.tmp.effect2)}<br>
			Req: ${formatWhole(player.points)}/${format(this.tmp.cost)} points`; },
			buy() {
				incBuyable("pt", 21);
			},
			cost() {
				let costBase = new Decimal(1e5), costExp = new Decimal(1.8);
				let costSlow = decimalOne;
				if (hasUpgrade("ad", "e12")) costSlow = costSlow.mul(0.76);
				let base = Decimal.pow(costBase, this.player.mul(costSlow).pow(costExp)).mul(1e45).floor();
				return base;
			},
			canAfford() {
				return player.points.gte(this.tmp.cost);
			},
			effect1() {
				return this.player.mul(2).add(1).sqrt().min(5).toNumber();
			},
			effect2() {
				return Decimal.pow(2, this.player.pow(0.8));
			},
			unlocked() {
				return hasUpgrade("pt", 22);
			},
			color: "#061"
		},
		22: {
			title() { return `<span>${formatWhole(this.player)} space inductors</span>`; },
			display() { return `Increase induction wave amplitude by x${format(this.tmp.effect)}<br>
			Req: ${formatWhole(player.points)}/${format(this.tmp.cost)} points`; },
			buy() {
				incBuyable("pt", 22);
			},
			cost() {
				let costBase = new Decimal(1e5), costExp = new Decimal(1.8);
				let costSlow = decimalOne;
				if (hasUpgrade("ad", "e12")) costSlow = costSlow.mul(0.76);
				let base = Decimal.pow(costBase, this.player.mul(costSlow).pow(costExp)).mul(1e45).floor();
				return base;
			},
			canAfford() {
				return player.points.gte(this.tmp.cost);
			},
			effect() {
				let base = new Decimal(0.3);
				return this.player.pow(0.65).mul(base).add(1);
			},
			unlocked() {
				return hasUpgrade("pt", 22);
			},
			color: "#fff"
		},
		23: {
			title() { return `<span>${formatWhole(this.player)} enhance inductors</span>`},
			display() { return `Christmas points boost christmas points, acceleration and max velocity by x${format(this.tmp.effect)}<br>
			Req: ${formatWhole(player.points)}/${format(this.tmp.cost)} points`; },
			buy() {
				incBuyable("pt", 23);
			},
			cost() {
				let costBase = new Decimal(1e8), costExp = new Decimal(1.8);
				let cost = Decimal.pow(costBase);
				let base = Decimal.pow(costBase, this.player.pow(costExp)).mul(1e100).floor();
				return base;
			},
			canAfford() {
				return player.points.gte(this.tmp.cost);
			},
			effect() {
				let base = player.points.add(10).log10();
				return Decimal.pow(base, this.player);
			},
			unlocked() {
				return hasUpgrade("pt", 23);
			},
			color: "#f0f"
		}
	},
	bars: {
		ind: {
			direction: RIGHT,
			width: 300,
			height: 30,
			progress() {
				return 1
			},
			display() {
				return hasUpgrade("pt", 34) ? "Forward-Backward Induction" : (tmp.pt.ind.c.gte(0) ? "Backward Induction" : "Forward Induction")
			},
			fillStyle: {
				"background-color"() {
					return hasUpgrade("pt", 34) ? "#ff08" : (tmp.pt.ind.c.gte(0) ? "#f008" : "#0ff8");
				}
			},
			unlocked() {
				return hasUpgrade("pt", 21)
			}
		}
	},
	ind: {
		cMult() {
			let base = new Decimal(1);
			base = base.mul(tmp.pt.buyables[22].effect);
			return base;
		},
		c() {
			base = new Decimal(Math.sign(Math.sin(tmp.pt.buyables[21].effect1*player.time/2000)));
			base = base.mul(tmp.pt.ind.cMult);
			return base;
		},
		giftRewards() {
			const c = hasUpgrade("pt", 34) ? tmp.pt.ind.cMult : tmp.pt.ind.c;
			if (!hasUpgrade("pt", 21) || c.lte(0)) return decimalOne;
			let base = player.pt.points.add(1).pow(c.mul(2));
			return base;
		},
		coalBoostPoints() {
			const c = hasUpgrade("pt", 34) ? tmp.pt.ind.cMult : tmp.pt.ind.c.neg();
			if (!hasUpgrade("pt", 21) || c.lte(0)) return decimalOne;
			let base = player.g.coal.points.add(Math.E).ln().pow(c.mul(1.3));
			return base;
		},
		joyMult() {
			const c = hasUpgrade("pt", 34) ? tmp.pt.ind.cMult : tmp.pt.ind.c;
			if (!hasUpgrade("pt", 21) || c.lte(0)) return decimalOne;
			let base = tmp.pt.buyables[12].effect.add(Math.E).ln().pow(c.mul(2));
			return base;
		},
		joyBoostBooster() {
			const c = hasUpgrade("pt", 34) ? tmp.pt.ind.cMult : tmp.pt.ind.c.neg();
			if (!hasUpgrade("pt", 21) || c.lte(0)) return decimalOne;
			let base = tmp.g.joy.add(1).log(10).mul(c).add(1).pow(0.8);
			return base;
		},
		machineBoost() {
			const c = hasUpgrade("pt", 34) ? tmp.pt.ind.cMult : tmp.pt.ind.c;
			if (!hasUpgrade("pt", 21) || c.lte(0)) return decimalOne;
			let base = player.di.points.add(1).pow(c.mul(0.02));
			return base;
		},
		machineBoostPrestige() {
			const c = hasUpgrade("pt", 34) ? tmp.pt.ind.cMult : tmp.pt.ind.c.neg();
			if (!hasUpgrade("pt", 21) || c.lte(0)) return decimalOne;
			let base = player.mc.points.add(1).pow(c.mul(0.005));
			return base;
		},
		gachaBoost() {
			const c = hasUpgrade("pt", 34) ? tmp.pt.ind.cMult : tmp.pt.ind.c;
			if (!hasUpgrade("pt", 33) || !hasUpgrade("pt", 21) || c.lte(0)) return decimalOne;
			let base = Decimal.pow(2, player.di.points.add(1).log10().pow(0.6)).pow(c.mul(0.5));
			return base;
		},
		ascensionBoostRockets() {
			const c = hasUpgrade("pt", 34) ? tmp.pt.ind.cMult : tmp.pt.ind.c.neg();
			if (!hasUpgrade("pt", 33) || !hasUpgrade("pt", 21) || c.lte(0)) return decimalOne;
			let base = Decimal.pow(1.8, player.g.ascensions.points.pow(0.45)).pow(c.mul(0.5));
			return base;
		},
		skillCost() {
			const c = hasUpgrade("pt", 34) ? tmp.pt.ind.cMult : tmp.pt.ind.c;
			if (!hasUpgrade("pt", 24) || !hasUpgrade("pt", 21) || c.lte(0)) return decimalOne;
			let base = player.pt.points.add(10).log10().pow(0.04);
			return base;
		}
	},

	automate() {
		if (player.pt.autoBooster)
			buyBuyable("pt", 11);
		if (player.pt.autoGenerator)
			buyBuyable("pt", 12);
	},
	update(d) {
		d = tmp.pt.timeSpeed.mul(d);
		player.pt.gResetTime = player.pt.gResetTime.add(d);
		if (hasMilestone("pt", 2))
			addPoints("pt", tmp.pt.resetGain.mul(d).mul(0.181));
	},

	tabFormat: {
		Main: {
			content: ["main-display", "prestige-button", "resource-display", ["raw-html", () => `Time speed: x${format(tmp.pt.timeSpeed)}`], "blank", ["bar", "ind"], "blank", ["buyables", [1]], "blank", "upgrades"]
		},
		Induction: {
			content: ["main-display", "prestige-button", "resource-display", ["raw-html", () => `Time speed: x${format(tmp.pt.timeSpeed)}`], "blank", ["buyables", [2]], "blank",
			["milestones", [2, 0, 1], () => hasUpgrade("pt", 22)], "blank", ["bar", "ind"], "blank",
			["display-text", "<h2>Backward induction</h2>"],
			["raw-html", () => `Boost gift rewards based on prestige points. Currently: x${format(tmp.pt.ind.giftRewards)}`],
			["raw-html", () => `Multiply joy based on generator effect. Currently: x${format(tmp.pt.ind.joyMult)}`],
			["raw-html", () => `Boost machine parts gain based on distance. Currently: x${format(tmp.pt.ind.machineBoost)}`],
			["raw-html", () => `Boost game success chance based on distance. Currently: x${format(tmp.pt.ind.gachaBoost)}`, () => hasUpgrade("pt", 33)],
			["raw-html", () => `Skills scale slower based on prestige poitns. Currently: x${format(tmp.pt.ind.skillCost)}`, () => hasUpgrade("pt", 24)],
			"blank",
			["display-text", "<h2>Forward induction</h2>"],
			["raw-html", () => `Boost christmas point gain based on coal. Currently: x${format(tmp.pt.ind.coalBoostPoints)}`],
			["raw-html", () => `Multiply booster base based on joy. Currently: x${format(tmp.pt.ind.joyBoostBooster)}`],
			["raw-html", () => `Boost prestige points based on machine parts. Currently: x${format(tmp.pt.ind.machineBoostPrestige)}`],
			["raw-html", () => `Boost rocket gain based on ascensions. Currently: x${format(tmp.pt.ind.ascensionBoostRockets)}`, () => hasUpgrade("pt", 33)],
			],
			unlocked() {
				return hasUpgrade("pt", 21)
			}
		}
	},
	doReset(l) {
		if (layers[l].row > 2)
			layerDataReset("pt", ["milestones", "upgrades", "autoBooster", "autoGenerator"]);
	},
	branches: ["mc", "di"],
	tooltipLocked: "NULL"
})
