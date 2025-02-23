"use client"; // Indicating as a client-side component
import Image from 'next/image';     // Importing images
import Footer from "@/app/components/Footer";   // Importing Footer component
import { useState } from 'react';   // Importing useState hook from React for state management
import "bootstrap/dist/css/bootstrap.min.css";  // Importing Bootstrap CSS to styles
import styles from './user.module.css';   // Importing custom styles


const page = () =>{
    // Initializing profile state with default user details
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [profile] = useState({
        id:"001",    // Unique user ID
        email: "drake@gmail.com",   // User's email address
        displayName: "Drake",  // User's display name
        fullName:"Drake Winston", // User's full name
        avatar:"",  //profile picture
        gender:"male",  // User's gender
        language:"English",     //language
        country:"Sri Lanka", //country
        timeZone:"GTM-5",   //time zone
    });
    return (
        <div className={styles.outerContainer}>
            <div className={styles.innerContainer}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <Image src={"/logo.png"} alt="Logo" width={200} height={0} />
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
                <main className={styles.mainContent}>
                    <header className={styles.header}>
                        <div className={styles.searchContainer}>
                            <input type="text" placeholder="Search"/>
                            <button>🔍</button>
                        </div>
                    </header>

                    <div className={styles.contentWrapper}>
                        {/* User Info Section */}
                        <section className={styles.userInfo}>
                            <div className={styles.welcomeMessage}>Welcome, {profile.displayName}</div>
                            <div className={styles.userDetails}>
                                <div className={styles.profilePic}>
                                    <span>👤{profile.avatar}</span>
                                </div>
                                <div>
                                    <strong>{profile.displayName}</strong>
                                    <p>{profile.email}</p>
                                </div>
                                <button className={styles.editButton}>Edit</button>
                            </div>
                            {/*form section*/}
                            <form className={styles.form}>
                                <div>
                                    <label>Full Name</label>
                                    <input placeholder="Your First Name"/>
                                </div>
                                <div>
                                    <label>Display Name</label>
                                    <input placeholder="Your Display Name"/>
                                </div>
                                <div>
                                    <label>Gender</label>
                                    <select>
                                        <option>Your Gender</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Country</label>
                                    <select>
                                        <option>Your Country</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Language</label>
                                    <select>
                                        <option>Languages</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Time Zone</label>
                                    <select>
                                        <option>Time Zone</option>
                                    </select>
                                </div>
                            </form>

                            <div className={styles.emailSection}>
                                <h3>My Email Address</h3>
                                <p>{profile.email}</p>
                                <p>1 month ago</p>
                                <button>+Add Email Address</button>
                            </div>
                        </section>

                        {/* Courses and Progress */}
                        <section className={styles.dashboard}>
                            <div className={styles.courses}>
                                <div className={styles.courseCard}>🎓 Course 01</div>
                                <div className={styles.courseCard}>🎓 Course 02</div>
                                <div className={styles.courseCard}>🎓 Course 03</div>
                            </div>

                            <div className={styles.progress}>
                                <h4>Dashboard Progress</h4>
                                <div className={styles.chart}>
                                    <svg viewBox="0 0 300 100">
                                        <polyline
                                            fill="none"
                                            stroke="#007bff"
                                            strokeWidth="1"
                                            points="0,80 50,40 100,20 150,80 200,10 250,70"
                                        />
                                        <circle cx="0" cy="80" r="3" fill="#007bff"/>
                                        <circle cx="50" cy="40" r="3" fill="#007bff"/>
                                        <circle cx="100" cy="20" r="3" fill="#007bff"/>
                                        <circle cx="150" cy="80" r="3" fill="#007bff"/>
                                        <circle cx="200" cy="10" r="3" fill="#007bff"/>
                                        <circle cx="250" cy="70" r="3" fill="#007bff"/>
                                    </svg>
                                </div>
                                <div className={styles.chartLabels}>
                                    <span>May</span>
                                    <span>June</span>
                                    <span>July</span>
                                    <span>Aug.</span>
                                    <span>Sept.</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
            {/*Footer component*/}
            <Footer/>
        </div>
    );
};
export default page;