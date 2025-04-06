"use client";
import styles from "@/app/userProfile/user.module.css";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
export default function SideBar({
  setProfileTab,
  setDashboardTab,
  setUserProfile,
  isCollapsed,
  setIsCollapsed,
}: {
  setProfileTab: any;
  setDashboardTab: any;
  setUserProfile: any;
  isCollapsed: any;
  setIsCollapsed: any;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/recruiters/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Function to check screen width
      const handleResize = () => {};

      // Run check on mount
      handleResize();

      // Add resize listener
      window.addEventListener("resize", handleResize);

      // Clean up listener on unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [activeTab, window.innerWidth]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const toggleNavIcon = () => {
    if (window.innerWidth <= 919) {
      setIsCollapsed(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent, text: string) => {
    if (isCollapsed && window?.innerWidth >= 919) {
      setTooltip({
        text,
        x: e.clientX + 10, // Slight offset for better visibility
        y: e.clientY + 10,
      });
    }
  };

  const handleMouseLeave = () => setTooltip(null);

  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
    >
      <div
        className={`${styles.logoContainer} ${
          isCollapsed ? styles.collapsed : ""
        }`}
      >
        <Image
          id={"menuButton"}
          src="/user/navMenu.svg"
          alt="navMenuIcon"
          width={30}
          height={30}
          onClick={toggleSidebar}
          className={`${styles.menuButton} ${
            isCollapsed ? styles.collapsed : ""
          }`}
        />

        {!isCollapsed && (
          <>
            <Image
              src="/logo.png"
              alt="Logo"
              width={isCollapsed ? 50 : 120}
              height={isCollapsed ? 50 : 120}
              className={styles.logo}
              priority
            />
          </>
        )}
      </div>
      <nav className={styles.nav}>
        <ul>
          <li
            onMouseMove={(e) => handleMouseMove(e, "Home")}
            onMouseLeave={handleMouseLeave}
          >
            <a href="/">
              <div className={styles.navTab}>
                <Image
                  src="/user/homeIcon.svg"
                  alt="homeIcon"
                  width={40}
                  height={40}
                  className={styles.navImage}
                />{" "}
                {!isCollapsed && "Home"}
              </div>
            </a>
          </li>
          <li
            onClick={() => {
              setActiveTab(0);
              setProfileTab(false);
              setUserProfile(false);
              setDashboardTab(true);
              toggleNavIcon();
            }}
            className={activeTab === 0 ? styles.activeLink : ""}
          >
            <div className={styles.navTab}>
              <Image
                src={"/user/progressIcon.svg"}
                alt="progressIcon"
                width={40}
                height={40}
                className={styles.navImage}
              />
              {!isCollapsed && "Dashboard"}
            </div>
          </li>
          <li
            onClick={() => {
              setActiveTab(1);
              setProfileTab(true);
              setUserProfile(false);
              setDashboardTab(false);
              toggleNavIcon();
            }}
            className={activeTab === 1 ? styles.activeLink : ""}
          >
            <div className={styles.navTab}>
              <Image
                src={"/recruiter/profile-icon.svg"}
                alt="profileIcon"
                width={40}
                height={40}
                className={styles.navImage}
              />
              {!isCollapsed && "Profile"}
            </div>
          </li>
          <li
            onClick={logout}
            className={activeTab === 8 ? styles.activeLink : ""}
            onMouseMove={(e) => handleMouseMove(e, "Log Out")}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.navTab}>
              <Image
                src="/user/logOut.svg"
                alt="logOutIcon"
                width={30}
                height={40}
                className={styles.navImage}
              />{" "}
              {!isCollapsed && "Log Out"}
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
