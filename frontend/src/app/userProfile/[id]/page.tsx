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
import JobRecommendations from '@/app/recommended-jobs/page';

interface SelectedJob {
    jobTitle: string;
    jobId:string;
}
interface Tests {
    testId: string;
    testLevel: string;
    mark: string;
}
interface Experience {
    jobName: string;
    companyName: string;
    startDate: string;
    endDate: string;
    description: string;
}
interface Education {
    courseName: string;
    schoolName: string;
    startDate: string;
    endDate: string;
    description: string;
}
interface Notification {
    jobId:string;
    jobTitle:string;
    jobType:string;
    companyName:string;
    companyEmail:string;
    recruiterNote:string;
    isSelected:boolean;
    approved:boolean;
}
interface User {
    _id: string;
    email: string;
    contact: string;
    userName: string;
    gitHub: string;
    portfolio: string;
    linkedIn: string;
    fullName: string;
    cvSummary: string;
    avatar: string;
    gender: string;
    language: string;
    city: string;
    country: string;
    tests: Tests[];
    selectedJob: SelectedJob;
    experience: Experience[];
    education: Education[];
    notifications: Notification[];
    skills: string[];

}
 function UserProfile() {
     const { id } = useParams();
     const router = useRouter();
     //Adding a useState for the active section
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
     const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
    const [messageIndex, setMessageIndex] = useState<number | null>(null);
    const [showMessage, setShowMessage] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    // Initializing profile state with default user details
     const [user, setUser] = useState<User | null>(null);
     const [isCollapsed, setIsCollapsed] = useState(false);
     const filteredNotifications = user?.notifications.filter(item =>
         item.isSelected && !item.approved) ?? [];

     useEffect(() => {

         if (typeof window !== 'undefined') {
             // Function to check screen width
             const handleResize = () => {
                 const menuElement = document.getElementById(`menuButton`);
                 if(window?.innerWidth <= 919){
                     setIsCollapsed(true);
                     if (menuElement) {
                         menuElement.style.display = 'none';
                     }
                 }else{
                     setIsCollapsed(false);
                     if (menuElement) {
                         menuElement.style.display = 'flex';
                     }
                 }
             };

             // Run check on mount
             handleResize();

             // Add resize listener
             window.addEventListener('resize', handleResize);

             // Clean up listener on unmount
             return () => window.removeEventListener('resize', handleResize);
         }
     }, [activeTab,window.innerWidth]);


     const toggleSidebar = () => {
         setIsCollapsed(!isCollapsed);
     };
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
    // Change handler
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, field: string
    ) => {
        setUser((prev) => prev? {
            ...prev,
            [field]: e.target.value
        } : null);
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
                        notifications: user.notifications,
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
         if(user && filteredNotifications.length>0){
             setIsOpen(!isOpen);
         }
     };

     const toggleNavIcon = () => {
         if( window.innerWidth <= 919){
             setIsCollapsed(true);
         }
     };

     const handleMouseMove = (e: React.MouseEvent, text: string) => {
         if (isCollapsed && window?.innerWidth >= 919){
             setTooltip({
                 text,
                 x: e.clientX + 10, // Slight offset for better visibility
                 y: e.clientY + 10,
             });
         }
     };

     const handleMouseLeave = () => setTooltip(null);


     const handleApprove = (index:number) => {
         if(user){
                user.notifications[index].approved = true;
                setUser({...user});
                 handleSubmit();
         }
         const filteredNotifications = user?.notifications.filter(item =>
             item.isSelected && !item.approved) ?? [];
         if(filteredNotifications.length == 0){
             setIsOpen(false);
         }
     };

    return (
        <><Suspense fallback={<div>Loading...</div>}>
            <div className={`${styles.outerContainer} ${styles.pageContainer}`}>
                <div className={styles.innerContainer}>
                    {/* Tooltip */}
                    {tooltip && (
                        <div
                            className="absolute bg-blue-600 text-white text-sm px-2 py-1 rounded shadow-md z-[9999]"
                            style={{
                                top: `${tooltip.y}px`,
                                left: `${tooltip.x}px`,
                                pointerEvents: 'none', // Prevents tooltip from interfering with hover
                            }}
                        >
                            {tooltip.text}
                        </div>
                    )}

                    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
                        <div className={`${styles.logoContainer} ${isCollapsed ? styles.collapsed : ''}`}>
                            <Image id={"menuButton"} src="/user/navMenu.svg"
                                   alt="navMenuIcon" width={30} height={30}
                                   onClick={toggleSidebar} className={`${styles.menuButton} ${isCollapsed ? styles.collapsed : ''}`}/>
                            {!isCollapsed && <Image src="/logo.png" alt="Logo" width={isCollapsed ? 50 : 120}
                                                    height={isCollapsed ? 50 : 120} className={styles.logo} priority/>}
                        </div>
                        <nav className={styles.nav}>
                            <ul>
                                <li
                                    onMouseMove={(e) => handleMouseMove(e, 'Home')}
                                    onMouseLeave={handleMouseLeave}>
                                    <a href="/">
                                <div className={styles.navTab}>
                                        <Image src="/user/homeIcon.svg" alt="homeIcon" width={40} height={40}
                                               className={styles.navImage}/> {!isCollapsed && 'Home'}
                                    </div>
                                </a></li>
                                <li onClick={() => {setActiveTab(0); toggleNavIcon();}}
                                    onMouseMove={(e) => handleMouseMove(e, 'Overview')}
                                    onMouseLeave={handleMouseLeave}
                                    className={activeTab === 0 ? styles.activeLink : ''}>
                                    <div className={styles.navTab}>
                                        <Image src="/user/overviewIcon.svg"
                                               alt="OverviewIcon" width={40} height={40}
                                               className={styles.navImage}/> {!isCollapsed && 'Overview'}
                                    </div>
                                </li>
                                <li onClick={() => {setActiveTab(1); toggleNavIcon();}}
                                    onMouseMove={(e) => handleMouseMove(e, 'Progress')}
                                    onMouseLeave={handleMouseLeave}
                                    className={activeTab === 1 ? styles.activeLink : ''}>
                                    <div className={styles.navTab}>
                                        <Image src="/user/progressIcon.svg"
                                               alt="progressIcon" width={40} height={40}
                                               className={styles.navImage}/> {!isCollapsed && 'Progress'}
                                    </div>
                                </li>
                                <li onClick={() => { setActiveTab(2); toggleNavIcon();}}
                                    onMouseMove={(e) => handleMouseMove(e, 'Courses')}
                                    onMouseLeave={handleMouseLeave}
                                    className={activeTab === 2 ? styles.activeLink : ''}>
                                    <div className={styles.navTab}>
                                        <Image src="/user/courseIcon.svg" alt="courseIcon"
                                               width={50} height={40}
                                               className={styles.navImage}/> {!isCollapsed && 'Courses'}
                                    </div>
                                </li>
                                <li onClick={() => { setActiveTab(3); toggleNavIcon();}}
                                    onMouseMove={(e) => handleMouseMove(e, 'Resume')}
                                    onMouseLeave={handleMouseLeave}
                                    className={activeTab === 3 ? styles.activeLink : ''}>
                                    <div className={styles.navTab}>
                                        <Image src="/user/cvIcon.svg" alt="cvIcon" width={30}
                                               height={40}
                                               className={styles.navImage}/> {!isCollapsed && 'Resume'}
                                    </div>
                                </li>
                                <li onClick={() => { setActiveTab(4); toggleNavIcon();}}
                                    onMouseMove={(e) => handleMouseMove(e, 'Interview')}
                                    onMouseLeave={handleMouseLeave}
                                    className={activeTab === 4 ? styles.activeLink : ''}>
                                    <div className={styles.navTab}>
                                        <Image src="/user/mockInterview.svg"
                                               alt="mockInterviewIcon" width={30} height={40}
                                               className={styles.navImage}/> {!isCollapsed && 'Mock Interview'}
                                    </div>
                                </li>
                                <li onClick={() => { setActiveTab(5); toggleNavIcon();}}
                                    onMouseMove={(e) => handleMouseMove(e, 'Assessments')}
                                    onMouseLeave={handleMouseLeave}
                                    className={activeTab === 5 ? styles.activeLink : ''}>
                                    <div className={styles.navTab}>
                                        <Image src="/user/assessments.svg"
                                               alt="assessmentsIcon" width={30} height={40}
                                               className={styles.navImage}/> {!isCollapsed && 'Assessments'}
                                    </div>
                                </li>
                                <li onClick={() => { setActiveTab(6); toggleNavIcon();}}
                                    onMouseMove={(e) => handleMouseMove(e, 'Employment')}
                                    onMouseLeave={handleMouseLeave}
                                    className={activeTab === 6 ? styles.activeLink : ''}>
                                    <div className={styles.navTab}>
                                        <Image src="/user/Careers.svg" alt="CareersIcon"
                                               width={30} height={40}
                                               className={styles.navImage}/> {!isCollapsed && 'Employment'}
                                    </div>
                                </li>
                                <li onClick={() => { setActiveTab(7); toggleNavIcon();}}
                                    onMouseMove={(e) => handleMouseMove(e, 'Settings')}
                                    onMouseLeave={handleMouseLeave}
                                    className={activeTab === 7 ? styles.activeLink : ''}>
                                    <div className={styles.navTab}>
                                        <Image src="/user/settingsIcon.svg"
                                               alt="settingsIcon" width={30} height={40}
                                               className={styles.navImage}/> {!isCollapsed && 'Settings'}
                                    </div>
                                </li>
                                <li onClick={logout} className={activeTab === 8 ? styles.activeLink : ''}
                                    onMouseMove={(e) => handleMouseMove(e, 'Log Out')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className={styles.navTab}>
                                        <Image src="/user/logOut.svg" alt="logOutIcon"
                                               width={30} height={40}
                                               className={styles.navImage}/> {!isCollapsed && 'Log Out'}
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
                        <div>
                            {/* Show loading spinner while content is loading */}
                            {loading ? (
                                <div className="d-flex justify-content-center align-items-center"
                                     style={{height: '100vh'}}>
                                    <div className="spinner-border text-primary" role="status">
                                    </div>
                                </div>
                            ) : (
                                // Your main content once loading is done
                                <div>
                                    <header className={`${styles.header} ${isCollapsed ? styles.collapsed : ''}`}>
                                        { isCollapsed && <div className={styles.logoContainer}>
                                            <Image src="/user/navMenu.svg"
                                                   alt="navMenuIcon" width={30} height={30}
                                                   onClick={toggleSidebar}
                                                   className={`${styles.headerMenuButton} ${isCollapsed ? styles.collapsed : ''}`}/>
                                            <Image src="/logo.png" alt="Logo" width={120}
                                                   height={120} className={`${styles.logo} ${isCollapsed ? styles.collapsed : ''}`} priority/>
                                        </div>}
                                        {/*{ isCollapsed && <Image src="/user/navMenu.svg"*/}
                                        {/*                        alt="navMenuIcon" width={30} height={30}*/}
                                        {/*                        onClick={toggleSidebar} */}
                                        {/*                        className={`${styles.menuButton} ${isCollapsed ? styles.collapsed : ''}`}/>}*/}
                                        {/*{ isCollapsed && <Image src="/logo.png" alt="Logo" width={120}*/}
                                        {/*                        height={120} className={styles.logo} priority/>}*/}
                                        {/*<div className={styles.searchContainer}>*/}
                                        {/*    <div className={styles.welcomeMessage}>Welcome, {user?.userName}</div>*/}
                                        {/*</div>*/}
                                        <div className={`${styles.notificationWrapper} ${isCollapsed ? styles.collapsed : ''}`} ref={notificationRef}>
                                            <div className={styles.notificationContainer} onClick={togglePopup}>
                                                {filteredNotifications.length > 0 ? (
                                                    <div>
                                                        <Image
                                                            src={"/user/notificationBellRing.svg"}
                                                            alt="notificationBellRing"
                                                            width={30}
                                                            height={30}
                                                            className={styles.notificationIcon}
                                                        />
                                                        <span className={styles.notificationCount}>
                                                {filteredNotifications.length}
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
                                                <div id={"notificationContent"} className={styles.notificationPopup}>
                                                    <ul>
                                                        {user?.notifications.filter(item => item.isSelected && !item.approved).map((notification, index) => (
                                                            <li key={index}>
                                                                {messageIndex === index && showMessage === true ? (
                                                                    <p onClick={() => setShowMessage(false)}>{notification.jobTitle}
                                                                        <br/> {notification.jobType}
                                                                        <br/> {notification.companyName}
                                                                        <br/> {notification.companyEmail}</p>) : (
                                                                    <p onClick={() => {
                                                                        setMessageIndex(index);
                                                                        setShowMessage(true);
                                                                    }}>{notification.recruiterNote}</p>)}
                                                                <button onClick={() => handleApprove(index)}>Approve
                                                                </button>
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
                                                user={user}
                                                // removeEducation={removeEducation}
                                                // removeExperience={removeExperience}
                                                // updateNestedChanges={updateNestedChanges}
                                            />}
                                            {activeTab === 4 && user && <MockInterview/>}
                                            {activeTab === 5 && user && <Assessment/>}
                                            {activeTab === 6 && user && <JobRecommendations/>}
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