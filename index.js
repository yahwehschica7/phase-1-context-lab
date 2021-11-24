const createEmployeeRecord = employeeRecord => {
    return {
        firstName: employeeRecord[0],
        familyName: employeeRecord[1],
        title:employeeRecord[2],
        payPerHour: employeeRecord[3],
        timeInEvents: [],
        timeOutEvents: []
    }   
}
    
const createEmployeeRecords = empRecords => {
    return empRecords.map(rec => createEmployeeRecord(rec))
}  

const createTimeInEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(" ") 
    const clockIn = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    this.timeInEvents.push(clockIn)
    return this 
    
}

const createTimeOutEvent = function(dateStamp) {
    const[date, hour] = dateStamp.split(" ")
    const clockOut = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    this.timeOutEvents.push(clockOut)
    return this 
}

const hoursWorkedOnDate = function(formDate) {
    const cameIn = this.timeInEvents.find(timeIn => 
        timeIn.date === formDate)
    const wentOut = this.timeOutEvents.find(timeOut =>
        timeOut.date === formDate)

    return (wentOut.hour - cameIn.hour) / 100
}

const wagesEarnedOnDate = function(formDate) {
    return hoursWorkedOnDate.call(this, formDate) * this.payPerHour    
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(records => records.firstName === firstName) 
}

const calculatePayroll = function(recordsArray) {
    return recordsArray.reduce((total, record) => {
        return total + allWagesFor.call(record)
    }, 0)
}







/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

