"use client"
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import styles from './adminPage.module.css';   // Importing custom styles
import "bootstrap/dist/css/bootstrap.min.css";  // Importing Bootstrap CSS to styles

export default function page(){
    return(
        <div className={styles.outerContainer}>
            <Navbar/>

            <div className={styles.innerContainer}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <nav className={styles.nav}>
                        <ul>
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <li><a href="/">🏠 Home</a></li>
                            <li><a href="#">💬 Messages</a></li>
                            <li><a href="#">⭐ Favorites</a></li>
                            <li><a href="#">📈 Analytics</a></li>
                            <li><a href="#">⚙️ Settings</a></li>
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
                                <div>
                                    <p className={styles.label}>Full Name</p>
                                    <p>Your First Name</p>
                                </div>
                                <div>
                                    <p className={styles.label}>Display Name</p>
                                    <p>Your Display Name</p>
                                </div>
                                <div>
                                    <p className={styles.label}>Gender</p>
                                    <p>Your Gender</p>
                                </div>
                                <div>
                                    <p className={styles.label}>Country</p>
                                    <p>Your Country</p>
                                </div>
                            </div>
                            <button className={styles.editButton}>Edit</button>
                        </div>

                        {/* Users List */}
                        <div className={styles.usersCard}>
                            <h3>Users</h3>
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
                                {["Course 01", "Course 02", "Course 03"].map((course, index) => (
                                    <div key={index} className={styles.courseItem}>
                                        <div className={styles.icon}>🎓</div>
                                        <p className={styles.courseName}>{course}</p>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}