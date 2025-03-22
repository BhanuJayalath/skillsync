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
    userName: "",
    email: "",
    password: "",
    company: "", // only used for recruiters
  });

  const [passwordError, setPasswordError] = useState("");
  const [signUpError, setSignUpError] = useState(""); // Holds error message from sign-up failure
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // Validate password criteria
  const validatePassword = (password: string): boolean => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one number.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setUser({ ...user, password: newPassword });
    validatePassword(newPassword);
  };

  useEffect(() => {
    let isFormValid = false;
    if (signupType === "user") {
      isFormValid =
        user.userName.trim() !== "" &&
        user.email.trim() !== "" &&
        user.password.trim() !== "" &&
        passwordError === "";
    } else {
      isFormValid =
        user.userName.trim() !== "" &&
        user.email.trim() !== "" &&
        user.password.trim() !== "" &&
        user.company.trim() !== "" &&
        passwordError === "";
    }
    setButtonDisabled(!isFormValid);
  }, [user, signupType, passwordError]);

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setSignUpError("");
      let signUpEndpoint = "";
      let meEndpoint = "";
      let redirectPath = "";
      if (signupType === "user") {
        signUpEndpoint = "/api/users/sign-up";
        meEndpoint = "/api/users/me";
        redirectPath = "/basic-test";
      } else {
        signUpEndpoint = "/api/recruiters/sign-up";
        meEndpoint = "/api/recruiters/me";
        redirectPath = "/recruiter-profile";
      }
      await axios.post(signUpEndpoint, user);
      toast.success("Signup success");

      const res = await axios.get(meEndpoint);
      let userId = res.data.user?._id || res.data.recruiter?._id || "";
      router.push(`${redirectPath}/${userId}`);
    } catch (error: any) {
      console.log("Signup failed", error);
      let errorMsg = "Signup failed. Please try again.";
      if (error.response?.data?.error) {
        errorMsg = error.response.data.error;
      }
      setSignUpError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.leftSection}>
        <div className={styles.imagePlaceholder}>
          <img src="../logo.png" alt="logo" />
          <img src="../SignUpPageImg.png" alt="Sign Up Img" />
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Set up your Account.</h2>
          <p className={styles.subtitle}>
            Sign up now to access expert resources, practice questions, and insights to boost your career or recruit top talent!
          </p>

          <div className={styles.tabSelector}>
            <button type="button" className={`${styles.tabButton} ${signupType === "user" ? styles.activeTab : ""}`} onClick={() => setSignupType("user")}>
              User Signup
            </button>
            <button type="button" className={`${styles.tabButton} ${signupType === "recruiter" ? styles.activeTab : ""}`} onClick={() => setSignupType("recruiter")}>
              Recruiter Signup
            </button>
          </div>

          <form onSubmit={onSignUp}>
            <div className={styles.formGroup}>
              <label htmlFor="userName">User Name</label>
              <input id="userName" type="text" value={user.userName} onChange={(e) => setUser({ ...user, userName: e.target.value })} placeholder="Username" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={user.password} onChange={handlePasswordChange} placeholder="Password" />
              {passwordError && <span className={styles.error}>{passwordError}</span>}
            </div>

            {signupType === "recruiter" && (
              <div className={styles.formGroup}>
                <label htmlFor="company">Company Name</label>
                <input id="company" type="text" value={user.company} onChange={(e) => setUser({ ...user, company: e.target.value })} placeholder="Company Name" />
              </div>
            )}

            <button type="submit" className={styles.submitButton} disabled={buttonDisabled || loading}>
              {loading ? "Processing..." : "Register"}
            </button>

            {signUpError && <div className={styles.errorMessage}>Sign up failed: {signUpError}</div>}
          </form>

          <p className={styles.loginText}>Already have an account? <Link href="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}
