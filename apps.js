const PORT = process.env.PORT || 8000;

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const axios = require('axios');
const { response } = require("express");
const app = express(); //initalise a new express app
// var mysql = require('mysql');
const { kill } = require("process");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');
const { redirect } = require("express/lib/response");
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

// Local in-memory mock data (replaces MySQL when running offline/locally)
let users = [];
let organizations = [];
let employeeLogs = {}; // keyed by "first_last"

let employeename = "Demo";
let employeeLastName = "User";
let firstLastTableName = "Demo_User";
let administratorStatus = "true";
let pinNumber = "1234";
let bizName = "AionDream";
let email = "demo@example.com";
let totalHours = "0";
let totalHoursB = "8";
let totalSessions = 0;
let results = [];

function getLocalTime(){
  var time = new Date();
  var localTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  return localTime;
};


function getMilitaryTime(){
  var time = new Date();
  var militaryTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
  return militaryTime;
};


// var It can be accessed without initialization as its default value is “undefined”.
// let It cannot be accessed without initialization, as it returns an error.
// const It cannot be accessed without initialization, as it cannot be declared without initialization.

app.set("view engine", "ejs");
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({extended: true}));

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: true }));

// your css and scripts folders sit next to /aion, so map them to the URLs the EJS files use
app.use("/aion/css", express.static(path.join(__dirname, "css")));
app.use("/aion/scripts", express.static(path.join(__dirname, "scripts")));
app.use("/aion", express.static(path.join(__dirname, "aion")));
app.use(express.static(path.join(__dirname, "public")));

// app.use("/webstats/images", express.static(__dirname + "/webstats/images")); SETTING UP THE FILES TO BE USED ONLINE 6/6/2022
// app.use('/webstats/css/css/style.css', express.static('/webstats/css/css/style.css'))
// app.set("view engine", "ejs");



/*
******************************************************************************************

      A JavaScript method is a property of an object that contains a function definition.
      Methods are functions stored as object properties.
      Object method can be accessed with the following syntax:

******************************************************************************************
1. Creating an Object variable
2. object variable equals the  mysql.createConnection Method with its parameters host user pass db
3. then using con variable with the mysql connect function
4. logging when connected
5. now we don't have to use repeat code.
6. note we don't have to con.connect in each get or post function now
*/
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "employeeinfo",
//   multipleStatments: true
// });

// const conTwo = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "companies",
//   multipleStatments: true
// });

//
// const conRegUsers = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "regusers",
//   multipleStatments: true
// });
// con.connect(err => {
//   if(err) {
//     throw err
//   }
//   console.log('MYSQL CONNECTED')
//   con.end();
// });

/*
TO DO NOTES:

have to end the counter function before re clocking in (done)
create data basefields for employee profiles (done)
use it to check if user is already clocked in so you can't clock in twice (if statments) (done)
create a employee page with name hours worked general stats (done)
maybe create a sign up page user forms (done)

NOTES March 17th
You're going to have to check databases on the front end when clocking in and clocking out as well.


NOTES MAY 5th:
Clock in is not working for added users by admin menu for some reason I don't know why
___________________________________________________________________________________________

TO DO NOTES MAY 10th 2022:
Redesign Admin panel with general stats
Redesign Employee Dashboard with Employee stats
Added users cannon't clock in and out correctly
Session and cookie Sign in proper login/log out
add buttons to dashboard and admin panel

get date and time if sunday at 11:59 clear database that has all the clockins (might have to interval check this function every second.)

5/11/2022
Everyweek reset tables under employeeinfo that are user names. before restting though add the session and hours to users table under the right users to calculate totals
___________________________________________________________________________________________

*/

/*
FIXES MAY 10th 2022:

In the Dashboard total hours wasn't pulling any data from the database so I manually had to put in a value ( use this for now)
in the /get dashboard route I had to fix the SQL query getting my admin status in the database all I had to do to fix this was edit the EJS code if else statment that hides that menu button


 5/10/2022  - BUG HAPPENS WHEN 2 PEOPLE TRY TO CLOCK IN AT ONE TIME Variables getting upset and changed so its not pointing to the right information
doesn't even change the clock staus to on for the second person
OKAY MAYBE NOT BUT I WILL KEEP THIS HERE FOR FUTURE USE IF I ENCOUNTER THIS BUG AGAIN
-- Cause for 5/10/2022 bug  the admin panel where you enter users is not adding pins correctly is it the formatting?
update for 5/10/2022 BUG, looks like 5567 pin is broken maybe it has to do something with the jQuery

update: some pins wont work while others work update to bug.SSSSS




*/


app.get('/landpage', function(req, res){
  res.render('landpage', {qs: req.query});
});



app.get('/', function(req, res){
  res.render('index', {qs: req.query});
});

app.get('/register', function(req, res){
  res.render('register', {qs: req.query});
});

app.get('/login', function(req, res){
  const crud = "";
  res.render('login', {weewee: crud});
});

app.get('/clockout', function(req, res){
  res.render('clockout', {qs: req.query})
});

app.get('/app', function(req, res){
  const crud = ""
  res.render('login', {crud})
});


app.get('/clockin', function (req, res){
  res.render('clockin', {qs: req.query})
});

app.get('/homebase', async function(req, res) {
  await sleep(1000);

  res.render('homebase', {qs: req.query, bizName: bizName})
});

app.get('/dashboard', function (req, res){
  firstLastTableName = employeename + '_' + employeeLastName;
  const userRows = (employeeLogs[firstLastTableName] || []).filter(r => r.email === email);
  results = userRows;
  totalSessions = userRows.length;
  totalHours = totalSessions > 0 ? String(totalSessions) : "0";
  totalHoursB = "8";

  const currentUser = users.find(u => u.email === email) || {
    administrator: administratorStatus,
    register_date: new Date().toDateString(),
    company: bizName,
    pin: pinNumber,
    position: "Staff"
  };

  res.render('dashboard', {
    empname: employeename,
    totalhours: totalHours,
    totalHours: totalHours,
    totalSessions: totalSessions,
    rows: results,
    admin: currentUser.administrator,
    regDate: currentUser.register_date,
    Org: currentUser.company,
    accountPin: currentUser.pin,
    position: currentUser.position
  });

  // con.query(`SELECT SUM(hours) AS total FROM ${firstLastTableName}`, function(err, result){
  //  totalHours = result[0].total
  // });
  // con.query(`SELECT * FROM ${firstLastTableName} WHERE email = ?`, [email], function (err, result){
  //   totalHoursB = "8"
  //   results = result
  //   //taking all the row entries and getting the length of clockin
  //   totalSessions = result.length
  // });
  // con.query(`SELECT * FROM users WHERE email = ?`, [email], function (err, checkAdminStatus){
  //   adminStatus = checkAdminStatus[0].administrator
  //   registerDate = checkAdminStatus[0].register_date
  //   org = checkAdminStatus[0].company
  //   accPin = checkAdminStatus[0].pin
  //   workPosition = checkAdminStatus[0].position
  //
  //   res.render('dashboard', {empname: employeename, totalhours: totalHours, total_sessions: totalSessions, rows: results, admin: adminStatus, regDate: registerDate, Org: org, accountPin: accPin, position: workPosition})
  // });

});


var onlineEmployeesList = []
app.get('/adminpanel', async function(req, res){
  onlineEmployeesList = users
    .filter(u => u.status && u.status.includes('on'))
    .map(u => u.name);

  res.render('adminpanel', {clockedinEmps: onlineEmployeesList});

  // onlineEmployeesList=[]
  // con.query(`SELECT * FROM users WHERE status LIKE '%on%'`, function(err, result){
  //   // employeesOnline = result[0].name
  //   for (i = 0; i < result.length; i++){
  //     onlineEmployeesList.push(result[i].name)
  //
  //     // console.log(employeesOnline)
  //   }
  //
  //   res.render('adminpanel', {clockedinEmps: onlineEmployeesList});
  //
  // });

});

// app.get('/createcompany', function(req, res){

//   res.render('createcompany', {qs: req.query})
// })



var clockOutDateAndTime = []

totalSeconds = 0
  function countTimer() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const withHyphens = [month, day, year].join('-');
    ++totalSeconds;
    var hour = Math.floor(totalSeconds /3600); // converts into hours
    var minute = Math.floor((totalSeconds - hour*3600)/60); // converts into minuets
    var seconds = totalSeconds - (hour*3600 + minute*60); // converts into seconds
    if(hour < 10)
    hour = "0"+hour;
    if(minute < 10)
    minute = "0"+minute;
    if(seconds < 10)
    seconds = "0"+seconds;
    var theTime = hour + ":" + minute + ":" + seconds
    clockoutInformations = {
      hours: theTime,
      formattedDate: withHyphens,

    }
    // var dateTime = theTime + ' ' + withHyphens

    clockOutDateAndTime.push(clockoutInformations)

    if (clockOutDateAndTime.length > 1){
      clockOutDateAndTime.shift()
    }
      };


function quitTimer(){
    clearInterval(timerVar)
}


//Clearing the Weekly Tables
function clearEmpTable(){
  // get a new date (locale machine date time)
  var date = new Date();
  // get the date as a string
  var n = date.toDateString();
  // get the time as a string
  var time = date.toLocaleTimeString();
  // log the date in the browser console
  // console.log('date:', n);
  // log the time in the browser console
  // console.log('time:',time);
  var theDay = n.slice(0,3)
  var theTime = time.slice(0.7)
  // console.log(theDay)
  // console.log(theTime)
  if (theDay =="Sun" && theTime =="11:59:00 PM"){
    console.log("Hello it worked")
  }
};

// conRegUsers.query("SHOW tables", function (err, result){
//   for ( var i = 0;  i < result.length; i++){
//     console.log(result[i].Tables_in_division_clockifyregusers)
//     tableNames = result[i].Tables_in_division_clockifyregusers
//     con.query(`DELETE FROM ${tableNames}`, function (err, result){
//     });
//
//   }
// });


checkTimeEverySecond = setInterval(clearEmpTable, 1000)

var militaryTimeIn = ''
var unqiueIdArray = []
var employeeInforArray = []
userTime = ""
  app.post('/clockin', urlencodedParser, async function(req, res){ //CLOCK IN
    localTime = getLocalTime();
    militaryTimeIn = getMilitaryTime();
timerVar = setInterval(countTimer, 1000) //SETTING OFF THE TIMER FUNCTION
  await sleep(1000);
  const uniqueId = uuidv4();
  const d = new Date(); // have t send this data to that page with ejs code
  d.getTime();
  data=req.body;
  userPin = data.pin //accessing the req.body object
  var clockStatus = "on"

  const matchedUser = users.find(u => String(u.pin) === String(userPin));
  if (!matchedUser) {
    console.log("User pin not found in local memory");
    return res.redirect('/clockin');
  }
  if (clockStatus == matchedUser.status) {
    console.log("already clocked in"); //send this data to ejs
    return res.redirect('/clockin');
  }

  var empName = matchedUser.name;
  x = matchedUser.name;
  z = matchedUser.last_name;
  y = matchedUser.email;
  firtsLastTogether = x + '_' + z;

  const latestTimer = clockOutDateAndTime[0] || { hours: "00:00:00", formattedDate: new Date().toISOString().slice(0, 10) };
  hours = latestTimer.hours;
  date = latestTimer.formattedDate;
  console.log(`Good morning ${empName} have a nice day at work`);
  const employeInfo = {
    name: `${empName}`,
    hours: `${hours}`,
    dateOnly: `${date}`,
    date : `0`
  };
  employeeInforArray.push(employeInfo);
  matchedUser.pin = data.pin;
  matchedUser.status = clockStatus;
  console.log("1 record inserted");

  const j = uniqueId.slice(0,5); //getting first 5 letters of uniqueId
  console.log(j);
  unqiueIdArray.push(j);
  if (!employeeLogs[firtsLastTogether]) {
    employeeLogs[firtsLastTogether] = [];
  }
  employeeLogs[firtsLastTogether].push({
    email: y,
    date: date,
    unique_id: j,
    clock_in: localTime,
    clock_out: null,
    hours: null
  });
  console.log("4 record inserted");

  // con.query(`SELECT * FROM users WHERE pin = '${userPin}'`, function (err, result) {
  //   console.log(result)
  //   if (err) throw err;
  //   if (clockStatus == (result[0].status)){
  //     console.log("already clocked in") //send this data to ejs
  //   } else {
  //
  //     var empName = result[0].name
  //     x = result[0].name
  //     z = result[0].last_name
  //     y = result[0].email
  //     firtsLastTogether = x + '_' + z
  //
  //     information = clockOutDateAndTime // getting information from the countTimer function and clockOutDateAndTime array
  //     hours = information[0].hours // hours getting the object information from the countTimer function, countTimer function pushes the object 'clockoutInformations' into ClockOutAndTime array
  //     date = information[0].formattedDate
  //     console.log(`Good morning ${empName} have a nice day at work`)
  //     const employeInfo = {
  //       name: `${empName}`,
  //       hours: `${hours}`,
  //       dateOnly: `${date}`,
  //       date : `0`
  //     }
  //     employeeInforArray.push(employeInfo);
  //     var sql = `UPDATE users SET pin = '${data.pin}', status = '${clockStatus}' WHERE pin = ${userPin}`;
  //     con.query(sql, function (err, result) {
  //       if (err) throw err;
  //         console.log("1 record inserted");
  //       });
  //       const j = uniqueId.slice(0,5); //getting first 5 letters of uniqueId
  //       console.log(j)
  //       unqiueIdArray.push(j);
  //       var sql = `INSERT INTO ${firtsLastTogether} (email, date, unique_id, clock_in)
  //       VALUES ('${y}','${date}', '${j}', '${localTime}')`; // email = y, firstname = x, lastname = z
  //       con.query(sql, function (err, result) {
  //         if (err) throw err;
  //         console.log("4 record inserted");
  //       });
  //     }
  //   });

    // res.redirect('/clockout'); //redirect this to the clockout ejs so it can trigger post requests from /clockout
    // res.render('index', {qs: req.query});
  });


var militaryTimeOut = ''
app.post('/clockout', (req, res) => {
  localTime = getLocalTime();
  militaryTimeOut = getMilitaryTime()
  h =  militaryTimeIn
  b = militaryTimeOut
  inTime = h.split(":").join('.'); // replacing : in time with a period
  outTime = b.split(":").join('.');

  totalHoursDifference = outTime - inTime
  var splitHoursDifference = Math.round(totalHoursDifference * 100) / 100
  splitHoursDifference = splitHoursDifference.toString();
  splitHoursDifference = splitHoursDifference.replace(/\b(\d{1,2})(\d{2})/g, '$1:$2');
  totalHoursWorked = splitHoursDifference.split('.').join(':')
  console.log(totalHoursWorked)
  empInfo = employeeInforArray.pop() || { name: "", hours: "00:00:00", date: "0", dateOnly: "" }
  // empInfo objects stored employee information from name post request in the html form
  a = empInfo.name // name obj
  b = empInfo.hours // hours obk
  c = empInfo.date // date and time obj
  d = empInfo.dateOnly // date obj
  fullDate = b + ' ' + c
  data=req.body;
  userPin = data.pin //accessing the req.body object
  console.log(userPin)
  clockStatusOff = "on"

  const matchedUser = users.find(u => String(u.pin) === String(userPin));
  if (matchedUser && clockStatusOff == matchedUser.status) {
    quitTimer();
    x = matchedUser.name;
    z = matchedUser.last_name;
    y = matchedUser.email;
    firtsLastTogether = x + '_' + z;
    console.log("clocking out!");
    clockStatusOff = "off";
    matchedUser.status = clockStatusOff;
    matchedUser.time_worked = b;
    console.log("2 record inserted");

    const userLogList = employeeLogs[firtsLastTogether];
    if (userLogList && userLogList.length > 0) {
      const lastEntry = userLogList[userLogList.length - 1];
      lastEntry.clock_out = localTime;
      lastEntry.hours = totalHoursWorked;
    }
    unqiueIdArray.pop();
    clockedOutInfo = "off";
  }

  // con.query(`SELECT * FROM users WHERE pin = '${userPin}'`, function (err, result) {
  //   // console.log(result) keepthis
  //   if (clockStatusOff == (result[0].status)){
  //     quitTimer()
  //     x = result[0].name
  //     z = result[0].last_name
  //     y = result[0].email
  //     firtsLastTogether = x + '_' + z
  //     console.log("clocking out!")
  //     clockStatusOff = "off"
  //     // var sql = `UPDATE users SET pin = '${data.pin}', status = '${clockStatus}' WHERE pin = ${userPin}`;
  //     var sql = `UPDATE users SET status = '${clockStatusOff}', time_worked = '${b}' WHERE pin = ${userPin}`;
  //     con.query(sql, function (err, result) {
  //       if (err) throw err;
  //       console.log("2 record inserted");
  //     });
  //     m = unqiueIdArray[0]
  //     k = m
  //     var sql = `UPDATE ${firtsLastTogether} SET clock_out = '${localTime}', hours = '${totalHoursWorked} 'ORDER BY id DESC LIMIT 1;`; //Updating the Latest DB clock in time entry for user table to update the clock out column
  //     con.query(sql, [m], function (err, result) {
  //       if (err) throw err;
  //       unqiueIdArray.pop();
  //       clockedOutInfo = "off"
  //     });
  //   }
  // });

  res.redirect('/homebase');
});




// NOTES:
// Add company to SQL query
var passwordy = ''
app.post('/register', urlencodedParser, async function(req, res){
  var date = new Date();
  // get the date as a string
  var n = date.toDateString();
  data=req.body;
  a = req.body.pass
  a = data.first_name.toLowerCase();
  b = data.lastname.toLowerCase();
  c = data.email
  d = data.password
  employee_name = a + '_' + b


  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(d, salt, function(err, hash) {
      var hashedPassword = hash
      passwordy = hashedPassword

      users.push({
        name: a,
        last_name: b,
        email: c,
        password: hashedPassword,
        register_date: n,
        status: "off",
        pin: data.pin || "1234",
        company: bizName,
        position: "Employee",
        administrator: "false",
        time_worked: "00:00:00"
      });
      console.log("5 records inserted");
    });
  });

  if (!employeeLogs[employee_name]) {
    employeeLogs[employee_name] = [];
  }
  console.log("Table created");

  // var sql = `INSERT INTO users (name, last_name, email, password, register_date)
  // VALUES ('${a}', '${b}', '${c}', '${hashedPassword}', '${n}')`;
  // con.query(sql, function (err, result) {
  // if (err) throw err;
  // console.log("5 records inserted");
  // });
  //sql column names below
  // var sql = `CREATE TABLE ${employee_name} (id int(11) NOT NULL AUTO_INCREMENT, unique_id VARCHAR(255), email VARCHAR(255), clock_in VARCHAR(255), clock_out VARCHAR(255), hours VARCHAR(255), date VARCHAR(255), primary key (id))`;
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });
  // var sqlusers = `CREATE TABLE ${employee_name} (id int(11) NOT NULL AUTO_INCREMENT, unique_id VARCHAR(255), email VARCHAR(255), clock_in VARCHAR(255), clock_out VARCHAR(255), hours VARCHAR(255), date VARCHAR(255), primary key (id))`;
  // conRegUsers.query(sqlusers, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });
  await sleep(3000);
  res.redirect('/login'); //redirecting to root
});





app.post('/login', urlencodedParser, async function(req, res){
  await sleep(1000);
  data = req.body;
  email = data.email; // e-mail from login post request
  authpass = data.pass; // password for login post request

  const matchedUser = users.find(u => u.email === email);
  if (!matchedUser) {
    console.log("login not successful");
    return res.render('login', { isAlert: true, alertTitle: "Oops!" });
  }

  employeename = matchedUser.name;
  employeeLastName = matchedUser.last_name;
  firstLastTableName = employeename + '_' + employeeLastName;
  administratorStatus = matchedUser.administrator;
  pinNumber = matchedUser.pin;
  bizName = matchedUser.company;
  hours = matchedUser.time_worked;
  passToBeCompared = matchedUser.password;

  console.log(administratorStatus);
  console.log(firstLastTableName);

  bcrypt.compare(authpass, passToBeCompared, function(err, isMatch) {
    if (isMatch === true) {
      console.log("login successful");
      const userLogRows = employeeLogs[firstLastTableName] || [];
      console.log(userLogRows[0] + "this is the result for login");
      totalHoursB = "9";
      results = userLogRows;
      res.redirect('/dashboard');
    } else {
      console.log("login not successful");
      res.render('login', { isAlert: true, alertTitle: "Oops!", weewee: "" });
    }
  });

// var con = mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "",
//       database: "employeeinfo"
//     });
//     await sleep(1000);
//     data=req.body;
//       email = data.email // e-mail from login post request
//       authpass = data.pass // password for login post request
//     con.connect(function(err){
//       if (err) throw err;
//           con.query(`SELECT * FROM users WHERE email = ?`, [email], function (err, result){
//             // console.log(result)
//             console.log(result)
//             employeename = result[0].name //>> go into database change the name column name into 'first_name' <<
//             employeeLastName= result[0].last_name
//             firstLastTableName = employeename + '_' + employeeLastName
//             administratorStatus = result[0].administrator
//             pinNumber = result[0].pin
//             bizName = result[0].company
//
//
//             console.log(administratorStatus)
//
//
//             console.log(firstLastTableName)
//             hours = result[0].time_worked
//             passToBeCompared = result[0].password
//
//             bcrypt.compare(authpass, passToBeCompared, function(err, result) {
//             // console.log(result)
//             if (result === true ) {
//               console.log("login successful")
//               con.query(`SELECT * FROM ${firstLastTableName} WHERE email = ?`, [email], function (err, result){
//                 console.log(result[0] + "this is the result for login")
//                 totalHoursB = "9"
//                 results = result
//
//                 res.redirect('/dashboard')
//                 // app.get('/dashboard', function(req, res){ USING THIS CODE AT HE GET REQUEST AT THE TOP.
//                 //   // a = b
//                 //   res.render('dashboard', {empname: employeename, totalhours: totalHoursB, rows: result}) // READ need to move the this to its own function and move the variables too
//                 // });
//               });
//             } else{
//               console.log("login not successful")
//               // var alert = require('alert');
//               // var ass = alert('Login unseccessful')
//               // const error = "Login unsuccessful"
//               // res.render('login', {weewee: ass}); //redirecting to root and push the login user data to the redirected page
//               res.render('login', { isAlert: true, alertTitle: "Oops!" });
//
//             }
//
//             });
//
//
//           });
//     });

});



app.post('/homebase', urlencodedParser, async function (req, res){
  await sleep(2000);
  enteredPin = req.body.pin;
  const matchedUser = users.find(u => String(u.pin) === String(enteredPin));
  console.log(matchedUser ? [matchedUser] : []);
  console.log("above this line is from homebase");

  try {
    dbPin = matchedUser.pin;
    console.log(dbPin);
    duty = matchedUser.status;
    console.log(duty);
    if (String(enteredPin) == String(dbPin)) {
      if (duty == "on") {
        res.redirect('clockout');
      } else {
        res.redirect('clockin');
      }
    }
  } catch {
    dbPin = "0000";
    res.redirect('/homebase');
  }

  // con.query(`SELECT * FROM users WHERE pin = ?`, [enteredPin], function (err, result){
  //   if (err) throw err;
  //   console.log(result)
  //   console.log("above this line is from homebase")
  //   try {
  //     dbPin = result[0].pin
  //     console.log(dbPin)
  //     duty = result[0].status
  //     console.log(duty)
  //     if (enteredPin == dbPin){
  //
  //       if (duty == "on"){
  //         res.redirect('clockout')
  //
  //       }else{
  //         res.redirect('clockin')
  //
  //       }
  //
  //
  //     } else {
  //     //stuff here
  //     }
  //   } catch {
  //     dbPin="0000"
  //     res.redirect('/homebase')
  //     res.render('homebase')//render homebase but with error popup
  //
  //
  //   }
  //
  // });


});


var thisArray = []
app.post('/adminpanel', urlencodedParser, function (req, res){
  res.json([{
    name_recieved: req.body.name,
    designation_recieved: req.body.designation

 }])
 console.log(res.body.desg)
  // apEmpData = req.body
  // console.log(apEmpData)
  // AddEmpFirstName = apEmpData.first_name
  // AddEmpLastName = apEmpData.lastname
  // AddEmpEmail = apEmpData.email
  // AddEmpPin = apEmpData.pin
  // AddEmpJob = apEmpData.department
  // addedNameTogether = AddEmpFirstName + '_' + AddEmpLastName
  // addedNameTogetherNoUnderScore = AddEmpFirstName + ' ' + AddEmpLastName


  // con.query(`SELECT * FROM users`, function (err, checkCompanyResult){
  //   // checkCompany = result[0].company
  //   //  checkCompany = checkCompanyResult[0].company
  //    checkCompany = checkCompanyResult[0].company
  //    thisArray.push(checkCompany)
  //   });

  // //have to create table
  // var sql = `CREATE TABLE ${addedNameTogether} (id int(11) NOT NULL AUTO_INCREMENT, unique_id VARCHAR(255), email VARCHAR(255), clock_in VARCHAR(255), clock_out VARCHAR(255), hours VARCHAR(255), date VARCHAR(255), primary key (id))`;
  // console.log(thisArray + "PLEASE GOD WHY YOU NO WORK")
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");

  //   var sql2 = `INSERT INTO ${thisArray} (email, name, department, pin)
  //   VALUES ('${AddEmpEmail}', '${addedNameTogetherNoUnderScore}', '${AddEmpJob}', '${AddEmpPin}')`;
  //   conTwo.query(sql2, function (err, result) {
  //     if (err) throw err;
  //     console.log("4 records inserted");
  //   });
  // });
  // var sql = `INSERT INTO users (name, last_name, email, pin)
  // VALUES ('${AddEmpFirstName}', '${AddEmpLastName}', '${AddEmpEmail}', '${AddEmpPin}')`;
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("4 records inserted");
  // });


  //DO NOT UNCOMMENT THESE
  // res.redirect('/adminpanel');
  // res.render('adminpanel', {addedEmpPopUp: addedNameTogether});

});

app.post('/dashboard', urlencodedParser, async function (req, res){
   company = req.body.company
   companyType = req.body.type//got to change the name of this in the html
   jobPosition = req.body.position
   console.log(companyType)
   console.log(email)

   const matchedUser = users.find(u => String(u.pin) === String(pinNumber));
   if (matchedUser) {
     matchedUser.company = company;
     matchedUser.position = jobPosition;
     matchedUser.administrator = 'true';
   }
   bizName = company;
   administratorStatus = 'true';
   organizations.push({
     org_name: company,
     org_type: companyType,
     administrator: email
   });
   console.log(`${company} Table created in companies DB`);

   //update this SQL injection prevention please !!!!
   // var sql = `UPDATE users SET company = '${company}', position = '${jobPosition}' WHERE pin = ${pinNumber}`;
   // con.query(sql, function (err, result) {
   //   if (err) throw err;
   //   console.log("1 record inserted");
   //
   //  });
   //  var sql = `INSERT INTO organizations (org_name, org_type, administrator)
   //  VALUES ('${company}', '${companyType}', '${email}')`;
   //  con.query(sql, function (err, result) {
   //    if (err) throw err;
   //    console.log("4 records inserted");
   //  });
   //  var sql3 = `CREATE TABLE ${company} (id int(11) NOT NULL AUTO_INCREMENT, email VARCHAR(255), name VARCHAR(255), department VARCHAR(255), start_date VARCHAR(255), pin VARCHAR(255), primary key (id))`;
   //  conTwo.query(sql3, function (err, result) {
   //    if (err) throw err;
   //    console.log(`${company} Table created in companies DB`);
   //  });
   //  var sql = `UPDATE users SET administrator = 'true' WHERE pin = ${pinNumber}`;
   // con.query(sql, function (err, result) {
   //   if (err) throw err;
   //   console.log("1 record inserted");
   //  });


});


// app.get('*', (req, res) => {
//   res.render('employeepage');
// });
// app.get('/employeepage', function(req, res){
//   // a = b
//   res.render('employeepage')
// });

// app.listen(3000, function(){
//     console.log("server started on port 3000");
//   });

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

// app.listen('80','0.0.0.0', () => {
//   console.info(`server started on port 80`);
// });