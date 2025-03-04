"use client"
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import CoursesManagement from './CourseManagment';
import styles from './adminPage.module.css';   // Importing custom styles
import "bootstrap/dist/css/bootstrap.min.css";  // Importing Bootstrap CSS to styles
import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation';


export default function Page(){
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (localStorage.getItem("isAuthenticated") !== "true") {
            router.push("/SignInForAdmin"); // Redirect if not logged in
        }
    }, [router]);


    const [isEditing, setIsEditing] = useState(false);

    const [userInfo, setUserInfo] = useState({
        fullName: "Your First Name",
        displayName: "Your Display Name",
        ender: "Your Gender",
        country: "Your Country",
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

    if (!isClient) return null;

    return(
        <div className={styles.outerContainer}>
            <Navbar/>

            <div className={styles.innerContainer}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <nav className={styles.nav}>
                        <ul>
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <li><a href="/">Home</a></li>
                            <li><a href="#">Messages</a></li>
                            <li><a href="#">Favorites</a></li>
                            <li><a href="#">Analytics</a></li>
                            <li><a href="#">Settings</a></li>
                        </ul>
                    </nav>
                </aside>


                {/* Main Content */}
                <div className={styles.mainContent}>
                    {/* Top Bar */}
                    <div className={styles.topBar}>
                        <h2>Welcome, Admin</h2>
                        <input type="text" placeholder="Search" className={styles.searchInput} />
                    </div>

                    {/* Profile and Users Section */}
                    <div className={styles.gridContainer}>
                        {/* Profile Card */}
                        <div className={styles.profileCard}>
                            <h3>User Name</h3>
                            <p>example@gmail.com</p>
                            <div className={styles.detailsGrid}>
                                {(Object.keys(userInfo) as Array<keyof typeof userInfo>).map((key) => (
                                    <div key={key}>
                                        <p className={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}</p>
                                        {isEditing ? (
                                            <input
                                            type="text"
                                            name={key}
                                            value={userInfo[key]}
                                            onChange={handleChange}
                                            />
                                        ) : (
                                            <p>{userInfo[key]}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button className={styles.editButton} onClick={() => setIsEditing(!isEditing)}>
                                {isEditing ? "Save" : "Edit"}
                            </button>
                        </div>

                        {/* Users List */}
                        <div className={styles.usersCard}>
                            <div className={styles.usersBar}>
                                <h3>Users</h3>
                                <input type="text" placeholder="Search users" className={styles.searchInput} />
                            </div>
                            <hr />
                            <div className={styles.userList}>
                                {["User1", "User2", "User3", "User4"].map((user) => (
                                    <div key={user} className={styles.userItem}>{user}</div>
                                ))}
                            </div>
                        </div>

                        {/* Courses Section */}
                        <div className={styles.coursesSection}>
                            <h3>Courses</h3>
                            <div className={styles.coursesList}>
                                {["Course 01", "Course 02", "Course 03", "Course 04", "Course 05"].map((course, index) => (
                                    <div key={index} className={styles.courseItem}>
                                        <div className={styles.icon}>🎓</div>
                                        <p className={styles.courseName}>{course}</p>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.coursesList}>
                                {["Course 01", "Course 02", "Course 03", "Course 04", "Course 05"].map((course, index) => (
                                    <div key={index} className={styles.courseItem}>
                                        <div className={styles.icon}>🎓</div>
                                        <p className={styles.courseName}>{course}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Courses Management */}
                        <div>
                            <CoursesManagement/>
                        </div>

                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}