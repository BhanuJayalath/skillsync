"use client"; 
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"; 
import logo from "../assets/images/logo.png";
import image from "../assets/images/Illustration.svg";
import styles from "../assets/styles/login.module.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  
  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setLoginError("");

    
    setTimeout(() => {
      setIsLoading(false);
      alert(`Mock Login with ${provider} successful!`);
    }, 1500);
  };

  
  const handleFormLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setLoginError("");

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setLoginError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    
    setTimeout(() => {
      setIsLoading(false);
      if (email === "test@example.com" && password === "password") {
        alert("Mock Login successful! (Backend not implemented yet)");
      } else {
        setLoginError("Invalid email or password.");
      }
    }, 1500);
  };

  return (
    <div className={styles.loginPage}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <div className={styles.imageContainer}>
          <Image
            src={logo}
            alt="Logo"
            className={styles.logoOverlay}
            width={160}
            height={40}
          />
          <Image
            src={image}
            alt="Illustration"
            className={styles.backgroundImage}
            width={400}
            height={400}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <h4 className={styles.welcomeText}>Welcome to</h4>
          <h1 className={styles.appName}>SkillSync</h1>

          {/* Social Buttons */}
          <button
            className={`${styles.socialBtn} ${styles.googleBtn}`}
            onClick={() => handleSocialLogin("Google")}
            disabled={isLoading}
          >
            Login with Google
          </button>
          <button
            className={`${styles.socialBtn} ${styles.facebookBtn}`}
            onClick={() => handleSocialLogin("Facebook")}
            disabled={isLoading}
          >
            Login with Facebook
          </button>

          {/* Divider */}
          <div className={styles.divider}>
            <span>OR</span>
          </div>

          {/* Login Form */}
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
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className={styles.forgotPassword}>
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button type="submit" className={styles.loginBtn} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className={styles.registerLink}>
            <br></br>
            Don't have an account?{" "}
            <Link href="/sign-up">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;