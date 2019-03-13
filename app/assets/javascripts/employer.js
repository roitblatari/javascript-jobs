$(function () {
  console.log("app/assets/javascripts/employer.js")
  // 
  // 
  // setupEmployerNewLink();
})

const setupEmployerLoginLink = () => {
  $('#employer-login').on("click", (e) => {
    e.preventDefault()
    // debugger
    clearWelcome()
    $.ajax({
      url: 'http://0.0.0.0:3000/signin_employer',
      method: 'GET',
      dataType: 'html'
    }).success(function (response) {
      $('div#app-div-id').html(response);
      submitEmployerLoginForm()
    })
  })
}

const submitEmployerLoginForm = () => {
  $('form#new_session_form').on("submit", function (e) {
    // debugger
    e.preventDefault()

    $.ajax({
      type: "POST",
      data: $(this).serialize(),
      dataType: 'json',
      url: this.action //'session/create_employer'
    }).success(function (response) {
      // debugger
      console.log(response)
      let employer = new Employer(response)
      let employerHtml = employer.employerHTML()
      deleteLoginForm()
      $('div#employer-div-id').html(employerHtml)
      // debugger
      newJobForm()
      abcJobList()
      response.jobs.map(j => {
        jobData = new Job(j) // jobData is an instance of Job
        // jobData.jobHTML() // call .jobHTML() on the instance of Job (jobData) to create the html string that we can append to the DOM 
        let jobDataHtml = jobData.jobHTML()
        $('#jobs-div-id').append(jobDataHtml)    // append jobDataHtml to the DOM in the div you specified
      })
      createdJobIndex()
    }).error(function (a, err) {
      // debugger
      console.error("err:" , err)
    })
  })
}

function deleteLoginForm() {
  $('#new_session_form').html("")
}

function deleteNewEmployerForm() {
  $('#new_employer_form').html("")
}

var setupEmployerNewLink = () => {
  $('a#new_employer').on("click", function (e) {
    e.preventDefault()

    clearWelcome()
    $.ajax({
      url: 'http://0.0.0.0:3000/employers/new',
      method: 'GET',
      dataType: 'html'
    }).success(function (response) {
      $('div#app-div-id').html(response)
      submitEmployerNewForm();
    })
  })
}

const submitEmployerNewForm = (e) => {
  $('form#new_employer_form').on("submit", function (e) {
    e.preventDefault()
    $.ajax({
      type: "POST",
      data: $(this).serialize(),
      dataType: 'json',
      url: this.action
    }).success(function (response) {

      let employer = new Employer(response)
      let employerHtml = employer.employerHTML()
      deleteNewEmployerForm()
      $('div#employer-div-id').html(employerHtml)
      newJobForm()

    })
  })
}

class Employer {
  constructor(obj) {
    this.name = obj.name;
    this.email = obj.email;
    this.id = obj.id;
  }
}
// id = "create-job" href = "/employers/${this.id}/jobs/new"
Employer.prototype.employerHTML = function () {
  return (`
    <div class='employer-show'>
      <p>id: <span id="employer-id">${this.id}</span></p>
      <h3>${this.name}</h3>
      <p> ${this.email}</p>
      
      <button id="create-job" type="button"  class="btn btn-light">
        <a href="/employers/${this.id}/jobs/new">Create a Job</a>
      </button>
      <button id="upcoming-jobs" type="button" class="btn btn-light">
        <a>  Upcoming Jobs</a>
      </button>

      <button id="abc_jobs" href="/employers/${this.id}/jobs/my_created_jobs" type="button" class="btn btn-light">
        <p> jobs in alphab. </p>
      </button>
      <h2>Below are the jobs you created</h2>
    </div>

  `)
}
