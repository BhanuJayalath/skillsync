"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import styles from "../assets/styles/navbar.module.css"
import { toast } from "react-toastify"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  interface User {
    userName: string;
    _id: string;
    // Add other user properties if needed
  }

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users/me", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json()
        if (data.user) {
          setUser(data.user)
        } else {
          console.error("User data not found")
        }
      } catch (error) {
        console.log("User not loggedin", error)
        setUser(null) // Set default user name as Linuka
      }
    }

    fetchUser()
  }, [])
  const router = useRouter()

  
  const handleLogout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      setUser(null);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
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
            <Link href="/about-us" className={styles.navLink}>
              About Us
            </Link>
            <Link href="/contact-us" className={styles.navLink}>
              Contact Us
            </Link>
            {user ? (
              <div className={styles.userMenu}>
                <span className={styles.Hi}>Hi, {user.userName}</span>
                <div className={styles.dropdown}>
                  <Link href={`/userProfile/${user._id}`} className={styles.dropdownItem}>Profile</Link>
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
          <Link href="/about-us" className={styles.mobileNavLink}>
            About Us
          </Link>
          <Link href="/contact-us" className={styles.mobileNavLink}>
            Contact Us
          </Link>
          {user ? (
            <>
              <Link href={`/userProfile/${user._id}`} className={styles.mobileNavLink}>Profile</Link>
              <Link href="#" onClick={handleLogout} className={`${styles.mobileNavLink} ${styles.fn}`}>Logout</Link>
            </>
          ) : (
            <>
              <Link href="/login" className={`${styles.mobileNavLink} ${styles.fn}`}>
                Sign In
              </Link>
              {/* <Link href="/sign-up" className={`${styles.mobileNavLink} ${styles.fn}`}>
                Sign Up
              </Link> */}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar