"use client";

import styles from "./sign-up.module.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  // signupType: "user" or "recruiter"
  const [signupType, setSignupType] = useState("user");

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    company: "", // only used for recruiters
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setLoading(true);
      let signUpEndpoint = "";
      let meEndpoint = "";
      let redirectPath = "";
      if (signupType === "user") {
        signUpEndpoint = "/api/users/sign-up";
        meEndpoint = "/api/users/me";
        redirectPath = "/userProfile";
      } else {
        signUpEndpoint = "/api/recruiters/sign-up";
        meEndpoint = "/api/recruiters/me";
        redirectPath = "/recruiter-profile";
      }
      // Sign up the user or recruiter
      await axios.post(signUpEndpoint, user);
      toast.success("Signup success");

      // Fetch the details from the corresponding "me" endpoint
      const res = await axios.get(meEndpoint);
      let userId = "";
      if (signupType === "user") {
        userId = res.data.user._id;
      } else {
        userId = res.data.recruiter._id;
      }

      // Redirect to the dynamic profile route using the user's id
      router.push(`${redirectPath}/${userId}`);
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (signupType === "user") {
      // For user signup, require username, email, and password.
      if (user.username && user.email && user.password) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    } else {
      // For recruiter signup, also require company name.
      if (user.username && user.email && user.password && user.company) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }
  }, [user, signupType]);

  return (
    <div className={styles.signupContainer}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <div className={styles.imagePlaceholder}>
          {/* Replace with your images */}
          <img src="../logo.png" alt="logo" />
          <img src="../SignUpPageImg.png" alt="Sign Up Img" />
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Set up your Account.</h2>
          <p className={styles.subtitle}>
            Sign up now to access expert-curated resources, practice questions,
            and personalized tips to boost your confidence and land your dream
            job!
          </p>
          {/* Tab Selector */}
          <div className={styles.tabSelector}>
            <button
              className={`${styles.tabButton} ${
                signupType === "user" ? styles.activeTab : ""
              }`}
              onClick={() => setSignupType("user")}
            >
              User Signup
            </button>
            <button
              className={`${styles.tabButton} ${
                signupType === "recruiter" ? styles.activeTab : ""
              }`}
              onClick={() => setSignupType("recruiter")}
            >
              Recruiter Signup
            </button>
          </div>

          {/* Form */}
          <form onSubmit={onSignUp}>
            {/* User Name */}
            <div className={styles.formGroup}>
              <label htmlFor="username">User Name</label>
              <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
                placeholder="Username"
              />
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
              />
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordField}>
                <input
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="Password"
                />
              </div>
            </div>

            {/* Company field for Recruiters */}
            {signupType === "recruiter" && (
              <div className={styles.formGroup}>
                <label htmlFor="company">Company Name</label>
                <input
                  id="company"
                  type="text"
                  value={user.company}
                  onChange={(e) =>
                    setUser({ ...user, company: e.target.value })
                  }
                  placeholder="Company Name"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={buttonDisabled || loading}
            >
              {loading ? "Processing..." : "Register"}
            </button>
          </form>

          {/* Already Have Account */}
          <p className={styles.loginText}>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
