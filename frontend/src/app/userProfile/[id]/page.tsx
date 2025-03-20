"use client"; // Indicating as a client-side component

import Image from 'next/image';     // Importing images
import { useParams, useRouter  } from 'next/navigation';
import React, {Suspense, useEffect, useRef, useState} from 'react';   // Importing useState hook from React for state management
import "bootstrap/dist/css/bootstrap.min.css";  // Importing Bootstrap CSS to styles
import styles from '../user.module.css';   // Importing custom styles
import '../../globals.css';
import Overview from "@/app/userProfile/Overview";
import Progress from "@/app/userProfile/Progress";
import Resume from "@/app/userProfile/Resume";
import Settings from "@/app/userProfile/Settings";
import MockInterview from '@/app/mock-interview/page';
import COURSE from '@/app/courses/page';
import axios from "axios";
import {toast} from "react-hot-toast";
import Assessment from '@/app/test/page';
import Careers from '@/app/job-recommendations/page';
import JobContent from '@/app/recruiter-profile/JobContent';







 function UserProfile() {
     const { id } = useParams();
     const router = useRouter();
     //Adding a useState for the active section
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [messageIndex, setMessageIndex] = useState<number | null>(null);
     const [showMessage, setShowMessage] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    // Initializing profile state with default user details
     const [user, setUser] = useState<User | null>(null);

    // Education Handlers
    const addEducation = (
        e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setUser(prevState => prevState?{
            ...prevState,
            education: [...prevState?.education, { courseName: '', schoolName: '', startDate: '', endDate: '', description: '' }]
        }:null);
    };
    // Experience Handlers
    const addExperience = (
        e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setUser(prevState =>prevState?{
            ...prevState,
            experience: [...prevState.experience, { jobName: '', companyName: '', startDate: '', endDate: '', description: '' }]
        }:null);
    };
    const removeEducation = (index: number) => {
        if (user){
            const updatedEducation = [...user.education];
            updatedEducation.splice(index, 1);

            setUser(prevState => prevState?{
                ...prevState,
                education: updatedEducation
            }:null);
        }
    };
    const removeExperience = (index: number) => {
        if(user){
            const updatedExperience = [...user.experience];
            updatedExperience.splice(index, 1);

            setUser(prevState => prevState?{
                ...prevState,
                experience: updatedExperience
            } : null);
        }
    };
    // Change handler
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, field: string
    ) => {
        setUser((prev) => prev? {
            ...prev,
            [field]: e.target.value
        } : null);
    };
    const updateNestedChanges = (
        index: number,
        section: "experience" | "education"
    ) => {
        setUser((prev) => {
            if (!prev) return null;
            // Clone the section array
            const updatedSection = [...prev[section]];

            // For the specific index, update the item to keep only jobName or courseName
            if (section === "experience") {
                updatedSection[index] = {
                    jobName: '',
                    companyName: '', // Set to empty or default value
                    startDate: '', // Set to empty or default value
                    endDate: '', // Set to empty or default value
                    description: '' // Set to empty or default value
                };
            } else if (section === "education") {
                updatedSection[index] = {
                    courseName: '',
                    schoolName: '', // Set to empty or default value
                    startDate: '', // Set to empty or default value
                    endDate: '', // Set to empty or default value
                    description: '' // Set to empty or default value
                };
            }

            // Return the new state with the updated section
            return {
                ...prev,
                [section]: updatedSection, // Update the specific section
            };
        });
    };
    const handleFields = (
        value: string,
        field:string
    ) => {
        setUser(prev => {
            if (!prev) return null;
            console.log("Updating:", field, "with", value);
            return {
                ...prev,
                [field]: value
            };
        });
    };
     // Update nested fields (experience, education)
     const handleNestedChange = (
         index: number,
         field: string,
         value: string,
         section: "experience" | "education"
     ) => {
         setUser(prev => prev? {
             ...prev,
             [section]: prev[section].map((item, i) =>
                 i === index ? {...item, [field]: value} : item
             ),
         } : null);
     };
    const handleSubmit = async () => {
        const updateUserUrl = process.env.NEXT_PUBLIC_UPDATE_USER_URL;
        if (user) {
            user.experience = user.experience.filter(item => item.jobName);
            user.education = user.education.filter(item => item.courseName);

            try {
                const response = await fetch(`${updateUserUrl}/${id}`, {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        contact: user.contact,
                        fullName: user.fullName,
                        cvSummary: user.cvSummary,
                        avatar:user.avatar,
                        gitHub: user.gitHub,
                        linkedIn: user.linkedIn,
                        gender: user.gender,
                        language: user.language,
                        selectedJob:{
                            jobTitle: 'Full-stack Developer ',
                            jobId:'',
                        },
                        city: user.city,
                        country: user.country,
                        experience: user.experience,
                        education: user.education,
                    }),
                });

                if (!response.ok) {
                    console.log("Failed to update user data!");
                } else {
                    console.log("User general data updated!");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    useEffect(() => {
        // Simulate loading for 1.5 seconds
        setTimeout(() => {
            setLoading(false); // Set loading to false after 1.5 seconds
        }, 1500);

        if(id){
            const fetchUserDetails = async () => {
                const getUserUrl = process.env.NEXT_PUBLIC_GET_USER_URL;
                const response = await fetch(`${getUserUrl}/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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
        }else{
            const reDirectUrl = process.env.NEXT_PUBLIC_LOGIN_PAGE_URL;
            router.push(`${reDirectUrl}`);
        }
        const handleClickOutside = (event: MouseEvent) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activeTab, id]);

     const logout = async () => {
         try {
             await axios.get('/api/users/logout');
             toast.success('Logout successful');
             router.push('/login');
         } catch (error: any) {
             console.log(error.message);
             toast.error(error.message);
         }
     };

     const togglePopup = () => {
         if(user && user.notifications.length>0){
             setIsOpen(!isOpen);
         }
     };

    return (
        <><Suspense fallback={<div>Loading...</div>}>
            <div className={`${styles.outerContainer} ${styles.pageContainer}`}>
                <div className={styles.innerContainer}>
                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.logoContainer}>
                            <Image src={"/logo.png"} alt="Logo" width={120} height={120} className={styles.logo}
                                   priority/>
                        </div>
                        <nav className={styles.nav}>
                            <ul>
                                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                                <li><a href="/"><Image src={"/user/homeIcon.svg"} alt="homeIcon"
                                                       width={40} height={40} className={styles.navImage}/> Home</a>
                                </li>
                                <li
                                    onClick={() => setActiveTab(0)}
                                    className={activeTab === 0 ? styles.activeLink : ''}
                                ><a href="#"><Image src={"/user/overviewIcon.svg"} alt="OverviewIcon"
                                                    width={40} height={40} className={styles.navImage}/> Overview </a>
                                </li>
                                <li
                                    onClick={() => setActiveTab(1)}
                                    className={activeTab === 1 ? styles.activeLink : ''}
                                ><a href="#"><Image src={"/user/progressIcon.svg"} alt="progressIcon"
                                                    width={40} height={40} className={styles.navImage}/> Progress </a>
                                </li>
                                <li
                                    onClick={() => setActiveTab(2)}
                                    className={activeTab === 2 ? styles.activeLink : ''}
                                ><a href="#"><Image src={"/user/courseIcon.svg"} alt="courseIcon"
                                                    width={50} height={40} className={styles.navImage}/> Courses </a>
                                </li>
                                <li
                                    onClick={() => setActiveTab(3)}
                                    className={activeTab === 3 ? styles.activeLink : ''}
                                ><a href="#"><Image src={"/user/cvIcon.svg"} alt="cvIcon"
                                                    width={30} height={40} className={styles.navImage}/> Resume</a></li>
                                <li
                                    onClick={() => setActiveTab(4)}
                                    className={activeTab === 4 ? styles.activeLink : ''}
                                ><a href="#"><Image src={"/user/mockInterview.svg"} alt="mockInterviewIcon"
                                                    width={30} height={40} className={styles.navImage}/> Mock Interview</a>
                                </li>
                                <li
                                    onClick={() => setActiveTab(5)}
                                    className={activeTab === 5 ? styles.activeLink : ''}
                                ><a href="#"><Image src={"/user/assessments.svg"} alt="assessmentsIcon"
                                                    width={30} height={40} className={styles.navImage}/> Assessments
                                </a>
                                </li>
                                <li
                                    onClick={() => setActiveTab(6)}
                                    className={activeTab === 6 ? styles.activeLink : ''}
                                ><a href="#"><Image src={"/user/Careers.svg"} alt="CareersIcon"
                                                    width={30} height={40} className={styles.navImage}/> Employment </a>
                                </li>
                                <li
                                    onClick={() => setActiveTab(7)}
                                    className={activeTab === 7 ? styles.activeLink : ''}
                                ><a href="#"><Image src={"/user/settingsIcon.svg"} alt="settingsIcon"
                                                    width={30} height={40} className={styles.navImage}/> Settings </a>
                                </li>
                                <li
                                    onClick={logout}
                                    className={activeTab === 8 ? styles.activeLink : ''}
                                ><a href="#"><Image src={"/user/logOut.svg"} alt="logOutIcon"
                                                    width={30} height={40} className={styles.navImage}/> Log Out </a>
                                </li>
                            </ul>
                        </nav>

                    </aside>

                    {/* Main Content */}
                    <main className={styles.mainContent}>
                        <div>
                            {/* Show loading spinner while content is loading */}
                            {loading ? (
                                <div className="d-flex justify-content-center align-items-center"
                                     style={{height: '100vh'}}>
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                // Your main content once loading is done
                                <div>
                                    <header className={styles.header}>
                                        <div className={styles.searchContainer}>
                                            <div className={styles.welcomeMessage}>Welcome, {user?.userName}</div>
                                        </div>
                                        <div className={styles.notificationWrapper} ref={notificationRef}>
                                            <div className={styles.notificationContainer} onClick={togglePopup}>
                                                {user && user.notifications?.length > 0 ? (
                                                    <div>
                                                        <Image
                                                            src={"/user/notificationBellRing.svg"}
                                                            alt="notificationBellRing"
                                                            width={30}
                                                            height={30}
                                                            className={styles.notificationIcon}
                                                        />
                                                        <span className={styles.notificationCount}>
                                                {user?.notifications?.length}
                                            </span>
                                                    </div>
                                                ) : (
                                                    <Image
                                                        src={"/user/notificationBell.svg"}
                                                        alt="notificationBell"
                                                        width={30}
                                                        height={30}
                                                        className={styles.notificationIcon}
                                                    />
                                                )}
                                            </div>

                                            {isOpen && (
                                                <div className={styles.notificationPopup}>
                                                    <ul>
                                                        {user?.notifications.filter(item => item.isSelected).map((notification, index) => (
                                                            <li key={index}>
                                                                {messageIndex === index && showMessage === true ? (
                                                                    <p onClick={() => setShowMessage(false)}>{notification.jobTitle} <br/> {notification.jobType}</p>) : (
                                                                    <p onClick={() => {setMessageIndex(index); setShowMessage(true);}}>{notification.recruiterNote}</p>)}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </header>
                                    <div className={styles.contentWrapper}>
                                        <section className={styles.tabsSection}>
                                            {activeTab === 0 && user && <Overview user={user}/>}
                                            {activeTab === 1 && user && <Progress user={user}/>}
                                            {activeTab === 2 && user && <COURSE/>}
                                            {activeTab === 3 && user && <Resume
                                                user={user} removeEducation={removeEducation}
                                                removeExperience={removeExperience}
                                                updateNestedChanges={updateNestedChanges}/>}
                                            {activeTab === 4 && user && <MockInterview/>}.
                                            {activeTab === 5 && user && <Assessment/>}
                                            {/*{activeTab === 6 && user && <Careers user={user}/>}*/}
                                            {activeTab === 7 && user && <Settings
                                                user={user}
                                                handleSubmit={handleSubmit}
                                                handleChange={handleChange}
                                                handleNestedChange={handleNestedChange}
                                                addEducation={addEducation}
                                                addExperience={addExperience}
                                                handleFields={handleFields}/>}
                                        </section>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </Suspense>
        </>
    );
 }

export default function UserProfilePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserProfile/>
        </Suspense>
    );
}