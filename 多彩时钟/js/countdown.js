var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 600;
var RADIUS = 7;
var MARIGIN_LEFT = 100;
var MARIGIN_TOP = 100;

//var endTime = new Date();
//endTime.setTime(endTime.getTime()+3600*1000);
var curInterval = 0;
var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#669900","#FFBB33","#FF8800","#FF4444","#CCOOOO"];

window.onload = function(){
	WINDOW_WIDTH = document.body.clientWidth;
	WINDOW_HEIGHT = document.body.clientHeight;
	MARIGIN_LEFT = WINDOW_WIDTH/10;
	MARIGIN_TOP = WINDOW_HEIGHT/5;
	RADIUS = (WINDOW_WIDTH*4/5/108)-1;

	var context = document.getElementById('cxt');
	var cxt = context.getContext('2d');

	context.width = WINDOW_WIDTH;
	context.height = WINDOW_HEIGHT;
	curInterval = getTimeInterval();

	
	setInterval(
		function(){
			render( cxt);
			update();
		},
		50
		)
}



function render(cxt ){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var hours = parseInt(curInterval/3600);
	var minutes = parseInt((curInterval-hours*3600)/60);
	var seconds = curInterval%60;

	// var hours = curInterval['hour'];
	// var minutes = curInterval['min'];
	// var seconds = curInterval['sec'];


	renderDigit( MARIGIN_LEFT , MARIGIN_TOP , parseInt(hours/10) , cxt );
	renderDigit( MARIGIN_LEFT+15*(RADIUS+1) , MARIGIN_TOP , hours%10 ,cxt);
	renderDigit( MARIGIN_LEFT+30*(RADIUS+1) , MARIGIN_TOP , 10 ,cxt);
	renderDigit( MARIGIN_LEFT+39*(RADIUS+1) , MARIGIN_TOP , parseInt(minutes/10) ,cxt);
	renderDigit( MARIGIN_LEFT+54*(RADIUS+1) , MARIGIN_TOP , minutes%10 ,cxt);
	renderDigit( MARIGIN_LEFT+69*(RADIUS+1) , MARIGIN_TOP , 10 ,cxt);
	renderDigit( MARIGIN_LEFT+78*(RADIUS+1) , MARIGIN_TOP , parseInt(seconds/10) ,cxt);
	renderDigit( MARIGIN_LEFT+93*(RADIUS+1) , MARIGIN_TOP , seconds%10 ,cxt);

	for (var i = 0; i < balls.length; i++) {
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true);
		cxt.closePath();

		cxt.fill();

	}
}

function renderDigit( x , y , num , cxt){
	cxt.fillStyle = 'rgb(0,102,153)';
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}


function update(){
	var nextTime = getTimeInterval();
	var nextHours = parseInt(nextTime/3600);
	var nextMinutes = parseInt((nextTime-nextHours*3600)/60);
	var nextSeconds = nextTime%60;

	var hours = parseInt(curInterval/3600);
	var minutes = parseInt((curInterval-hours*3600)/60);
	var seconds = curInterval%60;
	// var nextHours = nextTime['hour'];
	// var nextMinutes = nextTime['min'];
	// var nextSeconds = nextTime['sec'];

	// var hours = curInterval['hour'];
	// var minutes = curInterval['min'];
	// var seconds = curInterval['sec'];

	if(nextSeconds != seconds){
		if( parseInt(nextHours/10) != parseInt(hours/10) ){
			addBalls( MARIGIN_LEFT , MARIGIN_TOP , parseInt(nextHours/10) );
		}
		if( parseInt(nextHours%10) != parseInt(hours%10) ){
			addBalls( MARIGIN_LEFT+15*(RADIUS+1) , MARIGIN_TOP , parseInt(nextHours%10) );
		}
		if( parseInt(nextMinutes/10) != parseInt(minutes/10) ){
			addBalls( MARIGIN_LEFT+39*(RADIUS+1) , MARIGIN_TOP , parseInt(nextMinutes/10) );
		}
		if( parseInt(nextMinutes%10) != parseInt(minutes%10) ){
			addBalls( MARIGIN_LEFT+54*(RADIUS+1) , MARIGIN_TOP , parseInt(nextMinutes%10) );
		}
		if( parseInt(nextSeconds/10) != parseInt(seconds/10) ){
			addBalls( MARIGIN_LEFT+78*(RADIUS+1) , MARIGIN_TOP , parseInt(nextSeconds/10) );
		}
		if( parseInt(nextSeconds%10) != parseInt(seconds%10) ){
			addBalls( MARIGIN_LEFT+93*(RADIUS+1) , MARIGIN_TOP , parseInt(nextSeconds%10) );
		}
		curInterval = nextTime;
	}

	updateBalls();
}

function updateBalls(){
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if( balls[i].y >= WINDOW_HEIGHT-RADIUS){
			balls[i].y = WINDOW_HEIGHT-RADIUS;
			balls[i].vy = -balls[i].vy*0.7;
		}

		// if( balls[i].x >= WINDOW_WIDTH-RADIUS){
		// 	balls[i].x = WINDOW_WIDTH-RADIUS;
		// 	balls[i].vx = -balls[i].vx*0.7;
		// }


	}
	var cnt = 0;
	for (var i = 0; i < balls.length; i++) {	

		if( balls[i].x+RADIUS > 0 ){
			balls[cnt++] = balls[i];
		}
			
		}
	while( balls.length > cnt ){
			balls.pop();
	}
}

function addBalls( x , y , num ){
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j] == 1){
				var aBall = {
					x : x+j*2*(RADIUS+1)+(RADIUS+1),
					y : y+i*2*(RADIUS+1)+(RADIUS+1),
					g : 1.5+Math.random(),
					vx : Math.pow( -1 , Math.ceil(Math.random()*1000))*4,
					vy : -5,
					color : colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}

function getTimeInterval(){
	var curTime = new Date();
	var getCurTime = curTime.getHours()*3600 + curTime.getMinutes()*60 + curTime.getSeconds();
	return getCurTime;
	// var getEndTime = endTime.getTime();
	// var timeInterval = Math.round((getEndTime - getCurTime)/1000);
	// return timeInterval > 0 ? timeInterval : 0;

	// var time = {'hour':curTime.getHours(),'min':curTime.getMinutes(),'sec':curTime.getSeconds()};
	// return time;
}

