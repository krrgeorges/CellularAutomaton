var drawMode = false;

var bgColor = "red"
var pencilColor = "blue"

var n_generation = 0
var epoch_mech = null

function buildGrid(m,n,bgColor,pencilColor,randomized){
	document.getElementById("grid").innerHTML = ""
	var table = document.createElement("table")
	table.id = "mainGrid"
	table.cellSpacing = 0
	table.cellPadding = 0
	for(var i=0;i<=m-1;i++){
	    var tr = document.createElement("tr")
	    for(var j=0;j<=n-1;j++){
	        var td = document.createElement("td")
	        // td.style.border="0.01em solid black"
	        td.style.width="5px";td.style.height="5px";
	        if(randomized == 1){td.style.backgroundColor = Math.floor(Math.random() * 2)==0?bgColor:pencilColor;}
	        else{td.style.backgroundColor = bgColor}
	        
	        td.dataset.i = i
	        td.dataset.j = j
	        td.id = i.toString()+"_"+j.toString()
	        tr.appendChild(td)
	    }
	    table.appendChild(tr)
	}
	table.onmousemove = function(e){
		if(drawMode){document.elementFromPoint(e.clientX,e.clientY).style.backgroundColor = pencilColor;}
	}
	table.onclick = function(){
		if(drawMode){
			drawMode = false
			document.getElementById("mode_type").innerText = "OFF"
		}
		else{
			drawMode = true
			document.getElementById("mode_type").innerText = "ON"	
		}
	}
	document.getElementById("grid").appendChild(table)
}

function obtainRelativeTD(table,xi,yj,tds){
	var element = tds[xi.toString()+"_"+yj.toString()]==undefined?bgColor+"s":tds[xi.toString()+"_"+yj.toString()]
	return element
}

function simulate(){
	var table = document.getElementById("mainGrid")
	var mtds = table.getElementsByTagName("td")
	var tds = {}
	for(td in mtds){
		try{
			tds[mtds[td].id] = mtds[td].style.backgroundColor
		}
		catch(err){continue}
	}
	var td = null
	var populated = false
	var element = null
	var neighborings = []
	var neighbors = 0;
	var xi = null;var yj = null;
	for(tdid in mtds){
		td = mtds[tdid]
		populated = false
		try{
			if(td.style.backgroundColor != bgColor){populated = true}
		}
		catch(err){
			continue
		}
		neighbors = 0
		neighborings = []
		xi = parseInt(td.dataset.i)-1
		yj = parseInt(td.dataset.j)
		neighborings.push(obtainRelativeTD(table,xi,yj,tds))
		xi = parseInt(td.dataset.i)-1
		yj = parseInt(td.dataset.j)-1
		neighborings.push(obtainRelativeTD(table,xi,yj,tds))
		xi = parseInt(td.dataset.i)-1
		yj = parseInt(td.dataset.j)+1
		neighborings.push(obtainRelativeTD(table,xi,yj,tds))
		xi = parseInt(td.dataset.i)+1
		yj = parseInt(td.dataset.j)
		neighborings.push(obtainRelativeTD(table,xi,yj,tds))
		xi = parseInt(td.dataset.i)+1
		yj = parseInt(td.dataset.j)-1
		neighborings.push(obtainRelativeTD(table,xi,yj,tds))
		xi = parseInt(td.dataset.i)+1
		yj = parseInt(td.dataset.j)+1
		neighborings.push(obtainRelativeTD(table,xi,yj,tds))
		xi = parseInt(td.dataset.i)
		yj = parseInt(td.dataset.j)-1
		neighborings.push(obtainRelativeTD(table,xi,yj,tds))
		xi = parseInt(td.dataset.i)
		yj = parseInt(td.dataset.j)+1
		neighborings.push(obtainRelativeTD(table,xi,yj,tds))
		for(n in neighborings){
			if(neighborings[n] == "blue"){
				neighbors += neighbors+1
			}
		}
		if(populated == true){
			if(neighbors<=1){td.style.backgroundColor=bgColor}
			if(neighbors>=4){td.style.backgroundColor=bgColor}
			if(neighbors==2 || neighbors==3){td.style.backgroundColor=pencilColor}
		}
		else{
			if(neighbors==3){td.style.backgroundColor=pencilColor}
		}
	}
}

function generationSimulation(){
	simulate()
	n_generation = n_generation+1
	document.getElementById("gen_n").innerText = n_generation
}

function startGOL(){
	epoch_mech = window.setInterval(generationSimulation,1000)
}

function stopGOL(){
	if(epoch_mech != null){
		clearInterval(epoch_mech)
		epoch_mech = null
		n_generation = 0
	}
}

var h = null
var w = null

$(document).ready(function(){
	var h = Math.round(window.innerHeight/6)
	var w = Math.round(window.innerWidth/5)
	document.getElementById("bgColor").onchange=function(){bgColor=document.getElementById("bgColor").value;buildGrid(h,w,bgColor,pencilColor)}
	document.getElementById("pencilColor").onchange=function(){pencilColor=document.getElementById("pencilColor").value;buildGrid(h,w,bgColor,pencilColor)}
	document.getElementById("pattern_type").onchange=function(){buildGrid(h,w,bgColor,pencilColor,document.getElementById("pattern_type").value)}
	buildGrid(h,w,bgColor,pencilColor,0)
	document.getElementById("start").onclick = startGOL
	document.getElementById("stop").onclick = stopGOL
})