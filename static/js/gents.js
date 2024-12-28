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
		var mynav=document.querySelector("nav");//twist
		var myside=document.querySelector(".menu");//expand
		var mycon=document.querySelector(".container");//collapse
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

	const sections=document.querySelectorAll(".card");
	const options={
		root:null,
		rootMargin:"0px",
		threshold:0.1
	}
	const observer=new IntersectionObserver((entries)=>{
		entries.forEach(entry=>{
			if(entry.isIntersecting){
				entry.target.classList.add('visible');
			}else{
				entry.target.classList.remove('visible');
			}
		});
	},options);
	sections.forEach(section=>{
		observer.observe(section);
	});
	const cards=document.querySelectorAll(".cards .card");
	cards.forEach(card=>{
		//card.classList.remove("object");
		card.parentElement.addEventListener("mouseover",function(){
			if(card.classList.contains("object")){
				card.classList.remove("object");
			}else{
				card.classList.add("object");
			}
		});
		card.parentElement.addEventListener("mouseout",function(){
			if(card.classList.contains("object")){
				card.classList.remove("object");
			}
		});
	});
	const ffam=document.querySelectorAll("#tab3 select")[0];
	const fstyle=document.querySelectorAll("#tab3 select")[1];
	const fsize=document.querySelectorAll("#tab3 select")[2];
	const fcolor=document.querySelectorAll("#tab3 select")[3];

	const themeBtns=document.querySelectorAll("#tab3 input");

	const Elements=document.querySelectorAll("h4,h3,h1,p,td,a,button,li,#mySearch,.tab-content h2");
	document.querySelector("#bcom").addEventListener("click",function(){
		Elements.forEach(elem=>{
			elem.style.fontFamily=ffam.value;
			elem.style.fontStyle=fstyle.value;
			elem.style.fontSize=fsize.value+"px";
			elem.style.color=fcolor.value;
		});
	});
	document.querySelector("#btheme").addEventListener("click",function(){
		var elements=document.querySelectorAll(".tab-content,.cards,#tab3 .cards .card,#tab1,#tab2,#tab3,#tab4,#tab5,#tab6");
		const textElements=document.querySelectorAll("h4,h3,h1,p,td,a,button,li,#mySearch,.tab-content h2");
		themeBtns.forEach(btn=>{
			//delete Elements[6];
			elements.forEach(elm=>{
				if(btn.checked){
					if(btn.value=="light"){
						elm.classList.remove("dark-par");
						elm.classList.add("light-par");
					}else if(btn.value=="dark"){
						elm.classList.add("dark-par");
						elm.classList.remove("light-par");
					}else{
						elm.classList.remove("dark-par");
						elm.classList.remove("light-par");
					}
				}

			});
			textElements.forEach(elm=>{
				if(btn.checked){
					if(btn.value=="light"){
						elm.classList.remove("dark");
						elm.classList.add("light");
					}else if(btn.value=="dark"){
						elm.classList.add("dark");
						elm.classList.remove("light");
					}else{
						elm.classList.remove("dark");
						elm.classList.remove("light");
					}
				}

			});
		});
	});

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

