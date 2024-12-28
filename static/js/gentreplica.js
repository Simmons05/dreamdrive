window.onload=function(){
    var closebtn=document.getElementById("close");
    var menu=document.querySelector(".menu");
    var dock=document.querySelector(".container");
    var msgbox=document.getElementsByClassName("message");

    var formAdd=document.querySelector("#addfm");
    var formEdit=document.querySelector("#edtfm");
    var formDel=document.querySelector("#delfm");

    var closeFormBtn=document.querySelectorAll("form #close");

    var menuDocker=document.querySelector(".menu-con");
    var menuBtns=document.querySelectorAll(".bars");
    var comBtns=document.querySelectorAll(".commands ul li");
    const rows=document.querySelectorAll("tr");
    
    closeFormBtn.forEach(btn=>{
        btn.addEventListener("click",function(){
            formAdd.style.display="none";
            formEdit.style.display="none";
            formDel.style.display="none";
        });
    });
    
    comBtns[0].addEventListener("click",function(){
        formAdd.style.display="block";
        if(formEdit.style.display=="block"||formDel.style.display=="block"){
            formEdit.style.display="none";
            formDel.style.display="none";
            
        }
    });
    comBtns[1].addEventListener("click",function(){
        formEdit.style.display="block";
        if(formAdd.style.display=="block"||formDel.style.display=="block"){
            formDel.style.display="none";
            formAdd.style.display="none";
        }
        rows.forEach(row=>{
            row.addEventListener("dblclick",function(){
                formEdit.serial.value=row.cells[0].textContent;
                formEdit.make.value=row.cells[1].innerText;
                formEdit.model.value=row.cells[2].innerText;
                formEdit.price.value=row.cells[3].innerText;
                formEdit.pdesc.value=row.cells[6].innerText;
            });
        });
        
    });
    comBtns[2].addEventListener("click",function(){
        formDel.style.display="block";
        if(formEdit.style.display=="block"||formAdd.style.display=="block"){
            formEdit.style.display="none";
            formAdd.style.display="none";
        }
        rows.forEach(row=>{
            row.addEventListener("click",function(){
                formDel.serial.value=row.cells[0].textContent;
                formDel.photo.value=row.querySelector("td img").getAttribute("src").replace("/uploads/","");
            });
        });
    });
    const forms=document.forms;
    rows.forEach(row=>{
        row.addEventListener("click",function() {
            var frame=document.querySelector(".bid-img img");
            frame.parentElement.style.display="block";
            var v1=row.querySelector("td img").getAttribute('src');
            frame.setAttribute("src",v1);
            var sib=document.querySelector(".bid-img .name");
            sib.innerHTML=row.cells[1].innerText;
            document.querySelector(".bid-img .price").innerText="$"+row.cells[3].innerText;
        });
     });
    
    document.querySelector('#tab5 button').addEventListener('click',()=>{
        var myf=document.forms[3];
        
    });
    menuDocker.addEventListener("click",function(event){
        menu.classList.toggle("expanded");
        if(menu.classList.contains("expanded")){
            dock.classList.add("collapsed");
        }else{
            dock.classList.remove("collapsed");
        }
    });

    window.onclick=function(event){
        if(event.target==formAdd){
            formAdd.style.display="none";
        }
    }
    document.querySelector("#mySearch").addEventListener("keyup",function(){
        var input,filter,table,tr,td,i,txtValue;
        input=document.getElementById("mySearch");
        filter=input.value.toUpperCase();
        table=document.querySelector("table");
        tr=table.getElementsByTagName("tbody tr");

        for(i=0;i<tr.length;i++){
            //('td')[1] specifies position of column i.e the Vehicles name
            td=tr[i].cells[1];
            //where index 1 is the second position or second column of table
            if(td){
                txtValue=td.textContent||td.innerText;
                if(txtValue.toUpperCase().indexOf(filter)>-1){
                    tr[i].style.display="";
                }else{
                    tr[i].style.display="none";
                }
            }
        }
    });


    const canv=document.querySelector("#barchart");
    const ctt=canv.getContext("2d");

    ctt.beginPath();
    ctt.moveTo(20,20);
    ctt.lineTo(20,120);

    ctt.moveTo(20,20);
    ctt.lineTo(16,24);
    ctt.moveTo(20,20);
    ctt.lineTo(24,20);

    ctt.moveTo(20,120);
    ctt.lineTo(280,120);

    ctt.moveTo(280,120);
    ctt.lineTo(270,116);
    ctt.moveTo(280,120);
    ctt.lineTo(270,124);


    ctt.stroke();

    var p=document.querySelector("progress");
    function boot(){
        for(v=0;v<=100;v++){
            p.value+=v;
            setInterval(function(){
                if(p.value==100){
                    p.parentElement.style.display="none";
                }
            },7000); 
        }
    }
    boot();
    
}

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
