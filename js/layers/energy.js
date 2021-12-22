function dispExtraLvl(layer, id) {
	return (tmp[layer].buyables[id].extra && tmp[layer].buyables[id].extra.gt(0)) ? `+${format(tmp[layer].buyables[id].extra)}` : "";
}
function extra(layer, id) {
	return tmp[layer].buyables[id].extra || new Decimal(0);
}
function getLuBaseExp(x = player.ie.totalLuExpInput) {
	x = x.div(12);
	x = x.mul(0.2).pow(0.5);
	if (x.gte(1.5)) x = Decimal.pow(1.2, x.log(1.2).pow(0.5).mul(Decimal.log(1.5, 1.2).pow(0.5)));
	return x;
}
const ieBuyable = {
	buy() {
		spendPoints("ie", this.tmp.cost);
		incBuyable("ie", this.id);
		this.onPurchase ? this.onPurchase() : "";
	},
	canAfford() {
		return player.ie.points.gte(this.tmp.cost);
	},
	style: {
		width: "150px",
		height: "150px"
	}
},
luminBuyable = {
	buy() {
		player.ie.lumin = player.ie.lumin.sub(this.tmp.cost);
		incBuyable("ie", this.id);
		this.onPurchase ? this.onPurchase() : "";
	},
	canAfford() {
		return player.ie.lumin.gte(this.tmp.cost);
	},
	color: "#fce",
	style: {
		width: "150px",
		height: "150px"
	}
},
wl = {
	buy: {
		display() {
			return `Buy a ${this.id} condenser.
			Level: ${formatWhole(this.player)}${dispExtraLvl("ie", this.id)}
			Effect: ${format(this.tmp.effect)} base ${this.id} gen./s
			Cost: ${format(this.tmp.cost)} photonic energy`;
		},
		buy() {
			player.ie.photon = player.ie.photon.sub(this.tmp.cost);
			incBuyable("ie", this.id);
		},
		buyMax() {
			let amt = player.ie.photon.div(this.tmp.costMult).log(this.tmp.costBase).root(this.costExp);
			player.ie.photon = player.ie.photon.sub(this.cost(amt));
			player.ie.buyables[this.id] = player.ie.buyables[this.id].max(amt);
		},
		cost(x) {
			if (x == undefined) x = this.player;
			return Decimal.pow(this.tmp.costBase, x.pow(this.tmp.costExp)).mul(this.tmp.costMult);
		},
		canAfford() {
			return player.ie.photon.gte(this.tmp.cost);
		},
		extra() {
			let base = new Decimal(0);
			if (this.id != "violet") base = base.add(tmp.ie.photons.violet.effect);
			return base;
		},
		effect() {
			return Decimal.pow(5, this.player.add(extra("ie", this.id)).mul(tmp.hi.buyables[21].effect)).sub(1).mul(0.025);
		},
		color: "linear-gradient(#ffa, #aff, #faf)",
		style: { height: "90px", width: "180px", "border-radius": "0"}
	},
	format(x) {
		return ["column", [["currency-display", {
			resource: x, resourceAmt() { return player.ie.photons[x] }, color: x
		}, true], ["raw-html", () => run(layers.ie.photons[x].effectDisplay, layers.ie.photons[x])], "blank", ["buyable", x]], true, {border: "2px solid " + x, padding: "10px", width: "210px", height: "250px", margin: "5px", background: "#000", "font-size": "14px"}]
	}
};
addLayer("ie", {
	name: "incremenergy",
	symbol: "IE",
	position: 3,
	startData() { return {
		unlocked: false,
		points: new Decimal(1),
		lumin: new Decimal(0),
		luminTimes: new Decimal(0),
		totalLuExpInput: new Decimal(0),
		photon: new Decimal(0),
		unlocks: {
			photon: false,
			auto: false
		},
		photons: {
			red: new Decimal(0),
			orange: new Decimal(0),
			yellow: new Decimal(0),
			green: new Decimal(0),
			blue: new Decimal(0),
			indigo: new Decimal(0),
			violet: new Decimal(0)
		},
		autoCharger: false,
		autoSelf: false,
		autoCompress: false
	}},
	color: "#ED8",
	resource: "festive energy",
	row: 2,
	layerShown() {return hasUpgrade("mc", 41)},
	componentStyles: {
		milestone: {
			width: "400px"
		}
	},

	gainMult() {
		let base = new Decimal(1);
		base = base.mul(tmp.rb.effect).mul(tmp.db.effect).mul(tmp.hi.effect);
		return base;
	},
	exponent() {
		let base = new Decimal(0);
		base = base.add(tmp.ie.buyables[11].effect);
		base = base.add(tmp.ie.buyables[12].effect);
		base = base.add(tmp.ie.buyables[101].effect);
		base = base.add(tmp.ie.photons.orange.effect);
		base = base.mul(tmp.ie.buyables[13].effect.add(1));
		return base;
	},
	luExp() {
		let base = getLuBaseExp();
		base = base.add(tmp.ie.buyables[102].effect);
		base = base.add(tmp.ie.photons.red.effect);
		return base;
	},
	luGain() {
		let base = new Decimal(1);
		base = base.mul(tmp.rb.buyables[31].effect);
		return base;
	},
	luEffect() {
		let base = player.ie.lumin.add(1).log10().sqrt().min(player.ie.lumin.add(1).log10());
		return base;
	},
	phExp() {
		let base = new Decimal(0);
		base = base.add(tmp.ie.buyables[111].effect);
		base = base.add(tmp.ie.photons.yellow.effect);
		base = base.add(tmp.rb.buyables[32].effect);
		return base;
	},
	phEffect() {
		return player.ie.photon.pow(0.7);
	},
	photons: {
		red: {
			effectDisplay() {
				return `Add ${format(tmp.ie.photons.red.effect)} to luminal energy exponent`
			},
			effect() {
				return player.ie.photons.red.add(1).log10().pow(0.8);
			}
		},
		orange: {
			effectDisplay() {
				return `Add ${format(tmp.ie.photons.orange.effect)} to festive energy exponent<br>
				Muliply red photon generation by x${format(tmp.ie.photons.orange.lastBoost)}`
			},
			effect() {
				return player.ie.photons.orange.add(1).log10().pow(1.2);
			},
			lastBoost() {
				return player.ie.photons.orange.add(1).sqrt();
			}
		},
		yellow: {
			effectDisplay() {
				return `Add ${format(tmp.ie.photons.yellow.effect)} to photonic energy exponent<br>
				Muliply orange photon generation by x${format(tmp.ie.photons.yellow.lastBoost)}`
			},
			effect() {
				return player.ie.photons.yellow.add(1).log10().sqrt();
			},
			lastBoost() {
				return player.ie.photons.yellow.add(1).sqrt();
			}
		},
		green: {
			effectDisplay() {
				return `Add ${format(tmp.ie.photons.green.effect)} free levels to first 2 luminal energy upgrades<br>
				Multiply yellow photon generation by x${format(tmp.ie.photons.green.lastBoost)}`
			},
			effect() {
				return player.ie.photons.green.add(1).log10().pow(0.4);
			},
			lastBoost() {
				return player.ie.photons.green.add(1).sqrt();
			}
		},
		blue: {
			effectDisplay() {
				return `Multiply charger effect by x${format(tmp.ie.photons.blue.effect)}<br>
				Multiply green photon generation by x${format(tmp.ie.photons.blue.lastBoost)}`
			},
			effect() {
				return player.ie.photons.blue.add(1).log10().add(1).log10().pow(2).add(1);
			},
			lastBoost() {
				return player.ie.photons.blue.add(1).sqrt();
			}
		},
		indigo: {
			effectDisplay() {
				return `Divide festive energy upgrade costs by /${format(tmp.ie.photons.indigo.effect)}<br>
				Multiply blue photon generation by x${format(tmp.ie.photons.indigo.lastBoost)}`
			},
			effect() {
				return player.ie.photons.indigo.add(1).pow(2);
			},
			lastBoost() {
				return player.ie.photons.indigo.add(1).sqrt();
			}
		},
		violet: {
			effectDisplay() {
				return `Add ${format(tmp.ie.photons.violet.effect)} free photon condenser levels to all wavelengths except this one`
			},
			effect() {
				return player.ie.photons.violet.add(1).log10().pow(0.7);
			}
		}
	},

	buyables: {
		rows: 3,
		cols: 3,
		11: {
			title: "Chargers",
			display() {
				return `Increase energy exponent by ${format(this.tmp.per)}.
				Level: ${formatWhole(this.player)}${dispExtraLvl(this.layer, this.id)}
				Currently: +${format(this.tmp.effect)}<br>
				Cost: ${format(this.tmp.cost)} festive energy`
			},
			buyMax() {
				if (player.ie.buyables[11].lte(0)) {
					spendPoints("ie", 1);
					incBuyable("ie", this.id);
					return;
				}
				let amt = player.ie.points.mul(this.tmp.costDiv).log10().sub(1).sqrt().add(1).floor();
				spendPoints("ie", this.cost(amt));
				player.ie.buyables[11] = player.ie.buyables[11].max(amt.add(1));
			},
			costDiv() {
				let base = new Decimal(1);
				base = base.div(tmp.ie.photons.indigo.effect);
				return base;
			},
			cost(x = player.ie.buyables[11]) {
				if (x.lte(0)) return new Decimal(1);
				let base = Decimal.pow(10, x.sub(1).pow(2).add(1)).div(this.tmp.costDiv);
				return base;
			},
			extra() {
				let base = decimalZero;
				base = base.add(tmp.ie.luEffect);
				return base;
			},
			per() {
				let base = decimalOne;
				base = base.mul(tmp.ie.photons.blue.effect);
				return base;
			},
			effect() {
				return this.tmp.per.mul(this.player.add(extra(this.layer, this.id)));
			},
			...ieBuyable
		},
		12: {
			title: "Self-Chargers",
			display() {
				return `Increase energy exponent by ${format(this.tmp.per)}.
				Level: ${formatWhole(this.player)}${dispExtraLvl(this.layer, this.id)}
				Currently: +${format(this.tmp.effect)}<br>
				Cost: ${format(this.tmp.cost)} festive energy`
			},
			buyMax() {
				let amt = player.ie.points.mul(this.tmp.costDiv).div(1e4).log(50).pow(0.4).floor();
				spendPoints("ie", this.cost(amt));
				player.ie.buyables[12] = player.ie.buyables[12].max(amt.add(1));
			},
			costDiv() {
				let base = new Decimal(1);
				base = base.div(tmp.ie.photons.indigo.effect);
				return base;
			},
			cost(x = player.ie.buyables[12]) {
				let base = Decimal.pow(50, x.pow(2.5)).div(this.tmp.costDiv).mul(1e4);
				return base;
			},
			extra() {
				let base = decimalZero;
				base = base.add(tmp.ie.luEffect);
				return base;
			},
			per() {
				let base = player.ie.points.plus(1).log10().plus(1).log10();
				return base;
			},
			effect() {
				return this.tmp.per.mul(this.player.add(extra(this.layer, this.id)));
			},
			...ieBuyable
		},
		13: {
			title: "Compressors",
			display() {
				return `Increase energy exponent by ${format(this.tmp.per.mul(100))}%.
				Level: ${formatWhole(this.player)}${dispExtraLvl(this.layer, this.id)}
				Currently: +${format(this.tmp.effect.mul(100))}%<br>
				Cost: ${format(this.tmp.cost)} festive energy`
			},
			buyMax() {
				let amt = player.ie.points.div(1e9).mul(this.tmp.costDiv).log(100).pow(1/3).floor();
				spendPoints("ie", this.cost(amt));
				player.ie.buyables[13] = player.ie.buyables[13].max(amt.add(1));
			},
			costDiv() {
				let base = new Decimal(1);
				base = base.div(tmp.ie.photons.indigo.effect);
				return base;
			},
			cost(x = player.ie.buyables[13]) {
				let base = Decimal.pow(100, x.pow(3)).div(this.tmp.costDiv).mul(1e9);
				return base;
			},
			extra() {
				let base = decimalZero;
				base = base.add(tmp.ie.luEffect);
				return base;
			},
			per() {
				let base = new Decimal(0.1);
				return base;
			},
			effect() {
				return this.tmp.per.mul(this.player.add(extra(this.layer, this.id)));
			},
			...ieBuyable
		},

		101: {
			title: "Super charge",
			display() {
				return `Increase energy exponent based on lumin resets.
				Level: ${formatWhole(this.player)}${dispExtraLvl(this.layer, this.id)}
				Currently: +${format(this.tmp.effect)}<br>
				Cost: ${format(this.tmp.cost)} luminal energy`
			},
			buyMax() {
				let amt = player.ie.points.div(5).log(2).pow(2/3).floor();
				player.ie.lumin = player.ie.lumin.sub(this.cost(amt));
				player.ie.buyables[101] = player.ie.buyables[101].max(amt.add(1));
			},
			cost(x = player.ie.buyables[101]) {
				let base = Decimal.pow(2, x.pow(1.5)).mul(5);
				return base;
			},
			per() {
				let base = player.ie.luminTimes.add(1).log10().pow(0.4).min(player.ie.luminTimes.add(1).log10());
				return base;
			},
			extra() {
				let base = new Decimal(0);
				base = base.add(tmp.ie.photons.green.effect);
				return base;
			},
			effect() {
				return this.tmp.per.mul(this.player.add(extra(this.layer, this.id)));
			},
			...luminBuyable
		},
		102: {
			title: "Large battery",
			display() {
				return `Increase luminal energy exponent based on energy.
				Level: ${formatWhole(this.player)}${dispExtraLvl(this.layer, this.id)}
				Currently: +${format(this.tmp.effect)}<br>
				Cost: ${format(this.tmp.cost)} festive energy`
			},
			buyMax() {
				let amt = player.ie.points.div(1e50).log(1e5).pow(0.4).floor();
				player.ie.lumin = player.ie.lumin.sub(this.cost(amt));
				player.ie.buyables[102] = player.ie.buyables[102].max(amt.add(1));
			},
			cost(x = player.ie.buyables[102]) {
				let base = Decimal.pow(1e5, x.pow(2.5)).mul(1e50);
				return base;
			},
			per() {
				let base = player.ie.points.add(1).log10().pow(0.2);
				return base;
			},
			extra() {
				let base = new Decimal(0);
				base = base.add(tmp.ie.photons.green.effect);
				return base;
			},
			effect() {
				return this.tmp.per.mul(this.player.add(extra(this.layer, this.id))).div(10);
			},
			...ieBuyable
		},
		111: {
			title: "Excited state",
			display() {
				return `Produce photonic energy based on luminal energy.
				Level: ${formatWhole(this.player)}${dispExtraLvl(this.layer, this.id)}
				Currently: +${format(this.tmp.effect)} photonic energy exponent<br>
				Cost: ${format(this.tmp.cost)} luminal energy`
			},
			buyMax() {
				let amt = player.ie.points.div(10).log(4).pow(0.625).floor();
				player.ie.lumin = player.ie.lumin.sub(this.cost(amt));
				player.ie.buyables[111] = player.ie.buyables[111].max(amt.add(1));
				player.ie.unlocks.photon = true;
			},
			cost(x = player.ie.buyables[111]) {
				let base = Decimal.pow(4, x.pow(1.6)).mul(10);
				return base;
			},
			per() {
				let base = player.ie.lumin.add(1).log10().add(1).log10().pow(1.3);
				return base;
			},
			effect() {
				return this.tmp.per.mul(this.player.add(extra(this.layer, this.id)));
			},
			onPurchase() {
				player.ie.unlocks.photon = true;
			},
			...luminBuyable
		},
		red: {
			...wl.buy,
			costMult: 5, costBase: 10, costExp: 1.2
		},
		orange: {
			...wl.buy,
			costMult: 500, costBase: 20, costExp: 1.3
		},
		yellow: {
			...wl.buy,
			costMult: 5e5, costBase: 30, costExp: 1.4
		},
		green: {
			...wl.buy,
			costMult: 5e12, costBase: 50, costExp: 1.5
		},
		blue: {
			...wl.buy,
			costMult: 5e20, costBase: 100, costExp: 1.8
		},
		indigo: {
			...wl.buy,
			costMult: 5e30, costBase: 500, costExp: 2
		},
		violet: {
			...wl.buy,
			costMult: 5e50, costBase: 1e4, costExp: 2.4
		}
	},
	clickables: {
		11: {
			display() {
				return `Reset to gain ${format(tmp.ie.luGain)} base luminal energy, and increase the luminal energy exponent by ${format(getLuBaseExp(player.ie.totalLuExpInput.add(tmp.ie.exponent)).sub(getLuBaseExp()))}.
				<br>Req: Energy exponent of 12`
			},
			canClick() {
				return tmp.ie.exponent.gte(12);
			},
			onClick() {
				player.ie.totalLuExpInput = player.ie.totalLuExpInput.add(tmp.ie.exponent);
				tmp.ie.luExp = layers.ie.luExp();
				player.ie.lumin = player.ie.lumin.root(tmp.ie.luExp).add(tmp.ie.luGain).pow(tmp.ie.luExp);
				player.ie.luminTimes = player.ie.luminTimes.add(1);
				player.ie.points = new Decimal(1);
				for (let i = 1; i <= 3; i++)
					player.ie.buyables[10 + i] = new Decimal(0);
				player.ie.photon = new Decimal(0);
				for (let i in player.ie.photons) {
					player.ie.photons[i] = new Decimal(0);
				}
			},
			onHold() {
				clickClickable("ie", 11);
			},
			style: {width: "200px", height: "200px"},
			color: "#fce"
		}
	},
	milestones: {
		0: {
			requirementDescription: "1e500 festive energy",
			effectDescription: "Auto-Chargers",
			toggles: [["ie", "autoCharger"]],
			done() { return player.ie.points.gte("1e500"); }
		},
		1: {
			requirementDescription: "1e2500 festive energy",
			effectDescription: "Auto-Self Chargers",
			toggles: [["ie", "autoSelf"]],
			done() { return player.ie.points.gte("1e2500"); }
		},
		2: {
			requirementDescription: "1e6000 festive energy",
			effectDescription: "Auto-Compressors",
			toggles: [["ie", "autoCompress"]],
			done() { return player.ie.points.gte("1e6000"); }
		},
	},

	tooltipLocked: "NULL",
	branches: ["ad"],
	tabFormat: {
		Main: {
			content: [["row", [["main-display", 2], ["raw-html", () => `<div style="transform: translateY(-14px); font-size: 14px;">${format(tmp.ie.exponent)}</div>`]]],
			"buyables"]
		},
		Photon: {
			content: [["row", [["main-display", 2], ["raw-html", () => `<div style="transform: translateY(-14px); font-size: 14px;">${format(tmp.ie.exponent)}</div>`]]],
			"blank", ["currency-display", {precision: 2, resource() {return "photonic energy<sup>" + format(tmp.ie.phExp) + "</sup>"}, resourceAmt() {return player.ie.photon}, color: "#ddf",
			effectDescription() {return `multiplying the generation of all wavelengths by x${format(tmp.ie.phEffect)}`}}],
			["row", [wl.format("red"), wl.format("orange"), wl.format("yellow")]],
			["row", [wl.format("green"), wl.format("blue"), wl.format("indigo")]],
			["row", [wl.format("violet")]]],
			unlocked() {
				return player.ie.unlocks.photon
			}
		},
		Lumin: {
			content: [["row", [["main-display", 2], ["raw-html", () => `<div style="transform: translateY(-14px); font-size: 14px;">${format(tmp.ie.exponent)}</div>`]]],
			"blank", ["currency-display", {precision: 2, resource() {return "luminal energy<sup>" + format(tmp.ie.luExp) + "</sup>"}, resourceAmt() {return player.ie.lumin}, color: "#fce",
			effectDescription() {return `adding ${format(tmp.ie.luEffect)} levels to first 3 energy upgrades`}}],
			["clickable", 11], ["raw-html", () => `You have done ${formatWhole(player.ie.luminTimes)} lumin resets`], "blank", ["buyables", [10, 11, 12]]]
		},
		Auto: {
			content:[["row", [["main-display", 2], ["raw-html", () => `<div style="transform: translateY(-14px); font-size: 14px;">${format(tmp.ie.exponent)}</div>`]]],
			"blank", "milestones"],
			unlocked() {
				return player.ie.unlocks.auto;
			}
		}
	},
	automate() {
		if (player.ie.autoCharger)
			buyMaxBuyable("ie", 11);
		if (player.ie.autoSelf)
			buyMaxBuyable("ie", 12);
		if (player.ie.autoCompress)
			buyMaxBuyable("ie", 13);
	},
	update(d) {
		t = player.ie.points;
		player.ie.points = player.ie.points.root(tmp.ie.exponent).add(tmp.ie.gainMult.root(tmp.ie.exponent).mul(d)).pow(tmp.ie.exponent);
		player.ie.total = player.ie.total.add(player.ie.points.sub(t));
		player.ie.best = player.ie.best.max(player.ie.points);
		if (player.ie.points.gte("1e500")) player.ie.unlocks.auto = true;

		if (hasMilestone("hi", 0)) {
			player.ie.totalLuExpInput = player.ie.totalLuExpInput.add(tmp.ie.exponent.mul(d));
			tmp.ie.luExp = layers.ie.luExp();
			player.ie.luminTimes = player.ie.luminTimes.add(d);
			player.ie.lumin = player.ie.lumin.root(tmp.ie.luExp).add(tmp.ie.luGain.mul(d)).pow(tmp.ie.luExp);
		}

		if (player.ie.buyables[111].gte(1)) {
			player.ie.photon = player.ie.photon.root(tmp.ie.phExp).add(d).pow(tmp.ie.phExp);
		}
		player.ie.photons.red = player.ie.photons.red.add(tmp.ie.buyables.red.effect.mul(tmp.ie.photons.orange.lastBoost).mul(tmp.ie.phEffect).mul(d));
		player.ie.photons.orange = player.ie.photons.orange.add(tmp.ie.buyables.orange.effect.mul(tmp.ie.photons.yellow.lastBoost).mul(tmp.ie.phEffect).mul(d));
		player.ie.photons.yellow = player.ie.photons.yellow.add(tmp.ie.buyables.yellow.effect.mul(tmp.ie.photons.green.lastBoost).mul(tmp.ie.phEffect).mul(d));
		player.ie.photons.green = player.ie.photons.green.add(tmp.ie.buyables.green.effect.mul(tmp.ie.photons.blue.lastBoost).mul(tmp.ie.phEffect).mul(d));
		player.ie.photons.blue = player.ie.photons.blue.add(tmp.ie.buyables.blue.effect.mul(tmp.ie.photons.indigo.lastBoost).mul(tmp.ie.phEffect).mul(d));
		player.ie.photons.indigo = player.ie.photons.indigo.add(tmp.ie.buyables.indigo.effect.mul(tmp.ie.phEffect).mul(d));
		player.ie.photons.violet = player.ie.photons.violet.add(tmp.ie.buyables.violet.effect.mul(tmp.ie.phEffect).mul(d));
	},
	doReset(l) {
		if (layers[l].row > 2)
			layerDataReset("ie", ["milestones", "upgrades", "unlocks", "autoCharger", "autoSelf", "autoCompress"]);
	},
})