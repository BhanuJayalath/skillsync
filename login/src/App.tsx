import React, { useState } from "react";
import "./App.css";
import logo from "./assets/img/logo.png"; 
import image from "./assets/img/Illustration.svg"; 

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    console.log("Logging in with:", { email, password });
    setError("");
  };

  return (
    <div className="Login-page">
      {/* Left Section */}
      <div className="left-section">
        <div className="image-container">
          <img src={logo} alt="Logo" className="logo-overlay" />
          <img src={image} alt="Illustration" className="background-image" />
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="form-container">
          <h4 className="welcome-text">Welcome to</h4>
          <h1 className="app-name">SkillSync</h1>

          {/* Login Buttons */}
          <button className="social-btn google-btn">Login with Google</button>
          <button className="social-btn facebook-btn">Login with Facebook</button>

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-box"
            />
            <input
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-box"
            />

            {/* Options */}
            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            {/* Login Button */}
            <button type="submit" className="login-btn">Login</button>
          </form>

          <p className="register-link">
            Don't have an account? <a href="#">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
