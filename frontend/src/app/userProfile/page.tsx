"use client"; // Indicating as a client-side component
import Image from 'next/image';     // Importing images
import Footer from "@/app/components/Footer";   // Importing Footer component
import React, {useEffect, useState} from 'react';   // Importing useState hook from React for state management
import "bootstrap/dist/css/bootstrap.min.css";  // Importing Bootstrap CSS to styles
import styles from './user.module.css';   // Importing custom styles


export default function UserProfile () {
    // const location = useRouter();
    // const userId = location.query;
    //Adding a useState for the active section
    const[activeTab,setActiveTab]=useState(0);
    // Initializing profile state with default user details
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user,setUser] = useState({
        id:"000",    // Unique user ID
        email: "Name@gmail.com",   // User's email address
        number : '(+94)12 345 6789', // number
        userName: "UserName",  // User's display name
        fullName:"Drake Winston", // User's full name
        avatar:"",  //profile picture
        gender:"Gender",  // User's gender
        language:"Language",     //language
        city :'City',    //city
        country:"Country", //country
        timeZone:"Time Zone",   //time zone
        courses : [
            { code: 'CS101', name: 'Introduction to Computer Science', result: 'A', mark : '95' },
            { code: 'CS102', name: 'Data Structures and Algorithms', result: 'B+', mark : '67' },
            { code: 'CS102', name: 'Data Structures and Algorithms', result: 'B+', mark : '67' },
            { code: 'CS102', name: 'Data Structures and Algorithms', result: 'B+', mark : '67' },
            { code: 'CS102', name: 'Data Structures and Algorithms', result: 'B+', mark : '67' },
            { code: 'CS103', name: 'Data Structures and Algorithms', result: 'A-', mark : '74' }
        ],
        tests : [
            {testId : '250106', testLevel:'Basic', mark :'58', xAxis : '20'},
            {testId : '250107', testLevel:'Generated', mark :'86', xAxis : '100'},
            {testId : '250108', testLevel:'Interview', mark :'46', xAxis : '180'}
        ],
        jobRole :[{
            jobName: 'Job Role '
        }],
        experience : [1],
        education : [1],
        skills : [1]
    });
    // const handleClick = (): void => {
    //     alert('Button clicked!');
    // };
    useEffect(()=>{
        const fetchUserDetails = async () => {
            const response = await fetch('http://localhost:3001/getUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: '001' }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.error) {
                   console.log(data.error);  // If the backend returns an error, displaying it in the console
                } else {
                    setUser(data);  // Otherwise, display the user details
                }
            } else {
                console.log('Failed to fetch user details');
            }
        };

        fetchUserDetails();

        //checking the availability of the window
        if(typeof window !== 'undefined'){
            for (let i = 0; i < 4; i++) {
                const section = document.querySelector<HTMLDivElement>(`#tab-${i}`);
                if (section) {
                    section.style.display = i === activeTab ? 'block' : 'none';
                }
            }
            const educationElement = document.getElementById('educationSection');
            const skillElement = document.getElementById('skillSection');
            const experienceElement = document.getElementById('experienceSection');
            if(user.education.length == 0 && educationElement){
                educationElement.style.display = 'none';
            }
            if(user.experience.length == 0 && experienceElement) {
                experienceElement.style.display = 'none';
            }
            if(user.skills.length == 0 && skillElement) {
                skillElement.style.display = 'none';
            }
        }
    },[activeTab,user.education,user.experience,user.skills]);
    return (
        <div className={`${styles.outerContainer} ${styles.pageContainer}`}>
            <div className={styles.innerContainer}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <div className={styles.logoContainer}>
                        <Image src={"/logo.png"} alt="Logo" width={150} height={0} className={styles.logo} />
                    </div>
                    <nav className={styles.nav}>
                        <ul>
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <li><a href="/"><Image src={"/user/homeIcon.svg"} alt="homeIcon"
                                                   width={40} height={0} className={styles.navImage}/> Home</a></li>
                            <li
                                onClick={() => setActiveTab(0)}
                                className={activeTab === 0 ? styles.activeLink : ''}
                            ><a href="#"><Image src={"/user/overviewIcon.svg"} alt="OverviewIcon"
                                                width={40} height={0} className={styles.navImage}/> Overview</a></li>
                            <li
                                onClick={() => setActiveTab(1)}
                                className={activeTab === 1 ? styles.activeLink : ''}
                            ><a href="#"><Image src={"/user/progressIcon.svg"} alt="progressIcon"
                                                width={40} height={0} className={styles.navImage}/> Progress</a></li>
                            <li
                                onClick={() => setActiveTab(2)}
                                className={activeTab === 2 ? styles.activeLink : ''}
                            ><a href="#"><Image src={"/user/courseIcon.svg"} alt="courseIcon"
                                                width={50} height={0} className={styles.navImage}/> Courses</a></li>
                            <li
                                onClick={() => setActiveTab(3)}
                                className={activeTab === 3 ? styles.activeLink : ''}
                            ><a href="#"><Image src={"/user/cvIcon.svg"} alt="cvIcon"
                                                width={30} height={0} className={styles.navImage}/> Resume</a></li>
                            <li
                                onClick={() => setActiveTab(4)}
                                className={activeTab === 4 ? styles.activeLink : ''}
                            ><a href="#"><Image src={"/user/settingsIcon.svg"} alt="settingsIcon"
                                                width={30} height={0} className={styles.navImage}/> Settings</a></li>
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
                        <section className={styles.tabsSection}>
                            {/* User Info Section */}
                            <section id="tab-0" className={styles.userInfo}>
                                <div className={styles.welcomeMessage}>Welcome, {user.userName}</div>
                                <div className={styles.userDetails}>
                                    <div className={styles.profilePic}>
                                        <span>👤{user.avatar}</span>
                                    </div>
                                    <div>
                                        <strong>{user.userName}</strong>
                                        <p>{user.email}</p>
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
                                    <p>{user.email}</p>
                                    <p>1 month ago</p>
                                    <button>+Add Email Address</button>
                                </div>
                            </section>
                            <section id="tab-1" className={styles.progress}>
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
                                                stroke="black"
                                                strokeWidth="1"
                                                points="-3,95 0,100 3,95"
                                            />
                                            <polyline
                                                fill="none"
                                                stroke="black"
                                                strokeWidth="1"
                                                points="270,-3 275,0 270,3"
                                            />
                                            {user.tests.map((test, index) => (
                                                <rect key={index} x={test.xAxis} y="1" width="60" height={test.mark}
                                                      fill="#007bff"/>
                                            ))}
                                        </g>
                                        <text x="-12" y="0" fontSize="7" fill="black">100</text>
                                        <text x="-11" y="50" fontSize="7" fill="black">50</text>
                                        <text x="-10" y="100" fontSize="7" fill="black">0</text>
                                    </svg>
                                </div>
                                <div className={styles.courses}>
                                    <h4 className={styles.coursesTitle}>{user.jobRole[0].jobName}</h4>
                                    <ul className={styles.courseList}>
                                        {user.tests.map((test, index) => (
                                            <li key={index} className={styles.courseItem}>
                                                <span className={styles.courseCode}>{test.testId}:</span>
                                                <span className={styles.courseName}> {test.testLevel} Test</span> -
                                                <span className={styles.courseResult}> {test.mark}%</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                            <section id="tab-2" className={styles.courses}>
                                <ul className={styles.courseList}>
                                    {user.courses.map((course, index) => (
                                        <li key={index} className={styles.courseItem}>
                                            <div className={styles.courseCard}>
                                                <Image src={"/user/courses.png"}
                                                       alt="course1"
                                                       width={100}
                                                       height={100}/>{course.code} <br/> {course.name}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                            <section id="tab-3" className={styles.cvSection}>
                                <div className={styles.contactInfo}>
                                    <h1 className={styles.name}>{user.fullName}</h1>
                                    <p className={styles.jobTitle}>{user.jobRole[0].jobName}</p>
                                    <div className={styles.contactDetails}>
                                        <p>Email: {user.email}</p>
                                        <p>Phone: {user.number}</p>
                                        <p>Location: {user.city}, {user.country}</p>
                                    </div>
                                </div>
                                <div id="experienceSection" className={styles.experience}>
                                    <h2 className={styles.sectionTitle}>Experience</h2>
                                    <ul className={styles.courseList}>
                                        {user.experience.map((experience, index) => (
                                            <li key={index} className={styles.expItem}>
                                                <div className={styles.job}>
                                                    <h3 className={styles.jobTitle}>Software Engineer</h3>
                                                    <p className={styles.companyName}>Tech Company</p>
                                                    <p className={styles.jobDates}>Jan 2020 - Present</p>
                                                    <ul className={styles.jobResponsibilities}>
                                                        <li>Developed and maintained web applications using React
                                                            and
                                                            Node.js
                                                        </li>
                                                        <li>Collaborated with cross-functional teams to design
                                                            user-friendly
                                                            features
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div id="educationSection" className={styles.education}>
                                    <h2 className={styles.sectionTitle}>Education</h2>
                                    <ul className={styles.educationList}>
                                        {user.education.map((education, index) => (
                                            <li key={index} className={styles.eduItem}>
                                                <div className={styles.degree}>
                                                    <h3 className={styles.degreeTitle}>Bachelor of Science in
                                                        Computer
                                                        Science</h3>
                                                    <p className={styles.schoolName}>University of XYZ</p>
                                                    <p className={styles.graduationYear}>Graduated: 2019</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div id="skillSection" className={styles.skills}>
                                    <h2 className={styles.sectionTitle}>Skills</h2>
                                    <ul className={styles.skillList}>
                                        {user.skills.map((skill, index) => (
                                            <li key={index} className={styles.skill}>JavaScript / TypeScript</li>
                                        ))}
                                    </ul>
                                </div>
                                <button onClick={window.print}>Print Preview / Save as PDF</button>
                            </section>
                        </section>
                    </div>
                </main>
            </div>
            {/*Footer component*/}
            <Footer/>
        </div>
    );
};