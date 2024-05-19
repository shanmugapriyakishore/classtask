// start for control coding
var registerForm = document.querySelector("#register-form");
var allInput = registerForm.querySelectorAll("INPUT");
var addBtn = document.querySelector("#add-btn");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-icon")
addBtn.onclick =function() {
    modal.classList.add("active")
};
 closeBtn .addEventListener("click",()=>{
   modal.classList.remove("active")
   var i;
   for (i=0;i<allInput.length;i++){
      allInput[i].value = "";
   }
 });

// start all the global variables
var userData=[];
var profile_pic = document.querySelector("#profile-pic");
var uploadPic = document.querySelector("#upload-field");
var idEl = document.getElementById("id");
var nameEl = document.querySelector("#name");
var l_nameEl= document.getElementById("l-name")
var emailEl = document.querySelector("#email")
var officeEl= document.querySelector("#office-code")
var JobTitleEl = document.querySelector("#job-title")
var registerBtn = document.querySelector("#register-btn");
var updateBtn = document.querySelector("#update-btn");
var registerForm = document.querySelector("#register-form");
 var imgUrl = "img/avtar.png";
//  end all the global variables

//start register coding
registerBtn.onclick=function(e){
    e.preventDefault();// Prevent the form from submitting and reloading the page
   
    // Clear any existing error messages
    clearErrorMessages();
    if (validateForm()){
    registrationData();  // Call the function to handle registration data
    getDataFromLocal();
    registerForm.reset();   // Reset the form fields to their default values
     closeBtn.click();  //Programmatically click the close button to close the modal/dialog
    }

};

 if(localStorage.getItem("userData")!= null){
userData= JSON.parse(localStorage.getItem("userData"));
console.log(userData)
 }


function validateForm() {
    let valid = true;

    // Id validation
    if (idEl.value.trim() === '') {
        showError('idError', 'Id is required.');
        valid = false;
    }

    // Name validation
    if (nameEl.value.trim() === '') {
        showError('nameError', 'Name is required.');
        valid = false;
    }

    // Last name validation
    if (l_nameEl.value.trim() === '') {
        showError('lNameError', 'Last name is required.');
        valid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailEl.value.trim() === '') {
        showError('emailError', 'Email is required.');
        valid = false;
    } else if (!emailPattern.test(emailEl.value.trim())) {
        showError('emailError', 'Invalid email format.');
        valid = false;
    }

    // Office code validation
    if (officeEl.value.trim() === '') {
        showError('officeCodeError', 'Office code is required.');
        valid = false;
    }

    // Job title validation
    if (JobTitleEl.value.trim() === '') {
        showError('jobTitleError', 'Job title is required.');
        valid = false;
    }

    return valid;
}

// Function to show error messages
function showError(elementId, message) {
    let errorElement = document.getElementById(elementId);
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.id = elementId;
        errorElement.className = 'error-message';
        document.querySelector(`#${elementId.replace('Error', '')}`).parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

// Function to clear error messages
function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

function registrationData(){
 userData.push({
    id: idEl.value,
    name:nameEl.value,
    l_name:l_nameEl.value,
    email:emailEl.value,
    officeCode:officeEl.value,
    JobTitle:JobTitleEl.value,
    profilePic: imgUrl == undefined ? "img/avtar.png" : imgUrl,


 });
 var userString = JSON.stringify(userData);
 localStorage.setItem('userData',userString );
 swal("Good job!", "Registration Success!", "success");
}

//start returning the data from localStorage
 var tableData = document.querySelector("#table-data") 
const getDataFromLocal = () =>{
    tableData.innerHTML = "";
    userData.forEach((data,index)=>{
           tableData.innerHTML += `
        <tr index='${index}'>
        <td>${index+1}</td>
        <td><img src="${data.profilePic}" width="40"></td>
        <td>${data.id}</td>
        <td>${data.name}</td>
        <td>${data.l_name}</td>
        <td>${data.email}</td>
        <td>${data.officeCode}</td>
        <td>${data.JobTitle}</td>
        <td>
          <button class= "edit-btn">
             <i class="fa fa-eye"></i>
         </button>
         <button  class= "del-btn" style="background-color: #EE534f ">
           <i class="fa fa-trash"></i>
         </button>
       </td>
       </tr>
           `;   
        });
      
        // start delete coding

        var i;
        var allDelBtn = document.querySelectorAll(".del-btn")
        for(i=0;i<allDelBtn.length;i++){
            allDelBtn[i].onclick = function() {
                var tr = this .parentElement.parentElement;
                var id = tr.getAttribute("index");
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this imaginary file!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    userData.splice(id,1);
                    localStorage.setItem("userData",JSON.stringify(userData));
                    tr.remove();
                    if (willDelete) {
                      swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                      });
                    } else {
                      swal("Your imaginary file is safe!");
                    }
                });
               
            }
        }
        // start update coding
         var allEdit = document.querySelectorAll(".edit-btn");
         for(i=0;i<allEdit.length;i++){
            allEdit[i].onclick = function(){
                var tr = this. parentElement.parentElement;
                var td = tr.getElementsByTagName("td");
                var index = tr.getAttribute("index")
                var imgTag = td[1].getElementsByTagName("IMG")
                var profilePic = imgTag[0].src
                var id = td[2].innerHTML;
                var name = td[3].innerHTML;
                var l_name = td[4].innerHTML;
                var email = td[5].innerHTML;
                var officeCode = td[6].innerHTML;
                var JobTitle= td[7].innerHTML;
                addBtn.onclick();
                registerBtn.disabled = true;
                updateBtn.disabled = false
                idEl.value = id;
                nameEl.value= name;
                l_nameEl.value = l_name;
                emailEl.value = email;
                officeEl.value = officeCode;
                JobTitleEl.value = JobTitle;
                profile_pic .src = profilePic;
                updateBtn.onclick = function (){
                    userData[index] ={
                        id: idEl.value,
                        name:nameEl.value,
                        l_name:l_nameEl.value,
                        email:emailEl.value,
                        officeCode:officeEl.value,
                        JobTitle:JobTitleEl.value,
                        profilePic: uploadPic.value == "" ?   profile_pic .src: imgUrl,
                
                    }
                    localStorage.setItem("userData",JSON.stringify(userData));
                }


                
            }
         }
    }
    getDataFromLocal();




// image processing
uploadPic.onchange = function() {
    if (uploadPic.files[0].size < 1000000) { // Limit file size to 1MB

        var fReader = new FileReader();
        fReader.onload = function(e) {
            imgUrl = e.target.result;
            profile_pic.src = imgUrl;
        }
        fReader.readAsDataURL(uploadPic.files[0]);

    } else {
        alert("File Size Is Too Large");
    }
}

// start search coding
var searchEl = document.querySelector("#empId");
searchEl.oninput = function(){
    searchFuc();
}

function searchFuc() {
    var tr = tableData.querySelectorAll("tr");
    var filter = searchEl.value.toLowerCase();
    
    for (var i = 0; i < tr.length; i++) {
        var tds = tr[i].getElementsByTagName("td");

        if (tds.length >= 6) { // Check if there are enough td elements to avoid errors
            var id = tds[2].innerHTML;
            var name = tds[3].innerHTML;
            var l_name = tds[4].innerHTML;
            var email = tds[5].innerHTML;

            // Check if any of the fields contain the filter text
            if (id.toLowerCase().indexOf(filter) > -1 ||
                name.toLowerCase().indexOf(filter) > -1 ||
                l_name.toLowerCase().indexOf(filter) > -1 ||
                email.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// start clear coding
var delAllBtn = document.querySelector("#del-all-btn");
var allDelBox = document.querySelector("#del-all-box");
console.log(allDelBox)
delAllBtn.addEventListener('click',()=>{
    if(allDelBox.checked == true){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                localStorage.removeItem("userData");
                window.location = location.href;
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
    }
    else{
        swal("Check The Box", "Please check the box to delete data", "warning");
    }
})
