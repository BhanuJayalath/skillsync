"use client"; // Indicating as a client-side component

import Image from 'next/image';     // Importing images
import Footer from "@/app/components/Footer";   // Importing Footer component
import { useParams, useRouter  } from 'next/navigation';
import React, {Suspense, useEffect, useState} from 'react';   // Importing useState hook from React for state management
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


 function UserProfile() {
     const { id } = useParams();
     const router = useRouter();
    //Adding a useState for the active section
    const [activeTab, setActiveTab] = useState(0);
    // Initializing profile state with default user details
    const [user, setUser] = useState({
        email: "Name@gmail.com",   // User's email address
        contact: '(+94)12 345 6789', // number
        userName: "UserName",  // User's display name
        gitHub: "github",
        linkedIn: "linkedin",
        fullName: "Drake Winston", // User's full name
        cvSummary: "",
        avatar: "",  //profile picture
        gender: "Gender",  // User's gender
        language: "Language",     //language
        city: 'City',    //city
        country: "Country", //country
        tests: [
            {testId: '250106', testLevel: 'Basic', mark: '58'},
            {testId: '250107', testLevel: 'Generated', mark: '86'},
            {testId: '250108', testLevel: 'Interview', mark: '46'}
        ],
        selectedJob: {
            jobTitle: 'Job Role ',
            jobId:'',
        },
        experience: [
            {
                jobName: 'Full-stack developer1',
                companyName: 'codeLabs',
                startDate: '',
                endDate: '',
                description: ''
            },
        ],
        education: [
            {
                courseName: 'Bsc(hons) Computer Science',
                schoolName: 'University of westminster',
                startDate: '',
                endDate: '',
                description: ''
            },
        ],
        skills: ['typeScript', 'javaScript', 'HTML']
    });

    // Education Handlers
    const addEducation = (
        e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setUser(prevState => ({
            ...prevState,
            education: [...prevState.education, { courseName: '', schoolName: '', startDate: '', endDate: '', description: '' }]
        }));
    };
    // Experience Handlers
    const addExperience = (
        e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setUser(prevState => ({
            ...prevState,
            experience: [...prevState.experience, { jobName: '', companyName: '', startDate: '', endDate: '', description: '' }]
        }));
    };
    const removeEducation = (index: number) => {
        const updatedEducation = [...user.education];
        updatedEducation.splice(index, 1);

        setUser(prevState => ({
            ...prevState,
            education: updatedEducation
        }));
    };
    const removeExperience = (index: number) => {
        const updatedExperience = [...user.experience];
        updatedExperience.splice(index, 1);

        setUser(prevState => ({
            ...prevState,
            experience: updatedExperience
        }));
    };
    // Change handler
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, field: string
    ) => {
        setUser((prev) => ({
            ...prev,
            [field]: e.target.value
        }));
    };
    const updateNestedChanges = (
        index: number,
        section: "experience" | "education"
    ) => {
        setUser((prev) => {
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
        setUser((prev) => {
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
        setUser((prev) => ({
            ...prev,
            [section]: prev[section].map((item, i) =>
                i === index ? {...item, [field]: value} : item
            ),
        }));
    };
    const handleSubmit = async () => {
        const updateUserUrl = process.env.NEXT_PUBLIC_UPDATE_USER_URL;
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
    useEffect(() => {
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

    return (
        <><Suspense fallback={<div>Loading...</div>}>
            <div className={`${styles.outerContainer} ${styles.pageContainer}`}>
                <div className={styles.innerContainer}>
                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.logoContainer}>
                            <Image src={"/logo.png"} alt="Logo" width={150} height={150} className={styles.logo} priority/>
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
                                                    width={40} height={40} className={styles.navImage}/> Overview</a>
                                </li>
                                <li
                                    onClick={() => setActiveTab(1)}
                                    className={activeTab === 1 ? styles.activeLink : ''}
                                ><a href="#"><Image src={"/user/progressIcon.svg"} alt="progressIcon"
                                                    width={40} height={40} className={styles.navImage}/> Progress</a>
                                </li>
                                <li
                                    onClick={() => setActiveTab(2)}
                                    className={activeTab === 2 ? styles.activeLink : ''}
                                ><a href="#"><Image src={"/user/courseIcon.svg"} alt="courseIcon"
                                                    width={50} height={40} className={styles.navImage}/> Courses</a>
                                </li>
                                <li
                                    onClick={() => setActiveTab(3)}
                                    className={activeTab === 3 ? styles.activeLink : ''}
                                ><a href="#"><Image src={"/user/cvIcon.svg"} alt="cvIcon"
                                                    width={30} height={40} className={styles.navImage}/> Resume</a></li>
                                <li
                                    onClick={() => setActiveTab(4)}
                                    className={activeTab === 4 ? styles.activeLink : ''}
                                ><a href="#"><Image src={"/user/mockInterview.svg"} alt="mockInterview"
                                                    width={30} height={40} className={styles.navImage}/> Mock Interview</a>
                                </li>
                                <li
                                    onClick={() => setActiveTab(5)}
                                    className={activeTab === 5 ? styles.activeLink : ''}
                                ><a href="#"><Image src={"/user/settingsIcon.svg"} alt="settingsIcon"
                                                    width={30} height={40} className={styles.navImage}/> Settings</a>
                                </li>
                                <li
                                    onClick={logout}
                                    className={activeTab === 6 ? styles.activeLink : ''}
                                ><a href="#"><Image src={"/user/logOut.svg"} alt="logOut"
                                                    width={30} height={40} className={styles.navImage}/> Log Out </a>
                                </li>
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
                                {activeTab === 0 && <Overview user={user}/>}
                                {activeTab === 1 && <Progress user={user}/>}
                                {/*{activeTab === 2 && <Courses user={user}/>}*/}
                                {activeTab === 2 && <COURSE/>}
                                {activeTab === 3 && <Resume
                                    user={user} removeEducation={removeEducation}
                                    removeExperience={removeExperience}
                                    updateNestedChanges={updateNestedChanges}/>}
                                {activeTab === 4 && <MockInterview/>}
                                {activeTab === 5 && <Settings
                                    user={user}
                                    handleSubmit={handleSubmit}
                                    handleChange={handleChange}
                                    handleNestedChange={handleNestedChange}
                                    addEducation={addEducation}
                                    addExperience={addExperience}
                                    handleFields={handleFields}/>}
                            </section>
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
            <UserProfile />
        </Suspense>
    );
}