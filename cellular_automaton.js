var drawMode = false;;var bgcolor = "red";var pencilColor = "blue";var n_generation = 0;var epoch_mech = null;var h = null;var w = null;
var tds = {};var element = null;var td = null;var populated = false;var neighbors = 0;var mtds=[];
var alive = 0

function buildGrid(m,n,bgcolor,pencilColor,randomized){
	document.getElementById("grid").innerHTML = ""
	var table = document.createElement("table")
	table.id = "mainGrid"
	table.cellSpacing = 0
	table.cellPadding = 0
	var tr = null;var td = null;
	for(var i=0;i<=m-1;i++){
	    tr = document.createElement("tr")
	    for(var j=0;j<=n-1;j++){
	        td = document.createElement("td")
	        td.style.borderLeft = "0.01em solid black";td.style.borderTop = "0.01em solid black";td.style.width="5px";td.style.height="5px";
	        if(randomized == 1){td.style.backgroundColor = Math.floor(Math.random() * 2)==0?bgcolor:pencilColor;}
	        else{td.style.backgroundColor = bgcolor}
	        td.dataset.i = i;td.dataset.j = j
	        td.id = i.toString()+"_"+j.toString()
	        tr.appendChild(td)
	    }
	    table.appendChild(tr)
	}
	table.onmousemove = function(e){
		if(drawMode){document.elementFromPoint(e.clientX,e.clientY).style.backgroundColor = pencilColor;alive=alive+1;console.log(alive)}
	}
	table.onclick = function(){
		if(drawMode){drawMode = false;document.getElementById("mode_type").innerText = "OFF"}
		else{drawMode = true;document.getElementById("mode_type").innerText = "ON"}
	}
	document.getElementById("grid").appendChild(table)
}

function obtainRelativeTD(xi,yj){
	if(tds[xi.toString()+"_"+yj.toString()]==undefined){
		xi = (xi<0)?h-1:(xi>h-1)?0:xi
		yj = (yj<0)?w-1:(yj>h-1)?0:yj
	}

	element = tds[xi.toString()+"_"+yj.toString()]
	// var element = (table.getElementsByTagName("tr")[xi]!=undefined && table.getElementsByTagName("tr")[xi].getElementsByTagName("td")[yj]!=undefined)?table.getElementsByTagName("tr")[xi].getElementsByTagName("td")[yj].style.backgroundColor:bgcolor
	return element
}



function simulate(){
	mtds = document.getElementById("mainGrid").getElementsByTagName("td")
	tds = {}
	for(td in mtds){
		try{tds[mtds[td].id] = mtds[td].style.backgroundColor}
		catch(err){continue}
	}
	
	for(tdid in mtds){
		td = mtds[tdid]
		populated = false
		try{if(td.style.backgroundColor != bgcolor){populated = true}}
		catch(err){continue}
		neighbors = 0;
		pos = [[parseInt(td.dataset.i)-1,parseInt(td.dataset.j)],[parseInt(td.dataset.i)-1,parseInt(td.dataset.j)-1],[parseInt(td.dataset.i)-1,parseInt(td.dataset.j)+1],[parseInt(td.dataset.i)+1,parseInt(td.dataset.j)],[parseInt(td.dataset.i)+1,parseInt(td.dataset.j)-1],[parseInt(td.dataset.i)+1,parseInt(td.dataset.j)+1],[parseInt(td.dataset.i),parseInt(td.dataset.j)-1],[parseInt(td.dataset.i),parseInt(td.dataset.j)+1]]
		for(p in pos){
			if(obtainRelativeTD(pos[p][0],pos[p][1]) == "blue"){
				if(document.getElementById("nb_type").value == 0){
					neighbors = neighbors+1
				}
				else{
					neighbors += neighbors+1
				}
			}
		}
		if(populated == true){
			if(neighbors<=1||neighbors>=4){td.style.backgroundColor=bgcolor;alive=alive-1;}
		}
		else{
			if(neighbors==3){td.style.backgroundColor=pencilColor;alive=alive+1;}
		}
	}
}

function generationSimulation(){
	simulate()
	n_generation = n_generation+1
	document.getElementById("gen_n").innerText = n_generation
}

function startGOL(){
	epoch_mech = window.setInterval(generationSimulation,500)
}

function stopGOL(){
	if(epoch_mech != null){
		clearInterval(epoch_mech)
		epoch_mech = null
		n_generation = 0
	}
}




window.onload = function(){
	h = Math.round(window.innerHeight/7)
	w = Math.round(window.innerWidth/5)
	buildGrid(h,w,bgcolor,pencilColor,0)
	document.getElementById("bgColor").onchange=function(){bgcolor=document.getElementById("bgColor").value;buildGrid(h,w,bgcolor,pencilColor)}
	document.getElementById("pencilColor").onchange=function(){pencilColor=document.getElementById("pencilColor").value;buildGrid(h,w,bgcolor,pencilColor)}
	document.getElementById("pattern_type").onchange=function(){buildGrid(h,w,bgcolor,pencilColor,document.getElementById("pattern_type").value)}
	document.getElementById("start").onclick = startGOL
	document.getElementById("stop").onclick = stopGOL
}