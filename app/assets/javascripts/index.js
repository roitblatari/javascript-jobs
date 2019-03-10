$(function () {
  console.log("app/assets/javascripts/index.js")
  setupEmployeeLoginLink();
  setupEmployeeNewLink();
  setupEmployerLoginLink();
  setupEmployerNewLink();
  // goToLandingPage()
  $('a#home').on("click", (e) => home(e))
  pastJobsIndex()
})

const home = (e) => {
  e.preventDefault()
  $.ajax({
    type: "GET",
    data: $(this).serialize(),
    dataType: 'json',
    url: e.currentTarget["href"],
  }).success(function (response) {

    let employer = new Employer(response)
    let employerHtml = employer.employerHTML()
    $('div#employer-div-id').html(employerHtml)
    
    newJobForm()
    response.jobs.map(j => {
      jobData = new Job(j) // jobData is an instance of Job
      // jobData.jobHTML() // call .jobHTML() on the instance of Job (jobData) to create the html string that we can append to the DOM 
      let jobDataHtml = jobData.jobHTML()
      $('#jobs-div-id').append(jobDataHtml)    // append jobDataHtml to the DOM in the div you specified
    })
  })

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

function goToLandingPage(e) {
  debugger
  if (e) {
    e.preventDefault()
  }

  const landingPageHtml = `
      <div id="the-welcome-page">
        <br><br>
        <h1>Welcome.</h1><br>
        <h2> Are You an <span > <a href="new_employer"/employers/new" id="new_employer">Employer</a>  </span> 
        or an  <a href="new_employee"/employees/new" id="new_employee">Employee</a> ? </h2>
                       
        <br><br><br><br><br><br><br>0<br>
      </div>
  `
  $('.container').html(landingPageHtml);
    setupEmployeeNewLink()
    setupEmployerNewLink()
  $('a.navbar-brand#root').on("click", goToLandingPage);
}


