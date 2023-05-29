async function userData() {
    const response = await fetch('/category/AllCategories');
    alluserData = await response.json();
    if (alluserData.status === 200) {
        let userArray = []
        userArray = alluserData.data
        let htmldata = '';
        userArray.map((element, i) => {
            htmldata += `<option value=${element.id} name>${element.name}</option>`
        });
        let resultdata = document.querySelector('#categoryselect');
        resultdata.innerHTML = htmldata;
    }
}
const createbtn = document.getElementById("createbtn");
const categorynameErr = document.getElementById("categoryname-err");
const categorydescErr = document.getElementById("categorydesc-err");
const categoryimageErr = document.getElementById("categoryimage-err");
const categorypriceErr = document.getElementById("categoryprice-err");
const categoryselectErr = document.getElementById("categoryselect-err");
const categoryquantityErr = document.getElementById("categoryquantity-err");
let validateProductName_flag = 0,
validateProductDesc_flag = 0,
validateProductImage_flag = 0,
validateProductPrice_flag = 0,
validateProductSelect_flag = 0,
validateProductQuantity_flag = 0
;
function showCreateModal() {
    var userModel = document.getElementById("create-model");
    userModel.classList.add("show");
    userModel.style.display = "block";
    userModel.classList.add("modal-open");
}

function disableCreateModal() {
    var userModel = document.getElementById("create-model");
    userModel.classList.remove("show");
    userModel.style.display = "none";
    categorynameErr.innerHTML = ""
    userModel.classList.remove("modal-open");
}

const categoryname = document.getElementById("categoryname");
async function validateCategoryName() {
    console.log(categoryname);
    // let res = await fetch(`/exams/checkcategoryname?categoryname=${categoryname}`);
    if (categoryname.value.trim() == '') {
        categorynameErr.innerHTML = 'Please enter Product Name';
        validateProductName_flag = 0;
    }
    else {
        categorynameErr.innerHTML = "";
        validateProductName_flag = 1;

    }
    createCategoryData();
}
const prouductdesc = document.getElementById("prouductdesc");
async function validateProductDesc() {

    if (prouductdesc.value.trim() == '') {
        categorydescErr.innerHTML = 'Please enter Product Description';
        validateProductDesc_flag = 0;
    }
    else {
        categorydescErr.innerHTML = "";
        validateProductDesc_flag = 1;

    }
    createCategoryData();
}


const formFile = document.getElementById("formFile");
async function validateProductImage() {
console.log(formFile.files.length);
    if (formFile.files.length == 0) {
        categoryimageErr.innerHTML = 'Please select Product Image';
        validateProductImage_flag = 0;
    }
    else {
        categoryimageErr.innerHTML = "";
        validateProductImage_flag = 1;

    }
    createCategoryData();
}


const price = document.getElementById("price");
async function validateProductprice() {
    if (price.value == '') {
        categorypriceErr.innerHTML = 'Please enter Product price';
        validateProductPrice_flag = 0;
    }
    else {
        categorypriceErr.innerHTML = "";
        validateProductPrice_flag = 1;

    }
    createCategoryData();
}
const quantity = document.getElementById("quantity");
async function validateProductQunatity() {

    if (quantity.value == '') {
        categoryquantityErr.innerHTML = 'Please enter Product quantity';
        validateProductQuantity_flag = 0;
    }
    else {
        categoryquantityErr.innerHTML = "";
        validateProductQuantity_flag = 1;

    }
    createCategoryData();
}
const categoryselect = document.getElementById("categoryselect");
async function validateSelect() {
    
    if (categoryname.value.trim() == '') {
        categorynameErr.innerHTML = 'Please select category ';
        validateProductName_flag = 0;
    }
    else {
        categorynameErr.innerHTML = "";
        validateProductName_flag = 1;

    }
    createCategoryData();
}



function createCategoryData() {

    if (validateProductName_flag == 1 && validateProductPrice_flag ==1 && validateProductQuantity_flag ==1  && validateProductDesc_flag==1) {
        categorynameErr.innerHTML = "";
        enableBtn();

    } else {
        disableBtn();
    }
}

async function createData() {
const formData = new FormData();
formData.append('file', price);
console.log(formFile.files[0]);


const selectedValues = Array.from(categoryselect.querySelectorAll("option"))
  .filter(option => option.selected)
  .map(option => option.value);
  const categorystring = selectedValues.join(", ");
  console.log(categorystring); 
    // const responsedata = await fetch('/products/newAddProduct', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         file:formData,
    //         ProductName: categoryname.value.trim(),
    //         description:prouductdesc.value.trim(),
    //         price:price.value ,
    //         quantity:quantity.value,
    //         catagory:categorystring

    //     })
    // })
    // const results = await responsedata.json();
    // console.log(results);
    // if (results.status == 200) {
    //     alert('category added successfully');
    //     userData()
    // }

    categoryname.value = ''
    disableCreateModal()
}
function disableBtn() {
    createbtn.disabled = true;
}

function enableBtn() {
    createbtn.disabled = false;
}


/* edit  */

/* eslint-disable prettier/prettier */
let alluserData;
const userBtn = document.getElementById("usersBtn");
const durationErr = document.getElementById("duration-err");
const usernameErr = document.getElementById("username-err");

let validateName_flag = 1, validateMail_flag = 1;


async function deleteData(ele) {
    console.log(ele.id);
    const submitForm = await fetch(`/category/deleteCategory/${ele.id}`, {
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
    else if (results.status === 403) {
        alert('admin user is not deleted');
        userData()
    }

}
let updatedId;
const username = document.getElementById("username");

let userdata;
async function updateData(ele) {
    updatedId = Number(ele.id);
    userdata = alluserData.data.filter((user) => user.id == ele.id);
    username.value = userdata[0].name;
    validateInfo()
}


async function dataUpdate() {
    const submitForm = await fetch(`/category/updateCategory/${updatedId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: username.value,

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
    usernameErr.innerHTML = ""

    userModel.classList.remove("modal-open");
}

async function validateName() {

    if (username.value.trim() == '') {
        usernameErr.innerHTML = 'Please enter Name';
        validateName_flag = 0;
    }
    else {
        usernameErr.innerHTML = "";
        validateName_flag = 1;
    }
    validateInfo();
}



function validateInfo() {
    if (validateName_flag == 1) {

        usernameErr.innerHTML = "";
        EditenableBtn();
    } else {
        EditdisableBtn();
    }
}

function EditdisableBtn() {
    userBtn.disabled = true;
}

function EditenableBtn() {
    userBtn.disabled = false;
}


async function searchQuery(ele)
{
   const searchdata=ele.value.trim();

    const responsedata=await fetch(`/category/search?value=${searchdata}`);
    const alluserData=await responsedata.json();

    document.querySelector('.userData').innerHTML='';

    if (alluserData.status === 200) {
        let userArray = []
        userArray = alluserData.data
        let htmldata = '';
        userArray.map((element, i) => {
            htmldata += `<tr>
            <td>${i + 1}</td>
            <td>${element.id}</td>
            <td>${element.name}</td>
         <td class="mr-2"> <a id="${element.id}" class="d-inline  btn btn-danger"onClick="deleteData(this)">
         delete
        </a>
        </td><td>
        <a id="${element.id}" class="d-inline p-2 btn btn-primary"onClick="updateData(this);showModal();">
         edit
        </a>
        <td/>
       </tr> `
        });
        let resultdata = document.querySelector('.userData');
        resultdata.innerHTML = htmldata;
    }
}
userData();


const sortdata=document.getElementsByClassName('sort');
console.log(sortdata);

for (let i = 0; i < sortdata.length; i++) {
    sortdata[i].addEventListener('click',sortfunction);
}

async function sortfunction(ele)
{
    console.log(ele.target.innerHTML);
}