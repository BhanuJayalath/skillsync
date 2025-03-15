"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import styles from "../assets/styles/navbar.module.css"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  interface User {
    username: string;
    // Add other user properties if needed
  }

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("user-id")
      if (userId) {
        const response = await fetch("/api/users/getUser", {
          headers: {
            "user-id": userId,
          },
        })
        const data = await response.json()
        if (data.user) {
          setUser(data.user)
        }
      }
    }

    fetchUser()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user-id")
    setUser(null)
    // Redirect to home or login page
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarContent}>
          <div className={styles.logoContainer}>
            <Link href="/">
              <Image src="/logo.png" alt="SkillSync" width={120} height={40} className={styles.logo} />
            </Link>
          </div>
          <div className={styles.desktopMenu}>
            <Link href="/mock-interview" className={styles.navLink}>
              Mock Interview
            </Link>
            <Link href="/about-us" className={styles.navLink}>
              About Us
            </Link>
            <Link href="/contact-us" className={styles.navLink}>
              Contact Us
            </Link>
            {user ? (
              <div className={styles.userMenu}>
                <span>Hi, {user.username}</span>
                <div className={styles.dropdown}>
                  <Link href="/userProfile" className={styles.dropdownItem}>Profile</Link>
                  <button onClick={handleLogout} className={styles.dropdownItem}>Logout</button>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <button className={styles.signInButton}>Sign In</button>
                </Link>
                <Link href="/sign-up">
                  <button className={styles.signUpButton}>Sign Up</button>
                </Link>
              </>
            )}
          </div>
          <div className={styles.mobileMenuButton}>
            <button onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
              <span className={styles.srOnly}>Open main menu</span>
              {/* Icon when menu is closed. */}
              <svg
                className={`${styles.menuIcon} ${isOpen ? styles.hidden : styles.block}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open. */}
              <svg
                className={`${styles.menuIcon} ${isOpen ? styles.block : styles.hidden}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`}>
        <div className={styles.mobileMenuContent}>
          <Link href="/userProfile" className={styles.mobileNavLink}>
            User Profile
          </Link>
          <Link href="/about-us" className={styles.mobileNavLink}>
            About Us
          </Link>
          <Link href="/contact-us" className={styles.mobileNavLink}>
            Contact Us
          </Link>
          {user ? (
            <>
              <Link href="/userProfile" className={styles.mobileNavLink}>Profile</Link>
              <button onClick={handleLogout} className={styles.mobileNavLink}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.mobileNavLink}>
                Sign In
              </Link>
              <Link href="/sign-up" className={styles.mobileNavLink}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar