import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getStudentProfile } from "../firebase/auth";

function Dashboard() {
    const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      if (auth.currentUser) {
        const data = await getStudentProfile(auth.currentUser.uid);
        setStudent(data);
      }
    };

    fetchStudent();
  }, []);

  if (!student) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Dashboard</h1>

      <hr />

      <h3>Welcome, {student.name}</h3>

      <p><strong>Student ID:</strong> {student.studentId}</p>

      <p><strong>Email:</strong> {student.email}</p>

      <p><strong>Department:</strong> {student.department}</p>

      <p><strong>Year:</strong> {student.year}</p>

      <br />

      <button onClick={() => navigate("/scan")}>
  Mark Attendance
</button>

      <button style={{ marginLeft: "10px" }}>
        Attendance History
      </button>

      <button style={{ marginLeft: "10px" }}>
        Profile
      </button>

      <button style={{ marginLeft: "10px" }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;