"use client";
import styles from "./sign-up.module.css";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setLoading(true);
      const response = await axios.post("/api/users/sign-up", user);
      console.log("Signup success", response.data);
      router.push("/userProfile"); // Navigate to user profile page after signup
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password && user.username) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className={styles.signupContainer}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <div className={styles.imagePlaceholder}>
          {/* Replace with your image */}
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
