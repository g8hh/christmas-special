const spec = {
	buy() {
		player.rb.specUsed = player.rb.specUsed.add(this.tmp.cost);
		incBuyable("rb", this.id);
	},
	cost() {
		return Decimal.pow(2, this.player);
	},
	canAfford() {
		return tmp.rb.specs.sub(player.rb.specUsed).gte(this.tmp.cost);
	},
	style: {
		width: "140px", height: "140px"
	}
}
addLayer("rb", {
	name: "rocket booster",
	symbol: "RB",
	position: 0,
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		autoEngine: false,
		pseudoDist: new Decimal(0),
		elves: new Decimal(0),
		specUsed: new Decimal(0),
	}},
	color: "#f80",
	requires() {
		if (row3unlocks() > 0) return "1e780";
		else return new Decimal("1e6000");
	},
	resource: "rocket boosters",
	baseResource() {
		if (row3unlocks() > 0) return "distance";
		else return "festive energy"
	},
	baseAmount() {
		if (row3unlocks() > 0) return player.di.points;
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
			requirementDescription: "1 rocket booster",
			effectDescription: "Autobuy rocket engines, and they don't reset anything.",
			toggles: [["rb", "autoEngine"]],
			done() {
				return player.rb.points.gte(1);
			}
		}
	},
	upgrades: {
		11: {
			title: "Where am I?",
			description: "Who is this \"Santa\" anyway? Where do they live? Traverse the universe to find out.",
			cost: "1e770",
			currencyLayer: "rb",
			currencyInternalName: "pseudoDist",
			currencyDisplayName: "pseudo-distance",
			unlocked() {
				return !hasUpgrade("rb", 11)
			}
		}
	},
	buyables: {
		rows: 2,
		cols: 4,
		11: {
			title: "Rocket Spec I",
			display() {
				return `Multiply rocket gain by x1e5.
				Units: ${formatWhole(this.player)}
				Currently: x${format(this.tmp.effect)}
				Cost: ${formatWhole(this.tmp.cost)} specifications`
			},
			effect() {
				return Decimal.pow(1e5, this.player);
			},
			...spec
		},
		21: {
			title: "Rocket Spec I",
			display() {
				return `Raise rocket gain to ^1.02.
				Units: ${formatWhole(this.player)}
				Currently: ^${format(this.tmp.effect)}
				Cost: ${formatWhole(this.tmp.cost)} specifications`
			},
			effect() {
				return this.player.mul(0.02).add(1);
			},
			...spec
		},
		12: {
			title: "Scrap Spec I",
			display() {
				return `Multiply scrap gain by x1e5.
				Units: ${formatWhole(this.player)}
				Currently: x${format(this.tmp.effect)}
				Cost: ${formatWhole(this.tmp.cost)} specifications`
			},
			effect() {
				return Decimal.pow(1e5, this.player);
			},
			...spec
		},
		22: {
			title: "Scrap Spec II",
			display() {
				return `Raise scrap gain to ^1.02.
				Units: ${formatWhole(this.player)}
				Currently: ^${format(this.tmp.effect)}
				Cost: ${formatWhole(this.tmp.cost)} specifications`
			},
			effect() {
				return this.player.mul(0.02).add(1);
			},
			...spec
		},
		13: {
			title: "Speed Spec I",
			display() {
				return `Multiply accceleration and max velocity by x1e20.
				Units: ${formatWhole(this.player)}
				Currently: x${format(this.tmp.effect)}
				Cost: ${formatWhole(this.tmp.cost)} specifications`
			},
			effect() {
				return Decimal.pow(1e20, this.player);
			},
			...spec
		},
		23: {
			title: "Speed Spec II",
			display() {
				return `Raise accceleration and max velocity to ^1.05.
				Units: ${formatWhole(this.player)}
				Currently: ^${format(this.tmp.effect)}
				Cost: ${formatWhole(this.tmp.cost)} specifications`
			},
			effect() {
				return this.player.mul(0.05).add(1);
			},
			...spec
		},
		14: {
			title: "PT Spec I",
			display() {
				return `Multiply prestige point gain by x1e100.
				Units: ${formatWhole(this.player)}
				Currently: x${format(this.tmp.effect)}
				Cost: ${formatWhole(this.tmp.cost)} specifications`
			},
			effect() {
				return Decimal.pow(1e100, this.player);
			},
			...spec
		},
		24: {
			title: "PT Spec II",
			display() {
				return `Raise prestige point gain to ^1.02.
				Units: ${formatWhole(this.player)}
				Currently: ^${format(this.tmp.effect)}
				Cost: ${formatWhole(this.tmp.cost)} specifications`
			},
			effect() {
				return this.player.mul(0.02).add(1);
			},
			...spec
		},
		31: {
			title: "Energy Spec I",
			display() {
				return `Multiply base luminal energy gain by x2.
				Units: ${formatWhole(this.player)}
				Currently: x${format(this.tmp.effect)}
				Cost: ${formatWhole(this.tmp.cost)} specifications`
			},
			effect() {
				return Decimal.pow(2, this.player);
			},
			...spec
		},
		32: {
			title: "Energy Spec II",
			display() {
				return `Increase photonic energy exponent by 15.
				Units: ${formatWhole(this.player)}
				Currently: x${format(this.tmp.effect)}
				Cost: ${formatWhole(this.tmp.cost)} specifications`
			},
			effect() {
				return this.player.mul(10);
			},
			...spec
		},
		travel: {
			title: "Travel Farther",
			display() {
				return `Travel farther to recruit more elves.`
			}
		},
		respec() {
			for (let i in player.rb.buyables) {
				if (parseInt(i)) player.rb.buyables[i] = new Decimal(0);
			}
			player.rb.specUsed = new Decimal(0);
		},
		noRespecConfirm: true
	},

	effect() {
		return Decimal.pow(10, player.rb.points);
	},
	effectDescription() {
		return `increasing DI, PT, AD and IE gain by ${format(tmp.rb.effect)}`
	},

	automate() {
		if (player.rb.autoEngine)
			buyBuyable("di", "engines");
	},
	update(d) {
		if (player.rb.points.gte(1))
			player.rb.pseudoDist = player.rb.pseudoDist.add(player.di.points.mul(d));
		if (hasUpgrade("rb", 11)) {
			if (tmp.rb.divConst.pow(0.001).gte(1))
				player.rb.elves = player.rb.elves.add(
					tmp.rb.elfGain.mul(0.001).sub(player.rb.elves.mul(tmp.rb.divConst.pow(0.001).sub(1)))
					.mul(tmp.rb.divConst.pow(0.001).sub(1).recip().mul(
						Decimal.sub(1, tmp.rb.divConst.pow(0.001).recip().pow(d * 1000))
					))
				);
			else
				player.rb.elves = player.rb.elves.add(tmp.rb.elfGain.mul(d));
		}
	},
	elfGain() {
		let base = new Decimal(1);
		return base;
	},
	elfEff() {
		let base = player.rb.elves.add(1).log10().add(1).log10().add(1);
		return base;
	},
	divConst() {
		let base = new Decimal(0.1);
		return base.neg().add(1).recip();
	},
	specs() {
		return player.rb.elves.add(1).log(4).floor()
	},
	pseudoDistEffect() {
		return player.rb.pseudoDist.add(1).log10().add(1).log10().sqrt().add(1);
	},

	tabFormat: {
		Milestones: {
			content: ["main-display", "prestige-button", "resource-display", "milestones"]
		},
		Content: {
			content: ["main-display", "prestige-button", "resource-display",
			["raw-html", () => `You have ${format(player.rb.pseudoDist)} pseudo-distance, which is the first integral of distance.<br>
			`],
			["upgrade", 11], ["column", [
			["raw-html", () => `<br>You have employed ${format(player.rb.elves)} elves, which are giving ${formatWhole(tmp.rb.specs)} specifications.<br>In addition, they raise rocket engines' power to ${format(tmp.rb.elfEff)}.<br>
			You are employing ${format(tmp.rb.elfGain)} elves per second, but ${formatSmall(tmp.rb.divConst.recip().neg().add(1).mul(100))}% of them are leaving every second.<br><br>
			You have ${formatWhole(tmp.rb.specs.sub(player.rb.specUsed))} specifications left.<br><br>`], "buyables"
			], () => hasUpgrade("rb", 11)]],
			unlocked() {
				return player.rb.unlocked;
			}
		}
	},
	branches: ["di", "pt"],
	onPrestige() {
		player.rb.pseudoDist = new Decimal(0);
	}
})