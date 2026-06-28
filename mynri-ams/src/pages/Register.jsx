import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../firebase/auth";
import "../styles/student.css";


function Register() {
  const navigate = useNavigate();

const [form, setForm] = useState({
  studentId: "",
  facultyId: "",
  name: "",
  email: "",
  password: "",
  department: "",
  year: "",
  role: "student"
});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.role === "student") {
  const id = form.studentId.trim().toUpperCase();

  if (!/^2[0-9A-Z]{9}$/.test(id)) {
    alert("Enter a valid Student ID");
    return;
  }
} else {
  if (form.facultyId.trim() === "") {
    alert("Enter Faculty ID");
    return;
  }
}

    try {
      await registerUser(form);

      alert("Registration Successful ✅");

      navigate("/login");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
  <div className="container">
    <div className="card">

      <h1 className="logo">AMS Student Register</h1>

      <form onSubmit={handleSubmit}>

      {form.role === "student" ? (
  <input
    type="text"
    name="studentId"
    placeholder="Student ID"
    value={form.studentId}
    onChange={handleChange}
    required
  />
) : (
  <input
    type="text"
    name="facultyId"
    placeholder="Faculty ID"
    value={form.facultyId}
    onChange={handleChange}
    required
  />
)}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="College Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        required
      >
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
      </select>

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />

    {form.role === "student" && (
  <input
    type="text"
    name="year"
    placeholder="Year"
    value={form.year}
    onChange={handleChange}
    required
  />
)}

        <button type="submit">
          Register
        </button>

      </form>

      <p className="link">
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>

    </div>
  </div>
);
}

export default Register;