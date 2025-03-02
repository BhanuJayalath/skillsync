"use client"; // Indicating as a client-side component
import Image from 'next/image';     // Importing images
import Footer from "@/app/components/Footer";   // Importing Footer component
import React, {useEffect, useState} from 'react';   // Importing useState hook from React for state management
import "bootstrap/dist/css/bootstrap.min.css";  // Importing Bootstrap CSS to styles
import styles from './user.module.css';   // Importing custom styles
import '../globals.css';
import Overview from "@/app/userProfile/Overview";
import Progress from "@/app/userProfile/Progress";
import Courses from "@/app/userProfile/Courses";
import Resume from "@/app/userProfile/Resume";
import Settings from "@/app/userProfile/Settings";


export default function UserProfile() {
    // const location = useRouter();
    // const userId = location.query;
    //Adding a useState for the active section
    const [activeTab, setActiveTab] = useState(0);
    // Initializing profile state with default user details
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useState({
        id: "000",    // Unique user ID
        email: "Name@gmail.com",   // User's email address
        number: '(+94)12 345 6789', // number
        userName: "UserName",  // User's display name
        gitHub: "github",
        linkedIn: "linkedin",
        fullName: "Drake Winston", // User's full name
        avatar: "",  //profile picture
        gender: "Gender",  // User's gender
        language: "Language",     //language
        city: 'City',    //city
        country: "Country", //country
        courses: [
            {code: 'CS101', name: 'Introduction to Computer Science', result: 'A', mark: '95'},
            {code: 'CS102', name: 'Data Structures and Algorithms', result: 'B+', mark: '67'},
            {code: 'CS102', name: 'Data Structures and Algorithms', result: 'B+', mark: '67'},
            {code: 'CS102', name: 'Data Structures and Algorithms', result: 'B+', mark: '67'},
            {code: 'CS102', name: 'Data Structures and Algorithms', result: 'B+', mark: '67'},
            {code: 'CS103', name: 'Data Structures and Algorithms', result: 'A-', mark: '74'}
        ],
        tests: [
            {testId: '250106', testLevel: 'Basic', mark: '58', xAxis: '20'},
            {testId: '250107', testLevel: 'Generated', mark: '86', xAxis: '100'},
            {testId: '250108', testLevel: 'Interview', mark: '46', xAxis: '180'}
        ],
        jobRole: [{
            jobName: 'Job Role '
        }],
        experience: [
            {
                jobName: 'Full-stack developer1',
                companyName: 'codeLabs',
                startDate: '2021',
                endDate: 'Present',
                description: ''
            },
        ],
        education: [
            {
                courseName: 'Bsc(hons) Computer Science',
                schoolName: 'University of westminster',
                startDate: '2022',
                endDate: 'Present',
                description: ''
            },
        ],
        skills: ['skill-1', 'skill-2', 'skill-3']
    });









    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await fetch('http://localhost:3001/getUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId: '006'}),
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
        fetchUserDetails().then(e => console.log(e));
    }, []);
    useEffect(() => {
        //checking the availability of the window
        if (typeof window !== 'undefined') {
            for (let i = 0; i < 5; i++) {
                const section = document.querySelector<HTMLDivElement>(`#tab-${i}`);
                if (section) {
                    section.style.display = i === activeTab ? 'block' : 'none';
                }
            }
            const educationElement = document.getElementById('educationSection');
            const skillElement = document.getElementById('skillSection');
            const experienceElement = document.getElementById('experienceSection');
            if (user.education.length == 0 && educationElement) {
                educationElement.style.display = 'none';
            }
            if (user.experience.length == 0 && experienceElement) {
                experienceElement.style.display = 'none';
            }
            if (user.skills.length == 0 && skillElement) {
                skillElement.style.display = 'none';
            }
        }
    }, [activeTab, user.education, user.experience, user.skills]);
    return (
        <div className={`${styles.outerContainer} ${styles.pageContainer}`}>
            <div className={styles.innerContainer}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <div className={styles.logoContainer}>
                        <Image src={"/logo.png"} alt="Logo" width={150} height={0} className={styles.logo}/>
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

                    </div>
                </main>
            </div>
            {/*Footer component*/
            }
            <Footer/>
        </div>
    );
};

// {/* User Info Section */}
// <section id="tab-0" className={styles.userInfo}>
//     <div className={styles.welcomeMessage}>Welcome, {user.userName}</div>
//     <div className={styles.userDetails}>
//         <div className={styles.profilePic}>
//             {user.avatar ? (
//                 <span className={styles.userAvatar}>{user.avatar}</span>
//             ) : (
//                 <span><Image src={"/user/userIcon.svg"} alt="userIcon"
//                              width={100} height={0} className={styles.userAvatar}/></span>
//             )}
//         </div>
//         <div>
//             <strong>{user.userName}</strong>
//             <p>{user.email}</p>
//         </div>
//         <button className={styles.editButton}>Edit</button>
//     </div>
//     {/*form section*/}
//     <form className={styles.form}>
//         <div>
//             <label>Full Name</label>
//             <input placeholder="Your First Name"/>
//         </div>
//         <div>
//             <label>Display Name</label>
//             <input placeholder="Your Display Name"/>
//         </div>
//         <div>
//             <label>Gender</label>
//             <select>
//                 <option>Your Gender</option>
//             </select>
//         </div>
//         <div>
//             <label>Country</label>
//             <select>
//                 <option>Your Country</option>
//             </select>
//         </div>
//         <div>
//             <label>Language</label>
//             <select>
//                 <option>Languages</option>
//             </select>
//         </div>
//         <div>
//             <label>Time Zone</label>
//             <select>
//                 <option>Time Zone</option>
//             </select>
//         </div>
//     </form>
//     <div className={styles.userFooter}>go to settings to edit the user profile</div>
// </section>
// <section id="tab-1" className={styles.progress}>
//     <h4>Dashboard Progress</h4>
//     <div className={styles.chart}>
//         <svg viewBox="-15 -10 300 125">
//             <g transform="scale(1, -1) translate(0, -100)">
//                 <polyline
//                     fill="none"
//                     stroke="black"
//                     strokeWidth="0.4"
//                     points="0,100 0,0 275,0"
//                 />
//                 <polyline
//                     fill="none"
//                     stroke="black"
//                     strokeWidth="0.4"
//                     points="-3,95 0,100 3,95"
//                 />
//                 <polyline
//                     fill="none"
//                     stroke="black"
//                     strokeWidth="0.4"
//                     points="270,-3 275,0 270,3"
//                 />
//                 {user.tests.map((test, index) => (
//                     <rect key={index} x={test.xAxis} y="1" width="60" height={test.mark}
//                           fill="#007bff"/>
//                 ))}
//             </g>
//             <text x="-12" y="0" fontSize="7" fill="black">100</text>
//             <text x="-11" y="50" fontSize="7" fill="black">50</text>
//             <text x="-10" y="100" fontSize="7" fill="black">0</text>
//         </svg>
//     </div>
//     <div className={styles.courses}>
//         <h4 className={styles.coursesTitle}>{user.jobRole[0].jobName}</h4>
//         <ul className={styles.courseList}>
//             {user.tests.map((test, index) => (
//                 <li key={index} className={styles.courseItem}>
//                     <span className={styles.courseCode}>{test.testId}:</span>
//                     <span className={styles.courseName}> {test.testLevel} Test</span> -
//                     <span className={styles.courseResult}> {test.mark}%</span>
//                 </li>
//             ))}
//         </ul>
//     </div>
// </section>
// <section id="tab-2" className={styles.courses}>
//     <ul className={styles.courseList}>
//         {user.courses.map((course, index) => (
//             <li key={index} className={styles.courseItem}>
//                 <div className={styles.courseCard}>
//                     <Image src={"/user/courses.png"}
//                            alt="course1"
//                            width={100}
//                            height={100}/>{course.code} <br/> {course.name}
//                 </div>
//             </li>
//         ))}
//     </ul>
// </section>
// <section id="tab-3" className={styles.cvSection}>
//     <div className={styles.contactInfo}>
//         <h1 className={styles.name}>{user.fullName}</h1>
//         <p className={styles.jobTitle}>{user.jobRole[0].jobName}</p>
//         <div className={styles.contactDetails}>
//             <p>Email: {user.email}</p>
//             <p>Phone: {user.number}</p>
//             <p>Location: {user.city}, {user.country}</p>
//         </div>
//     </div>
//     <div id="experienceSection" className={styles.experience}>
//         <h2 className={styles.sectionTitle}>Experience</h2>
//         <ul className={styles.jobList}>
//             {user.experience.map((experience, index) => (
//                 <li key={index} className={styles.expItem}>
//                     <div className={styles.job} onClick={() => removeExperience(index)}>
//                         <h3 className={styles.jobTitle}>{experience.jobName}</h3>
//                         <p className={styles.companyName}>{experience.companyName}</p>
//                         <p className={styles.jobDates}>{experience.startDate} - {experience.endDate}</p>
//                         <p className={styles.jobResponsibilities}>{experience.description}</p>
//                     </div>
//                 </li>
//             ))}
//         </ul>
//     </div>
//
//     <div id="educationSection" className={styles.education}>
//         <h2 className={styles.sectionTitle}>Education</h2>
//         <ul className={styles.educationList}>
//             {user.education.map((education, index) => (
//                 <li key={index} className={styles.eduItem}>
//                     <div className={styles.degree} onClick={() => removeEducation(index)}>
//                         <h3 className={styles.degreeTitle}>{education.courseName}</h3>
//                         <p className={styles.schoolName}>{education.schoolName}</p>
//                         <p className={styles.graduationYear}>{education.startDate} - {education.endDate}</p>
//                         <p className={styles.jobResponsibilities}>{education.description}</p>
//                     </div>
//                 </li>
//             ))}
//         </ul>
//     </div>
//     <div id="skillSection" className={styles.skills}>
//         <h2 className={styles.sectionTitle}>Skills</h2>
//         <ul className={styles.skillList}>
//             {user.skills.map((skill, index) => (
//                 <li key={index} className={styles.skill}>{skill}</li>
//             ))}
//         </ul>
//     </div>
//     <button onClick={() => {
//         if (typeof window !== 'undefined') {
//             window.print();
//         }
//     }}>Print Preview / Save as PDF
//     </button>
// </section>
// <section id="tab-4" className={styles.userInfo}>
//     <div className={styles.userDetails}>
//         <div className={styles.profilePic}>
//             {user.avatar ? (
//                 <span className={styles.userAvatar}>{user.avatar}</span>
//             ) : (
//                 <span><Image src={"/user/userIcon.svg"} alt="userIcon"
//                              width={100} height={0} className={styles.userAvatar}/></span>
//             )}
//         </div>
//         <div>
//             <strong>{user.userName}</strong>
//             <p>{user.email}</p>
//         </div>
//         <button className={styles.editButton} onClick={handleSubmit}>Edit</button>
//     </div>
//     {/*form section*/}
//     <form className={styles.form}>
//         <div>
//             <label>User Name</label>
//             <input type="text" name="userName" value={user.userName}
//                    onChange={(e) => handleChange(e, "userName")}
//                    placeholder={user.userName}/>
//         </div>
//         <div>
//             <label>Full Name</label>
//             <input type="text" name="userName" value={user.userName}
//                    onChange={(e) => handleChange(e, "userName")}
//                    placeholder={user.userName}/>
//         </div>
//         <div>
//             <label>Github</label>
//             <input type="text" name="gitHub" value={user.gitHub}
//                    onChange={(e) => handleChange(e, "gitHub")}
//                    placeholder={user.gitHub}/>
//         </div>
//         <div>
//             <label>LinkedIn</label>
//             <input type="text" name="linkedIn" value={user.linkedIn}
//                    onChange={(e) => handleChange(e, "linkedIn")}
//                    placeholder={user.linkedIn}/>
//         </div>
//         <div>
//             <label>Gender</label>
//             <select>
//                 <option>Male</option>
//                 <option>Female</option>
//             </select>
//         </div>
//         <div>
//             <label>Country</label>
//             <select>
//                 <option>Your Country</option>
//             </select>
//         </div>
//         <div>
//             <label>Language</label>
//             <select>
//                 <option>Languages</option>
//             </select>
//         </div>
//         <div>
//             <label>Time Zone</label>
//             <select>
//                 <option>Time Zone</option>
//             </select>
//         </div>
//     </form>
//     <form className={styles.form2}>
//         <div className={styles.formSection}>
//             <h3>Experience</h3>
//             {user.experience.map((exp, index) => (
//                 <div key={index} className={styles.formGroup}>
//                     <div className={styles.formGroup}>
//                         <label htmlFor={`jobName-${index}`}>Job Title</label>
//                         <input
//                             type="text"
//                             id={`jobName-${index}`}
//                             value={exp.jobName}
//                             onChange={(e) => handleNestedChange(index, "jobName", e.target.value, "experience")}
//                         />
//                     </div>
//                     <div className={styles.formGroup}>
//                         <label htmlFor={`companyName-${index}`}>Company Name</label>
//                         <input
//                             type="text"
//                             id={`companyName-${index}`}
//                             value={exp.companyName}
//                             onChange={(e) => handleNestedChange(index, "companyName", e.target.value, "experience")}
//                         />
//                     </div>
//                     <div className={styles.formGroup}>
//                         <label htmlFor={`startDate-${index}`}>Start Date</label>
//                         <input
//                             type="date" // Use type="date"
//                             id={`startDate-${index}`}
//                             value={exp.startDate}
//                             onChange={(e) => handleNestedChange(index, "startDate", e.target.value, "experience")}
//                         />
//                     </div>
//                     <div className={styles.formGroup}>
//                         <label htmlFor={`endDate-${index}`}>End Date</label>
//                         <input
//                             type="date" // Use type="date"
//                             id={`endDate-${index}`}
//                             value={exp.endDate}
//                             onChange={(e) => handleNestedChange(index, "endDate", e.target.value, "experience")}
//                         />
//                     </div>
//                     <div className={styles.formGroup}>
//                         <label htmlFor={`description-${index}`}>Description</label>
//                         <textarea
//                             id={`description-${index}`}
//                             value={exp.description}
//                             onChange={(e) => handleNestedChange(index, "description", e.target.value, "experience")}
//                         />
//                     </div>
//                 </div>
//             ))}
//             <button>Save</button>
//         </div>
//
//         {/* Education Section - Similar Structure */}
//         <div className={styles.formSection}>
//             <h3>Education</h3>
//             {user.education.map((edu, index) => (
//                 <div key={index} className={styles.formGroup}>
//                     {/* Input fields with appropriate labels and IDs */}
//                     <label htmlFor={`courseName-${index}`}>Course Name</label>
//                     <input
//                         type="text"
//                         id={`courseName-${index}`}
//                         value={edu.courseName}
//                         onChange={(e) => handleNestedChange(index, "courseName", e.target.value, "education")}
//                     />
//                     <label htmlFor={`schoolName-${index}`}>School Name</label>
//                     <input
//                         type="text"
//                         id={`schoolName-${index}`}
//                         value={edu.schoolName}
//                         onChange={(e) => handleNestedChange(index, "schoolName", e.target.value, "education")}
//                     />
//                     <label htmlFor={`startDate-${index}`}>Start Date</label>
//                     <input
//                         type="date"
//                         id={`startDate-${index}`}
//                         value={edu.startDate}
//                         onChange={(e) => handleNestedChange(index, "startDate", e.target.value, "education")}
//                     />
//                     <label htmlFor={`endDate-${index}`}>End Date</label>
//                     <input
//                         type="date"
//                         id={`endDate-${index}`}
//                         value={edu.endDate}
//                         onChange={(e) => handleNestedChange(index, "endDate", e.target.value, "education")}
//                     />
//                     <label htmlFor={`description-${index}`}>Description</label>
//                     <textarea
//                         id={`description-${index}`}
//                         value={edu.description}
//                         onChange={(e) => handleNestedChange(index, "description", e.target.value, "education")}
//                     />
//                 </div>
//             ))}
//             <button>Save</button>
//         </div>
//
//         {/* Skills Section */}
//         {/*<div className={styles.formSection}>*/}
//         {/*    <h3>Skills</h3>*/}
//         {/*    {user.skills.map((skill, index) => (*/}
//         {/*        <div key={index} className={styles.formGroup}>*/}
//         {/*            <label htmlFor={`skill-${index}`}>Skill {index + 1}</label>*/}
//         {/*            <input*/}
//         {/*                type="text"*/}
//         {/*                id={`skill-${index}`}*/}
//         {/*                value={skill}*/}
//         {/*                onChange={(e) => handleSkillsChange(index, e.target.value)}*/}
//         {/*            />*/}
//         {/*        </div>*/}
//         {/*    ))}*/}
//         {/*</div>*/}
//     </form>
// </section>