var canvas;
var ctx;

window.addEventListener("resize", (_=>resizeCanvas()));

function retrieveCanvasData() {
	let treeCanv = document.getElementById("treeCanvas")
	let treeTab = document.getElementById("treeTab")
	if (treeCanv===undefined||treeCanv===null) return false;
	canvas = treeCanv;
	ctx = canvas.getContext("2d");
	return true;
}

function resizeCanvas() {
	if (!retrieveCanvasData()) return
	canvas.width = 0;
    canvas.height = 0;
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
		drawTree();
}


var colors_theme

function drawTree() {
	if (!retrieveCanvasData()) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.moveTo(-5, canvas.height*0.8);
	ctx.quadraticCurveTo(canvas.width/5.5, canvas.height*0.65, canvas.width/3 + 30, canvas.height*0.85);
	ctx.moveTo(canvas.width/3.25, canvas.height*0.8);
	ctx.quadraticCurveTo(canvas.width/2, canvas.height*0.65, canvas.width/1.5, canvas.height + 6);
	ctx.lineTo(-6, canvas.height + 6);
	ctx.lineTo(-6, canvas.height*0.8);
	ctx.strokeStyle = "#aaa";
	ctx.lineWidth = 8;
	ctx.fillStyle = "#ddd"
	ctx.fill();
	ctx.stroke();

	let gr = ctx.createLinearGradient(0, canvas.height*0.85 - 15, 0, canvas.height*0.85 + 25);
	gr.addColorStop(0, "#ddd");
	gr.addColorStop(0.3, "#999");
	gr.addColorStop(1, "#ddd");
	ctx.fillStyle = gr;
	ctx.fillRect(canvas.width*0.10 - 6, canvas.height*0.85 - 15, 132, 35);
	ctx.fillStyle = "#964";
	for (let i = 0; i < 5; i++)
		ctx.fillRect(canvas.width*0.10 - 2, canvas.height*0.85 - i*16, 124, 8);
	ctx.fillStyle = "#743";
	for (let i = 0; i < 4; i++)
		ctx.fillRect(canvas.width*0.10 + 2, canvas.height*0.85 - i*16 - 8, 116, 8);
	ctx.fillStyle = "#521";
	ctx.beginPath();
	ctx.moveTo(canvas.width*0.10 - 3, canvas.height*0.85 - 96);
	ctx.lineTo(canvas.width*0.10 + 123, canvas.height*0.85 - 96);
	ctx.lineTo(canvas.width*0.10 + 128, canvas.height*0.85 - 64);
	ctx.lineTo(canvas.width*0.10 - 8, canvas.height*0.85 - 64);
	ctx.fill();
	ctx.fillStyle = "#ccc"
	ctx.fillRect(canvas.width*0.10 + 12, canvas.height*0.85 - 54, 36, 36);
	ctx.fillStyle = "#7ab"
	ctx.fillRect(canvas.width*0.10 + 14, canvas.height*0.85 - 52, 15, 15);
	ctx.fillRect(canvas.width*0.10 + 14, canvas.height*0.85 - 35, 15, 15);
	ctx.fillRect(canvas.width*0.10 + 31, canvas.height*0.85 - 52, 15, 15);
	ctx.fillRect(canvas.width*0.10 + 31, canvas.height*0.85 - 35, 15, 15);

	for (layer in layers){
		if (tmp[layer].layerShown == true && tmp[layer].branches){
			for (branch in tmp[layer].branches)
				{
					drawTreeBranch(layer, tmp[layer].branches[branch])
				}
		}
		drawComponentBranches(layer, tmp[layer].upgrades, "upgrade-")
		drawComponentBranches(layer, tmp[layer].buyables, "buyable-")
		drawComponentBranches(layer, tmp[layer].clickables, "clickable-")

	}
}

function drawComponentBranches(layer, data, prefix) {
	for(id in data) {
		if (data[id].branches) {
			for (branch in data[id].branches)
			{
				drawTreeBranch(id, data[id].branches[branch], prefix + layer + "-")
			}

		}
	}

}

function drawTreeBranch(num1, data, prefix) { // taken from Antimatter Dimensions & adjusted slightly
	let num2 = data
	let color_id = 1
	let width = 15
	if (Array.isArray(data)){
		num2 = data[0]
		color_id = data[1]
		width = data[2] || width
	}

	if(typeof(color_id) == "number")
		color_id = colors_theme[color_id]
	if (prefix) {
		num1 = prefix + num1
		num2 = prefix + num2
	}
	if (document.getElementById(num1) == null || document.getElementById(num2) == null)
		return

	let start = document.getElementById(num1).getBoundingClientRect();
    let end = document.getElementById(num2).getBoundingClientRect();
    let x1 = start.left + (start.width / 2) + document.body.scrollLeft;
    let y1 = start.top + (start.height / 2) + document.body.scrollTop;
    let x2 = end.left + (end.width / 2) + document.body.scrollLeft;
    let y2 = end.top + (end.height / 2) + document.body.scrollTop;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.strokeStyle = color_id
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
