$(function () {
  // clearAppDiv()
  console.log("app/assets/javascripts/index.js")
  employeeLoginForm();
  employeeNewForm();

  $('a.navbar-brand#root').on('click', (e) => rootPage(e));
  $('a#home').on("click", (e) => home(e))
  // $('#past-jobs').on("click", (e) => pastJobsIndex(e))
  pastJobsIndex()
  // jobIndex()
  // $('a#created-jobs').on('click', (e) => jobIndex(e));
})

const home = (e) => {
  e.preventDefault()
  // debugger
  $.ajax({
    url: e.currentTarget["href"],
    method: 'GET',
    dataType: 'html'
  }).success(function (response) {
    debugger
    $('body').html(response)
    // debugger
    upcomingJobs();
    // jobIndex()
    
    newJobForm()
    createdJobIndex()
    // $('#created-jobs').on("click", e => upcomingJobs(e) )
  })
  // })
}


// //////////////// Employee /////////////////////
//
const employeeLoginForm = () => {
  $('#employee-login').on("click", (e) => {
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

const submitEmployeeLoginForm = () => {
  $('form#new_session_form').on("submit", function (e) {
    // debugger
    e.preventDefault()

    $.ajax({
      type: "POST",
      data: $(this).serialize(),
      dataType: 'json',
      url: this.action //'session/create_employee'
    }).success(function (response) {
      // debugger
      let employee = new Employee(response)
      let employeeHtml = employee.employeeHTML()
      deleteLoginEmployeeForm()
      $('div#employee-div-id').html(employeeHtml)
      pastJobsIndex()
      upcomingJobs()
    })
    // .error(function (a, err) {
      // debugger
      // console.log("err:" , err)
    // })
  })
}




const employeeNewForm = () => {
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
    debugger
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
      $('a.navbar-brand#root').on('click', (e) => rootPage(e));
    })
    $('a.navbar-brand#root').on('click', (e) => rootPage(e));
  })
  $('a.navbar-brand#root').on('click', (e) => rootPage(e));
}










function clearWelcome() {
  $('div#the-welcome-page').html("")
}
function clearAppDivId() {
  $('div#app-div-id').html("")
}
function deleteNewEmployeeForm() {
  $('#new_employee_form').html("")
}
function deleteLoginEmployeeForm() {
  $('#new_session_form').html("")
}

var rootPage = (e) => {
  e.preventDefault()
  // debugger
  $.ajax({
    url: "http://0.0.0.0:3000/",
    method: 'GET',
    dataType: 'html'
  }).success(function (response) {
    $('.container').innerHTMl = response
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
    <p> ${this.id}</p>
		<h3>${this.name}</h3>
    <p> ${this.email}</p>
    <p> ${this.profession}</p>


    <button type="button" class="btn btn-light">
    <a id="past-jobs" href="/employees/${this.id}/jobs/past_jobs">Past Jobs</a>

    </button>
    <button type="button" class="btn btn-light">
      <a id="upcoming-jobs" href="/employees/${this.id}/jobs/upcoming_jobs"  >Upcoming Jobs</a>
    </button>



    </div>

  `)
}
