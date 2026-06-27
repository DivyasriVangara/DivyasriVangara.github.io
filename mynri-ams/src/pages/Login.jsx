import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../firebase/auth";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const user = await loginUser(form.email, form.password);

    console.log(user);

    alert("Login Successful");

    navigate("/dashboard");

  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Login</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

      <br />

      <p>
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;