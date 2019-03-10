
const setupEmployeeLoginLink = () => {
  $('#employee-login').on("click", (e) => {
    e.preventDefault()

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
    e.preventDefault()

    $.ajax({
      type: "POST",
      data: $(this).serialize(),
      dataType: 'json',
      url: this.action //'session/create_employee'
    }).success(function (response) {
      let employee = new Employee(response)
      let employeeHtml = employee.employeeHTML()
      deleteLoginEmployeeForm()
      $('div#employee-div-id').html(employeeHtml)
      pastJobsIndex()
      upcomingJobs()
    })
      .error(function (a, err) {
        console.error("err:", err)
      })
  })
}

const setupEmployeeNewLink = () => {
  $('a#new_employee').on("click", (e) => {
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
      // debugger
      $('a.navbar-brand#root').on('click', (e) => goToLandingPage(e));
    })
    // debugger
    // $('a.navbar-brand#root').on('click', (e) => goToLandingPage(e));
  })
  // debugger
  // $('a.navbar-brand#root').on('click', (e) => goToLandingPage(e));
}

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
