let frames = [];

let frame ={
	"turno":0,
	"tiro":0,
	"puntos":0,
	"pines":0,
}
let throwVar;
let spare ={
	"isSpare":false,
	"spareID":0,
} 

let strikesCounts = [];
let strike ={
	"isStrike":false,
	"strikeID":0,
	"roll":0,
};
let oldPoints=0;
function throwBall(){
	frame.tiro+=1;
	frame.turno=frames.length+1;
	if (frame.tiro==1) {
		throwVar = Math.floor(Math.random()*10);
		console.log(throwVar);
		frame.pines+=throwVar;
		frame.puntos+=throwVar;
		oldPoints=throwVar;
		if (frame.turno>1) {
			frame.puntos+=frames[frames.length-1].puntos;
		}
		if (spare.isSpare==true) {
			oldFrame=frames[spare.spareID];
			oldFrame.puntos+=throwVar;
			editFrame(oldFrame.turno);
			spare.isSpare=false;
		}
		if (strikesCounts.length>0) {
			updateStrikes(throwVar);
		}
		if (throwVar==10) {
			strike.isStrike=true;
			strike.strikeID=frame.turno-1;
			strike.roll=2;
			strikesCounts.push(strike);
			console.log(strikesCounts.length);
			strike ={
				"isStrike":false,
				"strikeID":0,
				"roll":0,
			}
			frames.push(frame);
			showFrames();
			frame = {
				"turno":0,
				"tiro":0,
				"puntos":0,
				"extras":0,
				"pines":0,
			}
			if (frames.length==10) {
				disableButton();
			}
		}else{
			showFrames();
		}

	}else if(frame.tiro==2){
		throwVar = Math.round(Math.random() * ((10-oldPoints)  - 0) + 0);
		frame.pines+=throwVar;
		console.log(throwVar);
		frame.puntos+=throwVar;
		frames.push(frame);
		editFrame(frame.turno);
		if (frame.puntos==10) {
			spare.isSpare=true;
			spare.spareID=frame.turno-1;
		}
		frame = {
			"turno":0,
			"tiro":0,
			"puntos":0,
			"extras":0,
			"pines":0,
		}
		
		if (frames.length==10) {
			disableButton();
		}
	}
}

function disableButton(){
	document.getElementById("throwButton").disabled = true;
	setTimeout(function(){ alert("Felicidades, terminaste la partida"); }, 500);
	
}
function updateStrikes(puntosSent){
	for (var i = 0; i <= strikesCounts.length-1; i++) {
		console.log("la i esta en: "+i);
		if (strikesCounts[i].roll>0) {
			oldStrike=frames[strikesCounts[i].strikeID];
			oldStrike.puntos+=puntosSent;
			strikesCounts[i].roll-=1;
			editFrame(oldStrike.turno);
		}
	}
}

function showFrames(){
	document.getElementById('frames').innerHTML+=
	"<div id=ronda"+frame.turno+" class='col' style='padding:5px;'><span>Frame:"+frame.turno
		+"</span><br><span>Try:"+frame.tiro+"</span>"
		+"<br><span>Pins down:"+frame.pines+"</span>"
		+"<br><span>Total Points:"+frame.puntos+"</span></div>";
}
function editFrame(turno){
	document.getElementById('ronda'+turno).innerHTML=
		"<span>Frame:"+frames[turno-1].turno
		+"</span><br><span>Try:"+frames[turno-1].tiro+"</span>"
		+"<br><span>Pins down:"+frames[turno-1].pines+"</span>"
		+"<br><span>Total Points:"+frames[turno-1].puntos+"</span>";
}

function consoleOutput(){

}


















