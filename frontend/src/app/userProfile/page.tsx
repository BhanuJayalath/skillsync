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
        cvSummary: "",
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
    const handleSummary = (
        value: string
    ) => {
        setUser((prev) => ({
            ...prev,
            cvSummary: value
        }));
    };
    const handleAvatar = async (
        value: string
    ) => {
        setUser((prev) => ({
            ...prev,
            avatar: value
        }));
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

    // Change handler for skills array
    // const handleSkillsChange = (index: number, value: string) => {
    //     setUser((prev) => {
    //         const updatedSkills = [...prev.skills];
    //         updatedSkills[index] = value;
    //         return { ...prev, skills: updatedSkills };
    //     });
    // };
    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3001/updateUser/${user.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: user.email,
                    number: user.number,
                    userName: user.userName,
                    fullName: user.fullName,
                    avatar:user.avatar,
                    gitHub: user.gitHub,
                    linkedIn: user.linkedIn,
                    gender: user.gender,
                    language: user.language,
                    city: user.city,
                    country: user.country,
                    experience: user.experience,
                    education: user.education,
                    skills: user.skills,
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
        const fetchUserDetails = async () => {
            const getUserUrl = process.env.NEXT_PUBLIC_GET_USER_URL;
            const response = await fetch(`${getUserUrl}`, {
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
                        <section className={styles.tabsSection}>
                            {activeTab === 0 && <Overview user={user} />}
                            {activeTab === 1 && <Progress user={user} />}
                            {activeTab === 2 && <Courses user={user} />}
                            {activeTab === 3 && <Resume user={user}  removeEducation={removeEducation} removeExperience={removeExperience}/>}
                            {activeTab === 4 && <Settings user={user} handleSubmit={handleSubmit} handleChange={handleChange} handleNestedChange={handleNestedChange} addEducation={addEducation} addExperience={addExperience} handleSummary={handleSummary} handleAvatar={handleAvatar}/>}
                        </section>
                    </div>
                </main>
            </div>
            {/*Footer component*/
            }
            <Footer/>
        </div>
    );
};