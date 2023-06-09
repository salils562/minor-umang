let emp_structure = {
    employeename:"",
    employeeid:0,
    employeedept:"",
    employeedesig:"",
    employeecmp:"",
    basicpay:"",
    hra:"",
    da:"",
    totalsal:"",
    gis:200,
    pt:200,
    it:"",
    cpf:"",
    netsal:""
};

let calculated_details = document.getElementsByClassName("calculated-details");
let empSalary = document.getElementById('emp-salary');
let calcSalary = document.getElementById('calc-salary');
calcSalary.style.backgroundColor = 'lightgreen';
calcSalary.style.color = 'black';
calcSalary.style.borderRadius = '3px';
let da = document.getElementById('da');
let hra = document.getElementById('hra');
let total_sal = document.getElementById('total_sal');
let cpf = document.getElementById('cpf');
let it = document.getElementById('it');
let net_sal = document.getElementById('net_sal');
calcSalary.addEventListener('click', () => {
    if (empSalary.value < 3000) {
        alert("Please enter valid salary, salary should be more than Rs.3000");
        calculated_details[0].style.display = 'none';
        empSalary.value = 0;
    } else {
        let basic_salary = parseFloat(empSalary.value);
        emp_structure.basicpay=basic_salary;
        let HRA = (10 / 100) * (basic_salary) // hra is 10% of basic salary
        emp_structure.hra=HRA;
        hra.innerText = HRA;
        let DA = (42 / 100) * (basic_salary) // da is 42% of basic salary
        emp_structure.da=DA;
        da.innerText = DA;
        let total_salary = basic_salary + HRA + DA;
        emp_structure.totalsal=total_salary;
        total_sal.innerText = total_salary;
        let cpff = (6.5 / 100) * (basic_salary); //cpf is 6.5% of basic salary
        emp_structure.cpf=cpff;
        cpf.innerText = cpff;
        let itt = (9 / 100) * total_salary; //it is 9% of total salary
        emp_structure.it=itt;
        it.innerText = itt;
        let gis = 200, pt = 200; //by default
        emp_structure.gis=gis;
        emp_structure.pt=pt;
        let net_salary = total_salary - (gis + pt + itt + cpff);
        emp_structure.netsal=net_salary;
        net_sal.innerText = net_salary;
        hide_details();
    }
});


calculated_details[0].style.display = 'none';

const hide_details = () => {
    calculated_details[0].style.display = 'block';
}

// employee personal details 

let employee_details = document.getElementById('cnf-count');
let num=employee_details.childElementCount;

document.getElementById('submit-emp-data').addEventListener('click', () => {
    let shouldCall=true;
    for(let i=0;i<num-1;i++){
        if(employee_details.children[i].children[0].value===""){
            alert("Please fill all the fields to proceed further");
            shouldCall=false;
            break;
        }
    }
    if(shouldCall===true){
        set_details();
    }
    function set_details(){
        let emp_name=employee_details.children[0].children[0].value;
        let emp_id=employee_details.children[1].children[0].value;
        let emp_department=employee_details.children[2].children[0].value;
        let emp_designation=employee_details.children[3].children[0].value;
        let emp_company=employee_details.children[4].children[0].value;
        emp_structure={
            employeename:emp_name,
            employeeid:emp_id,
            employeedept:emp_department,
            employeedesig:emp_designation,
            employeecmp:emp_company
        }
        document.getElementById('submit-emp-data').className='btn btn-success';
    }
});


let postData=document.getElementById('post-data');
postData.addEventListener('click',async()=>{   
let result=await fetch('/postDetails',{
    method:"POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }, 
   body: JSON.stringify(emp_structure)
});
let data=await result.json();
if(data){
    window.location.href='html/filled.html';
}
});