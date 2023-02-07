import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LeaveDetails() {
  const [empLeaveData, setEmpLeaveData] = useState([])
  useEffect(() => {
    axios
      .get("http://192.168.29.37:7071/Emp_Leave/get_leave")
      .then((response) => {
        console.log("success", response.data.msg);
        setEmpLeaveData(response.data.msg)
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div>
      <div>
        <div className="ml-10">
          <h2 className="text-sky-900">Leaves Details</h2>
        </div>
        <div className="ml-5 mr-5">
          <div className="divbtn">
            <Link to="/settings/leave" className="btn">
              Add Leave (+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Reason</td>
                <td>Type</td>
                <td>Leave Date</td>
                <td>Total leaves</td>
              </tr>
            </thead>
            <tbody>
              {empLeaveData &&
                empLeaveData.map((item) => (
              <tr>
                <td>{item.result[0].First_Name}</td>
                <td>{item.result[0].email}</td>
                <td>{item.result[0].Contact_Number}</td>
                <td>{item.reason_for_leave}</td>
                <td>{item.leave_type === 1 ? "Full Day" : "Half Day"}</td>
                <td>{item.date}</td>
                <td>dsds</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeaveDetails;