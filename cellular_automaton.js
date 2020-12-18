var drawMode = false;

var bgcolor = "red"
var pencilColor = "blue"

var n_generation = 0
var epoch_mech = null

var h = null
var w = null

var tds = {}

function decideBorder(i,j){
	var px = 0

}

function buildGrid(m,n,bgcolor,pencilColor,randomized){
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
	        td.style.borderLeft = "0.01em solid black"
	        td.style.borderTop = "0.01em solid black"
	        td.style.width="5px";td.style.height="5px";
	        if(randomized == 1){td.style.backgroundColor = Math.floor(Math.random() * 2)==0?bgcolor:pencilColor;}
	        else{td.style.backgroundColor = bgcolor}
	        
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
	if(tds[xi.toString()+"_"+yj.toString()]==undefined){
		if(xi < 0){
			xi = h-1
		}
		if(xi > h-1){
			xi = 0
		}
		if(yj < 0){
			yj = w-1
		}
		if(yj > w-1){
			yj = 0
		}
	}

	var element = tds[xi.toString()+"_"+yj.toString()]
	// var element = (table.getElementsByTagName("tr")[xi]!=undefined && table.getElementsByTagName("tr")[xi].getElementsByTagName("td")[yj]!=undefined)?table.getElementsByTagName("tr")[xi].getElementsByTagName("td")[yj].style.backgroundColor:bgcolor
	return element
}



function simulate(){
	var table = document.getElementById("mainGrid")
	var mtds = table.getElementsByTagName("td")
	tds = {}
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
			if(td.style.backgroundColor != bgcolor){populated = true}
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
			if(neighbors<=1){td.style.backgroundColor=bgcolor}
			if(neighbors>=4){td.style.backgroundColor=bgcolor}
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




window.onload = function(){
	h = Math.round(window.innerHeight/6)
	w = Math.round(window.innerWidth/5)
	console.log(h)
	console.log(w)
	document.getElementById("bgColor").onchange=function(){bgcolor=document.getElementById("bgColor").value;buildGrid(h,w,bgcolor,pencilColor)}
	document.getElementById("pencilColor").onchange=function(){pencilColor=document.getElementById("pencilColor").value;buildGrid(h,w,bgcolor,pencilColor)}
	document.getElementById("pattern_type").onchange=function(){buildGrid(h,w,bgcolor,pencilColor,document.getElementById("pattern_type").value)}
	buildGrid(h,w,bgcolor,pencilColor,0)
	document.getElementById("start").onclick = startGOL
	document.getElementById("stop").onclick = stopGOL
}