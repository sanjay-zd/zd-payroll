import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
let converter = require('number-to-words');

const Downloadslip = (props) => {
  const { id } = useParams();
  const [hra, Sethra] = useState("");
  const [ra, Setra] = useState("");
  const [flexib, Setflexib] = useState("");
  const [basicDA, setBasicDA] = useState("");
  const [netPay, setNetPay] = useState(0);
  const [compensatoryLeaveState, setCompensatoryLeaveState] = useState(0);
  const [showTotalLeave, setShowTotalLeave] = useState("");
  const holidays = props.holidays;
  const baseSalary = props.data.base_salary;
  const doj = new Date(props.data.Date_of_Joining).toLocaleDateString("pt-PT");
  useEffect(() => {
    axios
      .post(
        `http://192.168.29.146:7071/Emp_Leave/get_User_leave?id=${props.data.userid}&from_date=${props.data.from_date}&to_date=${props.data.end_date}`
      )
      .then((res) => {
        const arr = res.data.findLeave;
        let total_leave = 0;
        let compensatoryLeave = 0;
        arr.map((e) => {
          let fromDate = new Date(e.from_date);
          let toDate = new Date(e.to_date);
          // if(e.reason_for_leave == "Compensatory Leave"){
          //   compensatoryLeave = compensatoryLeave + 1;
          //   setCompensatoryLeaveState(compensatoryLeave)
          // }
          if (fromDate.toISOString().slice(0, 10) == toDate.toISOString().slice(0, 10)) {
            if(e.leave_type !== 1){
              console.log('halfDay');
              total_leave = total_leave + 0.5
            }else{
              total_leave = total_leave + 1
            }
          }else{
            const diffInMs = toDate - fromDate;
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
            total_leave = total_leave + diffInDays;
          }
        });
        setShowTotalLeave(total_leave);
        setBasicDA(baseSalary / 2);
        Sethra((baseSalary / 2) * 0.4);
        Setra((baseSalary / 2) * 0.15);
        Setflexib(
          baseSalary -
          baseSalary / 2 -
          (baseSalary / 2) * 0.4 -
          (baseSalary / 2) * 0.15
        );
      });
  }, []);
  useEffect(() => {
    setNetPay(
      (baseSalary / (Number(props.data.monthDays) - holidays)) *
      (props.data.monthDays - holidays - showTotalLeave + 1)
    );
  }, [showTotalLeave]);
  

  const ButtonClick = () => {
    window.print();
    fetch("/download.pdf").then((response) => {
      response.blob().then((blob) => {
        let alink = document.createElement("a");
        alink.click();
      });
    });
  };
  const fword = converter.toWords(netPay)

  return (
    <div className="container">
          <div style={{ display: "flex",padding:"20px" }}>
                  <Link
                    to="/settings/salary:id"
                    className="btn btn-primary btn-bg ml-5 mr-5"
                  >
               Back
                  </Link>
                </div>
      <div className="row">
        <form onSubmit={ButtonClick} href="/download">
          {
            <div
              className=""
              style={{
                border: "1px solid black",
                padding: "1%",
                width: "100%",
              }}
            >
              <div className="text-center lh-1 mb-2">
                <h3 className="fw-bold" style={{ color: "#368bb5" }}>
                  ZecData
                </h3>{" "}
                <h5 className="fw-bold text-dark">
                  Payment slip for the month of{" "}
                  {props.data.Salary_Slip_Month_Year} 2023
                </h5>
              </div>

              <div className="row text-white">
                <div className="col-md-6 border-top border-dark">
                  <div className="row" style={{ backgroundColor: "#368bb5" }}>
                    <div className="col-md-6">
                      <div>
                        {" "}
                        <span className="fw-bolder">Name :</span>{" "}
                        <small className="ms-3">
                          {props.data.Employee_name.toUpperCase()}
                        </small>{" "}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        {" "}
                        <span className="fw-bolder">EMP Code :</span>{" "}
                        <small className="ms-3">
                          {props.data.Employee_code}
                        </small>{" "}
                      </div>
                    </div>
                  </div>

                  <div
                    className="row border-top border-dark"
                    style={{ backgroundColor: "#368bb5" }}
                  >
                    <div className="col-md-6">
                      <div>
                        {" "}
                        <span className="fw-bolder">Designation :</span>{" "}
                        <small className="ms-3">{props.data.designation}</small>{" "}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        {" "}
                        <span className="fw-bolder">Ac No. :</span>{" "}
                        <small className="ms-3">
                          {props.data.Bank_Account_Number}
                        </small>{" "}
                      </div>
                    </div>
                  </div>

                  <div
                    className="row border-top border-dark"
                    style={{ backgroundColor: "#368bb5" }}
                  >
                    <div className="col-md-6 border-bottom border-dark">
                      <div>
                        {" "}
                        <span className="fw-bolder ">
                          Date Of Joining :
                        </span>{" "}
                        <small className="ms-3">{doj}</small>
                      </div>
                    </div>
                    <div className="col-md-6 border-bottom border-dark">
                      <div>
                        {" "}
                        <span className="fw-bolder">IFSC :</span>{" "}
                        <small className="ms-3">
                          {props.data.Bank_IFSC_Code}
                        </small>{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-md-6"
                  style={{ backgroundColor: "#368bb5" }}
                >
                  <div className="row border-top border-dark">
                    <div className="col-md-6">
                      <div>
                        {" "}
                        <span className="fw-bolder">
                          Leave (Balance) :
                        </span>{" "}
                        <small className="ms-3">1</small>{" "}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        {" "}
                        <span className="fw-bolder">
                          Total Working Days :
                        </span>{" "}
                        <small className="ms-3">
                          {Number(props.data.monthDays) - holidays}
                        </small>{" "}
                      </div>
                    </div>
                  </div>

                  <div
                    className="row border-top border-dark"
                    style={{ backgroundColor: "#368bb5" }}
                  >
                    <div className="col-md-6 ">
                      <div>
                        {" "}
                        <span className="fw-bolder">Leave Taken :</span>{" "}
                        <small className="ms-3">{showTotalLeave}</small>{" "}
                      </div>
                    </div>
                    <div className="col-md-6 ">
                      <div>
                        {" "}
                        <span className="fw-bolder ">Present Days :</span>{" "}
                        <small className="ms-3">
                          {props.data.monthDays - holidays - showTotalLeave}
                        </small>{" "}
                      </div>
                    </div>
                    <div className="col-md-6 border-top border-bottom border-dark ">
                      <div>
                        {" "}
                        <span className="fw-bolder"> Balance Days :</span>{" "}
                        <small className="ms-3">1</small>{" "}
                      </div>
                    </div>
                    <div className="col-md-6 border-top border-bottom border-dark">
                      <div>
                        {" "}
                        <span className="fw-bolder">
                          Total Paid Days :
                        </span>{" "}
                        <small className="ms-3">
                          {props.data.monthDays - holidays - showTotalLeave + 1 + compensatoryLeaveState}
                        </small>{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <table className="mt-1 table table-bordered border-dark">
                  <thead
                    className=" text-white"
                    style={{ backgroundColor: "#368bb5" }}
                  >
                    <tr>
                      <th scope="col">Gross</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Earning</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Deduction</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Basic & DA</th>
                      <td>{basicDA}</td>
                      <td>Basic & DA</td>
                      <td>{(netPay / 2).toFixed(2)}</td>
                      <td>PF</td>
                      <td>0.00</td>
                    </tr>
                    <tr>
                      <th scope="row">HRA</th>
                      <td>{hra}</td>
                      <td>HRA</td>
                      <td>{((netPay / 2) * 0.4).toFixed(2)}</td>
                      <td>Professional tax</td>
                      <td>0.00</td>
                    </tr>
                    <tr>
                      <th scope="row">RA</th>
                      <td>{ra}</td>
                      <td>RA</td>
                      <td>{((netPay / 2) * 0.15).toFixed(2)}</td>
                      <td>TDS</td>
                      <td>0.00</td>
                    </tr>
                    <tr>
                      <th scope="row">FLEXI Benefits</th>
                      <td>{flexib}</td>
                      <td>FLEXI Benifits</td>
                      <td>
                        {(
                          netPay -
                          (netPay / 2 +
                            (netPay / 2) * 0.4 +
                            (netPay / 2) * 0.15)
                        ).toFixed(2)}
                      </td>
                      <td>ARRS</td>
                      <td>0.00</td>
                    </tr>
                    <tr>
                      <th scope="row">Total Gross</th>
                      <td>{baseSalary}</td>
                      <td>Total Earn</td>
                      <td>
                        {(
                          netPay / 2 +
                          (netPay / 2) * 0.4 +
                          (netPay / 2) * 0.15 +
                          (netPay -
                            (netPay / 2 +
                              (netPay / 2) * 0.4 +
                              (netPay / 2) * 0.15))
                        ).toFixed(0)}
                      </td>
                      <td>Additional</td>
                      <td>0.00</td>
                    </tr>
                    <tr>
                      <th scope="row"></th>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">Net Pay</th>
                      <td>{netPay.toFixed(2)}</td>
                      <td></td>
                      <td></td>
                      <td>Total Deduction</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-md-5">
                  {" "}
                  <br />{" "}
                  <span className="fw-bold">
                    Net Salary Payable(In Words)
                  </span>{" "}
                </div>
                <div className="border border-dark col-md-7">
                  <div className="d-flex flex-column">
                    <span className="text-danger">{fword} Only</span>
                    <br></br>
                    <span>
                      *This is computer generated copy not need to stamp and
                      sign*
                    </span>{" "}
                  </div>
                </div>
              </div>
              <input type="submit" value={"Print"} />
            </div>
          }
        </form>
      </div>
    </div>
  );
};

export default Downloadslip;
