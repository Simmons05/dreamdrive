window.addEventListener("DOMContentLoaded",function(){
	const canvas=document.getElementById('balloon');
	const ctx=canvas.getContext('2d');

	//Draw apple body
	ctx.fillStyle="#ff0000";

	ctx.beginPath();

	ctx.moveTo(100,100);
	/*ctx.bezierCircleTo(0,100,50,0,100,50);*/
	ctx.bezierCurveTo(150,0,150,100,0,150);
	ctx.bezierCurveTo(50,100,50,0,100,50);
	/*ctx.bezierCurveTo(150,0,150,100,100,150);*/
	/*ctx.bezierCurveTo(50,100,50,0,100,50);*/
	ctx.fill();

	ctx.fillStyle="#008000";

	ctx.beginPath();

	ctx.moveTo(120,30);
	/*ctx.bezierCircleTo(0,100,50,0,100,50);*/
	ctx.bezierCurveTo(130,10,150,20,130,40);

	/*ctx.bezierCurveTo(150,0,150,100,100,150);*/
	/*ctx.bezierCurveTo(50,100,50,0,100,50);*/
	ctx.fill();

	ctx.fillStyle="#ffcccc";

	ctx.beginPath();
	ctx.arc(75,75,20,Math.PI/4,Math.PI/2);
	ctx.fill();

	ctx.fillStyle="#007bff";

	ctx.beginPath();
	ctx.moveTo(150,50);
	ctx.lineTo(50,250);
	ctx.lineTo(250,0)
	ctx.closePath()
	ctx.fill();

});