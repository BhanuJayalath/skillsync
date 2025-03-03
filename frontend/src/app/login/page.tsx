"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/images/logo.png";
import illustration from "../assets/images/Illustration.svg";
import styles from "../assets/styles/login.module.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // ✅ Google Login (Redirects to Backend)
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5001/api/auth/google";
  };

  // ✅ Facebook Login (Redirects to Backend)
  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:5001/api/auth/facebook";
  };

  // ✅ Email & Password Login
  const handleLogin = async () => {
    setIsLoading(true);
    setLoginError(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful", data);
        localStorage.setItem("token", data.token);
      } else {
        setLoginError(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      setLoginError("Something went wrong. Please try again.");
      console.error("Login fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Form Submission Handler
  const handleFormLogin = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload
    if (!email || !password) {
      setLoginError("Please enter both email and password.");
      return;
    }
    handleLogin();
  };

  // ✅ Forgot Password (Placeholder - Backend API Needed)
  const handleForgotPassword = async () => {
    if (!email) {
      setLoginError("Enter your email to reset password.");
      return;
    }
    try {
      alert("Password reset functionality not implemented yet.");
    } catch (error: any) {
      console.error("Forgot Password Error:", error.message);
      setLoginError("Failed to send password reset email.");
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <div className={styles.imageContainer}>
          <Image src={logo} alt="Logo" width={160} height={40} />
          <Image src={illustration} alt="Illustration" width={400} height={400} />
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <h4 className={styles.welcomeText}>Welcome to</h4>
          <h1 className={styles.appName}>SkillSync</h1>

          {/* Social Login Buttons */}
          <button className={`${styles.socialBtn} ${styles.googleBtn}`} onClick={handleGoogleLogin} disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login with Google"}
          </button>
          <button className={`${styles.socialBtn} ${styles.facebookBtn}`} onClick={handleFacebookLogin} disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login with Facebook"}
          </button>

          {/* Divider */}
          <div className={styles.divider}><span>OR</span></div>

          {/* Email & Password Login Form */}
          <form onSubmit={handleFormLogin}>
            <input 
              type="email" 
              placeholder="example@gmail.com" 
              className={styles.inputBox} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="**********" 
              className={styles.inputBox} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />

            {/* Error Message */}
            {loginError && <p className={styles.errorMessage}>{loginError}</p>}

            {/* Options */}
            <div className={styles.options}>
              <label>
                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} /> Remember me
              </label>
              <button type="button" className={styles.forgotPassword} onClick={handleForgotPassword}>
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button type="submit" className={styles.loginBtn} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register Link */}
          <p className={styles.registerLink}>
            Don't have an account? <Link href="/sign-up">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
