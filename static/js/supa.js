window.addEventListener('DOMContentLoaded',function(){
	var form=document.forms[0];//document.querySelector("form");
	const focuss=document.querySelectorAll("#imps");

	const rows=document.querySelectorAll("table tbody tr td:nth-child(3)");
	const boxes=document.querySelectorAll("input[type='checkbox']");
	const lastbox=boxes[boxes.length-1];//document.querySelector(".all");//
	lastbox.onclick=function(){
		if(lastbox.checked==true){
			boxes.forEach(box=>{
				box.checked=true;//select all checkboxes
			});
		}else{
			boxes.forEach(box=>{
				box.checked=false;//deselect all checkboxes
			});
		}
	}

	focuss.forEach(focus=>{
		focus.ondblclick=function(){
			form.style.display="block";
			form.email.value=focus.querySelector("td:nth-child(4)").innerText;
			form.role.autofocus=true;
		}
	});
	document.querySelector("#closebtn").addEventListener("click",function(){
		form.style.display="none";
	});
	var tabBtns=document.querySelectorAll(".metar ul li");
	var tabPages=document.querySelectorAll(".trailer .tab-content");

	var icoDash=document.querySelectorAll(".navb ul li a");

	tabPages[0].classList.add("active");
	icoDash[0].addEventListener("click",function(){
		tabPages.forEach(page=>{
			if(page.classList.contains("active")){
				page.classList.remove("active");
			}
		});
		tabPages[0].classList.add("active");
	});
	icoDash[1].addEventListener("click",function(){
		tabPages.forEach(page=>{
			if(page.classList.contains("active")){
				page.classList.remove("active");
			}
		});
		tabPages[1].classList.add("active");
	});
	icoDash[2].addEventListener("click",function(){
		tabPages.forEach(page=>{
			if(page.classList.contains("active")){
				page.classList.remove("active");
			}
		});
		tabPages[2].classList.add("active");
	});
	tabBtns.forEach(tab=>{
		//Reset all tabs to default bgcolor
		//tab.style.backgroundColor="black";
		tab.addEventListener("click",function(){
			const targetId=tab.getAttribute("data-target");
			const targetContent=document.getElementById(targetId);

			//hide all tabs
			tabPages.forEach(page=>{
				if(page.classList.contains("active")){
					page.classList.remove("active");
				}
			});
			//show target tab content
			targetContent.classList.add("active");
		});

		tab.addEventListener("mouseover",function(){
			const targetId=tab.getAttribute("data-target");
			const targetContent=document.getElementById(targetId);

			tab.style.backgroundColor=getComputedStyle(targetContent).backgroundColor;
		});
		tab.addEventListener("mouseout",function(){
			tab.style.backgroundColor="black";
			//tab.style.borderRight="";
		});
	});

	var setBtns=document.querySelectorAll(".pet span .iris");
	var targetItems=document.querySelectorAll(".tab-content");
	var sMenu=document.querySelector(".navb");
	setBtns.forEach(setbtn=>{
		setbtn.addEventListener("click",function(){
			const selectedTheme=setbtn.getAttribute("data-target");
			if(setbtn.classList.contains("switch")){
				setbtn.classList.remove("switch");
			}else{
				setbtn.classList.add("switch")
				if(selectedTheme==="dark"){
					if(setBtns[1].classList.contains("switch") || setBtns[2].classList.contains("switch")){
						setBtns[1].classList.remove("switch");
						setBtns[2].classList.remove("switch");
					}
					sMenu.classList.remove("light-mode");
					sMenu.classList.add("dark-mode");
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
					if(setBtns[0].classList.contains("switch") || setBtns[1].classList.contains("switch")){
						setBtns[1].classList.remove("switch");
						setBtns[0].classList.remove("switch");
					}
					sMenu.classList.add("light-mode");
					sMenu.classList.remove("dark-mode");
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
					if(setBtns[0].classList.contains("switch") || setBtns[2].classList.contains("switch")){
						setBtns[2].classList.remove("switch");
						setBtns[0].classList.remove("switch");
					}
					sMenu.classList.remove("light-mode");
					sMenu.classList.remove("dark-mode");
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

	var iconSearch=document.querySelector("#fasearch");
	iconSearch.addEventListener("click",function(){
		var inpSearch=document.querySelector(".myinput");
		inpSearch.classList.toggle("active");
	});
	//search table, Declare variables
	var input,myopt;
	input = document.querySelector(".myinput");
  	myopt=document.querySelector(".myinp");


  	input.addEventListener("keyup",function(){
  		const searchValue=this.value.toLowerCase();
  		const tbody = document.querySelector("#d-users tbody");
  		const rows = tbody.querySelectorAll("#imps");

  		rows.forEach(row=>{
  			const username=row.cells[2].textContent.toLowerCase();
  			const email=row.cells[3].textContent.toLowerCase();

  			if(myopt.value=="uname"){
  				//Search by username
  				if(username.includes(searchValue)){
	  				row.style.display="";
	  			}else{
	  				row.style.display="none";
	  			}
  			}else{
  				//Search by email
  				if(email.includes(searchValue)){
	  				row.style.display="";
	  			}else{
	  				row.style.display="none";
  				}
  			}

  		});
  	});
  	
  	const contextArea=document.querySelector("table");
  	const contextMenu=document.createElement("div");
  	contextMenu.className="context-menu";
  	const ul=document.createElement("ul");
  	const actions=new Array('Add','Edit','Delete','Quit')
  	actions.forEach(action=>{
  		const li=document.createElement("li");
  		li.innerText=action;
  		li.id=action.toLowerCase();
  		ul.appendChild(li);
  	});
  	contextMenu.appendChild(ul);
  	document.querySelector("#pg1").appendChild(contextMenu);

  	contextArea.addEventListener("contextmenu",function(event){
  		event.preventDefault();
  		selectedRow=e.target.closest("tr");

  		const { clientX:mouseX, clientY:mouseY }=event;

  		contextMenu.style.left=mouseX+"px";
  		contextMenu.style.top=mouseY+"px";//$ {mouseY}px;
  		contextMenu.style.display="block";
  	});
  	window.addEventListener("click",()=>{
  		contextMenu.style.display="none";
  	});
  	document.getElementById("edit").addEventListener("click",()=>{
  		if(selectedRow){
  			const newText=prompt("Edit the row",selectedRow.cells[2].innerText);
  			if(newText!==null){
  				selectedRow.cells[2].innerText=newText;
  			}
  		}
  		contextMenu.style.display="none";
  	});
  	document.querySelector("#add").addEventListener("click",()=>{
  		const newRow=document.createElement("tr");
  		const newCell=document.createElement("td");
  		var t=contextArea.rows.length+1;
  		newCell.innerText=Row +t;//Row {contextArea.rows.length+1};
  		newRow.appendChild(newCell);
  		contextArea.appendChild(newRow);
  		contextMenu.style.display="none";
  	});
  	document.querySelector("#add").addEventListener("click",()=>{
  		if (selectedRow) {
  			selectedRow.remove();
  		}
  		contextMenu.style.display="none";
  	});
  	
});
