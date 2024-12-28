window.onload=function(){
    var closebtn=document.getElementById("close");
    var menu=document.querySelector(".menu");
    var dock=document.querySelector(".container");
    var msgbox=document.getElementsByClassName("message");
    var modal=document.getElementById("myModal");
    var openModalBtn=document.getElementById("openModal");
    var closeModalBtn=document.getElementById("closeModal");

    var formAdd=document.querySelector(".mymod1");
    var formEdit=document.querySelector(".mymod2");
    var formread=document.querySelector(".mymodal");
    var closeAddFormBtn=document.querySelector(".mymod1 #close");
    var closeEdtFormBtn=document.querySelector(".mymod2 #close");

    var menuDocker=document.querySelector(".menu-con");
    var menuBtns=document.querySelectorAll(".bars");

    var comBtns=document.querySelectorAll(".commands ul li");


    closeEdtFormBtn.addEventListener("click",function(){
        document.querySelector(".mymod2").style.display="none";
    });
    closeAddFormBtn.addEventListener("click",function(){
        document.querySelector(".mymod1").style.display="none";
    });

    comBtns[0].addEventListener("click",function(){
        if(formEdit.style.display=="none"){
            formAdd.style.display="block";
        }else{
            formEdit.style.display="none";
        }
    });
    comBtns[1].addEventListener("click",function(){
        if(formAdd.style.display=="none"){
            formEdit.style.display="block";
        }else{
            formAdd.style.display="none";
        }
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
        if(event.target==modal){
            modal.style.display="none";
        }
    }
   
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
function capEdit(){
    var editBtns=document.querySelectorAll('#edtbtn');
    var editForm=document.querySelector('#editfm');
    var i;
    for($i=0;$i<editBtns.length;$i++){
        editBtns[i].addEventListener('click',function(){
            var tr=this.closest('tr');
            //var id=tr.dataset.mywards;
            var ward=tr.cells[0].textContent;
            var fname=tr.cells[1].textContent;
            var lname=tr.cells[2].textContent;
            var gender=tr.cells[3].textContent;
            var tmdr=tr.cells[4].textContent;
            editForm.elements.wards.value=ward;
            editForm.elements.firstname.value=fname;
            editForm.elements.lastname.value=lname;
            editForm.elements.gender.value=gender;
            editForm.elements.dressing.value=tmdr;
        });
    }
}
function yourf(){
    var input,filter,table,tr,td,i,txtValue;
    input=document.getElementById("mySearch");
    filter=input.value.toUpperCase();
    table=document.getElementById("mytable");
    tr=table.getElementsByTagName("tr");
    for(i=0;i<tr.length;i++){
        //('td')[1] specifies position of column i.e the patients firstname
        td=tr[i].getElementsByTagName("td")[1];
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
}