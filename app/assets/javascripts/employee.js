// 
$(function () {
  console.log("app/assets/javascripts/employee.js")
})

//////////////// Employee /////////////////////

const employeeLoginForm = () => {
  $('a#employee-login').on("click", function (e) {

    e.preventDefault()
    // debugger
    clearWelcome()

    $.ajax({
      url: 'http://0.0.0.0:3000/signin_employee',
      method: 'GET',
      dataType: 'html'
    }).success(function (response) {
      $('div#app-div-id').html(response);
      submitEmployeeLoginForm()
    })
  })
}

var employeeNewForm = () => {
  $('a#new_employee').on("click", function (e) {
    e.preventDefault()

    clearWelcome()
    $.ajax({
      url: 'http://0.0.0.0:3000/employees/new',
      method: 'GET',
      dataType: 'html'
    }).success(function (response) {
      $('div#app-div-id').html(response)
      submitEmployeeNewForm();
    })
  })
}

const submitEmployeeNewForm = (e) => {
  $('form#new_employee_form').on("submit", function (e) {
    e.preventDefault()
    $.ajax({
      type: "POST",
      data: $(this).serialize(),
      dataType: 'json',
      url: this.action
    }).success(function (response) {

      let employee = new Employee(response)
      let employeeHtml = employee.employeeHTML()
      deleteNewEmployeeForm()
      $('div#employee-div-id').html(employeeHtml)

    })
  })
}

const submitEmployeeLoginForm = () => {
  $('form#new_session_form').on("submit", function (e) {
  //  debugger
    e.preventDefault()
    
    $.ajax({
      type: "POST",
      data: $(this).serialize(),
      dataType: 'json',
      url: this.action //'session/create_employee'
    }).success(function (response) {
debugger
      let employee = new Employee(response)
      let employeeHtml = employee.employeeHTML()
      deleteLoginEmployeeForm()
      $('div#employee-div-id').html(employeeHtml)

    }).error(function (a,err, errObj ) {
      debugger
      // console.log("err:" , err)
    })
    
  })
}



function clearWelcome() {
  $('div#the-welcome-page').html("")
}
function deleteNewEmployeeForm() {
  $('#new_employee_form').html("")
}
function deleteLoginEmployeeForm() {
  $('#new_session_form').html("")
}

var rootPage = (e) => {
  e.preventDefault()
  $.ajax({
    url: 'http://0.0.0.0:3000/',
    method: 'GET',
    dataType: 'html'
  }).success(function (response) {
    $('body').html(response)
  })
}

// define Employee class
class Employee {
  constructor(obj) {
    this.name = obj.name;
    this.email = obj.email;
    this.profession = obj.profession;
    this.id = obj.id;
  }
}

Employee.prototype.employeeHTML = function () {
  return (`
    <div class='employee-show'>
		<h3>${this.name}</h3>
    <p> ${this.email}</p>
    <p> ${this.profession}</p>

    <button type="button" class="btn btn-light" id="past-jobs-employee-jobs-path">
      <a href="/employees/${this.id}/jobs/past_jobs">Past Jobs</a>
    </button>
    <button type="button" class="btn btn-light" id="past-jobs-employee-jobs-path">
      <a href="/employees/${this.id}/jobs/upcoming_jobs">Upcoming Jobs</a>
    </button>


    
    </div>
    
  `)
}
