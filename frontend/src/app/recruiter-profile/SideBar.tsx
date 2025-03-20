"use client";
import styles from "@/app/userProfile/user.module.css";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
export default function SideBar({
  setProfileTab,
  setDashboardTab,
  setUserProfile,
}: {
  setProfileTab: any;
  setDashboardTab: any;
  setUserProfile: any;
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

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <Image
          src={"/logo.png"}
          alt="Logo"
          width={120}
          height={120}
          className={styles.logo}
          priority
        />
      </div>
      <nav className={styles.nav}>
        <ul>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <li
            onClick={() => {
              setActiveTab(0);
              setProfileTab(false);
              setUserProfile(false);
              setDashboardTab(true);
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
              Dashboard
            </div>
          </li>
          <li
            onClick={() => {
              setActiveTab(1);
              setProfileTab(true);
              setUserProfile(false);
              setDashboardTab(false);
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
              Profile
            </div>
          </li>
          <li
            onClick={logout}
            className={activeTab === 8 ? styles.activeLink : ""}
          >
            <div className={styles.navTab}>
              <Image
                src={"/user/logOut.svg"}
                alt="logOutIcon"
                width={30}
                height={40}
                className={styles.navImage}
              />{" "}
              Log Out{" "}
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
