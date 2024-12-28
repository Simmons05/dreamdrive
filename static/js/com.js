
window.addEventListener("DOMContentLoaded",function(){
	//mycode
	var closebtn=document.getElementById("close");
    var menu=document.querySelector(".menu");
    var dock=document.querySelector(".container");
    var msgbox=document.getElementsByClassName("message");

    var formAdd=document.querySelector(".mymod1");
    var formDel=document.querySelector(".mymod2");
    var formread=document.querySelector(".mymodal");
    var menuDocker=document.querySelector(".menu-con");

    var menuBtns=document.querySelectorAll(".bars");
    var comBtns=document.querySelectorAll(".commands ul li");
    
    document.querySelectorAll("form #close").forEach(clsbtn=>{
        clsbtn.addEventListener("click",function(e){
            document.querySelectorAll("form").forEach(form=>{
                if(form.style.display=="block"){
                    form.style.display="none";
                }
            });
        });
    });

    document.querySelector("#tab5 button").addEventListener('click',(event)=>{
        document.querySelector(".pchng").classList.toggle('active');
        if(!event.target==document.querySelector("#tab5 form button")){
            document.querySelector(".pchng").classList.remove('active');
        }
    });

    //autofill the rental form
    const autoform=document.querySelector(".mymod2");
    const startTime=new Date(autoform.cstart.value);
    const stopTime=new Date(autoform.cstop.value);

    const duration=Math.floor((startTime-stopTime)/(24*3600*1000));
    autoform.gtotal.value=autoform.price.value*duration;


    var goods=document.querySelectorAll(".car-card");
    /*Grab details of items and autofill the form*/
    goods.forEach(good=>{
        good.addEventListener("click",function(){
            document.forms[1].style.display="block";
            document.forms[1].name.value=good.querySelector(".make").innerText;
            document.forms[1].category.value=good.querySelector(".model").innerText;
            document.forms[1].price.value=good.querySelector(".price").innerText;
            document.forms[1].pic.value=good.querySelector("img").getAttribute("src").replace("/uploads/","");
            if(good.querySelector(".detail").getAttribute("data-purpose")=='hire'){
                document.forms[0].style.display="block";
            }else{
                document.forms[1].style.display="block";
            }
        });
    });
    /*Popup the Delete form when delete button is pressed*/
    comBtns[0].addEventListener("click",function(){
        if(formAdd.style.display=="none"){
            formDel.style.display="block";
        }else{
            formAdd.style.display="none";
        }
    });
    /*Toggle menu*/
    menuDocker.addEventListener("click",function(event){
        menu.classList.toggle("expanded");
        if(menu.classList.contains("expanded")){
            dock.classList.add("collapsed");
        }else{
            dock.classList.remove("collapsed");
        }
    });

    window.onclick=function(event){
        var modal=document.querySelector("tab-content");
        if(event.target==modal){
            modal.style.display="none";
        }
    }

    /*Toggle theme*/
    var setBtns=document.querySelectorAll("#gang");
    var targetItems=document.querySelectorAll(".tab-content,.cards,.card,h3,h1,h2,p");
    setBtns.forEach(setbtn=>{
        setbtn.addEventListener("click",function(){
            const selectedTheme=setbtn.getAttribute("data-theme");
            if(setbtn.classList.contains("on")){
                setbtn.classList.remove("on");
            }else{
                setbtn.classList.add("on");
                if(selectedTheme==="dark"){
                    if(setBtns[1].classList.contains("on") || setBtns[2].classList.contains("on")){
                        setBtns[1].classList.remove("on");
                        setBtns[2].classList.remove("on");
                    }
                    targetItems.forEach(targetItem=>{
                        this.classList.remove("light-mode");
                        this.classList.add("dark-mode");
                        this.parentNode.classList.remove("light-mode");
                        this.parentNode.classList.add("dark-mode");
                        //this.nextElementSibling.classList.add("dark-mode");
                        Array.from(targetItem.childNodes).forEach(child=>{
                            if(child.nodeType===Node.ELEMENT_NODE){
                                child.classList.remove("light-mode");
                                child.classList.add("dark-mode");
                            }
                        });
                        setBtns.forEach(child=>{
                            child.parentNode.classList.remove("light-mode");
                            child.parentNode.classList.add("dark-mode");
                        });
                        document.querySelectorAll('.pet').forEach(elm=>{
                            elm.classList.remove("light-mode");
                            elm.classList.add("dark-mode");
                        });
                    });
                }else if(selectedTheme==="light"){
                    if(setBtns[0].classList.contains("on") || setBtns[1].classList.contains("on")){
                        setBtns[1].classList.remove("on");
                        setBtns[0].classList.remove("on");
                    }
                    targetItems.forEach(targetItem=>{
                        targetItem.parentNode.classList.add("light-mode");
                        targetItem.parentNode.classList.remove("dark-mode");

                        targetItem.classList.add("light-mode");
                        targetItem.classList.remove("dark-mode");
                        
                        Array.from(targetItem.childNodes).forEach(child=>{
                            if(child.nodeType===Node.ELEMENT_NODE){
                                child.classList.add("light-mode");
                                child.classList.remove("dark-mode");
                            }
                        });
                        setBtns.forEach(child=>{
                            child.parentNode.classList.add("light-mode");
                            child.parentNode.classList.remove("dark-mode");
                        });
                        document.querySelectorAll('.pet').forEach(elm=>{
                            elm.classList.add("light-mode");
                            elm.classList.remove("dark-mode");
                        });
                    });
                }else if(selectedTheme==="system"){
                    if(setBtns[0].classList.contains("on") || setBtns[2].classList.contains("on")){
                        setBtns[2].classList.remove("on");
                        setBtns[0].classList.remove("on");
                    }
                    targetItems.forEach(targetItem=>{
                        targetItem.classList.remove("dark-mode");
                        targetItem.classList.remove("light-mode");
                        Array.from(targetItem.childNodes).forEach(child=>{
                            if(child.nodeType===Node.ELEMENT_NODE){
                                child.classList.remove("light-mode");
                                child.classList.remove("dark-mode");
                            }
                        });
                        setBtns.forEach(child=>{
                            child.parentNode.classList.remove("light-mode");
                            child.parentNode.classList.remove("dark-mode");
                        });
                        document.querySelectorAll('.pet').forEach(elm=>{
                            elm.classList.remove("light-mode");
                            elm.classList.remove("dark-mode");
                        });
                    });
                    //Detect system Preferences
                    const preferedDarkScheme=window.matchMedia("(preders-color-scheme:dark)").matches;
                    //Find alternative for given shorthand of next commented code
                    //document.body.className=preferedDarkScheme?'dark-mode':'light-mode';
                    document.body.classList.add(preferedDarkScheme?'dark-mode':'light-mode');
                    //Listen for changes in system Preferences
                    window.matchMedia("(preders-color-scheme:dark)").addEventListener("click",(e)=>{
                        targetItems.forEach(item=>{
                            item.classList.remove('dark-mode','light-mode');
                            item.classList.add(e.matches?'dark-mode':'light-mode');
                        });
                    });
                }
            }
        });
    });
    
    /*Animation Loading*/
    const canvas=document.querySelector(".engine");
	const ctx=canvas.getContext("2d");

	const outerRadius=50;
	const centreRadius=30;
	const innerRadius=15;

	let outerAngle=0;//angle for outer circle
	let centreAngle=0;//angle for middle circle
	let innerAngle=0;//angle for inner circle

	const outerTeethCount=30;//number of teeth for outer circle
	const centreTeethCount=18;//number of teeth for middle circle
	const innerTeethCount=12;//number of teeth for inner circle

	function drawCog(x,y,radius,teethCount,angleOffset,color){
		const toothWidth=2*Math.PI/teethCount;
		const toothHeight=10;//thickness of tooth
		ctx.fillStyle=color;
		for(let i=0;i<teethCount;i++){
			const angle=i*toothWidth+angleOffset;

			const x1=x+radius*Math.cos(angle);
			const y1=y+radius*Math.sin(angle);
			const x2=x+(radius+toothHeight)*Math.cos(angle+toothWidth/2);
			const y2=y+(radius+toothHeight)*Math.sin(angle+toothWidth/2);
			/*const x2=x+(radius+toothHeight)*Math.cos(angle+toothWidth);
			const y2=y+(radius+toothHeight)*Math.sin(angle+toothWidth);

			const innerX1=x+(radius-toothHeight)*Math.cos(angle+toothWidth);
			const innerY1=y+(radius-toothHeight)*Math.sin(angle+toothWidth);

			const innerX2=x+(radius-toothHeight)*Math.cos(angle+toothWidth);
			const innerY2=y+(radius-toothHeight)*Math.sin(angle+toothWidth);*/

			const x3=x+radius*Math.cos(angle+toothWidth);
			const y3=y+radius*Math.sin(angle+toothWidth);

			ctx.beginPath();
			//ctx.arc(canvas.width/2,canvas.height/2,radius,0,Math.PI*2);

			//start at outer edge of the cog
			ctx.moveTo(x1,y1);
			//draw at outer edge of the tooth
			//ctx.lineTo(innerX1,innerY1);
			ctx.lineTo(x2,y2);
			//draw to next outer edge of the cog
			//ctx.lineTo(innerX2,innerY2);
			ctx.lineTo(x3,y3);
			//Back to inner edge
			//ctx.lineTo(x2,y2);
			ctx.lineTo(x3 - toothHeight*Math.cos(angle+toothWidth),y3-toothHeight*Math.sin(angle+toothWidth));
			//Back to inner edge
			ctx.lineTo(x2 - toothHeight*Math.cos(angle),y2-toothHeight*Math.sin(angle));
			ctx.closePath();
			ctx.fill();
		}
	}
	function draw(){
		ctx.clearRect(0,0,canvas.width,canvas.height);//clear canvas

		//Draw outer circle (clockwise)
		drawCog(canvas.width/2,canvas.height/2,outerRadius,outerTeethCount,outerAngle,'black');

		//Draw middle circle (counter-clockwise)
		drawCog(canvas.width/2,canvas.height/2,centreRadius,centreTeethCount,centreAngle,'cyan');
		
		//Draw inner circle (clockwise)
		drawCog(canvas.width/2,canvas.height/2,innerRadius,innerTeethCount,innerAngle,'black');

		outerAngle+=0.02;
		centreAngle-=0.02;
		innerAngle+=0.02;

		animationId=requestAnimationFrame(draw);

	}
	//start animation
	draw();
	//stop animation and hide canvas after 3seconds
	setTimeout(()=>{
		cancelAnimationFrame(animationId);//stop animation
		canvas.style.display="none";//hide canvas
	},7000);
    

});

/*Tabs and Tab pages*/
 function switchTab(event,tabName) {
	    var i,pages, tabs,dock,menu;
	    pages = document.querySelectorAll(".tab-content");
	    tabs =document.querySelectorAll(".tabs");
	    dock=document.querySelector(".container");
	    menu=document.querySelector(".menu");

	    pages.forEach(page=>{
	        page.classList.remove("active");
	    });
	    tabs.forEach(tab=>{
	        tab.classList.remove("active");
	        var dock,menu;
	        dock=document.querySelector(".container");
	        menu=document.querySelector(".menu");
	    });
	    
	    document.getElementById(tabName).classList.add("active");
	    event.currentTarget.classList.add("active");
	}