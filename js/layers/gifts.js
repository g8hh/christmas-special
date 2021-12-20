const gameClickable = {
	display() {
		return `${formatSmall(Math.min(tmp.g.clickables[this.id].chance*100, 100))}% chance of winning<br>
		${player.g.games.gameState[this.id] ? "" : `Attempt: ${format(tmp.g.clickables[this.id].cost)} games<br>`
		}${player.g.games.gameLastSuccessful[this.id] == 1 ? "<span style='color: #070'>You won!</span>" : (player.g.games.gameLastSuccessful[this.id] == 0 ? "<span style='color: #700'>You lost! Better luck next time.</span>" :"")}`
	},
	cost() {
		let base = decimalOne;
		base = base.mul(player.g.ascensions.total.add(1).pow(2)).mul(Decimal.pow(2, player.g.ascensions.total.pow(1.2)));
		if (player.g.ascensions.total.eq(2)) base = new Decimal(30);
		if (hasUpgrade("g", "204"))
			for (let i of this.skills)
				base = base.div(tmp.g.buyables[i].effect.pow(0.6));
		return base;
	},
	canClick() {
		return player.g.games.gameState[this.id] || player.g.games.points.gte(tmp.g.clickables[this.id].cost);
	},
	onClick() {
		if (player.g.games.gameState[this.id]) return;
		if (!hasMilestone("g", 404)) player.g.games.points = player.g.games.points.sub(tmp.g.clickables[this.id].cost);
		if (hasMilestone("g", 404)) {
			if (Math.random() >= Math.pow(1 - tmp.g.clickables[this.id].chance, 10000)) {
				player.g.games.gameState[this.id] = true;
				player.g.games.gameLastSuccessful[this.id] = 1;
			} else {
				player.g.games.gameLastSuccessful[this.id] = 0;
			}
			return;
		}
		if (Math.random() <= tmp.g.clickables[this.id].chance) {
			player.g.games.gameState[this.id] = true;
			player.g.games.gameLastSuccessful[this.id] = 1;
		} else {
			player.g.games.gameLastSuccessful[this.id] = 0;
		}
		if (hasMilestone("g", 403)) {
			for (let i = 0; i < 999 && !player.g.games.gameState[this.id] && player.g.games.points.gte(tmp.g.clickables[this.id].cost); i++) {
				player.g.games.points = player.g.games.points.sub(tmp.g.clickables[this.id].cost);
				if (Math.random() <= tmp.g.clickables[this.id].chance) {
					player.g.games.gameState[this.id] = true;
					player.g.games.gameLastSuccessful[this.id] = 1;
				} else {
					player.g.games.gameLastSuccessful[this.id] = 0;
				}
			}
		}
	},
	onHold() {
		clickClickable("g", this.id);
	},
	chance() {
		let base = new Decimal(0.1);
		base = base.mul(Decimal.pow(0.5, player.g.ascensions.total));
		for (let i of this.skills)
			base = base.mul(tmp.g.buyables[i].effect);
		base = base.mul(hasUpgrade("g", 202) ? player.g.buyables[121].mul(0.3).pow(1.3).add(1) : 1);
		base = base.mul(tmp.pt.ind.gachaBoost);
		return base.min(1).toNumber();
	},
	color() {
		return player.g.games.gameState[this.id] ? "#77bf5f" : "#3ad";
	}
}

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
		games: {
			points: new Decimal(0),
			best: new Decimal(0),
			total: new Decimal(0),
			gameState: {
				71: false, 72: false, 73: false,
				81: false, 82: false, 83: false
			},
			gameLastSuccessful: {
				71: -1, 72: -1, 73: -1,
				81: -1, 82: -1, 83: -1
			}
		},
		fire: {
			points: new Decimal(0),
			best: new Decimal(0),
			total: new Decimal(0)
		},
		ascensions: {
			points: new Decimal(0),
			best: new Decimal(0),
			total: new Decimal(0)
		},
		autoAscend: false,
		coalBurning: new Decimal(0),
		goodDeeds: false,
		goodDeedsGifts: new Decimal(0),
		phaseDiagram: false,
		phaseDiagramGifts: new Decimal(0),
		collectToys: false
	}},
	color: "#4BDC13",
	resource: "gifts",
	waitTimeGain() {
		let base = new Decimal(1.25);
		if (hasUpgrade("g", 11)) base = base.mul(2);
		if (hasUpgrade("m", 12)) base = base.mul(2);
		base = base.mul(tmp.mc.buyables.timeWarp.effect);
		return base;
	},
	giftMulti() {
		let base = decimalOne;
		base = base.mul(tmp.g.buyables[11].effect);
		if (player.g.goodDeeds) base = base.mul(0.75);
		base = base.mul(tmp.g.joyEffects.giftGainMult);
		if (hasUpgrade("mc", 11)) base = base.mul(100);
		return base.floor(); 
	},
	globalRewardMulti() {
		let base = decimalOne;
		base = base.mul(tmp.g.joyEffects.giftMult);
		base = base.mul(tmp.m.buyables[11].effect.gift);
		base = base.mul(tmp.pt.ind.giftRewards);
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
			onClick(auto = false) {
				player.g.points = player.g.points.sub(1);
				openGift();
				if (options.particles && !auto)
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
				let base = player.g.buyables[31].div(100);
				base = base.mul(tmp.mc.buyables.printer.effect);
				base = base.mul(tmp.g.buyables[22].effect);
				base = base.mul(tmp.m.buyables[11].effect.money);
				base = base.mul(tmp.g.joyEffects.moneyMult);
				return base;
			},
			color: "#cc7",
			style: {
				height: '120px',
				width: '180px',
				'border-radius': '25%',
				border: '4px solid',
				'border-color': 'rgba(0, 0, 0, 0.125)',
			}
		},
		71: {title: "Minceraft", skills: [101, 111], ...gameClickable},
		72: {title: "DOM", skills: [101, 102], ...gameClickable},
		73: {title: "Teleportal", skills: [102, 112], ...gameClickable},
		81: {title: "Seleste", skills: [102, 111], ...gameClickable},
		82: {title: "The Cable", skills: [111, 112], ...gameClickable},
		83: {title: "Hexis", skills: [101, 112], ...gameClickable},
		91: {
			title: "Ascend.",
			display: "After completing all games, ascend to gain +1 ascension.",
			canClick() {
				return player.g.games.gameState[71] && player.g.games.gameState[72] && player.g.games.gameState[73] &&
				player.g.games.gameState[81] && player.g.games.gameState[82] && player.g.games.gameState[83]
			},
			onClick() {
				addGiftRewards("ascensions", 1);
				player.g.games.gameState[71] = false;
				player.g.games.gameState[72] = false;
				player.g.games.gameState[73] = false;
				player.g.games.gameState[81] = false;
				player.g.games.gameState[82] = false;
				player.g.games.gameState[83] = false;
			},
			color: "#94f"
		},
		101: {
			title: "Respec ascension upgrades",
			canClick() { return true },
			onClick() {
				player.g.upgrades = player.g.upgrades.filter(_ => _ < 200);
				player.g.ascensions.points = player.g.ascensions.total;
			},
			color: "#94f",
			style: {
				"min-height": "30px",
				width: "150px"
			}
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
				if (!hasUpgrade("mc", 22)) player.g.coal.points = player.g.coal.points.sub(tmp.g.buyables[11].cost);
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
				if (!hasUpgrade("mc", 22)) player.g.coal.points = player.g.coal.points.sub(tmp.g.buyables[12].cost);
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
		21: {
			title: "Fire duplicator",
			display() {
				return `What is this, minceraft dot bat?<br>
				x${format(tmp.g.buyables[21].effect)} to fire gain<br>
				${format(player.g.fire.points)}/${format(tmp.g.buyables[21].cost)} fire`
			},
			buy() {
				if (!hasUpgrade("mc", 22)) player.g.fire.points = player.g.fire.points.sub(tmp.g.buyables[21].cost);
				player.g.buyables[21] = player.g.buyables[21].add(1);
			},
			effect() {
				return player.g.buyables[21].add(1).pow(2);
			},
			cost() {
				return Decimal.pow(3, player.g.buyables[21].add(15));
			},
			canAfford() {
				return player.g.fire.points.gte(tmp.g.buyables[21].cost);
			},
			unlocked() {
				return hasUpgrade("g", 15)
			},
			color: "#f40"
		},
		22: {
			title: "Morale boost",
			display() {
				return `Increase money gain (?)<br>
				x${format(tmp.g.buyables[22].effect)} to money gain<br>
				${format(player.g.fire.points)}/${format(tmp.g.buyables[22].cost)} fire`
			},
			buy() {
				if (!hasUpgrade("mc", 22)) player.g.fire.points = player.g.fire.points.sub(tmp.g.buyables[22].cost);
				player.g.buyables[22] = player.g.buyables[22].add(1);
			},
			effect() {
				return player.g.buyables[22].pow(1.5).mul(0.1).add(1);
			},
			cost() {
				return Decimal.pow(4, player.g.buyables[22].add(10));
			},
			canAfford() {
				return player.g.fire.points.gte(tmp.g.buyables[22].cost);
			},
			unlocked() {
				return hasUpgrade("g", 15)
			},
			color: "#f40"
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
				if (!hasMilestone("g", 402)) player.g.toys.points = player.g.toys.points.sub(tmp.g.buyables[31].cost);
				player.g.buyables[31] = player.g.buyables[31].add(1);
			},
			buyMax() {
				if (hasMilestone("g", 402)) {
					player.g.buyables[31] = player.g.toys.points.pow(2/3).floor().add(1);
					return;
				}
				let amt;
				if (player.g.buyables[31].lt(100)) {
					amt = player.g.toys.points.div(30).min(new Decimal(100).sub(player.g.buyables[31]));
					player.g.toys.points = player.g.toys.points.sub(amt.floor().mul(30));
				} else {
					const p = player.g.toys.points,
						bu = player.g.buyables[31],
						a = new Decimal(0.75),
						b = bu.sub(80).mul(1.5),
						c = p.neg();
					amt = b.neg().add(b.mul(b).sub(a.mul(c).mul(4)).sqrt()).div(a.mul(2)).floor();
					player.g.toys.points = player.g.toys.points.sub(amt.mul(amt).mul(a).add(amt.mul(b)));
				}
				player.g.buyables[31] = player.g.buyables[31].add(amt).floor();
			},
			effect() {
				return softcap(player.g.buyables[31].sqrt(), new Decimal(30), 0.5);
			},
			cost() {
				if (hasMilestone("g", 402)) return player.g.buyables[31].pow(1.5);
				return player.g.buyables[31].sub(80).mul(1.5).max(30);
			},
			canAfford() {
				return player.g.toys.points.gte(tmp.g.buyables[31].cost);
			},
			color: "#cc7"
		},
		32: {
			title: "Toy megacollection",
			display() {
				return `It grows, larger.<br>
				Size: ${formatWhole(player.g.buyables[32])}
				+${format(tmp.g.buyables[32].effect.joy)} joy
				x${format(tmp.g.buyables[32].effect.toys)} to toy gain<br>
				${format(player.g.buyables[31])}/${format(tmp.g.buyables[32].cost)} toy collections`
			},
			buy() {
				if (!hasUpgrade("mc", 22)) player.g.buyables[31] = player.g.buyables[31].sub(tmp.g.buyables[32].cost);
				player.g.buyables[32] = player.g.buyables[32].add(1);
			},
			effect() { return {
				joy: player.g.buyables[32].mul(3).min(30),
				toys: player.g.buyables[32].add(1).pow(1.5)
			}},
			cost() {
				return Decimal.pow(2, player.g.buyables[32]).mul(300);
			},
			canAfford() {
				return player.g.buyables[31].gte(tmp.g.buyables[32].cost);
			},
			unlocked() {
				return hasUpgrade("m", 14)
			},
			color: "#cc7"
		},
		101: {
			title: "Quick Wits",
			display() {
				return `Improve chances of winning Minceraft, DOM and Hexis by x${format(tmp.g.buyables[this.id].effect)}.<br>
				${format(player.g.games.points)}/${format(tmp.g.buyables[this.id].cost)} games`
			},
			buy() {
				if (!hasMilestone("g", 405)) player.g.games.points = player.g.games.points.sub(tmp.g.buyables[this.id].cost);
				player.g.buyables[this.id] = player.g.buyables[this.id].add(1);
			},
			effect() {
				return hasUpgrade("g", 202) ? Decimal.pow(2, player.g.buyables[this.id].pow(0.8)) : decimalOne
			},
			cost() {
				return Decimal.pow(2.5, player.g.buyables[this.id].pow(1.3)).mul(100);
			},
			canAfford() {
				return player.g.games.points.gte(tmp.g.buyables[this.id].cost);
			},
			unlocked() {
				return hasUpgrade("g", 202)
			},
			color: "linear-gradient(#4f869e, #6f4d99)",
			style: {
				width: "120px", height: "120px"
			}
		},
		102: {
			title: "Fine Control",
			display() {
				return `Improve chances of winning Seleste, DOM and Teleportal by x${format(tmp.g.buyables[this.id].effect)}.<br>
				${format(player.g.games.points)}/${format(tmp.g.buyables[this.id].cost)} games`
			},
			buy() {
				if (!hasMilestone("g", 405)) player.g.games.points = player.g.games.points.sub(tmp.g.buyables[this.id].cost);
				player.g.buyables[this.id] = player.g.buyables[this.id].add(1);
			},
			effect() {
				return hasUpgrade("g", 202) ? Decimal.pow(2, player.g.buyables[this.id].pow(0.8)) : decimalOne
			},
			cost() {
				return Decimal.pow(2.5, player.g.buyables[this.id].pow(1.3)).mul(100);
			},
			canAfford() {
				return player.g.games.points.gte(tmp.g.buyables[this.id].cost);
			},
			unlocked() {
				return hasUpgrade("g", 202)
			},
			color: "linear-gradient(#4f869e, #6f4d99)",
			style: {
				width: "120px", height: "120px"
			}
		},
		111: {
			title: "Reaction",
			display() {
				return `Improve chances of winning Minceraft, Seleste and The Cable by x${format(tmp.g.buyables[this.id].effect)}.<br>
				${format(player.g.games.points)}/${format(tmp.g.buyables[this.id].cost)} games`
			},
			buy() {
				if (!hasMilestone("g", 405)) player.g.games.points = player.g.games.points.sub(tmp.g.buyables[this.id].cost);
				player.g.buyables[this.id] = player.g.buyables[this.id].add(1);
			},
			effect() {
				return hasUpgrade("g", 202) ? Decimal.pow(2, player.g.buyables[this.id].pow(0.8)) : decimalOne
			},
			cost() {
				return Decimal.pow(2.5, player.g.buyables[this.id].pow(1.3)).mul(100);
			},
			canAfford() {
				return player.g.games.points.gte(tmp.g.buyables[this.id].cost);
			},
			unlocked() {
				return hasUpgrade("g", 202)
			},
			color: "linear-gradient(#4f869e, #6f4d99)",
			style: {
				width: "120px", height: "120px"
			}
		},
		112: {
			title: "Puzzle",
			display() {
				return `Improve chances of winning Teleportal, Hexis and The Cable by x${format(tmp.g.buyables[this.id].effect)}.<br>
				${format(player.g.games.points)}/${format(tmp.g.buyables[this.id].cost)} games`
			},
			buy() {
				if (!hasMilestone("g", 405)) player.g.games.points = player.g.games.points.sub(tmp.g.buyables[this.id].cost);
				player.g.buyables[this.id] = player.g.buyables[this.id].add(1);
			},
			effect() {
				return hasUpgrade("g", 202) ? Decimal.pow(2, player.g.buyables[this.id].pow(0.8)) : decimalOne
			},
			cost() {
				return Decimal.pow(2.5, player.g.buyables[this.id].pow(1.3)).mul(100);
			},
			canAfford() {
				return player.g.games.points.gte(tmp.g.buyables[this.id].cost);
			},
			unlocked() {
				return hasUpgrade("g", 202)
			},
			color: "linear-gradient(#4f869e, #6f4d99)",
			style: {
				width: "120px", height: "120px"
			}
		},
		121: {
			title: "Omniskill",
			display() {
				return `Boost games gain, and increase the winning chance of every single game.<br>
				x${format(tmp.g.buyables[this.id].effect)} to games gain<br>
				${format(player.g.games.points)}/${format(tmp.g.buyables[this.id].cost)} games`
			},
			buy() {
				if (!hasMilestone("g", 405)) player.g.games.points = player.g.games.points.sub(tmp.g.buyables[this.id].cost);
				player.g.buyables[this.id] = player.g.buyables[this.id].add(1);
			},
			effect() {
				return hasUpgrade("g", 202) ? Decimal.pow(4, player.g.buyables[121].pow(0.8)) : decimalOne
			},
			cost() {
				return Decimal.pow(3, player.g.buyables[this.id].pow(1.4)).mul(300);
			},
			canAfford() {
				return player.g.games.points.gte(tmp.g.buyables[121].cost);
			},
			unlocked() {
				return hasUpgrade("g", 202)
			},
			color: "linear-gradient(#6aafbd, #8f6fc1)",
			style: {
				width: "150px", height: "150px", margin: "5px auto"
			}
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
		14: {
			title: "The Tree of Life",
			description: "The bonfire is given more room, making it last longer and have better effects.",
			cost: 2e7,
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
		15: {
			title: "Huh?",
			description: "Unlock two coal \"buyables\". What the hell is a buyable anyway?",
			cost: 1.6e8,
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
		42: {
			title: "Phase Diagram",
			description: "Halve your gift rewards, but have a 10% chance of getting 40x more rewards.<br><i>Gacha game much?</i>",
			cost: 2222222
		},
		43: {
			title: "Amazing Deeds",
			description: "Have an extremely small chance of getting an actual game. (Santa is hard to impress.)",
			cost: 2e10
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
		},
		72: {
			title: "Generous Collecting",
			description: "I mean, wouldn't it be better if you could collect all your toys at once?",
			cost: 1e5,
			currencyLocation() {
				return player.g.toys
			},
			currencyInternalName: "points",
			currencyDisplayName: "toys",
			color: "#cc7"
		},
		91: {
			title: "Play with Money",
			description: "You can activate two <b>Null</b> effects at once. It's not so specialised after all.",
			cost: 750,
			currencyLocation() {
				return player.g.games
			},
			currencyInternalName: "points",
			currencyDisplayName: "games",
			color: "#3ad"
		},
		92: {
			title: "Play with Flattery",
			description: "Impress Santa more, and he'll give you better chances of getting games.",
			cost: 5e11,
			currencyLocation() {
				return player.g.games
			},
			currencyInternalName: "points",
			currencyDisplayName: "games",
			color: "#3ad"
		},
		93: {
			title: "Play with Joy",
			description: "Break gacha games by pushing the hardcap of joy's effect on gift reward amount to 30.",
			cost: 3.6e36,
			currencyLocation() {
				return player.g.games
			},
			currencyInternalName: "points",
			currencyDisplayName: "games",
			color: "#3ad"
		},
		94: {
			title: "Play with Gacha",
			description: "Opening gifts is no longer randomized, but gives 500% of the expected value of all gift rewards.",
			cost: 3.8e38,
			currencyLocation() {
				return player.g.games
			},
			currencyInternalName: "points",
			currencyDisplayName: "games",
			color: "#3ad",
			unlocked() {
				return hasUpgrade("g", 93)
			}
		},
		95: {
			title: "Play with Null",
			description: "Games hasn't boosted other things enough. Divide <b>Null</b> cost based on games.",
			cost: 5.1e51,
			currencyLocation() {
				return player.g.games
			},
			currencyInternalName: "points",
			currencyDisplayName: "games",
			color: "#3ad",
			unlocked() {
				return hasUpgrade("g", 93)
			},
			effect() {
				return player.g.games.points;
			},
			effectDisplay() {
				return `/${format(tmp.g.upgrades[95].effect)}`
			}
		},
		201: {
			title: "Ascension I",
			description: "Boost games gain by x6, but <b>Phase Diagram</b> no longer affects games.",
			cost: 1,
			currencyLocation() {
				return player.g.ascensions
			},
			currencyInternalName: "points",
			currencyDisplayName: "ascensions",
			color: "#94f"
		},
		202: {
			title: "Ascension II",
			description: "Unlock skilling.",
			cost: 3,
			currencyLocation() {
				return player.g.ascensions
			},
			currencyInternalName: "points",
			currencyDisplayName: "ascensions",
			color: "#94f"
		},
		203: {
			title: "Ascension III",
			description: "Boost games gain based on ascensions.",
			cost: 5,
			currencyLocation() {
				return player.g.ascensions
			},
			currencyInternalName: "points",
			currencyDisplayName: "ascensions",
			color: "#94f",
			effect() {
				return Decimal.pow(1.8, player.g.ascensions.total);
			},
			effectDisplay() {
				return `x${format(tmp.g.upgrades[203].effect)}`
			}
		},
		204: {
			title: "Ascension IV",
			description: "Top row of skills also decrease the games cost of their corresponding games by x^0.6.",
			cost: 12,
			currencyLocation() {
				return player.g.ascensions
			},
			currencyInternalName: "points",
			currencyDisplayName: "ascensions",
			color: "#94f"
		},
		205: {
			title: "Ascension V",
			description: "Each perfect square of (<b>Omniskill</b>'s effect) * (total ascensions) adds 333 to joy.",
			cost: 24,
			currencyLocation() {
				return player.g.ascensions
			},
			currencyInternalName: "points",
			currencyDisplayName: "ascensions",
			color: "#94f",
			effect() {
				return tmp.g.buyables[121].effect.mul(player.g.ascensions.total).sqrt().floor().mul(333);
			},
			effectDisplay() {
				return `+${format(tmp.g.upgrades[205].effect)}`
			}
		}
	},
	giftEffects: ["goodDeeds", "phaseDiagram"],
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
		1: {
			requirementDescription: "Phase Diagram Reward",
			toggles: [["g", "phaseDiagram"]],
			done() {
				return hasUpgrade("g", 42)
			},
			unlocked() {
				return hasUpgrade("g", 42)
			}
		},
		200: {
			requirementDescription: "50 toy collections",
			effectDescription: "Automatically collect toys.",
			toggles: [["g", "collectToys"]],
			done() {
				return player.g.buyables[31].gte(50)
			}
		},
		400: {
			requirementDescription: "3 total ascensions",
			effectDescription: "Gain 18.1% of money gain on reset per second. Is this an AD clone?",
			done() {
				return player.g.ascensions.total.gte(3);
			}
		},
		401: {
			requirementDescription: "6 total ascensions",
			effectDescription: "Automatically add 18.1% of your current coal to the burning pile without actually depleting any coal. Magic?",
			done() {
				return player.g.ascensions.total.gte(6);
			}
		},
		402: {
			requirementDescription: "21 total ascensions",
			effectDescription: "Increase the <b>Toy Collection</b> scaling, but it doesn't spend your toys.",
			done() {
				return player.g.ascensions.total.gte(21);
			}
		},
		403: {
			requirementDescription: "25 total ascensions",
			effectDescription: "It's about time- Each attempt is repeatedly run until you have won the game, with a maximum of 1000 attempts per click.",
			done() {
				return player.g.ascensions.total.gte(25);
			}
		},
		404: {
			requirementDescription: "50 total ascensions",
			effectDescription: "It's also about time- Attempt each game every tick and they don't spend games. Raise the attempt limit to 10000 per click.",
			done() {
				return player.g.ascensions.total.gte(50);
			},
			unlocked() {
				return hasMilestone("g", 403);
			}
		},
		405: {
			requirementDescription: "64 total ascensions",
			effectDescription: "Finally. Automatically ascend and autobuy skills. Skills no longer spend games.",
			toggles: [["g", "autoAscend"]],
			done() {
				return player.g.ascensions.total.gte(64);
			},
			unlocked() {
				return hasMilestone("g", 403);
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
				if (tmp.g.waitTimeGain.gte(60)) return `${format(tmp.g.giftMulti.mul(tmp.g.waitTimeGain).div(10))} gifts/s`
				return `${format(player.g.waitTime.neg().add(10).div(tmp.g.waitTimeGain), 3)}s til next gift`
			},
			fillStyle: {
				backgroundColor: "#BF98"
			}
		}
	},

	fireEffect() {
		return player.g.fire.points.add(1).log10().pow(hasUpgrade("g", 14) ? 1.2 : 1);
	},
	fireMult() {
		let base = decimalOne;
		if (hasUpgrade("g", 13)) base = base.mul(2);
		base = base.mul(tmp.g.buyables[21].effect);
		return base;
	},

	update(d) {
		d = tmp.pt.timeSpeed.mul(d);
		player.g.waitTime = player.g.waitTime.add(tmp.g.waitTimeGain.mul(d));
		addPoints("g", player.g.waitTime.div(10).floor().mul(tmp.g.giftMulti));
		for (i of tmp.g.giftEffects) {
			if (player.g[i])
				player.g[i + "Gifts"] = player.g[i + "Gifts"].add(player.g.waitTime.div(10).floor().mul(tmp.g.giftMulti));
		}
		player.g.waitTime = player.g.waitTime.sub(player.g.waitTime.div(10).floor().mul(10));

		player.g.fire.points = player.g.fire.points.mul(Decimal.pow(hasUpgrade("g", 14) ? 0.999 : 0.98, d))
		addGiftRewards("fire", player.g.coalBurning.sub(player.g.coalBurning.mul(Decimal.pow(0.98, d))).mul(tmp.g.fireMult));
		player.g.coalBurning = player.g.coalBurning.mul(Decimal.pow(0.98, d));

		if (hasMilestone("g", 400))
			addPoints("m", tmp.g.clickables[51].reward.mul(d*0.181));
		if (hasMilestone("g", 401))
			player.g.coalBurning = player.g.coalBurning.add(player.g.coal.points.mul(0.181*d));
	},
	automate() {
		if (player.g.collectToys && hasMilestone("g", 200))
			if (hasUpgrade("g", 72))
				buyMaxBuyable("g", 31);
			else
				buyBuyable("g", 31);

		if (player.mc.giftAuto && (player.devSpeed > 1e-5 || player.devSpeed == undefined)) 
			for (let i = 0; i < tmp.mc.buyables.giftAuto.effect; i++)
				clickClickable("g", 11, true);

		if (hasUpgrade("mc", 22)) {
			buyBuyable("g", 11);
			buyBuyable("g", 12);
			buyBuyable("g", 21);
			buyBuyable("g", 22);
			buyBuyable("g", 32);
		}
		if (hasMilestone("g", 404) && (player.devSpeed > 1e-5 || player.devSpeed == undefined)) {
			clickClickable("g", 71);
			clickClickable("g", 72);
			clickClickable("g", 73);
			clickClickable("g", 81);
			clickClickable("g", 82);
			clickClickable("g", 83);
		}
		if (player.g.autoAscend) {
			clickClickable("g", 91)
		}
		if (hasMilestone("g", 405)) {
			buyBuyable("g", 101);
			buyBuyable("g", 102);
			buyBuyable("g", 111);
			buyBuyable("g", 112);
			buyBuyable("g", 121);
		}
	},
	tabFormat: {
		Main: {
			content: ["main-display", "resource-display", ["clickable", 11], "blank", ["bar", "giftProgress"], "blank",
			"gift-display", "blank", ["milestones", [0, 1]], ["upgrades", [4]]]
		},
		Coal: {
			content: ["main-display", "resource-display", ["clickable", 11], "blank", ["bar", "giftProgress"], "blank",
			["currency-display", {
				resource: "coal",
				resourceAmt() {return player.g.coal.points},
				color: "#666",
				precision: 2
			}], "blank", ["buyables", [1, 2]], "blank", ["upgrades", [1]],
			["currency-display", {
				resource: "bonfire",
				resourceAmt() {return player.g.fire.points},
				color: "#f40",
				precision: 2,
				effectDescription() {
					return `giving +${format(tmp.g.fireEffect)} to joy, but you are losing ${hasUpgrade("g", 14) ? 0.1 : 2}% of it every second`
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
		},
		Games: {
			content: ["main-display", "resource-display", ["clickable", 11], "blank", ["bar", "giftProgress"], "blank",
			["currency-display", {
				resource: "games",
				resourceAmt() {return player.g.games.points},
				color: "#3ad",
				precision: 2
			}], "blank", ["upgrades", [9]], "blank", ["row", [["buyables", [10]], ["buyables", [11]]]], ["buyable", 121],
			"blank", ["clickables", [7, 8, 9]], "blank", ["currency-display", {
				resource() {
					return "ascensions (" + formatWhole(player.g.ascensions.total) + " total)" 
				},
				resourceAmt() {return player.g.ascensions.points},
				color: "#94f",
			}], ["milestones", [400, 401, 402, 403, 404, 405]], ["clickable", 101], "blank", ["upgrades", [20]]],
			unlocked() {
				return player.g.games.total.gt(0)
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
				if (player.g.goodDeedsGifts.gte(1)) base = base.sub(0.1*tmp.mc.buyables.mine.effect.toys);
				return base;
			},
			unlocked: true,
			gain() {
				let base = new Decimal(3);
				base = base.mul(tmp.g.buyables[12].effect);
				if (hasUpgrade("mc", 21)) base = base.mul(100);
				return base;
			}
		},
		toys: {
			colour: "#cc7",
			currencyName: "toys",
			displayTitle: "Less Naughty",
			chance() {
				let base = decimalZero;
				if (player.g.goodDeedsGifts.gte(1)) base = base.add(0.1*tmp.mc.buyables.mine.effect.toys);
				if (hasUpgrade("g", 71)) base = base.mul(2);
				return base;
			},
			unlocked() {return hasUpgrade("g", 41)},
			gain() {
				let base = new Decimal(3);
				base = base.mul(tmp.g.buyables[32].effect.toys);
				if (hasUpgrade("mc", 23)) base = base.mul(100);
				return base;
			}
		},
		games: {
			colour: "#3ad",
			currencyName: "Games",
			displayTitle: "Not Naughty",
			chance() {
				let base = decimalZero;
				if (hasUpgrade("g", 43)) {
					base = base.add(3e-4);
					if (hasUpgrade("g", 92)) base = base.mul(5);
				}
				return base;
			},
			unlocked() {return hasUpgrade("g", 43)},
			noCrit() {return hasUpgrade("g", 201)},
			gain() {
				let base = new Decimal(4e-11);
				if (hasUpgrade("g", 201)) base = base.mul(6);
				base = base.mul(tmp.g.buyables[121].effect);
				if (hasUpgrade("g", 203)) base = base.mul(tmp.g.upgrades[203].effect);
				if (hasUpgrade("mc", 31)) base = base.mul(100);
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
		base = base.add(tmp.g.buyables[32].effect.joy);
		if (hasUpgrade("m", 11)) base = base.add(4);
		if (hasUpgrade("g", 205)) base = base.add(tmp.g.upgrades[205].effect);
		base = base.mul(tmp.pt.ind.joyMult);
		return base;
	},
	joyEffects: {
		giftMult() {
			return tmp.g.joy.gte(1) ? tmp.g.joy.add(1).pow(1.2) : decimalOne
		},
		giftAmount() {
			return tmp.g.joy.gte(18.88) ? tmp.g.joy.sub(17.38).div(1.5).pow(0.3).floor().min(hasUpgrade("g", 93) ? 30 : 6).toNumber() : 0
		},
		giftGainMult() {
			return tmp.g.joy.gte(50) ? tmp.g.joy.sub(48.5).sqrt() : 1
		},
		moneyMult() {
			return tmp.g.joy.gte(1e6) ? tmp.g.joy.div(1e4).sub(99).pow(5) : 1
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
	let luck = Math.random()*0.5 + 0.5;
	player.g.giftDisplay.splice(0, player.g.giftDisplay.length);
	let effects = [];
	for (i of tmp.g.giftEffects) {
		if (player.g[i + "Gifts"].gte(1)) {
			effects.push(i.replace(/[a-z]/, _ => _.toUpperCase()).split(/(?=[A-Z])/).join(" "));
			player.g[i + "Gifts"] = player.g[i + "Gifts"].sub(1);
		}
	}
	player.g.giftDisplay.push(effects);
	if (hasUpgrade("g", 94)) {
		let gEV = 3.75*rewardCount();
		const accChance = tmp.g.addedChance;
		for (let i in tmp.g.giftTypes) {
			let type = tmp.g.giftTypes[i];
			let eV = gEV;
			if (!type.noCrit)
				eV *= 2.95;
			eV = type.gain.mul(tmp.g.globalRewardMulti).mul(eV);
			addGiftRewards(i, eV);
		}
		return;
	}
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
		let tempLuck = 1;
		if (effects.includes("Phase Diagram") && !tmp.g.giftTypes[reward].noCrit)
			tempLuck *= (Math.random() > 0.9)*19.5 + 0.5;
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
			<span v-if="tmp.g.joy.gte(50)">
				That's pretty happy if I must say. Have even more rewards!<br>
				<span style="color: #f22">
					x{{format(tmp.g.joyEffects.giftGainMult)}} to gift gain<br><br>
				</span>
			</span>
			<span v-if="tmp.g.joy.gte(1e6)">
				That's the spirit. Have even more rewards!<br>
				<span style="color: #f22">
					x{{format(tmp.g.joyEffects.moneyMult)}} to money gain<br><br>
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