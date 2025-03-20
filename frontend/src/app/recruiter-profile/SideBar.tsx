import styles from "@/app/userProfile/user.module.css";
import Image from "next/image";
import { useState } from "react";
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
                src={"/user/overviewIcon.svg"}
                alt="OverviewIcon"
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
                src={"/user/progressIcon.svg"}
                alt="progressIcon"
                width={40}
                height={40}
                className={styles.navImage}
              />
              Profile
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
