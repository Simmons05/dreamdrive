window.addEventListener("DOMContentLoaded", function(){
	document.getElementsByClassName("tog-table").onclick=function(event){
		var table=document.querySelector("#pg1 table");
		if(table.classList.contains("active")){
			table.classList.remove("active");
			document.querySelector(".stairs h4").innerHTML="&#9651;";
		}else{
			table.classList.add("active");
			document.querySelector(".stairs h4").innerHTML="&#9661;";
		}
	}
	
	document.querySelectorAll('.message #close').forEach(exit=>{
	    exit.addEventListener('click',function(){
	        document.querySelectorAll('.message').forEach(msg=>{
	        msg.style.display="none";});
	    });
	});
	var myicon=document.querySelector(".menu-con");
	myicon.addEventListener("click",function(){
		var mynav=document.querySelector(".colp");//twist
		var myside=document.querySelector(".metar");//expand
		var mycon=document.querySelector(".trailer");//collapse
		if(mycon.classList.contains("collapse")){
			mynav.classList.remove("twist");
			mycon.classList.remove("collapse");
			myside.classList.remove("expand");
		}else{
			mynav.classList.add("twist");
			mycon.classList.add("collapse");
			myside.classList.add("expand");
		}
	});
	const vans=document.querySelector("body");

	setInterval(()=>{
		const bubble=document.createElement('div');
		bubble.classList.add('bubble');

		const size=Math.random()*(60 - 15) + 15;

		bubble.style.width=size+"px";
		bubble.style.height=size+"px";

		const xP=Math.random()*(window.innerWidth - size);
		bubble.style.left=xP+"px";

		vans.appendChild(bubble);

		bubble.addEventListener('animationend',()=>{
			bubble.remove();
		});

		const duration=Math.random()*(5 - 2)+2;
		bubble.style.animationDuration=duration+"s";
	},500);

});

function switchTab(event,tabName) {
	var i,pages, tabs;
	pages = document.querySelectorAll(".tab-content");
	tabs =document.querySelectorAll(".tabs");
	pages.forEach(page=>{
		page.classList.remove("active");
	});
	tabs.forEach(tab=>{
	    tab.classList.remove("active");
	});
	document.getElementById(tabName).classList.add("active");
	event.currentTarget.classList.add("active");
}

