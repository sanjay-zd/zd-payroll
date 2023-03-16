"use strict";
require('./app/utils/mongooseConnecter.util')
const express = require("express");
const app = express();
const pdf_genearation = require("./pdf_generator/pdfGenerator")
const path = require('path')


const cors = require('cors');
app.use(cors())
require('dotenv').config();


const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use("/", require("./app/routes/Employ/Employ.route"));
app.use("/emp", require("./app/routes/Employ/Employ.route"));
app.use("/Emp_Leave",require("./app/routes/Employ/Leave.route"))
app.use("/Emp_Salary",require("./app/routes/Employ/Salary.route"))
app.use("/Holiday",require("./app/routes/Employ/Holiday.route"))
app.use("/login",require("./app/routes/Employ/login.route"))
app.use("/year",require("./app/routes/Employ/Year_Leave.route"))
app.use("/eff", require("./app/routes/Employ/Effective.route"))


app.get('/slip', (req, res) =>{
  res.sendFile(__dirname + '/pdf_generator/salarySlip.html')
})


app.post('/slip', (req, res) =>{
  pdf_genearation()
  console.log("button clicked")
  res.send("file downloaded successfully")
})

// read static files
app.use(express.static(path.join(__dirname, './payroll-front/build')))
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, './payroll-front/build/index.html'))
})

const port = 7071;

// Server start
app.listen(port, () =>
  console.log(`Server is running on ${port}`)
);


