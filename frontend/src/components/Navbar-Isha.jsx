// src/components/Navbar.jsx
import './Navbar.css';

/**
 * Navigation component to help users jump between different sections of the app.
 * I used a simple <ul> list for the links.
 */
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Student Planner</h2>
      </div>
      <ul className="nav-links">
        <li>Home</li>
        <li>Tasks</li>
        <li>Routines</li>
      </ul>
    </nav>
  );
}

export default Navbar;
