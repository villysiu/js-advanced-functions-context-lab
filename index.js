/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
let createEmployeeRecord = (employeeInfo) => {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2], 
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
let createEmployeeRecords = (allEmployee) => (
     allEmployee.map(e => createEmployeeRecord(e))
)
function createTimeInEvent(dateStamp)  {
    let [date, hour] = dateStamp.split(" ")
    this.timeInEvents.push(
        {
        type: "TimeIn",
        date: date,
        hour: parseInt(hour)
        }
    )
     return this
}
function createTimeOutEvent(dateStamp)  {
    let [date, hour] = dateStamp.split(" ")
    this.timeOutEvents.push(
        {
        type: "TimeOut",
        date: date,
        hour: parseInt(hour)
        }
    )
     return this
}
function hoursWorkedOnDate(date) {
    let timeInHour = this.timeInEvents.find(e => e.date === date).hour/100
    let timeOutHour = this.timeOutEvents.find(e => e.date === date).hour/100
    
    return timeOutHour-timeInHour
}
function wagesEarnedOnDate(date) {
    // return this.payPerHour * hoursWorkedOnDate.call(this, date)
    let ff = hoursWorkedOnDate.bind(this)
    return this.payPerHour * ff(date)
}
let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
let calculatePayroll = (allEmployee) => (
    allEmployee.reduce((total, e) => total + allWagesFor.call(e), 0)
)
let findEmployeeByFirstName = (allEmployee, firstName) => (
    allEmployee.find((e) => e.firstName === firstName)
)