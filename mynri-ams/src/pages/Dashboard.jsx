import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import { getStudentProfile } from "../firebase/auth";

function Dashboard() {

  const [student, setStudent] = useState(null);

  useEffect(() => {

    const loadProfile = async () => {

      const uid = localStorage.getItem("uid");

      if (!uid) return;

      const data = await getStudentProfile(uid);

      setStudent(data);

    };

    loadProfile();

  }, []);

  return (

    <div className="dashboard-container">

      <Sidebar />

      <div className="dashboard-content">

        <h1>
          Welcome {student?.name || "Student"} 👋
        </h1>

        <p>
          Attendance Management System
        </p>

        <div className="card">

          <h3>Student Profile</h3>

          <p><b>Student ID :</b> {student?.studentId}</p>

          <p><b>Department :</b> {student?.department}</p>

          <p><b>Year :</b> {student?.year}</p>

          <p><b>Email :</b> {student?.email}</p>

        </div>

        <br />

        <div className="cards">

          <div className="card">
            <h3>Attendance</h3>
            <h2>0%</h2>
          </div>

          <div className="card">
            <h3>Present</h3>
            <h2>0</h2>
          </div>

          <div className="card">
            <h3>Absent</h3>
            <h2>0</h2>
          </div>

          <div className="card">
            <h3>Late</h3>
            <h2>0</h2>
          </div>

        </div>

        <div className="quick-actions">

          <button>📷 Scan QR</button>

          <button>📝 Leave Request</button>

          <button>👤 Profile</button>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;