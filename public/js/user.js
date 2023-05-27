/* eslint-disable prettier/prettier */
let alluserData;
const userBtn=document.getElementById("usersBtn");
const totalqueErr=document.getElementById("totalque-err");
const useremailErr=document.getElementById("useremail-err");
const durationErr=document.getElementById("duration-err");
const usernameErr=document.getElementById("username-err");

let validateName_flag = 1,validateMail_flag=1;
async function userData() {
    const response = await fetch('/users/getUsers');
     alluserData = await response.json();
    console.log(alluserData);
    if (alluserData.status === 200) {
        let userArray = []
        userArray = alluserData.data

        let htmldata = '';
        userArray.map((element, i) => {
            let tabledata = `<tr>
                    <td>${i + 1}</td>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.email}</td>
            `
            let tdroles = '';
            if (element.rolesId == 1) {
                tdroles = ` <td>Admin</td>`
            }
            else {
                tdroles = `<td>User</td > `
            }
            let rolesData =
                ` <td> <a id="${element.id}" class="d-inline p-2  btn btn-danger"onClick="deleteData(this)">
                 delete
                </a>
                </td>
                <td>
                <a id="${element.id}" class="d-inline p-2 btn btn-primary"onClick="updateData(this);showModal();">
                 edit
                </a>
                <td/>
            </tr> `
            tdroles += rolesData;
            tabledata += tdroles;
            i++;
            htmldata += tabledata;
        });
        let resultdata = document.querySelector('.userData');
        resultdata.innerHTML = htmldata;
    }
}

async function deleteData(ele) {
    console.log(ele.id);
    const submitForm = await fetch(`/users/remove/${ele.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: ele.id
        })
    })
    const results = await submitForm.json();
    if (results.status === 200) {
        alert('user deleted successfully');
        userData()
    }
    else if(results.status === 403)
    {
        alert('admin user is not deleted');
        userData()
    }
   
}
let updatedId;
const username=document.getElementById("username");
const useremail=document.getElementById("useremail");
let userdata;
async function updateData(ele) {
    updatedId=Number(ele.id);
    userdata=alluserData.data.filter((user)=>user.id==ele.id);
    username.value=userdata[0].name;
    useremail.value=userdata[0].email;
    validateInfo()
}


async function dataUpdate()
{
    const submitForm = await fetch(`/users/update/${updatedId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: username.value,
            email: useremail.value
        })
    })
    console.log('response: ');
    const results = await submitForm.json();
    if (results.status == 200) {
        alert('user updated successfully');
        userData()
    }

    disableModal()
    return true;
}
  
async function Search(str) {
  
    const flag = document.getElementById("filter-box").value;
  
    var searching = document.getElementById("search").value;
  
    var res = await fetch(`/exams/filter-exam/?search=${str}&flag=${flag}`);
    var data = await res.json();
    var value = data.exam;
  
    var tbody = document.getElementById("table");
  
    var content = ``;
  
    let count = 1;
    var switch_content = ``;
    value.forEach(element => {
      var status = element.exam_isActive;
      var exam_id = element.exam_id;
      var status_content = ``;
  
      if (status == 'yes') {
        status_content += 'checked';
      } else {
        status_content += '';
      }
  
      content += '<tr>'
      content += `
              <td> ${count}</td>
              <td> ${element.exam_name} </td>
              <td> ${element.exam_access_code} </td>
              <td> ${element.exam_total_question} </td>
              <td> ${element.createdDate} </td>
              <td>
               <div class="form-check form-switch">
                      <input class="form-check-input switch" type="checkbox" role="switch"
                        onchange="toggleSwitch('${exam_id}')" ${status_content}>
                </div>
              </td>
              <td>
                   <a href="/result/student/?exam_id=${exam_id}">View Result</a>
              </td>
                
              `
  
  
      content += '</tr>'
      count++;
    });
  
  
    tbody.innerHTML = content;
  
  }
  
  function showModal() {
    var userModel = document.getElementById("editmodel");
    userModel.classList.add("show");
    userModel.style.display = "block";
    userModel.classList.add("modal-open");
  }
  
  function disableModal() {
    var userModel = document.getElementById("editmodel");  
    userModel.classList.remove("show");
    userModel.style.display = "none";
    usernameErr.innerHTML=""
    useremailErr.innerHTML="";
    userModel.classList.remove("modal-open");
  }
  
async function validateName(){

    if(username.value.trim() ==''){
        usernameErr.innerHTML='Please enter Name';
        validateName_flag =0;
    }
    else{
        usernameErr.innerHTML="";
        validateName_flag =1;
    }
    validateInfo();
}
async function validateEmail(){
    if(useremail.value.trim()==''){
        useremailErr.innerHTML='Please enter email address';
        validateMail_flag=0;
    }
    else  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(useremail.value.trim())))
    {
        useremailErr.innerHTML='Please enter valid email address';
        validateMail_flag=0;
    }
    else{
        useremailErr.innerHTML="";
        validateMail_flag=1;
    }
    validateInfo();
}


function validateInfo(){
    if( validateMail_flag == 1 && validateName_flag==1){
        useremailErr.innerHTML="";
        usernameErr.innerHTML="";
        enableBtn();
    }else{
        disableBtn();
    }
}

function disableBtn(){
    userBtn.disabled=true;
}

function enableBtn(){
    userBtn.disabled=false;
}

