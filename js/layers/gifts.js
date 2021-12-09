addLayer("g", {
	name: "gift",
	symbol: "G",
	position: 0,
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
		total: new Decimal(0),
		best: new Decimal(0),
		waitTime: new Decimal(0),
		giftDisplay: [],
		coal: {
			points: new Decimal(0),
			best: new Decimal(0),
			total: new Decimal(0)
		},
		toys: {
			points: new Decimal(0),
			best: new Decimal(0),
			total: new Decimal(0)
		},
		fire: {
			points: new Decimal(0),
			best: new Decimal(0),
			total: new Decimal(0)
		},
		coalBurning: new Decimal(0),
		goodDeeds: false,
		goodDeedsGifts: new Decimal(0),
		collectToys: false
	}},
	color: "#4BDC13",
	resource: "gifts",
	waitTimeGain() {
		let base = new Decimal(1.25);
		if (hasUpgrade("g", 11)) base = base.mul(2);
		if (hasUpgrade("m", 12)) base = base.mul(2);
		return base;
	},
	giftMulti() {
		let base = decimalOne;
		base = base.mul(tmp.g.buyables[11].effect);
		if (player.g.goodDeeds) base = base.mul(0.75).floor()
		return base; 
	},
	globalRewardMulti() {
		let base = decimalOne;
		base = base.mul(tmp.g.joyEffects.giftMult);
		return base;
	},
	row: 0,
	layerShown(){return true},
	componentStyles: {
		milestone: {
			width: "400px"
		}
	},

	clickables: {
		11: {
			title: "Open a gift!",
			display: `What could be hiding inside?`,
			canClick() {
				return player.g.points.gte(1)
			},
			onClick() {
				player.g.points = player.g.points.sub(1);
				openGift();
				makeParticles({
					gravity: 1,
					angle() {return Math.random()*180 - 90},
					spread: 0,
					rotation: 30
				}, 3)
			},
			onHold() {
				clickClickable("g", 11)
			},
			unlocked() {
				return player.g.total.gt(0);
			}
		},
		31: {
			title: "Stoke the fire",
			display: `Flame.`,
			canClick() {
				return player.g.coal.points.gt(0)
			},
			onClick() {
				player.g.coalBurning = player.g.coalBurning.add(player.g.coal.points.mul(0.5));
				player.g.coal.points = player.g.coal.points.mul(0.5);
			},
			unlocked() {
				return hasUpgrade("g", 12);
			},
			color: "#666"
		},
		51: {
			title: "Sell.",
			display() {
				return `Sell your toy collection for ${format(tmp.g.clickables[51].reward)} money.`
			},
			canClick() {
				return player.g.buyables[31].gte(100);
			},
			onClick() {
				player.m.unlocked = true;
				addPoints("m", tmp.g.clickables[51].reward);
				player.g.buyables[31] = decimalZero;
			},
			reward() {
				if (player.g.buyables[31].lt(100)) return decimalZero;
				return player.g.buyables[31].div(100);
			},
			color: "#cc7"
		}
	},
	buyables: {
		rows: 1,
		cols: 2,
		11: {
			title: "Swindle someone naughtily",
			display() {
				return `With your coal, you convince someone to give you their present as well. Christmas season!<br>
				x${format(tmp.g.buyables[11].effect)} to present gain<br>
				${format(player.g.coal.points)}/${format(tmp.g.buyables[11].cost)} coal`
			},
			buy() {
				player.g.coal.points = player.g.coal.points.sub(tmp.g.buyables[11].cost);
				player.g.buyables[11] = player.g.buyables[11].add(1);
			},
			effect() {
				return player.g.buyables[11].add(1);
			},
			cost() {
				return Decimal.pow(2, player.g.buyables[11].add(2));
			},
			canAfford() {
				return player.g.coal.points.gte(tmp.g.buyables[11].cost);
			},
			color: "#666"
		},
		12: {
			title: "Coal duplicator",
			display() {
				return `What is this, minecraft dot exe?<br>
				x${format(tmp.g.buyables[12].effect)} to coal gain<br>
				${format(player.g.coal.points)}/${format(tmp.g.buyables[12].cost)} coal`
			},
			buy() {
				player.g.coal.points = player.g.coal.points.sub(tmp.g.buyables[12].cost);
				player.g.buyables[12] = player.g.buyables[12].add(1);
			},
			effect() {
				return player.g.buyables[12].add(1).pow(2);
			},
			cost() {
				return Decimal.pow(3, player.g.buyables[12].add(3));
			},
			canAfford() {
				return player.g.coal.points.gte(tmp.g.buyables[12].cost);
			},
			color: "#666"
		},
		31: {
			title: "Toy collection",
			display() {
				return `It grows<br>
				Size: ${formatWhole(player.g.buyables[31])}
				+${format(tmp.g.buyables[31].effect)} joy<br>
				${format(player.g.toys.points)}/${format(tmp.g.buyables[31].cost)} toys`
			},
			buy() {
				player.g.toys.points = player.g.toys.points.sub(tmp.g.buyables[31].cost);
				player.g.buyables[31] = player.g.buyables[31].add(1);
			},
			buyMax() {
				const gain = player.g.toys.points.div(tmp.g.buyables[31].cost).floor();
				player.g.toys.points = player.g.toys.points.sub(gain.mul(tmp.g.buyables[31].cost));
				player.g.buyables[31] = player.g.buyables[31].add(gain);
			},
			effect() {
				return player.g.buyables[31].sqrt();
			},
			cost() {
				return player.g.buyables[31].sub(40).mul(0.5).max(30);
			},
			canAfford() {
				return player.g.toys.points.gte(tmp.g.buyables[31].cost);
			},
			color: "#cc7"
		}
	},
	upgrades: {
		11: {
			title: "The Easter^2 Tree",
			description: "After all, what's wrong with collecting gifts on Easter too?",
			cost: 30,
			currencyLocation() {
				return player.g.coal
			},
			currencyInternalName: "points",
			currencyDisplayName: "coal",
			color: "#666"
		},
		12: {
			title: "The Flame Tree",
			description: "What's more relaxing than a nice bonfire?",
			cost: 1.6e5,
			currencyLocation() {
				return player.g.coal
			},
			currencyInternalName: "points",
			currencyDisplayName: "coal",
			color: "#666"
		},
		13: {
			title: "The Oxygen Tree",
			description: "Buy a pair of bellows to make the bonfire burn twice as good.",
			cost: 123456,
			currencyLocation() {
				return player.g.fire
			},
			currencyInternalName: "points",
			currencyDisplayName: "bonfire",
			color: "#f40",
			unlocked() {
				return hasUpgrade("g", 12)
			}
		},
		41: {
			title: "Good Deeds",
			description: "Give away a 4th of your presents each time for a small chance of getting some toys.",
			cost: 80
		},
		71: {
			title: "Generous Donation",
			description: "Might as well go the whole way and bump your good deeds up even more.",
			cost: 12,
			currencyLocation() {
				return player.g.toys
			},
			currencyInternalName: "points",
			currencyDisplayName: "toys",
			color: "#cc7"
		}
	},
	giftEffects: ["goodDeeds"],
	milestones: {
		0: {
			requirementDescription: "Good Deeds Reward",
			toggles: [["g", "goodDeeds"]],
			done() {
				return hasUpgrade("g", 41)
			},
			unlocked() {
				return hasUpgrade("g", 41)
			}
		},
		200: {
			requirementDescription: "50 toy collections",
			effectDescription: "Automatically collect toys.",
			toggles: [["g", "collectToys"]],
			done() {
				return player.g.buyables[31].gte(50)
			}
		}
	},
	bars: {
		giftProgress: {
			direction: RIGHT,
			width: 300,
			height: 30,
			progress() {
				return tmp.g.waitTimeGain.gte(60) ? 1 : player.g.waitTime.div(10)
			},
			display() {
				if (tmp.g.waitTimeGain.gte(60)) return `${tmp.g.giftMulti.mul(tmp.g.waitTimeGain).div(10)} gifts/s`
				return `${format(player.g.waitTime.neg().add(10).div(tmp.g.waitTimeGain), 3)}s til next gift`
			},
			fillStyle: {
				backgroundColor: "#BF98"
			}
		}
	},

	fireEffect() {
		return player.g.fire.points.add(1).log10();
	},
	fireMult() {
		let base = decimalOne;
		if (hasUpgrade("g", 13)) base = base.mul(2);
		return base;
	},

	update(d) {
		player.g.waitTime = player.g.waitTime.add(tmp.g.waitTimeGain.mul(d));
		addPoints("g", player.g.waitTime.div(10).floor().mul(tmp.g.giftMulti));
		for (i of tmp.g.giftEffects) {
			if (player.g[i])
				player.g[i + "Gifts"] = player.g[i + "Gifts"].add(player.g.waitTime.div(10).floor().mul(tmp.g.giftMulti));
		}
		player.g.waitTime = player.g.waitTime.sub(player.g.waitTime.div(10).floor().mul(10));

		player.g.fire.points = player.g.fire.points.mul(Decimal.pow(0.98, d))
		addGiftRewards("fire", player.g.coalBurning.sub(player.g.coalBurning.mul(Decimal.pow(0.98, d))).mul(tmp.g.fireMult));
		player.g.coalBurning = player.g.coalBurning.mul(Decimal.pow(0.98, d));
	},
	automate() {
		if (player.g.collectToys && hasMilestone("g", 200))
			buyMaxBuyable("g", 31);
	},
	tabFormat: {
		Main: {
			content: ["main-display", "resource-display", ["clickable", 11], "blank", ["bar", "giftProgress"], "blank",
			"gift-display", "blank", ["milestones", [0]], ["upgrades", [4]]]
		},
		Coal: {
			content: ["main-display", "resource-display", ["clickable", 11], "blank", ["bar", "giftProgress"], "blank",
			["currency-display", {
				resource: "coal",
				resourceAmt() {return player.g.coal.points},
				color: "#666",
				precision: 2
			}], "blank", ["buyables", [1]], "blank", ["upgrades", [1]],
			["currency-display", {
				resource: "bonfire",
				resourceAmt() {return player.g.fire.points},
				color: "#f40",
				precision: 2,
				effectDescription() {
					return `giving +${format(tmp.g.fireEffect)} to joy, but you are losing 2% of it every second`
				}
			}, () => hasUpgrade("g", 12)], ["clickable", 31], "blank", ["raw-html", () => {
				return `You have ${format(player.g.coalBurning)} coal in the burning pile, but 2% of it is being burnt every second.<br><br><br>`
			}, () => hasUpgrade("g", 12)]],
			unlocked() {
				return player.g.coal.total.gt(0)
			}
		},
		Toys: {
			content: ["main-display", "resource-display", ["clickable", 11], "blank", ["bar", "giftProgress"], "blank",
			["currency-display", {
				resource: "toys",
				resourceAmt() {return player.g.toys.points},
				color: "#cc7",
				precision: 2
			}], ["milestones", [200]], "blank", ["buyables", [3]], "blank", ["clickable", 51], "blank", ["upgrades", [7]]],
			unlocked() {
				return player.g.toys.total.gt(0)
			}
		}
	},
	giftTypes: {
		coal: {
			colour: "#666",
			currencyName: "coal",
			displayTitle: "Naughty",
			chance() {
				let base = decimalOne;
				if (player.g.goodDeedsGifts.gte(1)) base = base.sub(0.1);
				return base;
			},
			unlocked: true,
			gain() {
				let base = new Decimal(3);
				base = base.mul(tmp.g.buyables[12].effect)
				return base;
			}
		},
		toys: {
			colour: "#cc7",
			currencyName: "toys",
			displayTitle: "Less Naughty",
			chance() {
				let base = decimalZero;
				if (player.g.goodDeedsGifts.gte(1)) base = base.add(0.1);
				if (hasUpgrade("g", 71)) base = base.mul(2);
				return base;
			},
			unlocked() {return hasUpgrade("g", 41)},
			gain() {
				let base = new Decimal(3);
				return base;
			}
		}
	},
	addedChance() {
		let base = decimalZero;
		for (let i in tmp.g.giftTypes) {
			if (tmp.g.giftTypes[i].unlocked) {
				base = base.add(tmp.g.giftTypes[i].chance);
			}
		}
		return base;
	},
	joy() {
		let base = decimalZero;
		base = base.add(tmp.g.buyables[31].effect);
		base = base.add(tmp.g.fireEffect);
		if (hasUpgrade("m", 11)) base = base.add(4);
		return base;
	},
	joyEffects: {
		giftMult() {
			return tmp.g.joy.gte(1) ? tmp.g.joy.add(1).pow(1.2) : decimalOne
		},
		giftAmount() {
			return tmp.g.joy.gte(18.88) ? tmp.g.joy.sub(17.38).div(1.5).pow(0.3).floor().min(6).toNumber() : 0
		}
	},
	doReset() {}
})

function addGiftRewards(name, amt) {
	player.g[name].points = player.g[name].points.add(amt);
	player.g[name].best = player.g[name].best.max(player.g[name].points);
	player.g[name].total = player.g[name].total.add(amt);
}
function rewardCount() {
	let base = 1;
	base += tmp.g.joyEffects.giftAmount;
	return base;
}
function openGift() {
	const luck = Math.random()*0.5 + 0.5;
	player.g.giftDisplay.splice(0, player.g.giftDisplay.length);
	let effects = [];
	for (i of tmp.g.giftEffects) {
		if (player.g[i + "Gifts"].gte(1)) {
			effects.push(i.replace(/[a-z]/, _ => _.toUpperCase()).split(/(?=[A-Z])/).join(" "));
			player.g[i + "Gifts"] = player.g[i + "Gifts"].sub(1);
		}
	}
	player.g.giftDisplay.push(effects);
	for (let i = 0; i < rewardCount(); i++) {
		const luckinessReward = Math.random();
		let luckAccumulation = decimalZero;
		let reward;
		for (let i in tmp.g.giftTypes) {
			if (tmp.g.giftTypes[i].unlocked) {
				luckAccumulation = luckAccumulation.add(tmp.g.giftTypes[i].chance.div(tmp.g.addedChance));
				reward = i;
				if (luckAccumulation.gte(luckinessReward))
					break;
			}
		}
		let amt = tmp.g.giftTypes[reward].gain.mul(luck).mul(tmp.g.globalRewardMulti);
		player.g.giftDisplay.push({amt, id: reward});
		addGiftRewards(reward, amt);
	}
}

const giftRewardsComponent = {
		template: `<div v-if="player.g.giftDisplay.length">
		<div style="border: 2px solid; width: 300px;">
			<br><h2>Joy: {{format(tmp.g.joy)}}</h2><br>
			{{tmp.g.joy.lt(1) ? "Damn, that's pretty sad" : ""}}
			<span v-if="tmp.g.joy.gte(1)">
				That's less sad. Have more rewards!<br>
				<span style="color: #f22">
					x{{format(tmp.g.joyEffects.giftMult)}} to gift rewards<br><br>
				</span>
			</span>
			<span v-if="tmp.g.joy.gte(18.88)">
				That's even less sad. Have even more rewards!<br>
				<span style="color: #f22">
					+{{formatWhole(tmp.g.joyEffects.giftAmount)}} rewards when opening gifts<br><br>
				</span>
			</span>
			<br v-if="tmp.g.joy.lt(1)">
			<br v-if="tmp.g.joy.lt(1)">
		</div><br><br>
		<div style="border: 2px solid; width: 90%">
			<br><h2>Last gift rewards:</h2><br><br>
			<span v-if="player.g.giftDisplay[0].length">Active effects: <span style="color: #fd9">{{player.g.giftDisplay[0].join(", ")}}</span><br></span>
			<button v-for="gift in player.g.giftDisplay.slice(1)"
			class="upg" :style="{backgroundColor: tmp.g.giftTypes[gift.id].colour, 'vertical-align': 'top'}">
				<h2 v-html="tmp.g.giftTypes[gift.id].displayTitle"></h2><br>
				<span>+{{format(gift.amt)}} {{tmp.g.giftTypes[gift.id].currencyName}}.</span>
			</button><br><br>
		</div>
	</div>`
}
