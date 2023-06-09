let employees = document.getElementById('employees');
let date=document.getElementById('date');
let presentDate=new Date();
let month=presentDate.getMonth();
let year=presentDate.getFullYear();
let months=['January','Feburary','March','April','May','June','July','august','september','October','November','December'];
for(let i=0;i<12;i++){
    if(month===i){
        month=months[i];
        break;
    }
}
let presentyear=`${month} - ${year}`;
date.innerText=presentyear;
function pushPopUp(buttons,data){   
let emp_name=document.getElementById('emp_name');                    
let emp_dept=document.getElementById('emp_dept');                    
let emp_bank=document.getElementById('emp_bank');    
let emp_id=document.getElementById('emp_id');
let emp_design=document.getElementById('emp_design');  
let emp_net=document.getElementById('emp_net'); 
let emp_total=document.getElementById('emp_tot');   
let emp_da=document.getElementById('emp_da');
let emp_hra=document.getElementById('emp_hra');  
let emp_basic=document.getElementById('emp_basic');
let emp_it=document.getElementById('it');
let emp_cpf=document.getElementById('cpf');        
Array.from(buttons).forEach((element)=>{
element.addEventListener('click',()=>{
let _id=parseInt(element.id);
data.forEach((elem)=>{    
if(elem.employeeid===_id){
    emp_name.innerText=elem.employeename;
    emp_dept.innerText=elem.employeedept;
    emp_bank.innerText=elem.employeecompany;
    emp_id.innerText=elem.employeeid;
    emp_design.innerText=elem.employedesign;
    emp_da.innerText=elem.da;
    emp_hra.innerText=elem.hra;
    emp_basic.innerText=elem.basicpay;
    emp_it.innerText=elem.incometax;
    emp_cpf.innerText=elem.cpf;
    emp_net.innerText="Rs. "+elem.netpay;
    emp_total.innerText="Rs. "+(elem.basicpay+elem.da+elem.hra);
}
});
});
});
}
function pushDetails(data){
    let html = "";
        data.forEach((element) => {
            html += `<div class="item bg-warning d-flex justify-content-center employees">
        <div class="items">
        <span style="display:inline; font-weight:bold">Employee Name: </span><p class="emp_name">${element.employeename}</p>
        </div>   
        <div class="items">
        <span style="display:inline; font-weight:bold">Department: </span><p class="department">${element.employeedept}</p>
        </div>
        <div class="items">
        <button class="btn btn-primary detailbuttons" id=${element.employeeid} data-bs-toggle="modal" data-bs-target="#exampleModal">Show details</button>
        </div></div>
        `;
        });
        employees.innerHTML=html;
        let buttons=document.getElementsByClassName('detailbuttons');
        pushPopUp(buttons,data);
}
const fetchData = async () => {
    const result = await fetch('/Employeedetails');
    const data = await result.json();
    if (data.length!=0) {
        pushDetails(data);
    } else {
        employees.innerHTML = '<h1>No data found!</h1>'
    }
}
fetchData();

