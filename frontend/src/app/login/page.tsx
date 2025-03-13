"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();

  // loginType: "user" or "recruiter"
  const [loginType, setLoginType] = useState("user");

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // Enable the login button only if both email and password are provided.
  useEffect(() => {
    if (credentials.email && credentials.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [credentials]);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Choose endpoints based on login type
      let loginEndpoint = "";
      let meEndpoint = "";
      let redirectPath = "";
      if (loginType === "user") {
        loginEndpoint = "/api/users/login";
        meEndpoint = "/api/users/me";
        redirectPath = "/userProfile";
      } else {
        loginEndpoint = "/api/recruiters/login";
        meEndpoint = "/api/recruiters/me";
        redirectPath = "/recruiter-profile";
      }

      // Call the appropriate login API endpoint
      await axios.post(loginEndpoint, credentials);
      toast.success("Login successful");

      // Fetch user details from the corresponding "me" endpoint
      const res = await axios.get(meEndpoint);
      let userId = "";
      if (loginType === "user") {
        userId = res.data.user._id;
      } else {
        userId = res.data.recruiter._id;
      }

      // Redirect to the dynamic profile route using the user's id
      router.push(`${redirectPath}/${userId}`);
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <div className={styles.imagePlaceholder}>
          {/* Replace with your images */}
          <img src="../logo.png" alt="logo" />
          <img src="../SignInPageImg.png" alt="Login Illustration" />
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Login to Your Account</h2>
          <p className={styles.subtitle}>
          Unlock your exclusive experience! Enter your email and password to dive into your personalized account.
          </p>

          {/* Tab Selector for login type */}
          <div className={styles.tabSelector}>
            <button
              className={`${styles.tabButton} ${
                loginType === "user" ? styles.activeTab : ""
              }`}
              onClick={() => setLoginType("user")}
            >
              User Login
            </button>
            <button
              className={`${styles.tabButton} ${
                loginType === "recruiter" ? styles.activeTab : ""
              }`}
              onClick={() => setLoginType("recruiter")}
            >
              Recruiter Login
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={onLogin}>
            {/* Email Field */}
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </div>

            {/* Password Field */}
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={buttonDisabled || loading}
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </form>

          {/* Additional Links */}
          <p className={styles.registerText}>
            Don't have an account? <Link href="/sign-up">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
