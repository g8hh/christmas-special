const aD = {
	buy: {
		display() { return `Buy One<br>Cost: ${formatWhole(this.tmp.cost)}`},
		buy() {
			spendPoints("ad", this.tmp.cost);
			incBuyable("ad", this.id);
			player.ad.dim["dim" + this.dimLvl] = player.ad.dim["dim" + this.dimLvl].add(1);
		},
		buyMax() {
			if (player.ad.points.lt(this.tmp.cost.mul(left(this.dimLvl)))) return;
			const a = player.ad.points;
			let id = this.id;
			let baseCost = Math.floor(Math.pow(this.dimLvl - 1, 1.6)) + 1;
			let scaling = Math.floor(Math.pow(this.dimLvl, 1.2)) + 2;
			let hasLeft = player.ad.points.gte(adCostFunction(this.player.add(10), this.dimLvl).mul(10)) ? 10 : left(id);
			let amt = a.div(hasLeft).mul(tmp.ad.buyables.condense.costEffect).log10().sub(baseCost).div(scaling).floor();
			amt = amt.min(a.div(hasLeft).mul(tmp.ad.buyables.condense.costEffect).log10().mul(costScalStart().log10()).sqrt().sub(baseCost).div(scaling).floor());
			spendPoints("ad", adCostFunction(amt.mul(10), this.dimLvl).mul(hasLeft));
			player.ad.dim[id] = player.ad.dim[id].add(amt.mul(10).sub(player.ad.buyables[id]).add(10).max(0));
			player.ad.buyables[id] = player.ad.buyables[id].max(amt.mul(10).add(10));
		},
		cost() {
			return adCostFunction(this.player, this.dimLvl);
		},
		canAfford() {
			return player.ad.points.gte(this.tmp.cost);
		},
		effect() {
			let base = player.ad.dim[this.id];
			base = base.mul(Decimal.pow(buy10Mult(), this.player.div(10).floor()));
			base = base.mul(tmp.ad.globalDimMult);
			base = base.mul(this.tmp.mult || 1);
			return base;
		},
		style: {
			width: "110px",
			height: "40px !important",
			transform: "scale(1)"
		}
	},
	buyMax: {
		display: "Buy Max",
		onClick() {
			buyMaxBuyable("ad", this.id);
		},
		canClick() {
			return player.ad.points.gte(tmp.ad.buyables[this.id].cost.mul(left(this.id)));
		},
		style: {
			width: "80px",
			"min-height": "40px",
			transform: "scale(1)"
		}
	},
	component(dimLvl) {
		return ["row", [["raw-html", "Dimension " + dimLvl + "<br><br>", true, {width: "0px", display: "inline-block", "white-space": "nowrap", "font-size": "14px"}],
		["raw-html", () => `<br>x${format(tmp.ad.globalDimMult.mul(tmp.ad.buyables["dim" + dimLvl].mult || 1).mul(Decimal.pow(2, player.ad.buyables["dim" + dimLvl].div(10).floor())))}`, true,
		{display: "inline-block", "text-align": "left", width: "85px", "font-size": "14px"}],
		["raw-html", () => { return `<div style="position: relative; padding: 5px 0; width: 200px; background: #fff2; border-radius: 5px;">
			<span style="z-index: 1; position: relative;">${formatWhole(player.ad.dim["dim" + dimLvl])}</span>
			<div style="position: absolute; top: 0; z-index: 0; width: 200px; height: 100%; border-radius: 5px; clip-path: inset(0% ${left(dimLvl)*10}% 0% 0%);
			background-color: #0f05"></div>
		</div>` },
		true, {display: "inline-block", width: "200px"}],
		["buyable", "dim" + dimLvl], ["clickable", "dim" + dimLvl]], true, {"min-width": "530px"}]
	}
}
function left(dim) {
	return Decimal.sub(10, player.ad.buyables[typeof dim == "number" ? ("dim" + dim) : dim].sub(player.ad.buyables[typeof dim == "number" ? ("dim" + dim) : dim].div(10).floor().mul(10)));
}
function adCostFunction(amt, dimLvl) {
	let base = Decimal.pow(10, amt.div(10).floor().mul(Math.floor(Math.pow(dimLvl, 1.2)) + 2).add(Math.floor(Math.pow(dimLvl - 1, 1.6)) + 1));
	if (base.gt(costScalStart())) base = Decimal.pow(10, base.log10().pow(2).div(costScalStart().log10()));
	base = base.div(tmp.ad.buyables.condense.costEffect);
	return base;
}
const m3 = "m<sup>3</sup>";
const volBuy = {
	currencyLocation() {
		return tmp.ad;
	},
	currencyInternalName: "volume",
	currencyDisplayName: m3,
	e: true
};
function costScalStart() {
	let base = new Decimal(1e308);
	if (hasUpgrade("ad", "e5")) base = base.mul(tmp.ad.upgrades.e5.effect);
	return base;
}
function buy10Mult() {
	let base = new Decimal(2);
	if (hasUpgrade("ad", "e6")) base = new Decimal(2.2);
	return base;
}

addLayer("ad", {
	name: "antimatter",
	symbol: "AD",
	position: 2,
	startData() { return {
		unlocked: false,
		points: new Decimal(10),
		best: new Decimal(10),
		total: new Decimal(10),
		dim: {
			dim1: new Decimal(0),
			dim2: new Decimal(0),
			dim3: new Decimal(0),
			dim4: new Decimal(0),
			dim5: new Decimal(0),
			dim6: new Decimal(0),
			dim7: new Decimal(0),
			dim8: new Decimal(0)
		},
		joules: new Decimal(0)
	}},
	color: "#D55",
	resource: "antimatter",
	globalDimMult() {
		let base = decimalOne;
		base = base.mul(tmp.ad.buyables.condense.multEffect);
		if (hasUpgrade("ad", "e7")) base = base.mul(tmp.ad.upgrades.e7.effect);
		base = base.mul(tmp.ad.buyables.e21.effect);
		base = base.mul(tmp.di.buyables.mech4.effect);
		return base;
	},
	row: 2,
	hotkeys: [{
		key: "m",
		description: "Press M to max all.",
		onPress() {
			clickClickable("ad", "maxAll");
		}
	}],
	layerShown() {return hasUpgrade("mc", 41)},
	componentStyles: {
		milestone: {
			width: "400px"
		}
	},

	buyables: {
		dim1: {
			...aD.buy,
			dimLvl: 1,
			mult() {
				let base = decimalOne;
				base = base.mul(tmp.rb.effect).mul(tmp.db.effect).mul(tmp.hi.effect);
				return base;
			},
		},
		dim2: {
			...aD.buy,
			dimLvl: 2
		},
		dim3: {
			...aD.buy,
			dimLvl: 3
		},
		dim4: {
			...aD.buy,
			dimLvl: 4
		},
		dim5: {
			...aD.buy,
			dimLvl: 5
		},
		dim6: {
			...aD.buy,
			dimLvl: 6
		},
		dim7: {
			...aD.buy,
			dimLvl: 7
		},
		dim8: {
			...aD.buy,
			dimLvl: 8,
			mult() {
				let base = decimalOne;
				base = base.mul(tmp.db.buyables[11].effect);
				return base;
			}
		},
		ts: {
			display() { return `Increase tickspeed<br>Cost: ${formatWhole(this.tmp.cost)}`},
			buy() {
				spendPoints("ad", this.tmp.cost);
				incBuyable("ad", "ts");
			},
			buyMax() {
				const a = player.ad.points;
				let amt = a.log10().sub(3).floor();
				amt = amt.min(a.log10().mul(costScalStart().log10()).sqrt().sub(3).floor());
				spendPoints("ad", this.cost(amt));
				player.ad.buyables.ts = player.ad.buyables.ts.max(amt.add(1));
			},
			cost(amt=player.ad.buyables.ts) {
				let base = Decimal.pow(10, amt.add(3));
				if (base.gte(costScalStart())) base = Decimal.pow(10, base.log10().pow(2).div(costScalStart().log10()));
				return base;
			},
			canAfford() {
				return player.ad.points.gte(this.tmp.cost);
			},
			effect() {
				let base = Decimal.pow(1.1, this.player);
				if (hasUpgrade("ad", "e1")) base = base.pow(1.4);
				return base;
			},
			style: {
				width: "130px",
				height: "40px !important",
				transform: "scale(1)"
			}
		},
		condense: {
			title() { return "Condense^" + formatWhole(this.player.add(1))},
			display() { return `Reset progress in AD, but give buffs to dimension multipliers and costs.
				<br>Req: ${formatWhole(this.tmp.cost)} antimatter`
			},
			buy() {
				player.ad.points = new Decimal(10);
				for (let i = 1; i < 9; i++) {
					player.ad.buyables["dim" + i] = decimalZero;
					player.ad.dim["dim" + i] = decimalZero;
				}
				player.ad.buyables.ts = decimalZero;
				incBuyable("ad", "condense");
			},
			buyMax() {
				const a = player.ad.points;
				let amt = a.mul(this.tmp.costDiv).log10().sub(15).floor();
				player.ad.points = new Decimal(10);
				for (let i = 1; i < 9; i++) {
					player.ad.buyables["dim" + i] = decimalZero;
					player.ad.dim["dim" + i] = decimalZero;
				}
				player.ad.buyables.ts = decimalZero;
				player.ad.buyables.condense = player.ad.buyables.condense.max(amt.add(1));
			},
			costDiv() {
				let base = decimalOne;
				if (hasUpgrade("ad", "e3")) base = base.mul(this.tmp.costEffect);
				return base;
			},
			cost(amt=player.ad.buyables.condense) {
				let base = Decimal.pow(1e3, amt.pow(2).add(5)).div(this.tmp.costDiv);
				return base;
			},
			canAfford() {
				return player.ad.points.gte(this.tmp.cost);
			},
			multEffect() {
				let base = Decimal.pow(8*hasTier(9) + 2, this.player.mul(tmp.hi.buyables[21].effect));
				if (hasUpgrade("ad", "e2")) base = base.pow(1.5);
				return base;
			},
			costEffect() {
				let base = Decimal.pow(10, this.player);
				if (hasUpgrade("ad", "e2")) base = base.pow(1.5);
				return base;
			},
			unlocked() {
				return player.ad.total.gte(1e15);
			},
			style: {
				height: "120px",
				transform: "scale(1)"
			}
		},
		boil: {
			title() { return "Boil^" + formatWhole(this.player.add(1))},
			display() { return `Reset progress in AD, but gain more energy.
				<br>Req: ${formatWhole(this.tmp.cost)} 8th dimensions`
			},
			buy() {
				player.ad.points = new Decimal(10);
				for (let i = 1; i < 9; i++) {
					player.ad.buyables["dim" + i] = decimalZero;
					player.ad.dim["dim" + i] = decimalZero;
				}
				player.ad.buyables.ts = decimalZero;
				incBuyable("ad", "boil");
			},
			buyMax() {
				const a = player.ad.buyables.dim8;
				let amt = a.sub(50).div(10).floor();
				amt = amt.min(a.mul(100).sqrt().sub(50).div(10).floor());
				player.ad.points = new Decimal(10);
				for (let i = 1; i < 9; i++) {
					player.ad.buyables["dim" + i] = decimalZero;
					player.ad.dim["dim" + i] = decimalZero;
				}
				player.ad.buyables.ts = decimalZero;
				player.ad.buyables.boil = player.ad.buyables.boil.max(amt.add(1));
			},
			cost(amt=player.ad.buyables.boil) {
				let base = amt.mul(10).add(50);
				if (base.gte(100)) base = base.pow(2).div(100).floor();
				return base;
			},
			canAfford() {
				return player.ad.buyables.dim8.gte(this.tmp.cost);
			},
			effect() {
				let base = Decimal.pow(5, this.player.pow(0.8)).sub(1).div(4);
				return base;
			},
			unlocked() {
				return player.ad.total.gte(1e15);
			},
			style: {
				height: "120px",
				transform: "scale(1)"
			}
		},
		e11: {
			title: "Conservation of Energy",
			display() {
				return `Increase antimatter reactor efficiency.<br>
				^${format(this.tmp.effect, 3)} base power
				Cost: ${format(this.tmp.cost)} J`
			},
			buy() {
				player.ad.joules = player.ad.joules.sub(this.tmp.cost);
				incBuyable("ad", "e11");
			},
			buyMax() {
				const a = player.ad.joles;
				let amt = a.div(1e30).log(20).pow(2/3).floor();
				player.ad.joules = player.ad.joules.sub(this.cost(amt));
				player.ad.buyables.e11s = player.ad.buyables.e11.max(amt.add(1));
			},
			cost(amt=player.ad.buyables.e11) {
				let base = Decimal.pow(20, amt.pow(1.5)).mul(1e30);
				return base;
			},
			canAfford() {
				return player.ad.joules.gte(this.tmp.cost);
			},
			effect() {
				let base = this.player.mul(0.02).add(1);
				return base;
			},
			purchaseLimit: 48,
			style: {
				height: "120px",
				transform: "scale(1)"
			},
			color: "#ff0"
		},
		e12: {
			title: "Von Neumann Transformation",
			display() {
				return `Double space.<br>
				x${formatWhole(this.tmp.effect)} space
				Cost: ${format(this.tmp.cost)} J`
			},
			buy() {
				player.ad.joules = player.ad.joules.sub(this.tmp.cost);
				incBuyable("ad", "e12");
			},
			buyMax() {
				const a = player.ad.joles;
				let amt = a.div(1e100).log(100).pow(2/3).floor();
				player.ad.joules = player.ad.joules.sub(this.cost(amt));
				player.ad.buyables.e12s = player.ad.buyables.e12.max(amt.add(1));
			},
			cost(amt=player.ad.buyables.e12) {
				let base = Decimal.pow(100, amt.pow(1.4)).mul(1e50);
				return base;
			},
			canAfford() {
				return player.ad.joules.gte(this.tmp.cost);
			},
			effect() {
				let base = Decimal.pow(2, this.player);
				return base;
			},
			unlocked() {
				return hasUpgrade("ad", "e4");
			},
			style: {
				height: "120px",
				transform: "scale(1)"
			},
			color: "#ddd"
		},
		e21: {
			title: "Energy Resurge",
			display() {
				return `Gain a dimension multiplier based on energy.<br>
				x${formatWhole(this.tmp.effect)}
				Cost: ${format(this.tmp.cost)} J`
			},
			buy() {
				player.ad.joules = player.ad.joules.sub(this.tmp.cost);
				incBuyable("ad", "e21");
			},
			buyMax() {
				const a = player.ad.joles;
				let amt = a.div("1e1111").log(1e10).pow(0.5).floor();
				player.ad.joules = player.ad.joules.sub(this.cost(amt));
				player.ad.buyables.e21 = player.ad.buyables.e21.max(amt.add(1));
			},
			cost(amt=player.ad.buyables.e21) {
				let base = Decimal.pow(1e10, this.player.pow(2.5)).mul("1e1111");
				return base;
			},
			canAfford() {
				return player.ad.joules.gte(this.tmp.cost);
			},
			effect() {
				let base = Decimal.pow(player.ad.joules.add(10).log10(), this.player);
				return base;
			},
			unlocked() {
				return hasUpgrade("ad", "e15");
			},
			style: {
				height: "120px",
				transform: "scale(1)"
			},
			color: "#ff0"
		}
	},
	clickables: {
		maxAll: {
			display: "Max All",
			onClick() {
				for (let i = 1; i < 9; i++)
					clickClickable("ad", "dim" + i);
				clickClickable("ad", "ts");
			},
			onHold() {
				clickClickable("ad", "maxAll")
			},
			canClick: true,
			style: {
				width: "80px",
				"min-height": "40px",
				transform: "scale(1)"
			}
		},
		dim1: {
			...aD.buyMax
		},
		dim2: {
			...aD.buyMax
		},
		dim3: {
			...aD.buyMax
		},
		dim4: {
			...aD.buyMax
		},
		dim5: {
			...aD.buyMax
		},
		dim6: {
			...aD.buyMax
		},
		dim7: {
			...aD.buyMax
		},
		dim8: {
			...aD.buyMax
		},
		ts: {
			...aD.buyMax,
			canClick() {
				return player.ad.points.gte(tmp.ad.buyables.ts.cost);
			}
		}
	},
	upgrades: {
		e1: {
			title: "Primary Anti-space Building",
			description: "Tickspeed upgrades are more effective.",
			cost: 1e20,
			...volBuy,
			branches: ["e2"]
		},
		e2: {
			title: "Advanced Distillation",
			description: "Condensers are 1.5 times more effective.",
			cost: 1e40,
			...volBuy,
			branches: ["e3"]
		},
		e3: {
			title: "Spatial Recursion",
			description: "Condensers cheapen themselves.",
			cost: 1e100,
			...volBuy,
			branches: ["e4"]
		},
		e4: {
			title: "Von Neumann Paradox",
			description: "Find a way to double space.",
			cost: 1e135,
			...volBuy,
			branches: ["e5"]
		},
		e5: {
			title: "Spatial Solution",
			description: "Push back the post-e308 dimension cost scaling based on space.",
			cost: 1e144,
			...volBuy,
			effect() {
				return tmp.ad.volume.add(1).sqrt();
			},
			effectDisplay() {
				return `x${format(this.tmp.effect)} later`;
			},
			branches: ["e6"]
		},
		e6: {
			title: "Spatial Solvent",
			description: "Increase the buy 10 multiplier from x2 to x2.2.",
			cost: 1e170,
			...volBuy,
			branches: ["e7"]
		},
		e7: {
			title: "Spatial Solute",
			description: "Gain a dimension multiplier based on time played.",
			cost: 1e240,
			...volBuy,
			effect() {
				return Math.pow(player.timePlayed + 1, 0.25);
			},
			effectDisplay() {
				return `x${format(this.tmp.effect)}`;
			},
			branches: ["e8"]
		},
		e8: {
			title: "Spatial Problem",
			description: "The ADverse can no longer contain your space. Expand into the PTverse. Oh, and automatically buy max.",
			cost: 1e250,
			...volBuy
		},
		e11: {
			title: "Time Solution",
			description: "Time speed affects AD, and tickspeed boosts the generator base.",
			cost: 1e250,
			...volBuy,
			unlocked() {
				return hasUpgrade("ad", "e8")
			},
			branches: ["e12"],
			effect() {
				return tmp.ad.buyables.ts.effect.pow(0.1);
			},
			effectDisplay() {
				return `x${format(this.tmp.effect)} generator base`;
			}
		},
		e12: {
			title: "Space-Time Solvent",
			description: "Time and space inductors scale 25% slower.",
			cost: 1e288,
			...volBuy,
			unlocked() {
				return hasUpgrade("ad", "e8");
			},
			branches: ["e13"]
		},
		e13: {
			title: "Time Solute",
			description: "Tickspeed affects time speed at a reduced rate.",
			cost: 1e300,
			...volBuy,
			unlocked() {
				return hasUpgrade("ad", "e8");
			},
			branches: ["e14"],
			effect() {
				return tmp.ad.buyables.ts.effect.pow(0.25);
			},
			effectDisplay() {
				return `x${format(this.tmp.effect)}`;
			}
		},
		e14: {
			title: "Time Problem",
			description: "Multiply christmas point gain based on condenser effect.",
			cost: "1e385",
			...volBuy,
			unlocked() {
				return hasUpgrade("ad", "e8");
			},
			branches: ["e15"],
			effect() {
				return tmp.ad.buyables.condense.costEffect.pow(3);
			},
			effectDisplay() {
				return `x${format(this.tmp.effect)}`;
			}
		},
		e15: {
			title: "Space-Time Problem",
			description: "The PTverse has run out of space. Ascend to the DIverse.",
			cost: "1e388",
			...volBuy,
			unlocked() {
				return hasUpgrade("ad", "e8");
			}
		},
		e21: {
			title: "Distance, Scaled",
			description: "Greatly reduce the level scaling. The rocket effect applies to power.",
			cost: "1e390",
			effectDisplay() {
				return `ln(x+2.718)^${format(tmp.di.buyables.rockets.effect)}`
			},
			...volBuy,
			branches: ["e22"],
			unlocked() {
				return hasUpgrade("ad", "e15");
			}
		},
		e22: {
			title: "Power, Scaled",
			description: "Unlock a new mechanisation.",
			cost: "1e914",
			...volBuy,
			branches: ["e23"],
			unlocked() {
				return hasUpgrade("ad", "e15");
			}
		},
		e23: {
			title: "Levels, Not Scaled",
			description: "Levels scale another 40% slower.",
			cost: "1e950",
			...volBuy,
			branches: ["e24"],
			unlocked() {
				return hasUpgrade("ad", "e15");
			}
		},
		e24: {
			title: "Unrelativity",
			description: "Distance boosts time speed.",
			cost: "1e1500",
			...volBuy,
			branches: ["e25"],
			effect() {
				return player.di.points.add(10).log10();
			},
			effectDisplay() {
				return `x${format(this.tmp.effect)}`;
			},
			unlocked() {
				return hasUpgrade("ad", "e15");
			}
		},
		e25: {
			description: "NOT. ENOUGH. SPACE.",
			cost: "1e1616",
			...volBuy,
			unlocked() {
				return hasUpgrade("ad", "e15");
			},
			onPurchase() {
				player.ie.unlocked = true;
			}
		}
	},
	power() {
		if (player.ad.buyables.boil.lt(1)) return decimalZero;
		let base = tmp.ad.buyables.dim1.effect.mul(tmp.ad.buyables.ts.effect).pow(0.5);
		base = base.pow(tmp.ad.buyables.e11.effect);
		base = base.mul(tmp.ad.buyables.boil.effect);
		if (hasUpgrade("ad", "e21")) base = base.mul(base.add(Math.E).ln().pow(tmp.di.buyables.rockets.effect));
		return base;
	},
	volume() {
		let base = player.ad.joules.pow(0.5);
		base = base.mul(tmp.ad.buyables.e12.effect);
		return base;
	},
	microtabs: {
		Energy: {
			AD: {
				content: [["upgrade-tree", [
				["e1", "e2", "e3", "e4"],
				["e8", "e7", "e6", "e5"]
				]]]
			},
			PT: {
				content: [["upgrade-tree", [
				["e11", "e12", "e13", "e14", "e15"]
				]]],
				unlocked() {
					return hasUpgrade("ad", "e8")
				}
			},
			DI: {
				content: [["upgrade-tree", [
				["e21", "e22", "e23", "e24", "e25"]
				]]],
				unlocked() {
					return hasUpgrade("ad", "e15")
				}
			}
		}
	},

	automate() {
		if (hasUpgrade("ad", "e8"))
			clickClickable("ad", "maxAll");
	},
	update(d) {
		if (hasUpgrade("ad", "e11")) d = tmp.pt.timeSpeed.mul(d);
		addPoints("ad", tmp.ad.buyables.dim1.effect.mul(d).mul(tmp.ad.buyables.ts.effect));
		for (let i = 1; i < 8; i++) {
			player.ad.dim["dim" + i] = player.ad.dim["dim" + i].add(tmp.ad.buyables["dim" + (i + 1)].effect.mul(d).div(2).mul(tmp.ad.buyables.ts.effect));
		}
		player.ad.joules = player.ad.joules.add(tmp.ad.power.mul(d));
	},

	tabFormat: {
		Dimensions: {
			content: [["main-display", 2], ["raw-html", () => `<sub>You are gaining ${format(tmp.ad.buyables.dim1.effect.mul(tmp.ad.buyables.ts.effect))} antimatter per second.</sub>`], "blank",
			["raw-html", () => `TickSpeed: ${format(tmp.ad.buyables.ts.effect)}`], ["row", [["buyable", "ts"], ["clickable", "ts"]]], ["clickable", "maxAll"],
			"blank", "blank", aD.component(1), aD.component(2), aD.component(3), aD.component(4), aD.component(5), aD.component(6), aD.component(7), aD.component(8),
			"blank", ["row", [["buyable", "condense"], ["buyable", "boil"]]], "blank"]
		},
		Boiler: {
			content: [["main-display", 2], ["raw-html", () => `<sub>You are gaining ${format(tmp.ad.buyables.dim1.effect.mul(tmp.ad.buyables.ts.effect))} antimatter per second.</sub>`], "blank", "blank",
			["currency-display", {resource: "Energy (J)", resourceAmt() {return player.ad.joules}, precision: 2, color: "#ff0"}, true, {height: "30px"}],
			["raw-html", () => `Power: <h2 style="color: #78f; text-shadow: 0 0 10px">${format(tmp.ad.power)}</h2> W`], "blank",
			["raw-html", () => `Your particles are moving and expanding because of heat.<br><br>Volume of universe: <h2 style="color: #ddd; text-shadow: 0 0 10px">${format(tmp.ad.volume)}</h2> ${m3}`], "blank",
			["row", [["buyable", "e11"], ["buyable", "e12"]]], ["row", [["buyable", "e21"], ["buyable", "e22"]]], "blank",
			["microtabs", "Energy"]],
			unlocked() {
				return player.ad.buyables.boil.gte(1);
			},
			shouldNotify() {
				for (let i in tmp.ad.upgrades) {
					if (tmp.ad.upgrades[i].e && canAffordUpgrade("ad", i) && !hasUpgrade("ad", i)) return true;
				}
				return false;
			}
		}
	},
	branches: ["mc", "pt"],
	doReset(l) {
		if (layers[l].row > 2)
			layerDataReset("ad", ["milestones", "upgrades"]);
	},
	tooltipLocked: "NULL"
})