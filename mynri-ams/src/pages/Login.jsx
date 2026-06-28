import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../firebase/auth"; // your auth.js

function Login() {
  const navigate = useNavigate();

 const [form, setForm] = useState({
  id: "",
  password: "",
  role: "student",
});

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(
  form.email,
  form.password,
  form.role
);

      if (!res.success) {
        setError(res.message);
        return;
      }

      const user = res.user;

      // store role in localStorage
      localStorage.setItem("role", form.role);
      localStorage.setItem("uid", user.uid);

      // redirect based on role
      if (form.role === "student") {
        navigate("/dashboard");
      } else {
        navigate("/faculty-dashboard"); // if you create later
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>

          <input
            type="text"
            name="id"
            placeholder={
              form.role === "student"
                ? "Student ID"
                : "Faculty ID"
            }
            value={form.id}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;