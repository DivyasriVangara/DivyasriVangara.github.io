import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">AMS</h2>

      <Link to="/dashboard">🏠 Dashboard</Link>

      <Link to="/profile">👤 Profile</Link>

      <Link to="/scan">📷 Scan QR</Link>

      <Link to="/fingerprint">🖐 Fingerprint</Link>

      <Link to="/attendance">📜 Attendance</Link>

      <Link to="/late-arrival">⏰ Late Arrival</Link>

      <Link to="/leave-request">📝 Leave Request</Link>

      <Link to="/login">🚪 Logout</Link>

    </div>
  );
}

export default Sidebar;