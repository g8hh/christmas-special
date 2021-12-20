function dispExtraLvl(layer, id) {
	return (tmp[layer].buyables[id].extra && tmp[layer].buyables[id].extra.gt(0)) ? `+${format(tmp[layer].buyables[id].extra)}` : "";
}
function extra(layer, id) {
	return tmp[layer].buyables[id].extra || new Decimal(0);
}
function getLuBaseExp(x = player.ie.totalLuExpInput) {
	x = x.div(12);
	x = x.mul(0.2).sqrt();
	if (x.gte(1.5)) x = Decimal.pow(1.2, x.log(1.2).pow(0.5).mul(Decimal.log(1.5, 1.2).pow(0.5)));
	return x;
}
const ieBuyable = {
	buy() {
		spendPoints("ie", this.tmp.cost);
		incBuyable("ie", this.id);
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
	},
	canAfford() {
		return player.ie.lumin.gte(this.tmp.cost);
	},
	color: "#fdf",
	style: {
		width: "150px",
		height: "150px"
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
		unlocks: {
			auto: false
		}
	}},
	color: "#ED8",
	resource: "spectral energy",
	row: 2,
	layerShown() {return hasUpgrade("mc", 41)},
	exponent() {
		let base = new Decimal(0);
		base = base.add(tmp.ie.buyables[11].effect);
		base = base.add(tmp.ie.buyables[12].effect);
		base = base.add(tmp.ie.buyables[101].effect);
		base = base.mul(tmp.ie.buyables[13].effect.add(1));
		return base;
	},
	luExp() {
		let base = getLuBaseExp();
		base = base.add(tmp.ie.buyables[102].effect);
		return base;
	},
	luEffect() {
		let base = player.ie.lumin.add(1).log10();
		return base;
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
				Cost: ${format(this.tmp.cost)} spectral energy`
			},
			buyMax() {
				if (player.ie.buyables[11].lte(0)) {
					spendPoints("ie", 1);
					incBuyable("ie", this.id);
					return;
				}
				let amt = player.ie.points.log10().sub(1).sqrt().add(1).floor();
				spendPoints("ie", this.cost(amt));
				player.ie.buyables[11] = player.ie.buyables[11].max(amt.add(1));
			},
			cost(x = player.ie.buyables[11]) {
				if (x.lte(0)) return new Decimal(1);
				let base = Decimal.pow(10, x.sub(1).pow(2).add(1));
				return base;
			},
			extra() {
				let base = decimalZero;
				base = base.add(tmp.ie.luEffect);
				return base;
			},
			per() {
				let base = decimalOne;
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
				Cost: ${format(this.tmp.cost)} spectral energy`
			},
			buyMax() {
				let amt = player.ie.points.div(1e4).log(50).pow(0.4).floor();
				spendPoints("ie", this.cost(amt));
				player.ie.buyables[12] = player.ie.buyables[12].max(amt.add(1));
			},
			cost(x = player.ie.buyables[12]) {
				let base = Decimal.pow(50, x.pow(2.5)).mul(1e4);
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
				Cost: ${format(this.tmp.cost)} spectral energy`
			},
			buyMax() {
				let amt = player.ie.points.div(1e9).log(100).pow(1/3).floor();
				spendPoints("ie", this.cost(amt));
				player.ie.buyables[13] = player.ie.buyables[13].max(amt.add(1));
			},
			cost(x = player.ie.buyables[13]) {
				let base = Decimal.pow(100, x.pow(3)).mul(1e9);
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
				let amt = player.ie.points.div(5).log(2).pow(0.78125).floor();
				player.ie.lumin = player.ie.lumin.sub(this.cost(amt));
				player.ie.buyables[101] = player.ie.buyables[101].max(amt.add(1));
			},
			cost(x = player.ie.buyables[101]) {
				let base = Decimal.pow(2, x.pow(1.28)).mul(5);
				return base;
			},
			per() {
				let base = player.ie.luminTimes.add(1).log10().pow(0.8);
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
				Cost: ${format(this.tmp.cost)} spectral energy`
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
				let base = player.ie.points.add(1).log10();
				return base;
			},
			effect() {
				return this.tmp.per.mul(this.player.add(extra(this.layer, this.id))).pow(0.2).div(10);
			},
			...ieBuyable
		}
	},
	clickables: {
		11: {
			display() {
				return `Reset to gain 1 base luminal energy, and increase the luminal energy exponent by ${format(getLuBaseExp(player.ie.totalLuExpInput.add(tmp.ie.exponent)).sub(getLuBaseExp()))}.
				<br>Req: Energy exponent of 12`
			},
			canClick() {
				return tmp.ie.exponent.gte(12);
			},
			onClick() {
				player.ie.totalLuExpInput = player.ie.totalLuExpInput.add(tmp.ie.exponent);
				tmp.ie.luExp = layers.ie.luExp();
				player.ie.lumin = player.ie.lumin.root(tmp.ie.luExp).add(1).pow(tmp.ie.luExp);
				player.ie.luminTimes = player.ie.luminTimes.add(1);
				player.ie.points = new Decimal(1);
				for (let i = 1; i <= 3; i++)
					player.ie.buyables[10 + i] = new Decimal(0);
			},
			onHold() {
				clickClickable("ie", 11);
			},
			style: {width: "200px", height: "200px"},
			color: "#fdf"
		}
	},

	tooltipLocked: "NULL",
	branches: ["ad"],
	tabFormat: {
		Main: {
			content: [["row", [["main-display", 2], ["raw-html", () => `<div style="transform: translateY(-14px); font-size: 14px;">${format(tmp.ie.exponent)}</div>`]]],
			"buyables"]
		},
		Lumin: {
			content: [["row", [["main-display", 2], ["raw-html", () => `<div style="transform: translateY(-14px); font-size: 14px;">${format(tmp.ie.exponent)}</div>`]]],
			"blank", ["currency-display", {precision: 2, resource() {return "luminal energy<sup>" + format(tmp.ie.luExp) + "</sup>"}, resourceAmt() {return player.ie.lumin}, color: "#fdf",
			effectDescription() {return `adding ${format(tmp.ie.luEffect)} levels to first 3 energy upgrades`}}],
			["clickable", 11], ["raw-html", () => `You have done ${formatWhole(player.ie.luminTimes)} lumin resets`], "blank", ["buyables", [10, 11, 12]]]
		}
	},
	update(d) {
		t = player.ie.points;
		player.ie.points = player.ie.points.root(tmp.ie.exponent).add(d).pow(tmp.ie.exponent);
		player.ie.total = player.ie.total.add(player.ie.points.sub(t));
		player.ie.best = player.ie.best.max(player.ie.points);
	},
	doReset(l) {
		if (layers[l].row > 2)
			layerDataReset("ie", ["milestones", "upgrades"]);
	},
})