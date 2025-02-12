"use client"; // Indicating as a client-side component
import Image from 'next/image';     // Importing images
import Footer from "@/app/components/Footer";   // Importing Footer component
import React, { useState } from 'react';   // Importing useState hook from React for state management
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
                    <div className={styles.logoContainer}>
                        <Image src={"/logo.png"} alt="Logo" width={150} height={0} className={styles.logo} />
                    </div>
                    <nav className={styles.nav}>
                        <ul>
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <li><a href="/"><Image src={"/user/homeIcon.png"} alt="homeIcon"
                                                   width={40} height={0} className={styles.navImage}/> Home</a></li>
                            <li><a href="#"><Image src={"/user/progressChart.png"} alt="progressChart"
                                                   width={40} height={0} className={styles.navImage}/> Progress</a></li>
                            <li><a href="#"><Image src={"/user/courses.png"} alt="courses"
                                                   width={50} height={0} className={styles.navImage}/> Courses</a></li>
                            <li><a href="#"><Image src={"/user/cvIcon.png"} alt="CV_Icon"
                                                   width={30} height={0} className={styles.navImage}/> Resume</a></li>
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

                            <div className={styles.progress}>
                                <h4>Dashboard Progress</h4>
                                <div className={styles.chart}>
                                    <svg viewBox="-15 -10 300 125">
                                        <g transform="scale(1, -1) translate(0, -100)">
                                            <polyline
                                                fill="none"
                                                stroke="black"
                                                strokeWidth="1"
                                                points="0,100 0,0 275,0"
                                            />
                                            <polyline
                                                fill="none"
                                                stroke="#007bff"
                                                strokeWidth="1"
                                                points="10,80 50,40 100,20 150,80 200,20 250,70"
                                            />
                                            <circle cx="10" cy="80" r="3" fill="#007bff"/>
                                            <circle cx="50" cy="40" r="3" fill="#007bff"/>
                                            <circle cx="100" cy="20" r="3" fill="#007bff"/>
                                            <circle cx="150" cy="80" r="3" fill="#007bff"/>
                                            <circle cx="200" cy="20" r="3" fill="#007bff"/>
                                            <circle cx="250" cy="70" r="3" fill="#007bff"/>
                                        </g>
                                        <text x="-12" y="0" fontSize="7" fill="black">100</text>
                                        <text x="-11" y="50" fontSize="7" fill="black">50</text>
                                        <text x="-10" y="100" fontSize="7" fill="black">0</text>

                                        <text x="5" y="110" fontSize="7" fill="black">C1</text>
                                        <text x="45" y="110" fontSize="7" fill="black">C2</text>
                                        <text x="95" y="110" fontSize="7" fill="black">C3</text>
                                        <text x="145" y="110" fontSize="7" fill="black">C5</text>
                                        <text x="195" y="110" fontSize="7" fill="black">C6</text>
                                        <text x="245" y="110" fontSize="7" fill="black">C7</text>

                                    </svg>
                                </div>
                            </div>

                            <div className={styles.courses}>
                            <div className={styles.courseCard}><Image src={"/user/courses.png"} alt="course1"
                                                                          width={100} height={100}/>🎓 Course 01
                                </div>
                                <div className={styles.courseCard}><Image src={"/user/courses.png"} alt="course2"
                                                                          width={100} height={100}/>🎓 Course 02
                                </div>
                                <div className={styles.courseCard}><Image src={"/user/courses.png"} alt="course3"
                                                                          width={100} height={100}/>🎓 Course 03
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