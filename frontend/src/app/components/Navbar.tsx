import Image from "next/image";
import styles from "../assets/styles/landing.module.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar px-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <Image
            src="/logo.png"
            alt="SkillSync"
            width={120}
            height={40}
            className="logo"
          />
        </a>
        <div className="d-flex align-items-center">
          <ul className="navbar-nav me-3">
            <li className="nav-item dropdown">
              <a className="nav-link" href="./userProfile">
                User Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact Us
              </a>
            </li>
          </ul>
          <a href="./login">
          <button className="btn btn-outline-primary me-2">Sign In</button>
          </a>
          <a href="./sign-up">
            <button className="btn btn-dark">sign Up</button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;