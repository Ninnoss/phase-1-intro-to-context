// Your code here
function createEmployeeRecord(arr) {
  const [firstName, familyName, title, payPerHour] = arr;
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arr) {
  const employees = [];
  for (let i = 0; i < arr.length; i++) {
    const [firstName, familyName, title, payPerHour] = arr[i];
    employees.push(createEmployeeRecord([firstName, familyName, title, payPerHour]));
  }
  return employees;
}

function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  const timeIn = {
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date: date,
  };

  employee.timeInEvents.push(timeIn);
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  const timeOut = {
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date: date,
  };
  employee.timeOutEvents.push(timeOut);
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeInEvent = employee.timeInEvents.find((event) => event.date === date);
  const timeOutEvent = employee.timeOutEvents.find((event) => event.date === date);

  const timeInHour = parseInt(timeInEvent.hour, 10);
  const timeOutHour = parseInt(timeOutEvent.hour, 10);

  return (timeOutHour - timeInHour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);

  return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map((event) => event.date);
  const totalWages = datesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employee, date);
  }, 0);
  return totalWages;
}

function calculatePayroll(employees) {
  let totalPay = 0;
  for (const employee of employees) {
    totalPay += allWagesFor(employee);
  }
  return totalPay;
}
