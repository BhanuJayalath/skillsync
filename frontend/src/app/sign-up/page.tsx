"use client";

import { useState } from "react";
import styles from "./sign-up.module.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    if (field === "password") setShowPassword(!showPassword);
    if (field === "confirmPassword")
      setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={styles.signupContainer}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <div className={styles.imagePlaceholder}>
          {/* Replace with your image */}
          <img src="../logo.png" alt="logo" />
          <img src="../SignUpPageImg.png" alt="Clipboard" />
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

          {/* Form */}
          <form>
            {/* Full Name */}
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Mobile Number */}
            <div className={styles.formGroup}>
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                placeholder="123 456 7890"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <label>Password</label>
              <div className={styles.passwordField}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  👁
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className={styles.formGroup}>
              <label>Confirm Password</label>
              <div className={styles.passwordField}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  👁
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitButton}>
              Register
            </button>
          </form>

          {/* Already Have Account */}
          <p className={styles.loginText}>
            Already have an account? <a href="/sign-in">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
