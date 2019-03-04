$(function () {
  console.log("app/assets/javascripts/job.js")
})
var createdJobIndex = () => {
  $('#created-jobs').on("click", function (e) {
    // debugger
    e.preventDefault()
   
    $.ajax({
      url: this.href,
      method: 'GET',
      dataType: 'json'
    }).success(function (resp) {// json data arrived    resp is an array
      clearAppDivId()
      let jobData
      resp.map(j => {// let jobData =  new Job lookup how to map through ALL of resp
        jobData = new Job(j) // jobData is an instance of Job
        // jobData.jobHTML() // call .jobHTML() on the instance of Job (jobData) to create the html string that we can append to the DOM 
        let jobDataHtml = jobData.jobHTML()
        $('#app-div-id').append(jobDataHtml)    // append jobDataHtml to the DOM in the div you specified
      })
    })
  })
}

const upcomingJobs = () => {
  $('#upcoming-jobs').on("click", function (e) {
    e.preventDefault()
    // debugger
    $.ajax({
      url: this.href,
      method: 'GET',
      dataType: 'json'
    }).success(function (response) {
      clearAppDivId()
      // debugger
      let jobData
      response.map(job => {
        jobData = new Job(job);
        let jobDataHtml = jobData.jobHTML()
        $('#app-div-id').append(jobDataHtml) 
      })
    })
  })
}

const pastJobsIndex = () => {
  $('#past-jobs').on("click", function (e) {
    e.preventDefault()
    $.ajax({
      url: this.href,
      method: 'GET',
      dataType: 'json'
    }).success(function (resp) {// json data arrived    resp is an array
      clearAppDivId()
      let jobData
      resp.map(j => {
        jobData = new Job(j) // jobData is an instance of Job
        // jobData.jobHTML() // call .jobHTML() on the instance of Job (jobData) to create the html string that we can append to the DOM 
        let jobDataHtml = jobData.jobHTML()
        $('#app-div-id').append(jobDataHtml)    // append jobDataHtml to the DOM in the div you specified
      })
    })
  })
}
// define Job class
class Job {
  constructor(obj) {
    this.title = obj.title
    this.address = obj.address
    this.state = obj.state
    this.date = obj.date
    // this.date = obj.date.toDateString() 
  }
  // static newJobForm(){
  //   return (` 
    
    
  //   `)
  // }


}

Job.prototype.jobHTML = function () {

  return (`
    <div>${this.title}</div>
    <p> ${this.address}</p>
    <p> ${this.state}</p>
    <p> ${this.date}</p>
  `)
}


function clearAppDivId() {
  $('div#app-div-id').html("")
}