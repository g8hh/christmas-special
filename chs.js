/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "\tThat's less sad. Have more rewards!": "\t那就没那么难过了。 获得更多奖励！",
    "Last gift rewards": "上次礼物奖励",
    "Main": "主页",
    "Naughty": "淘气",
    "Open a gift!": "打开一份礼物！",
    "Phase Diagram": "相图",
    "Toys": "玩具",
    "What could be hiding inside?": "里面可能藏着什么？",
    "Hold down to open multiple": "按住可以打开多个",
    "Have an extremely small chance of getting an actual game. (Santa is hard to impress.": "获得真正游戏的机会极小。 （圣诞老人很难给人留下深刻印象。",
    "Halve your gift rewards, but have a 10% chance of getting 40x more rewards.": "将您的礼物奖励减半，但有 10% 的机会获得 40 倍以上的奖励。",
    "Good Deeds Reward": "善行奖励",
    "Good Deeds": "善行",
    "Give away a 4th of your presents each time for a small chance of getting some toys.": "每次送出四分之一的礼物，就有机会获得一些玩具。",
    "Gacha game much?": "扭蛋游戏多吗？",
    "gifts": "礼物",
    "Coal": "煤",
    "christmas points": "圣诞点数",
    "Amazing Deeds": "惊人的事迹",
    "Active effects": "主动效果",
    "Less Naughty": "不那么淘气",
    "50 toy collections": "收藏 50 个玩具",
    "After all, what's wrong with collecting gifts on Easter too?": "毕竟，在复活节也收集礼物有什么问题？",
    "Automatically collect toys.": "自动收藏玩具。",
    "bonfire": "篝火",
    "coal": "煤",
    "Coal duplicator": "煤炭复印机",
    "Buy a pair of bellows to make the bonfire burn twice as good.": "买一副风箱，让篝火燃烧的更旺一倍。",
    "I mean, wouldn't it be better if you could collect all your toys at once?": "我的意思是，如果您可以一次收集所有玩具不是更好吗？",
    "It grows": "它长大了",
    "Huh?": "嗯？",
    "Generous Collecting": "大手笔的收藏",
    "Generous Donation": "慷慨捐赠",
    "Stoke the fire": "点燃火",
    "Swindle someone naughtily": "顽皮地欺骗某人",
    "Sell.": "出售.",
    "The bonfire is given more room, making it last longer and have better effects.": "篝火被给予更多的空间，使其持续时间更长，效果更好。",
    "The Easter^2 Tree": "复活节^2树-The Easter^2 Tree",
    "The Flame Tree": "火焰树-The Flame Tree",
    "The Oxygen Tree": "氧气树-The Oxygen Tree",
    "Toy collection": "玩具收藏",
    "The Tree of Life": "生命树-The Tree of Life",
    "toys": "玩具",
    "Unlock two coal \"buyables\". What the hell is a buyable anyway?": "解锁两个煤炭“可购买物品”。 到底什么是可买的？",
    "What is this, minecraft dot exe?": "这是什么，我的世界.exe？",
    "What's more relaxing than a nice bonfire?": "有什么比篝火晚会更让人放松的呢？",
    "With your coal, you convince someone to give you their present as well. Christmas season!": "用你的煤炭，你说服别人也给你礼物。 圣诞季！",
    "buy happiness": "购买快乐",
    "Buy some machines.": "买些机器。",
    "Buy some toys.": "买些玩具。",
    "can": "可以",
    "Flame.": "火焰.",
    "Capital investment": "资本投资",
    "Generous-er donations": "慷慨捐助",
    "It'll work out, somehow": "它会以某种方式解决",
    "Might as well go the whole way and bump your good deeds up even more.": "不妨一路走下去，让你的善行更上一层楼。",
    "money": "金钱",
    "Money": "金钱",
    "Money can buy gifts too": "钱也能买礼物",
    "Nothing. Decrease wait time by x2.": "没有什么。 将等待时间减少 x2。",
    "Reset Effects": "重置效果",
    "Start off strong by adding +4 to joy.": "开始时，在快乐中添加+4。",
    "Toy investment": "玩具投资",
    "Unlock money buyables. You still don't know what a buyable is.": "解锁金钱可买。 你仍然不知道什么是可购买的。",
    "What's wrong with buying some gifts every now and then?": "时不时买些礼物有什么错？",
    "That's less sad. Have more rewards!": "那就不那么难过了。 获得更多奖励！",
    "Blade": "刀刃",
    "Coal Mine": "煤矿",
    "machine parts": "机器零件",
    "Make Santa impressed enough to give a hundred times more gifts.": "让圣诞老人印象深刻，可以赠送一百倍的礼物。",
    "Maybe it's about time to find other sources of coal.": "也许是时候寻找其他煤炭来源了。",
    "Moar money.": "麻钱。",
    "Money Printer": "印钞机",
    "Opus Magnum": "大作",
    "Printer go brr": "打印机去brr",
    "Printing money has definitely never gone wrong before.": "印钱以前绝对不会出错。",
    "Sharp Blade": "锋利的刀片",
    "That's even less sad. Have even more rewards!": "那就更不难过了。 获得更多奖励！",
    "Time Warp": "时间扭曲",
    "Whoops!": "糟糕！",
    "Worker ploitation": "工人剥削",
    "You've broken the fabric of spacetime. What have you done?": "你打破了时空的结构。 你做了什么？",
    "It grows, larger.": "它长大了，变大了。",
    "Toy megacollection": "玩具大集合",
    "Make it sharper!": "让它更锋利！",
    "Automatically open gifts.": "自动打开礼物。",
    "Make Einstein angrier.": "让爱因斯坦更生气。",
    "Time warp": "时间扭曲",
    "That's pretty happy if I must say. Have even more rewards!": "如果我必须说，那真是太高兴了。 获得更多奖励！",
    "DEFAULT": "默认",
    "Make": "让",
    "No Effects": "无效果",
    "Null": "空",
    "What is this, minceraft dot bat?": "这是什么，我的世界.bat？",
    "Morale boost": "士气提升",
    "Increase money gain (?": "增加金钱增益（？",
    "Fire duplicator": "火焰复印机",
    "Good Deeds, Phase Diagram": "善行，相图",
    "Phase Diagram Reward": "相图奖励",
    "Build another": "再建一个",
    "But remember to treat the miners nicely.": "但记住要善待矿工。",
    "Games": "游戏",
    "Ascend.": "转生.",
    "After completing all games, ascend to gain +1 ascension.": "完成所有游戏后，转生以获得 +1 转生。",
    "ascensions": "转生",
    "Each perfect square of (": "每个完美平方对于 (",
    "Break gacha games by pushing the hardcap of joy's effect on gift reward amount to 30.": "通过将快乐对礼物奖励的影响数量推到30来打破扭蛋游戏。",
    "Boost games gain by x6, but": "提升游戏增益 x6，但",
    "Boost games gain based on ascensions.": "提升游戏增益基于转生。",
    "Automatically add 18.1% of your current coal to the burning pile without actually depleting any coal. Magic?": "自动将当前煤的 18.1% 添加到燃烧堆中，而不会实际消耗任何煤。 魔法？",
    "effects at once. It's not so specialised after all.": "立即生效。 毕竟不是那么专业。",
    "Gain 18.1% of money gain on reset per second. Is this an AD clone?": "每秒重置时获得 18.1% 的金钱增益。 这是 AD 克隆吗？",
    "games": "游戏",
    "Hexis": "Hexis",
    "Impress Santa more, and he'll give you better chances of getting games.": "给圣诞老人留下更多印象，他会给你更好的机会获得游戏。",
    "Increase the": "提高",
    "It's about time- Each attempt is repeatedly run until you have won the game, with a maximum of 1000 attempts per click.": "是时候了 - 每次尝试都会重复运行，直到您赢得游戏为止，每次点击最多可尝试 1000 次。",
    "Minceraft": "我的世界",
    "Omniskill": "全能",
    "no longer affects games.": "不再影响游戏。",
    "Play with Flattery": "用奉承玩",
    "Play with Joy": "用快乐玩",
    "Play with Money": "用钱玩",
    "Respec ascension upgrades": "重洗转生升级",
    "scaling, but it doesn't spend your toys.": "缩放，但它不会花费你的玩具。",
    "Seleste": "蔚蓝",
    "Teleportal": "传送门",
    "The Cable": "王牌特派员",
    "Top row of skills also decrease the games cost of their corresponding games by x^0.6.": "最上面一排技能也将其相应游戏的游戏成本降低了 x^0.6。",
    "Toy Collection": "玩具收藏",
    "Unlock skilling.": "解锁技能。",
    "You can activate two": "你可以激活两个",
    "'s effect) * (total ascensions) adds 333 to joy.": "的效果）*（总转生）增加 333 的快乐。",
    "Not Naughty": "不淘气",
    "You lost! Better luck next time.": "你输了！ 下次好运。",
    "You won!": "你赢了！",
    "and all buyables within the coal layer, and they don't spend anything. You can select another": "以及煤层内的所有可购买的东西，他们什么都不花。 你可以选择另一个",
    "Autobuy": "自动购买",
    "effect. Autobuy": "效果. 自动购买",
    "Supreme Automata": "至尊自动机",
    "Toy megacollections": "大型玩具收藏",
    ", and it spends nothing.": "，它什么都不花。",
    "Boost games gain, and increase the winning chance of every single game.": "提升游戏增益，增加每场比赛的获胜机会。",
    "Fine Control": "精细控制",
    "Puzzle": "拼图",
    "Quick Wits": "机智",
    "Reaction": "反应",
    "DOM": "引擎",
    "And finally, the gift- Actual games this time!": "最后是礼物——这次是实战游戏！",
    "Autobuy all machines, and they don't spend anything.": "自动购买所有机器，他们不花任何钱。",
    "cost based on games.": "费用基于游戏。",
    "Finally. Automatically ascend and autobuy skills. Skills no longer spend games.": "最后。 自动转生和自动购买技能。 技能不再花费游戏。",
    "Gain 18.1% of machine parts on prestige every second.": "每秒获得 18.1% 的机器零件声望。",
    "Games hasn't boosted other things enough. Divide": "游戏并没有足够地提升其他东西。 除以",
    "It's also about time- Attempt each game every tick and they don't spend games. Raise the attempt limit to 10000 per click.": "这也是关于时间 - 每次游戏都尝试每局游戏，他们不会花游戏时间。 将尝试限制提高到每次点击 10000 次。",
    "Make Santa impressed enough to give a hundred times more coal.": "让圣诞老人留下深刻的印象，以提供一百倍的煤炭。",
    "Make Santa impressed enough to give a hundred times more games.": "让圣诞老人留下深刻的印象，以提供一百倍的游戏。",
    "Make Santa impressed enough to give a hundred times more toys.": "让圣诞老人印象深刻，以提供一百倍的玩具。",
    "Opening gifts is no longer randomized, but gives 500% of the expected value of all gift rewards.": "打开礼物不再是随机的，而是给予所有礼物奖励的 500% 的预期价值。",
    "Play with Gacha": "玩扭蛋",
    "Play with Null": "玩空",
    "Santa's Ultimate Gift": "圣诞老人的终极礼物",
    "NULL": "空",
    "That's the spirit. Have even more rewards!": "就是那种精神。 获得更多奖励！",
    "distance": "距离",
    "Unlock rockets.": "解锁火箭。",
    "Ranking": "段位",
    "Triple velocity.\n": "三倍速度。\n",
    "Reset previous process for": "重置之前的进度得到 ",
    "Rocket off to the next layer!": "火箭飞到下一层！",
    "rockets.": "火箭。",
    "rockets": "火箭",
    "Rockets": "火箭",
    "Spacetime Travel": "时空之旅",
    "Rocket Engines": "火箭引擎",
    "Begin (For real": "开始（真的",
    "Boost christmas point gain based on prestige points.": "根据声望点提高圣诞点数。",
    "Boost christmas point gain based on rockets.": "提高基于火箭的圣诞点增益。",
    "Boost velocity based on christmas points.": "根据圣诞节点提高速度。",
    "Other Other Syngergy": "其他的其它协同作用",
    "Other Synergy": "其他协同作用",
    "prestige points": "声望点",
    "tsooB egitserP": "升提望声",
    "Add a new induction pair.": "添加一个新的感应对。",
    "Both forward and backward induction are active at the same time.": "正向和反向感应同时激活。",
    "Forward-Backward Induction": "正向-反向感应",
    "Game slowed down by a thousandfold due to reaching endgame": "由于到达残局，游戏速度减慢了一千倍",
    "Induction": "感应",
    "Induction Synergy": "感应协同",
    "Magical Proof": "魔法证明",
    "Mathematics Proof": "数学证明",
    "Missing Pair": "缺少对",
    "Physics Proof": "物理证明",
    "Row 2 Synergy": "第 2 行协同作用",
    "Scraps and prestige points boost each other.": "碎片和声望点互相促进。",
    "Sideways Induction": "横向感应",
    "Unlock a backward induction.": "解锁反向感应。",
    "Unlock Enhance inductors.": "解锁增强感应器。",
    "Unlock induction.": "解锁感应。",
    "Unlock Space and Time inductors.": "解锁空间和时间感应器。",
    "Autobuy boosters.": "自动购买助推器。",
    "Forward induction": "正面感应",
    "Autobuy generators.": "自动购买发生器。",
    "Backward induction": "反向感应",
    "Multiply christmas point gain based on condenser effect.": "根据冷凝器效应乘以圣诞点增益。",
    "orange": "橙色",
    "photonic energy": "光子能量",
    "Photon": "光子",
    "Plantation": "种植园",
    "Power": "力量",
    "red": "红色",
    "Content": "内容",
    "Energical warp": "能量翘曲",
    "Gain the equivalent resources of 1 luminal energy reset every second.": "每秒获得相当于 1 次 发光能量 重置的资源。",
    "hyper-infinities": "超无限",
    "Magical Forest in the Middle of Nowhere": "荒野中的魔法森林",
    "magical leaves": "魔法树叶",
    "Auto": "自动",
    "Auto-Chargers": "自动充电器",
    "Auto-Compressors": "自动压缩机",
    "Auto-Self Chargers": "自动自我充电器",
    "blue": "蓝色",
    "Excited state": "兴奋状态",
    "festive energy": "节日能量",
    "green": "绿色",
    "Large battery": "大电池",
    "Lumin": "发光",
    "Super charge": "超级充电",
    "Chargers": "充电器",
    "Compressors": "压缩机",
    "dimension boosters": "维度助推器",
    "Gift the PTverse and ADverse deities to make them happy.": "赠送 PTverse 和 ADverse 神灵，让他们开心。",
    "indigo": "靛蓝",
    "luminal energy": "发光能量",
    "Present Machine": "礼物机器",
    "present shards": "礼物碎片",
    "Self-Chargers": "自我充电器",
    "violet": "紫色",
    "yellow": "黄色",
    "Broken Generator": "损坏的发生器",
    "Drain Prestige Points": "消耗的声望点",
    "Gain a  dimension multiplier.": "获得一个维度乘数。",
    "Mechanisations": "机械装置",
    "Rocket Builder": "火箭建造者",
    "rocket engines": "火箭引擎",
    "Rocket engines are fueled by prestige points. Nobody knows how, or why.": "火箭发动机由声望点驱动。 没有人知道如何或为什么。",
    "Scrap Collector": "废料收集器",
    "Unlock automation.": "解锁自动化。",
    "Spurt Booster": "喷射助推器",
    "Tiers no longer reset anything.": "层级不再重置任何东西。",
    "Advanced Distillation": "高级蒸馏",
    "antimatter": "反物质",
    "Boiler": "锅炉",
    "bot": "机器人",
    "Buy Max": "购买最大",
    "Buy One": "购买1个",
    "Condensers are 1.5 times more effective.": "冷凝器的效率提高了 1.5 倍。",
    "Condensers cheapen themselves.": "冷凝器使自己变得便宜。",
    "Conservation of Energy": "能量守恒",
    "Dimensions": "维度",
    "Distance boosts time speed.": "距离提升时间速度。",
    "Distance, Scaled": "距离，按比例缩放",
    "Double space.": "双倍空间。",
    "Energy Resurge": "能量回升",
    "Gain a dimension multiplier based on energy.": "获得基于能量的维度乘数。",
    "Find a way to double space.": "想办法把空间加倍。",
    "Gain a dimension multiplier based on time played.": "根据游戏时长获得维度乘数。",
    "Greatly reduce the level scaling. The rocket effect applies to power.": "大大降低等级缩放。 火箭效应适用于力量。",
    "Increase antimatter reactor efficiency.": "提高反物质反应堆效率。",
    "Increase the buy 10 multiplier from x2 to x2.2.": "将买入 10 乘数从 x2 增加到 x2.2。",
    "Increase tickspeed": "提高 tick速度",
    "Levels scale another 40% slower.": "等级的缩放速度再慢 40%。",
    "Levels, Not Scaled": "等级，未缩放",
    "Max All": "全部最大",
    "NOT. ENOUGH. SPACE.": "没有。 足够的。 空间。",
    "Power, Scaled": "力量，已缩放",
    "Primary Anti-space Building": "初级反空间建筑",
    "Push back the post-e308 dimension cost scaling based on space.": "推回 e308 后基于空间的维度成本缩放。",
    "Reset progress in AD, but gain more energy.\n": "在 AD 中重置进度，但获得更多能量。\n",
    "Reset progress in AD, but give buffs to dimension multipliers and costs.\n": "在 AD 中重置进度，但增强维度乘数和成本。\n",
    "Space-Time Problem": "时空问题",
    "Space-Time Solvent": "时空溶剂",
    "Spatial Problem": "空间问题",
    "Spatial Recursion": "空间递归",
    "Spatial Solute": "空间溶质",
    "Spatial Solution": "空间解决方案",
    "Spatial Solvent": "空间溶剂",
    "The ADverse can no longer contain your space. Expand into the PTverse. Oh, and automatically buy max.": "ADverse 不能再包含您的空间。 扩展到 PTverse。 哦，自动购买最大值。",
    "The PTverse has run out of space. Ascend to the DIverse.": "PTverse 已用完空间。 上升到 DIverse。",
    "Tickspeed affects time speed at a reduced rate.": "Tick速度 以降低的速率影响时间速度。",
    "Tickspeed upgrades are more effective.": "Tick速度 升级更有效。",
    "Time and space inductors scale 25% slower.": "时间和空间电感器的缩放速度慢 25%。",
    "Time Problem": "时间问题",
    "Time Solute": "时间溶解",
    "Time Solution": "时间解决方案",
    "Time speed affects AD, and tickspeed boosts the generator base.": "时间速度会影响 AD，而滴答速度会提升生成器基础。",
    "Unlock a new mechanisation.": "解锁新的机制。",
    "Unrelativity": "非相对性",
    "Volume of universe": "宇宙体积",
    "Von Neumann Paradox": "冯诺依曼悖论",
    "Von Neumann Transformation": "冯诺依曼变换",
    "Your particles are moving and expanding because of heat.": "由于热量，您的粒子正在移动和膨胀。",
    "Autobuy time, space and enhance inductors.": "自动购买时间、空间和增强电感器。",
    "Disable respec confirmation": "禁用 重洗 确认",
    "Fix the broken generator, so that it provides a constant boost instead of a sinusoidal boost.": "修复损坏的发生器，使其提供恒定的提升而不是正弦提升。",
    "Fix the generator": "修理发生器",
    "rocket boosters": "火箭助推器",
    "Respec": "重洗",
    "Autobuy rocket engines, and they don't reset anything.": "自动火箭引擎，他们不会重置任何东西。",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\t\t": "\t\t",
    "\t": "\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Your best gifts is ": "你最多时候的礼物是 ",
    "Joy: ": "乐趣: ",
    "Your best money is ": "你最多时候的钱是",
    "Your best machine parts is ": "您最多时候的机器零件是 ",
    "Particle effects: ": "粒子效果: ",
    "Shift-Click to Toggle Tooltips: ": "按住 Shift 键单击以切换工具提示：",
    "boost gift rewards: ": "提升礼物奖励：",
    "boost machine parts gain: ": "提升机器零件增益：",
    "boost money gain: ": "提升金钱增益：",
    "Ascension ": "转生 ",
    "Improve chances of winning Minceraft, DOM and Hexis by x": "提高赢得 我的世界、引擎 和 Hexis 的几率 x",
    "Improve chances of winning Minceraft, Seleste and The Cable by x": "提高赢得 我的世界、蔚蓝 和 王牌特派员 的几率 x",
    "Improve chances of winning Seleste, DOM and Teleportal by x": "提高赢得 蔚蓝、引擎 和 传送门 的几率 x",
    "Improve chances of winning Teleportal, Hexis and The Cable by x": "提高赢得 传送门、Hexis 和 王牌特派员 的几率 x",
    "Double acceleration and quintuple maximum velocity if your level is at least ": "如果您的级别至少为两倍加速度和五倍最大速度",
    "Level ": "等级 ",
    "Tier ": "层 ",
    "Time speed: ": "时间速度: ",
    "Your best prestige points is ": "你最佳的声望点是 ",
    "Boost christmas point gain by x": "将圣诞点数增益提高 x",
    "Rocket gain is multiplied by rocket engines": "火箭增益乘以火箭引擎",
    "Boost gift rewards based on prestige points. Currently: x": "根据声望点增加礼物奖励。 目前：x",
    "Boost prestige points based on machine parts. Currently:": "根据机器零件提高声望点。 目前：",
    "Boost machine parts gain based on distance. Currently:": "根据距离提高机器零件增益。 目前：",
    "Boost game success chance based on distance. Currently:": "根据距离提高游戏成功率。 目前：",
    "Boost christmas point gain based on coal. Currently:": "提高基于煤炭的圣诞点数增益。 目前：",
    "Boost rocket gain based on ascensions. Currently:": "提升基于转生的火箭增益。 目前：",
    "Christmas points boost christmas points, acceleration and max velocity by": "圣诞点数可提高圣诞点数、加速度和最大速度",
    "Increase induction wave amplitude by": "将感应波振幅增加",
    "Multiply booster base based on joy. Currently:": "乘以基于快乐的助推器基数。 目前：",
    "Multiply joy based on generator effect. Currently:": "基于发生器效果乘以快乐。 目前：",
    "Skills scale slower based on prestige poitns. Currently:": "根据声望点，技能的扩展速度变慢。 目前：",
    "Muliply orange photon generation by": "将橙色光子生成乘以",
    "Multiply orange photon generation by": "将橙色光子生成乘以",
    "Muliply red photon generation by": "乘以红色光子生产",
    "Multiply red photon generation by": "乘以红色光子生产",
    "Muliply blue photon generation by": "乘以蓝色光子生产",
    "Multiply blue photon generation by": "乘以蓝色光子生产",
    "Muliply green photon generation by": "乘以绿色光子生产",
    "Multiply green photon generation by": "乘以绿色光子生产",
    "Multiply charger effect by": "将充电器效果乘以",
    "multiplying the generation of all wavelengths by": "将所有波长的生产乘以",
    "Increase effective photonic and antimatter condensers by": "增加有效的光子和反物质冷凝器",
    "increasing DI, PT, AD and IE gain by": "增加 DI、PT、AD 和 IE 增益",
    "Time left:": "时间剩余:",
    "Your best hyper-infinities is": "你最佳的超无限是",
    "Divide festive energy upgrade costs by": "将节日能量升级成本除以",
    "Req: Energy exponent of ": "需要: 能量指数",
    "Multiply yellow photon generation by x": "将黄色光子生成乘以 x",
    "Your best dimension boosters is ": "你最佳的 维度助推器 是 ",
    "Increase prestige point gain by x": "声望点增益增加 x",
    "increasing rocket effect and velocity by ": "增加火箭效应和速度",
    "Multiply scrap gain by x": "将废料收益乘以 x",
    "scraps (": "废料 (",
    "Energy (": "能量 (",
    "TickSpeed: ": "Tick速度: ",
    "In addition, they raise rocket engines' power to ": "此外，他们将火箭引擎的功率提高到 ",
    "Your best rocket boosters is ": "你最佳的火箭助推器是 ",
    "Rocket Spec ": "火箭重洗 ",
    "Scrap Spec ": "废料重洗 ",
    "Speed Spec ": "速度重洗 ",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": " ",
    "\n": "",
    "\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n": "\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n",
    "\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n": "\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n",
    "\n\t\t\t\t\n\t\t\t\t\n": "\n\t\t\t\t\n\t\t\t\t\n",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    "\n": "\n",
    "s til next gift": "秒 到下一个礼物",
    " to gift rewards": " 礼物奖励",
    " to present rewards": " 礼物奖励",
    " to coal rewards": " 煤奖励",
    " to coal gain": " 煤增益",
    " to gift gain": " 礼物增益",
    " to machine parts gain": " 机器零件增益",
    " to fire gain": " 火增益",
    " to money gain": " 金钱增益",
    " to present gain": " 礼物增益",
    " rewards when opening gifts": " 开启礼物时的奖励",
    " to games gain": " 到游戏增益",
    " christmas point/sec. Yay!": "圣诞点/秒。 耶！",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)m ([\d\.]+)s$/,
    /^([\d\.]+)$/,
    /^([\d\.]+)s$/,
    /^([\d\.]+)x$/,
    /^x([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^e([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^ x([\d\.]+)e([\d\.,]+)$/,
    /^\/([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^You have made a total of (.+) gifts$/, '您总共制作了 $1 份礼物'],
    [/^Sell your toy collection for (.+) money.$/, '以 $1 的价格出售您的玩具收藏。'],
    [/^giving (.+) to joy, but you are losing (.+) of it every second$/, '给予 $1 快乐，但你每秒失去 $2'],
    [/^After opening (.+) gifts, maybe it\'s time to build something to do it for you.$/, '打开 $1 份礼物后，也许是时候为您打造一些东西了。'],
    [/^You have (.+) coal in the burning pile, but (.+) of it is being burnt every second.$/, '您的燃烧堆中有 $1 煤，但每秒有 $2 的煤正在燃烧。'],
    [/^You have made a total of (.+) machine parts$/, '您总共制造了 $1 个机器零件'],
    [/^You have made a total of (.+) money$/, '你总共赚了 $1 钱'],
//    [/^(.+)\: x(.+) velocity(.+)\: (.+) acceleration(.+)$/, '$1： x$2 速度$3：$4 加速度$5'],
    [/^\[([\d\.]+)x([\d\.]+)\]\: x(.+) velocity\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: \+(.+) acceleration\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: x(.+) velocity based on levels\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: x(.+) acceleration and maximum velocity\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: x(.+) velocity based on tiers\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: x(.+) acceleration and maximum velocity based on levels and tiers\n$/, '\[$1x$2\]\: x$3 速度\n\t\t\t\t\[$4x$5\]\: \+$6 加速度\n\t\t\t\t\[$7x$8\]\: x$9 速度基于等级\n\t\t\t\t\[$10x$11\]\: x$12 加速度和最大速度\n\t\t\t\t\[$13x$14\]\: x$15 速度基于层级\n\t\t\t\t\[$16x$17\]\:: x$18 加速度和最大速度基于等级和层级\n'],
    [/^\[([\d\.]+)x([\d\.]+)\]\: x(.+) velocity\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n$/, '\[$1x$2\]\: x$3 速度\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n'],
    [/^\[([\d\.]+)x([\d\.]+)\]\: x(.+) velocity\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: \+(.+) acceleration\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n$/, '\[$1x$2\]\: x$3 速度\n\t\t\t\t\[$4x$5\]\: \+$6 加速度\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n'],
    [/^\[([\d\.]+)x([\d\.]+)\]\: x(.+) velocity\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: \+(.+) acceleration\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: x(.+) velocity based on levels\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n$/, '\[$1x$2\]\: x$3 速度\n\t\t\t\t\[$4x$5\]\: \+$6 加速度\n\t\t\t\t\[$7x$8\]\: x$9 速度基于等级\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n'],
    [/^\[([\d\.]+)x([\d\.]+)\]\: x(.+) velocity\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: \+(.+) acceleration\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: x(.+) velocity based on levels\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: x(.+) acceleration and maximum velocity\n\t\t\t\t\n\t\t\t\t\n$/, '\[$1x$2\]\: x$3 速度\n\t\t\t\t\[$4x$5\]\: \+$6 加速度\n\t\t\t\t\[$7x$8\]\: x$9 速度基于等级\n\t\t\t\t\[$10x$11\]\: x$12 加速度和最大速度\n\t\t\t\t\n\t\t\t\t\n'],
    [/^\[([\d\.]+)x([\d\.]+)\]\: x(.+) velocity\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: \+(.+) acceleration\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: x(.+) velocity based on levels\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: x(.+) acceleration and maximum velocity\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: x(.+) velocity based on tiers\n\t\t\t\t\n$/, '\[$1x$2\]\: x$3 速度\n\t\t\t\t\[$4x$5\]\: \+$6 加速度\n\t\t\t\t\[$7x$8\]\: x$9 速度基于等级\n\t\t\t\t\[$10x$11\]\: x$12 加速度和最大速度\n\t\t\t\t\[$13x$14\]\: x$15 速度基于层级\n\t\t\t\t\n'],
    [/^\[([\d\.]+)x([\d\.]+)\]\: x(.+) velocity\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: \+(.+) acceleration\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: x(.+) velocity based on levels\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: x(.+) acceleration and maximum velocity\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: x(.+) velocity based on tiers\n\t\t\t\t\[([\d\.]+)x([\d\.]+)\]\: x(.+) acceleration and maximum velocity based on levels and tiers\n$/, '\[$1x$2\]\: x$3 速度\n\t\t\t\t\[$4x$5\]\: \+$6 加速度\n\t\t\t\t\[$7x$8\]\: x$9 速度基于等级\n\t\t\t\t\[$10x$11\]\: x$12 加速度和最大速度\n\t\t\t\t\[$13x$14\]\: x$15 速度基于层级\n\t\t\t\t\[$16x$17\]\: x$18 加速度和最大速度基于等级和层级\n'],
    [/^making acceleration and maximum velocity boost themselves by (.+), and multiplying velocity by x(.+)$/, '使加速度和最大速度提高 $1，并将速度乘以 x$2'],
    [/^Gain (.+) of prestige points gained on reset every second.$/, '每秒获得重置时获得的声望点的 $1。'],
    [/^Produce (.+) leaves\/s.\n\t\t\t\tUnits\: (.+)$/, '产生 $1 树叶\/秒。\n\t\t\t\t单位：$2'],
    [/^ascensions (.+) total$/, '转生 $1 总计'],
    [/^Velocity: (.+)\/s\n\t\t\t\(Maximum Velocity\: (.+)\/s\)$/, '速度：$1\/秒\n\t\t\t（最大速度：$2\/秒）'],
    [/^Acceleration: (.+)\/s(.+)$/, '加速度：$1\/秒$2'],
    [/^Make level scaling (.+) slower.\n$/, '使等级缩放速度降低 $1。\n'],
    [/^Make level scaling (.+) slower for each tier, up to (.+) tiers.\n$/, '使每一层的级别缩放速度降低 $1，最多 $2 层。\n'],
    [/^Add (.+) to photonic energy exponent$/, '将 光子能量 指数增加 $1'],
    [/^Add (.+) to luminal energy exponent$/, '将 发光能量 指数增加 $1'],
    [/^Add (.+) to festive energy exponent$/, '将 节日能量 指数增加 $1'],
    [/^Add (.+) free levels to first (.+) luminal energy upgrades$/, '前 $2 次发光能量升级增加 $2 免费等级'],
    [/^Add (.+) free photon condenser levels to all wavelengths except this one$/, '添加 $1 免费光子冷凝器等级 到除此以外的所有波长'],
    [/^adding (.+) levels to first (.+) energy upgrades$/, '前 $2 次能量升级 增加 $1 等级'],
    [/^Buy a blue condenser.\n\t\t\tLevel: (.+)\n\t\t\tEffect: (.+) base blue gen.\/s\n\t\t\tCost: (.+) photonic energy$/, '购买 蓝色 冷凝器。\n\t\t\t 等级：$1\n\t\t\dt 效果：$2 基础 蓝色生成。\/秒\n\t\t\t成本：$3 光子能量'],
    [/^Buy a green condenser.\n\t\t\tLevel: (.+)\n\t\t\tEffect: (.+) base green gen.\/s\n\t\t\tCost: (.+) photonic energy$/, '购买 绿色 冷凝器。\n\t\t\t 等级：$1\n\t\t\dt 效果：$2 基础 绿色生成。\/秒\n\t\t\t成本：$3 光子能量'],
    [/^Buy a orange condenser.\n\t\t\tLevel: (.+)\n\t\t\tEffect: (.+) base orange gen.\/s\n\t\t\tCost: (.+) photonic energy$/, '购买 橙色 冷凝器。\n\t\t\t 等级：$1\n\t\t\dt 效果：$2 基础 橙色生成。\/秒\n\t\t\t成本：$3 光子能量'],
    [/^Buy a red condenser.\n\t\t\tLevel: (.+)\n\t\t\tEffect: (.+) base red gen.\/s\n\t\t\tCost: (.+) photonic energy$/, '购买 红色 冷凝器。\n\t\t\t 等级：$1\n\t\t\dt 效果：$2 基础 红色生成。\/秒\n\t\t\t成本：$3 光子能量'],
    [/^Buy a yellow condenser.\n\t\t\tLevel: (.+)\n\t\t\tEffect: (.+) base yellow gen.\/s\n\t\t\tCost: (.+) photonic energy$/, '购买 黄色 冷凝器。\n\t\t\t 等级：$1\n\t\t\dt 效果：$2 基础 黄色生成。\/秒\n\t\t\t成本：$3 光子能量'],
    [/^Buy a indigo condenser.\n\t\t\tLevel: (.+)\n\t\t\tEffect: (.+) base indigo gen.\/s\n\t\t\tCost: (.+) photonic energy$/, '购买 靛蓝色 冷凝器。\n\t\t\t 等级：$1\n\t\t\dt 效果：$2 基础 靛蓝色生成。\/秒\n\t\t\t成本：$3 光子能量'],
    [/^Buy a violet condenser.\n\t\t\tLevel: (.+)\n\t\t\tEffect: (.+) base violet gen.\/s\n\t\t\tCost: (.+) photonic energy$/, '购买 紫色 冷凝器。\n\t\t\t 等级：$1\n\t\t\dt 效果：$2 基础 紫色生成。\/秒\n\t\t\t成本：$3 光子能量'],
    [/^Currently: x(.+)th dimension multiplier and prestige point gain$/, '当前：x$1th 乘数和声望点增益'],
    [/^Reset to gain (.+) base luminal energy, and increase the luminal energy exponent by (.+).\n$/, '重置以获得 $1 基础光能，并将光能指数增加 $2。\n'],
    [/^You are gaining (.+) shards\/s based on dimension boosters.$/, '基于维度助推器，您将获得 $1 碎片\/秒。'],
    [/^Produce photonic energy based on luminal energy.\n\t\t\t\tLevel: (.+)\n\t\t\t\tCurrently: (.+) photonic energy exponent$/, '根据发光能量产生光子能量。\n\t\t\t\t等级：$1\n\t\t\t\t当前：$2 光子能量指数'],
    [/^Increase luminal energy exponent based on energy.\n\t\t\t\tLevel: (.+)\n\t\t\t\tCurrently: (.+)$/, '根据 能量 增加发光能量指数。\n\t\t\t\t等级: $1\n\t\t\t\t当前: $2'],
    [/^Increase energy exponent based on lumin resets.\n\t\t\t\tLevel: (.+)\n\t\t\t\tCurrently: (.+)$/, '根据 发光重置 增加能量指数。\n\t\t\t\t等级: $1\n\t\t\t\t当前: $2'],
    [/^Increase energy exponent by (.+).\n\t\t\t\tLevel: (.+)\n\t\t\t\tCurrently: (.+)$/, '能量指数增加 $1。\n\t\t\t\t等级：$2\n\t\t\t\t当前：$3'],
    [/^You are gaining (.+) antimatter per second.$/, '你每秒获得 $1 反物质。'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
    [/^Next at (.+) distance$/, '下一个在 $1 距离'],
    [/^rocket engine.\n\t\t\t\tReq\: (.+) rockets$/, '火箭引擎.\n\t\t\t\t需要\: $1 火箭'],
    [/^You have done (.+) lumin resets$/, '您已完成 $1 发光重置'],
    [/^Once every (.+) game-time minutes, gain (.+) real-time minutes of distance.$/, '每 $1 游戏时间的分钟，获得 $2 真实时间的分钟 的距离。'],
    [/^Once every (.+) game-time minutes, gain (.+) of your rocket gain.$/, '每 $1 游戏时间的分钟，再次获得 $2 你的火箭。'],
    [/^You have (.+) specifications left.$/, '您还剩 $1 重洗。'],
    [/^You have (.+) pseudo-distance, which is the first integral of distance.$/, '你有 $1 伪距离，这是距离的第一个积分。'],
    [/^You have (.+) festive energy$/, '你有 $1 节日能量'],
    [/^You have (.+) money$/, '你有 $1 金钱'],
    [/^You have (.+) distance$/, '你有 $1 距离'],
    [/^Multiply rocket gain by (.+).\n\t\t\t\tUnits: (.+)\n\t\t\t\tCurrently: (.+)\n\t\t\t\tCost: (.+) specifications/, '将 火箭 增益乘以 $1。\n\t\t\t\t单位：$2\n\t\t\t\t当前：$3\n\t\t\t\t成本：$4 重洗'],
    [/^Multiply accceleration and max velocity by (.+).\n\t\t\t\tUnits: (.+)\n\t\t\t\tCurrently: (.+)\n\t\t\t\tCost: (.+) specifications/, '将 加速度和最大速度 乘以 $1。\n\t\t\t\t单位：$2\n\t\t\t\t当前：$3\n\t\t\t\t成本：$4 重洗'],
    [/^Multiply prestige point gain by (.+).\n\t\t\t\tUnits: (.+)\n\t\t\t\tCurrently: (.+)\n\t\t\t\tCost: (.+) specifications/, '将 声望点 增益乘以 $1。\n\t\t\t\t单位：$2\n\t\t\t\t当前：$3\n\t\t\t\t成本：$4 重洗'],
    [/^Raise rocket gain to (.+).\n\t\t\t\tUnits: (.+)\n\t\t\t\tCurrently: (.+)\n\t\t\t\tCost: (.+) specifications$/, '将 火箭 收益提高到 $1。\n\t\t\t\t单位：$2\n\t\t\t\t当前：$3\n\t\t\t\t成本：$4 重洗'],
    [/^Raise accceleration and max velocity to (.+).\n\t\t\t\tUnits: (.+)\n\t\t\t\tCurrently: (.+)\n\t\t\t\tCost: (.+) specifications$/, '将 加速度和最大速度 提高到 $1。\n\t\t\t\t单位：$2\n\t\t\t\t当前：$3\n\t\t\t\t成本：$4 重洗'],
    [/^Raise prestige point gain to (.+).\n\t\t\t\tUnits: (.+)\n\t\t\t\tCurrently: (.+)\n\t\t\t\tCost: (.+) specifications$/, '将 声望点 收益提高到 $1。\n\t\t\t\t单位：$2\n\t\t\t\t当前：$3\n\t\t\t\t成本：$4 重洗'],
    [/^Raise scrap gain to (.+).\n\t\t\t\tUnits: (.+)\n\t\t\t\tCurrently: (.+)\n\t\t\t\tCost: (.+) specifications$/, '将 废料 收益提高到 $1。\n\t\t\t\t单位：$2\n\t\t\t\t当前：$3\n\t\t\t\t成本：$4 重洗'],
    [/^You are employing (.+) elves per second, but (.+) of them are leaving every second.$/, '你每秒雇佣 $1 精灵，但每秒有 $2 的精灵离开。'],
    [/^You have employed (.+) elves, which are giving (.+) specifications.$/, '你雇佣了 $1 精灵，它们给出了 $2 重洗。'],
    [/^You have made a total of (.+) prestige points$/, '你总共获得了 $1 声望点数'],
    [/^(.+) base power\n\t\t\t\tCost: (.+)$/, '$1 基础功率\n\t\t\t\t成本：$2'],
    [/^x(.+) space\n\t\t\t\tCost: (.+)$/, 'x$1 空间\n\t\t\t\t成本：$2'],
    [/^x(.+)\n\t\t\t\tCost: (.+)$/, 'x$1\n\t\t\t\t成本：$2'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^(.+) velocity(.+) acceleration(.+) velocity based on levels(.+) acceleration and maximum velocity(.+) velocity based on tiers(.+)$/, '$1 速度$2 加速度$3速度 基于等级$4  加速度和最大速度$5 速度基于层$6'],
    [/^You are gaining (.+) machine parts per second$/, '您每秒获得 $1 个机器零件'],
    [/^(.+) coal\/s\n\t\t\t\t(.+) increase to chance of getting toys instead of coal$/, '$1 煤\/秒\n\t\t\t\t\t$2 增加获得玩具而不是煤的几率'],
    [/^Automatically opens (.+) gifts per tick\n\t\t\t\t(.+) machine parts$/, '每 tick 自动开启 $1 个礼物\n\t\t\t\t $2 个机器零件'],
    [/^(.+) money gain\n\t\t\t\t(.+) machine parts$/, '$1 金钱增益\n\t\t\t\t$2 机器零件'],
    [/^Increase induction frequency by x(.+)\n\t\t\tIncrease time speed by x(.+)$/, '感应频率增加 x$1\n\t\t\t 时间速度增加 x$2'],
    [/^Next at (.+) money$/, '下一个在 $1 金钱'],
    [/^log(.+)\(distance\+(.+)\) boosts acceleration and maximum velocity.\n$/, 'log$1\(距离\+$2\) 提升加速度和最大速度.\n'],
    [/^(.+) present gain speed\n\t\t\t\t(.+) machine parts$/, '$1 礼物增益速度\n\t\t\t\t $2机器零件'],
    [/^Size\: (.+)\n\t\t\t\t(.+) joy\n\t\t\t\t(.+) to toy gain$/, '尺寸：$1\n\t\t\t\t$2 快乐\n\t\t\t\t$3 到玩具增益'],
    [/^Size\: (.+)\n\t\t\t\t\+(.+) joy$/, '尺寸\: $1\n\t\t\t\t\+$2 玩具'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^(.+) chance of winning$/, '$1 几率获胜'],
	[/^(.+)\/(.+) games$/, '$1\/$2 游戏'],
	[/^Req\: (.+)\/(.+) festive energy$/, '需要：$1\/$2 节日能量'],
	[/^(.+)\/(.+) festive energy$/, '$1\/$2 节日能量'],
	[/^(.+)\/(.+) money$/, '$1\/$2 钱'],
	[/^(.+)\/(.+) coal$/, '$1\/$2 煤'],
	[/^(.+)\/(.+) fire$/, '$1\/$2 火'],
	[/^(.+)\/(.+) toys$/, '$1\/$2 玩具'],
	[/^(.+)\/(.+) machine parts$/, '$1\/$2 机器零件'],
	[/^(.+)\/(.+) toy collections$/, '$1\/$2 玩具收藏'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+).\n\t\t\t\tUnits: (.+)\n\t\t\t\tCurrently: x(.+)\n\t\t\t\tCost: (.+) specifications$/, '$1e$2.\n\t\t\t\t单位：$3\n\t\t\t\t当前：x$4\n\t\t\t\t成本：$5 规格'],
    [/^([\d\.]+)e([\d\.,]+) stored prestige points$/, '$1e$2 存储的声望点'],
    [/^([\d\.]+)e([\d\.,]+) machine parts$/, '$1e$2 机器零件'],
    [/^([\d\.]+)e([\d\.,]+) gifts/, '$1e$2 礼物'],
    [/^([\d\.]+)e([\d\.,]+) money/, '$1e$2 钱'],
    [/^([\d\.]+)e([\d\.,]+) Games/, '$1e$2 游戏'],
    [/^([\d\.]+)e([\d\.,]+) distance$/, '$1e$2 距离'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^([\d\.]+)e([\d\.,]+) prestige points$/, '$1e$2 声望点'],
    [/^([\d\.]+)e([\d\.,]+) antimatter$/, '$1e$2 反物质'],
    [/^([\d\.]+)e([\d\.,]+) festive energy$/, '$1e$2 节日能量'],
    [/^([\d\.]+)e([\d\.,]+) Games.$/, '$1e$2 游戏。'],
    [/^([\d\.]+)e([\d\.,]+) coal.$/, '$1e$2 煤。'],
    [/^([\d\.]+)e([\d\.,]+) toys.$/, '$1e$2 玩具。'],
    [/^x([\d\.]+)e([\d\.,]+) generator base$/, '$1e$2 发生器基数'],
    [/^x([\d\.]+)e([\d\.,]+) later$/, '$1e$2 之后'],
    [/^([\d\.]+) elves$/, '$1 精灵'],
    [/^([\d\.]+)e([\d\.,]+) money$/, '$1e$2 金钱'],
    [/^([\d\.,]+) toys.$/, '$1 玩具。'],
    [/^([\d\.]+) leaves$/, '$1 树叶'],
    [/^([\d\.]+) Games.$/, '$1 游戏。'],
    [/^([\d\.]+) toys.$/, '$1 玩具。'],
    [/^Dimension ([\d\.,]+)$/, '维度 $1'],
    [/^Boil\^([\d\.,]+)$/, '沸腾\^$1'],
    [/^Condense\^([\d\.,]+)$/, '浓缩\^$1'],
    [/^Set ([\d\.,]+)$/, '设定 $1'],
    [/^([\d\.,]+) hyper-infinity$/, '$1 超无限'],
    [/^([\d\.,]+) rocket booster$/, '$1 火箭助推器'],
    [/^([\d\.,]+) stored prestige points$/, '$1 存储的声望点'],
    [/^([\d\.,]+) dimension booster$/, '$1 维度助推器'],
    [/^([\d\.,]+) dimension boosters$/, '$1 维度助推器'],
    [/^([\d\.,]+) hyper-infinities$/, '$1 超无限'],
    [/^([\d\.,]+) rocket boosters$/, '$1 火箭助推器'],
    [/^([\d\.,]+) boosters$/, '$1 助推器'],
    [/^([\d\.,]+) generators$/, '$1 发生器'],
    [/^([\d\.,]+) distance$/, '$1 距离'],
    [/^([\d\.,]+) Games.$/, '$1 游戏。'],
    [/^([\d\.,]+) coal.$/, '$1 煤。'],
    [/^([\d\.,]+) enhance inductors$/, '$1 增强感应器'],
    [/^([\d\.,]+) space inductors$/, '$1 空间感应器'],
    [/^([\d\.,]+) time inductors$/, '$1 时间感应器'],
    [/^([\d\.,]+) time and space inductors$/, '$1 时间和空间感应器'],
    [/^([\d\.,]+) prestige points$/, '$1 声望点'],
    [/^([\d\.,]+) total ascensions$/, '$1 总转生'],
    [/^([\d\.,]+) machine parts$/, '$1 机器零件'],
    [/^e([\d\.,]+) machine parts$/, 'e$1 机器零件'],
    [/^([\d\.,]+) festive energy$/, '$1 节日能量'],
    [/^e([\d\.,]+) festive energy$/, 'e$1 节日能量'],
    [/^([\d\.,]+) antimatter$/, '$1 反物质'],
    [/^e([\d\.,]+) antimatter$/, 'e$1 反物质'],
    [/^([\d\.,]+) money$/, '$1 金钱'],
    [/^e([\d\.,]+) money$/, 'e$1 金钱'],
    [/^([\d\.,]+) gifts$/, '$1 礼物'],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^Attempt: (.+) games$/, '尝试：$1 游戏'],
    [/^Cost: ([\d\.,]+)$/, '成本：$1'],
    [/^Cost: ([\d\.]+)e([\d\.,]+)$/, '成本：$1e$2'],
    [/^Cost: (.+) scraps$/, '成本：$1 废料'],
    [/^Cost: (.+) luminal energy$/, '成本：$1 发光能量'],
    [/^Cost: (.+) festive energy$/, '成本：$1 节日能量'],
    [/^Req: (.+) \/ (.+) elves$/, '需要：$1 \/ $2 精灵'],
    [/^Req: (.+) festive energy$/, '成本：$1 节日能量'],
    [/^Req: (.+) antimatter$/, '需要：$1 反物质'],
    [/^Req: (.+) levels$/, '需要：$1 等级'],
    [/^Build Progress: (.+) shards$/, '构建进度：$1 碎片'],
    [/^Req: (.+) points$/, '需要：$1 点数'],
    [/^Req: (.+) rockets$/, '需要：$1 火箭'],
    [/^Req: (.+) prestige points$/, '需要：$1 声望点'],
    [/^Req: (.+) distance$/, '需要：$1 距离'],
    [/^Req: (.+)th dimensions$/, '需要：$1th 维度'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);