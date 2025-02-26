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

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      alert("Google login successful!");
    } catch (error: any) {
      console.error("Google Login Error:", error.message);
      setLoginError("Failed to sign in with Google. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Facebook Login
  const handleFacebookLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithFacebook();
      alert("Facebook login successful!");
    } catch (error: any) {
      console.error("Facebook Login Error:", error.message);
      setLoginError("Failed to sign in with Facebook. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Email & Password Login
  const handleFormLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setLoginError("");
  
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setLoginError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
  
      localStorage.setItem("token", data.token);
      alert("Login successful!");
    } catch (error: any) {
      console.error("Login Error:", error.message);
      setLoginError(error.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };
  

  // Forgot Password
  const handleForgotPassword = async () => {
    if (!email) {
      setLoginError("Enter your email to reset password.");
      return;
    }
    try {
      await resetPassword(email);
      alert("Password reset email sent!");
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
          <p className={styles.registerLink}><br></br>
            Don't have an account? <Link href="/sign-up">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
