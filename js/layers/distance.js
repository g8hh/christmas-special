addLayer("di", {
	name: "distance",
	symbol: "DI",
	position: 0,
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
		time: new Decimal(0),
		velocity: new Decimal(1),
		drainedPrestige: new Decimal(0),
		auto: {
			level: {unl: false, on: false},
			tier: {unl: false, on: false}
		},
		scraps: new Decimal(0),
		mech1Time: new Decimal(0),
		mech2Time: new Decimal(0),
		mech4Time: new Decimal(0),
		lastMech4Activation: Date.now()
	}},
	color: "#81C",
	resource: "distance",
	row: 2,
	hotkeys: [{
		key: "l",
		description: "Press L to buy a level.",
		onPress() {
			buyBuyable("di", 11)
		}
	}, {
		key: "t",
		description: "Press T to buy a tier.",
		onPress() {
			buyBuyable("di", 12)
		}
	}],
	layerShown() {return hasUpgrade("mc", 41)},
	componentStyles: {
		milestone: {
			width: "400px"
		}
	},

	upgrades: {
		autoLvl: {
			title: "Level bot",
			cost: 2000,
			currencyLayer: "di",
			currencyInternalName: "scraps",
			currencyDisplayName: "scraps",
			color: "#bbb",
			auto: true,
			unlocked() {
				return !hasUpgrade("di", "autoLvl");
			}
		},
		autoTier: {
			title: "Tier bot",
			cost: 10000,
			currencyLayer: "di",
			currencyInternalName: "scraps",
			currencyDisplayName: "scraps",
			color: "#bbb",
			auto: true,
			unlocked() {
				return !hasUpgrade("di", "autoTier");
			}
		},
		mech: {
			title: "Mechanisation.",
			cost: 1e9,
			currencyLayer: "di",
			currencyInternalName: "scraps",
			currencyDisplayName: "scraps",
			color: "#bbb",
			auto: true,
			unlocked() {
				return !hasUpgrade("di", "mech");
			},
			style: {width: "240px", height: "240px", margin: "20px auto", "font-size": "15px"}
		}
	},
	buyables: {
		rows: 1,
		cols: 2,
		11: {
			title() { return "Level " + formatWhole(player.di.buyables[11])},
			display() {
				return `${player.di.buyables[11].gte(1) ? `[0x${formatWhole(player.di.buyables[11].add(5).div(6).floor())}]: x${format(tmp.di.buyables[11].effect[0])} velocity` : ""}
				${player.di.buyables[11].gte(2) ? `[1x${formatWhole(player.di.buyables[11].add(4).div(6).floor())}]: +${format(tmp.di.buyables[11].effect[1])} acceleration` : ""}
				${player.di.buyables[11].gte(3) ? `[2x${formatWhole(player.di.buyables[11].add(3).div(6).floor())}]: x${format(tmp.di.buyables[11].effect[2])} velocity based on levels` : ""}
				${player.di.buyables[11].gte(4) ? `[3x${formatWhole(player.di.buyables[11].add(2).div(6).floor())}]: x${format(tmp.di.buyables[11].effect[3])} acceleration and maximum velocity` : ""}
				${player.di.buyables[11].gte(5) ? `[4x${formatWhole(player.di.buyables[11].add(1).div(6).floor())}]: x${format(tmp.di.buyables[11].effect[4])} velocity based on tiers` : ""}
				${player.di.buyables[11].gte(6) ? `[5x${formatWhole(player.di.buyables[11].div(6).floor())}]: x${format(tmp.di.buyables[11].effect[5])} acceleration and maximum velocity based on levels and tiers` : ""}
				<br>Req: ${format(tmp.di.buyables[11].cost)} distance`
			},
			buy() {
				player.di.buyables[11] = player.di.buyables[11].add(1);
				if (hasMilestone("di", 103)) return;
				player.di.points = decimalZero;
				player.di.velocity = decimalOne;
			},
			scalingMult() {
				let base = decimalOne;
				if (hasTier(1)) base = base.mul(0.75);
				if (hasTier(3)) base = base.mul(tierEffect(3));
				if (hasUpgrade("ad", "e23")) base = base.mul(0.4);
				return base;
			},
			cost() {
				let base = Decimal.pow(2, player.di.buyables[11].mul(tmp.di.buyables[11].scalingMult.min(40)).pow(2)).mul(10);
				if (player.di.buyables[11].gte(40)) base = base.mul(Decimal.pow(4, player.di.buyables[11].sub(40).mul(tmp.di.buyables[11].scalingMult).pow(hasUpgrade("ad", "e21") ? 4 : 6)));
				return base;
			},
			canAfford() {
				return player.di.points.gte(tmp.di.buyables[11].cost);
			},
			effect() {
				return [player.di.buyables[11].add(5).div(6).floor().add(1),
				player.di.buyables[11].add(4).div(6).floor().mul(0.3),
				Decimal.pow(player.di.buyables[11].add(3).div(6).floor().mul(0.1).add(1), player.di.buyables[11]),
				Decimal.pow(2, player.di.buyables[11].add(2).div(6).floor()),
				Decimal.pow(player.di.buyables[11].add(1).div(6).floor().mul(2).add(1), player.di.buyables[12]),
				Decimal.pow(player.di.buyables[11].div(6).floor().mul(0.9).add(1), player.di.buyables[11].add(player.di.buyables[12]))]
			}
		},
		12: {
			title() { return "Tier " + formatWhole(player.di.buyables[12])},
			display() {
				return `${tmp.di.buyables[12].effects[player.di.buyables[12].add(1).toNumber()] && (tmp.di.buyables[12].effects[player.di.buyables[12].add(1).toNumber()].unlocked ?? true) ? tmp.di.buyables[12].effects[player.di.buyables[12].add(1).toNumber()].description : " "}
				<br>Req: ${formatWhole(tmp.di.buyables[12].cost)} levels`
			},
			buy() {
				player.di.buyables[12] = player.di.buyables[12].add(1);
				if (hasMilestone("di", 103)) return;
				player.di.points = decimalZero;
				player.di.velocity = decimalOne;
				player.di.buyables[11] = decimalZero;
			},
			cost() {
				let base = player.di.buyables[12].pow(2).add(3).floor();
				return base;
			},
			canAfford() {
				return player.di.buyables[11].add(1e-10).gte(tmp.di.buyables[12].cost);
			},
			effects: {
				1: {
					description: "Make level scaling 25% slower."
				},
				2: {
					description: "Double acceleration and quintuple maximum velocity if your level is at least 4."
				},
				3: {
					description: "Make level scaling 10.5% slower for each tier, up to 8 tiers.",
					effect() {
						return Decimal.pow(0.895, player.di.buyables[12].min(8));
					}
				},
				4: {
					description: "Triple velocity."
				},
				6: {
					description: "log10(distance+10) boosts acceleration and maximum velocity.",
					effect() {
						return player.di.points.add(10).log10();
					}
				},
				9: {
					description: "Dimension multiplier per condenser<br>2 -> 10"
				}
			}
		},
		rockets: {
			title: "Rockets",
			display() {
				return `Reset previous process for <b style="color: #333">${formatWhole(this.tmp.gain)}</b> rockets.<br>
				Req: 1e20 distance`
			},
			buy() {
				incBuyable("di", "rockets", this.tmp.gain);
				player.di.points = decimalZero;
				player.di.velocity = decimalOne;
				player.di.buyables[11] = decimalZero;
				player.di.buyables[12] = decimalZero;
			},
			gainMult() {
				let base = decimalOne;
				if (hasUpgrade("pt", 31)) base = base.mul(tmp.pt.upgrades[31].effect);
				base = base.mul(tmp.pt.ind.ascensionBoostRockets);
				return base;
			},
			gain() {
				return player.di.points.div(1e20).pow(0.05).mul(this.tmp.gainMult).floor();
			},
			canAfford() {
				return player.di.points.gte(1e20);
			},
			effect() {
				let r = this.player;
				let baseEffect = r.gte(1.718) ? r.add(1).ln() : r.add(1).ln().pow(0.7);
				baseEffect = baseEffect.mul(tmp.di.buyables.engines.effect.add(1));
				baseEffect = softcap(baseEffect, new Decimal(60), 0.3)
				return baseEffect;
			},
			unlocked() {
				return hasMilestone("di", 0)
			},
			color: "#bbb"
		},
		engines: {
			title: "Rocket Engines",
			display() {
				return `Reset previous process for <b style="color: #333">1</b> rocket engine.
				Req: ${formatWhole(this.tmp.cost)} rockets`
			},
			buy() {
				incBuyable("di", "engines");
				player.di.points = decimalZero;
				player.di.velocity = decimalOne;
				player.di.buyables[11] = decimalZero;
				player.di.buyables[12] = decimalZero;
				player.di.buyables.rockets = decimalZero;
			},
			cost() {
				let base = Decimal.pow(5, this.player.pow(1.5)).mul(8000);
				return base;
			},
			canAfford() {
				return player.di.buyables.rockets.gte(this.tmp.cost);
			},
			effect() {
				let r = this.player;
				let baseEffect = r.mul(player.di.drainedPrestige.add(1).log(9)).pow(0.3).mul(0.2);
				return baseEffect;
			},
			unlocked() {
				return player.pt.unlocked
			},
			color: "#bbb"
		},
		layerUnlock: {
			title: "Spacetime Travel",
			display() {
				return `Rocket off to the next layer!<br>
				Req: ${formatWhole(this.tmp.cost)} rockets`
			},
			buy() {
				switch(player.di.buyables.layerUnlock.toString()) {
					case "0":
					player.pt.unlocked = true;
					addPoints("pt", 1);
					break;
					case "1":
					player.ad.unlocked = true;
					case "2":
					break;
				}
				incBuyable("di", "layerUnlock");
			},
			cost() {
				switch(player.di.buyables.layerUnlock.toString()) {
					case "0":
					return new Decimal(2000);
					case "1":
					return new Decimal(1e20)
					case "2":
					return new Decimal(Infinity);
				}
			},
			canAfford() {
				return player.di.buyables.rockets.gte(this.tmp.cost);
			},
			unlocked() {
				return hasMilestone("di", 0);
			}
		},
		mech1: {
			title: "Spurt Booster",
			display() {
				return `Once every 2 game-time minutes, gain ${format(this.tmp.effect)} real-time minutes of distance.<br>
				Cost: ${formatWhole(this.tmp.cost)} scraps`
			},
			buy() {
				player.di.scraps = player.di.scraps.sub(this.tmp.cost);
				incBuyable("di", "mech1");
			},
			cost() {
				let base = Decimal.pow(2, this.player).mul(3e8);
				return base;
			},
			canAfford() {
				return player.di.scraps.gte(this.tmp.cost);
			},
			effect() {
				let base = new Decimal(0.4);
				return base.mul(this.player);
			},
			unlocked() {
				return hasUpgrade("di", "mech");
			},
			color: "#bbb"
		},
		mech2: {
			title: "Rocket Builder",
			display() {
				return `Once every 4 game-time minutes, gain ${format(this.tmp.effect)}% of your rocket gain.<br>
				Cost: ${formatWhole(this.tmp.cost)} scraps`
			},
			buy() {
				player.di.scraps = player.di.scraps.sub(this.tmp.cost);
				incBuyable("di", "mech2");
			},
			cost() {
				let base = Decimal.pow(2.1, this.player).mul(1.2e9);
				return base;
			},
			canAfford() {
				return player.di.scraps.gte(this.tmp.cost);
			},
			effect() {
				let base = new Decimal(10);
				return base.mul(this.player);
			},
			unlocked() {
				return hasUpgrade("di", "mech");
			},
			color: "#bbb"
		},
		mech3: {
			title: "Scrap Collector",
			display() {
				return `Multiply scrap gain by x${format(this.tmp.effect)}.<br>
				Cost: ${formatWhole(this.tmp.cost)} scraps`
			},
			buy() {
				player.di.scraps = player.di.scraps.sub(this.tmp.cost);
				incBuyable("di", "mech3");
			},
			cost() {
				let base = Decimal.pow(3, this.player).mul(1e8);
				return base;
			},
			canAfford() {
				return player.di.scraps.gte(this.tmp.cost);
			},
			effect() {
				return Decimal.pow(2, this.player);
			},
			unlocked() {
				return hasUpgrade("di", "mech");
			},
			color: "#bbb"
		},
		mech4: {
			title: "Broken Generator",
			display() {
				return `Gain a e^sinusoidal dimension multiplier.<br>
				x${format(this.tmp.effect)}.<br>
				Cost: ${formatWhole(this.tmp.cost)} scraps`
			},
			buy() {
				player.di.scraps = player.di.scraps.sub(this.tmp.cost);
				incBuyable("di", "mech4");
			},
			cost() {
				let base = Decimal.pow(10, this.player.pow(1.3)).mul(1e58);
				return base;
			},
			canAfford() {
				return player.di.scraps.gte(this.tmp.cost);
			},
			effect() {
				return Decimal.pow(10, this.player.mul(Math.min(0.45, Math.sin(player.time/500)*0.55) + 0.55));
			},
			unlocked() {
				return hasUpgrade("di", "mech") && hasUpgrade("ad", "e22");
			},
			color: "#bbb"
		},
	},
	milestones: {
		0: {
			requirementDescription: "1.00e20 distance",
			effectDescription: "Unlock rockets.",
			done() {
				return player.di.points.gte(1e20);
			}
		},
		101: {
			requirementDescription: "100 stored prestige points",
			effectDescription: "Increase prestige point gain by x10.",
			done() {
				return player.di.drainedPrestige.gte(100);
			}
		},
		102: {
			requirementDescription: "25000 stored prestige points",
			effectDescription: "Unlock automation.",
			done() {
				return player.di.drainedPrestige.gte(25000);
			}
		},
		103: {
			requirementDescription: "1.00e30 stored prestige points",
			effectDescription: "Ranks and Tiers no longer reset anything.",
			done() {
				return player.di.drainedPrestige.gte(1e30);
			}
		}
	},
	clickables: {
		rows: 1,
		cols: 1,
		11: {
			title: "Drain Prestige Points",
			canClick() {
				return player.pt.points.gte(10);
			},
			onClick() {
				player.di.drainedPrestige = player.di.drainedPrestige.add(player.pt.points.mul(0.01));
				player.pt.points = player.pt.points.mul(0.99);
			},
			onHold() {
				clickClickable("di", 11);
			},
			style: {height: "40px", margin: "10px"}
		},
		autoLvl: {
			display() {
				return `Level bot: <b style="color: #444">${player.di.auto.level.on ? "ON" : "OFF"}</b>`
			},
			canClick: true,
			onClick() {
				player.di.auto.level.on = !player.di.auto.level.on;
			},
			unlocked() {
				return hasUpgrade("di", "autoLvl");
			},
			color: "#bbb",
			style: {height: "60px", width: "150px"}
		},
		autoTier: {
			display() {
				return `Tier bot: <b style="color: #444">${player.di.auto.tier.on ? "ON" : "OFF"}</b>`;
			},
			canClick: true,
			onClick() {
				player.di.auto.tier.on = !player.di.auto.tier.on;
			},
			unlocked() {
				return hasUpgrade("di", "autoTier");
			},
			color: "#bbb",
			style: {height: "60px", width: "150px"}
		},
	},
	bars: {
		prestigeDrain: {
			direction: RIGHT,
			width: 300,
			height: 30,
			progress() {
				if (!hasMilestone("di", 101)) return player.di.drainedPrestige / 100;
				else if (!hasMilestone("di", 102)) return player.di.drainedPrestige / 25000;
				else if (!hasMilestone("di", 103)) return player.di.drainedPrestige.log10() / 30;
				else return 0;
			},
			display() {
				return `${formatWhole(player.di.drainedPrestige)} stored prestige points`
			},
			fillStyle: {
				"background-color": "#3AB8"
			}
		}
	},
	velocity() {
		let base = player.di.velocity;
		return base;
	},
	maxVelocity() {
		let base = new Decimal(10);
		base = base.mul(tmp.di.buyables[11].effect[3]);
		if (hasTier(2) && player.di.buyables[11].gte(4)) base = base.mul(5);
		base = base.mul(tmp.di.buyables[11].effect[5]);
		if (hasTier(6)) base = base.mul(tierEffect(6));
		base = base.mul(tmp.pt.buyables[23].effect);
		base = base.mul(base.add(Math.E).ln().pow(tmp.di.buyables.rockets.effect));
		return base;
	},
	velocityMult() {
		let base = decimalOne;
		base = base.mul(tmp.di.buyables[11].effect[0]);
		base = base.mul(tmp.di.buyables[11].effect[2]);
		base = base.mul(tmp.di.buyables[11].effect[4]);
		if (hasTier(4)) base = base.mul(3);
		base = base.mul(tmp.di.buyables.rockets.effect.add(1));
		base = base.mul(tmp.di.buyables.engines.effect.add(1));
		if (hasUpgrade("pt", 14)) base = base.mul(tmp.pt.upgrades[14].effect);
		return base;
	},
	acceleration() {
		let base = new Decimal(0);
		base = base.add(tmp.di.buyables[11].effect[1]);
		if (hasTier(2) && player.di.buyables[11].gte(4)) base = base.mul(2);
		base = base.mul(tmp.di.buyables[11].effect[3]);
		base = base.mul(tmp.di.buyables[11].effect[5]);
		if (hasTier(6)) base = base.mul(tierEffect(6));
		base = base.mul(tmp.pt.buyables[23].effect);
		base = base.mul(base.add(Math.E).ln().pow(tmp.di.buyables.rockets.effect));
		return base;
	},
	scrapGain() {
		let base = player.di.points.add(1).log10();
		if (hasUpgrade("pt", 32)) base = base.mul(tmp.pt.upgrades[32].effect[0]);
		base = base.mul(tmp.di.buyables.mech3.effect);
		return base;
	},

	tabFormat: {
		Ranking: {
			content: [["main-display", 2], ["milestones", [0]], 
			["raw-html", () => `Velocity: ${format(tmp.di.velocity)}${tmp.di.velocityMult.eq(1) ? "" : `x${format(tmp.di.velocityMult)}`}m/s
			(Maximum Velocity: ${format(tmp.di.maxVelocity)}m/s)
			<br>Acceleration: ${format(tmp.di.acceleration)}m/s^2`],
			"buyables"],
			shouldNotify() {
				return (tmp.di.buyables[11].canBuy && !player.di.auto.level.on) || (tmp.di.buyables[12].canBuy && !player.di.auto.tier.on)
			}
		},
		Rockets: {
			content: [["main-display", 2], ["currency-display", {
				resource: "rockets",
				resourceAmt() {return player.di.buyables.rockets},
				color: "#bbb",
				effectDescription() {
					return `making acceleration and maximum velocity boost themselves by ln(x+2.718)^${format(tmp.di.buyables.rockets.effect)}, and multiplying velocity by x${format(tmp.di.buyables.rockets.effect.add(1))}`
				}
			}], ["row", [["buyable", "rockets"], ["buyable", "engines"]]], "blank", ["currency-display", {
				resource: "rocket engines",
				resourceAmt() {return player.di.buyables.engines},
				color: "#bbb",
				effectDescription() {
					return `increasing rocket effect and velocity by ${format(tmp.di.buyables.engines.effect.mul(100))}%`
				}
			}, () => player.di.buyables.engines.gte(1)], ["milestones", [101, 102, 103], () => player.di.buyables.engines.gte(1)],
			["bar", "prestigeDrain", () => player.di.buyables.engines.gte(1)],
			["clickable", 11, () => player.di.buyables.engines.gte(1)],
			"blank", ["buyable", "layerUnlock"]],
			unlocked() {
				return hasMilestone("di", 0)
			},
			shouldNotify() {
				return tmp.di.buyables.layerUnlock.canBuy
			}
		},
		Auto: {
			content: [["main-display", 2], ["currency-display", {
				resource() {return "scraps (+" + format(tmp.di.scrapGain) + "/s)"},
				resourceAmt() {return player.di.scraps},
				color: "#bbb"
			}],
			["row", [["column", [
			["upgrade", "autoLvl"], ["clickable", "autoLvl"]], true, {border: "2px solid", width: "200px", height: "125px"}], ["column", [
			["upgrade", "autoTier"], ["clickable", "autoTier"]], true, {border: "2px solid", width: "200px", height: "125px"}]]],
			"blank", ["upgrade", "mech"], ["raw-html", "<h2>Mechanisations</h2>", () => hasUpgrade("di", "mech")],
			["row", [["buyable", "mech1"], ["buyable", "mech2"]]], ["row", [["buyable", "mech3"], ["buyable", "mech4"]]]],
			unlocked() {
				return hasMilestone("di", 102);
			},
			shouldNotify() {
				for (let i in tmp.di.upgrades) {
					if (!tmp.di.upgrades[i].auto || hasUpgrade("di", i)) continue;
					if (canAffordUpgrade("di", i)) return true;
				}
				return false;
			}
		}
	},
	automate() {
		if (player.di.auto.level.on) buyBuyable("di", 11);
		if (player.di.auto.tier.on) buyBuyable("di", 12);
	},
	update(d) {
		if (!hasUpgrade("mc", 41)) return;
		d = tmp.pt.timeSpeed.mul(d);
		player.di.time = player.di.time.add(d);
		addPoints("di", tmp.di.velocity.mul(tmp.di.velocityMult.mul(d)));
		player.di.velocity = player.di.velocity.add(tmp.di.acceleration.mul(d)).min(tmp.di.maxVelocity);
		if (hasMilestone("di", 102))
			player.di.scraps = player.di.scraps.add(tmp.di.scrapGain.mul(d));
		if (player.di.buyables.mech1.gte(1)) {
			player.di.mech1Time = player.di.mech1Time.add(d.div(120));
			if (player.di.mech1Time.gte(1)) {
				addPoints("di", tmp.di.velocity.mul(tmp.di.velocityMult).mul(player.di.mech1Time.floor().mul(tmp.di.buyables.mech1.effect).mul(tmp.pt.timeSpeed).mul(60)));
				player.di.mech1Time = player.di.mech1Time.sub(player.di.mech1Time.floor());
			}
		}
		if (player.di.buyables.mech2.gte(1)) {
			player.di.mech2Time = player.di.mech2Time.add(d.div(240));
			if (player.di.mech2Time.gte(1)) {
				incBuyable("di", "rockets", player.di.mech2Time.floor().mul(tmp.di.buyables.mech2.effect).mul(0.01).mul(tmp.di.buyables.rockets.gain));
				player.di.mech2Time = player.di.mech2Time.sub(player.di.mech2Time.floor());
			}
		}
	},
	doReset(l) {
		let lastBuyableLayerunlock = player.di.buyables.layerUnlock;
		if (layers[l].row > 2)
			layerDataReset("di", ["milestones", "upgrades", "auto"]);
		player.di.buyables.layerUnlock = lastBuyableLayerunlock;
	}
})
function hasTier(r) {
	return player.di.buyables[12].gte(r) && (tmp.di.buyables[12].effects[r].unlocked ?? true)
}
function tierEffect(r) {
	return tmp.di.buyables[12].effects[r].effect
}
