import styles from "@/app/userProfile/user.module.css";
import Image from "next/image";
import React, {useState} from "react";

interface User {
    userName: string;
    avatar: string;
    email: string;
    selectedJob: SelectedJob;
    contact: string;
    linkedIn: string;
    portfolio:string;
    education: Education[];
    experience: Experience[];
    gitHub: string;
}

interface SelectedJob{
    jobTitle:string;
    jobId:string;
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
const Overview = ({ user }: { user: User }) => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <section className={styles.overviewContainer} >
            <nav className={styles.overviewNavBar}>
                <ul>
                    <li
                        onClick={() => setActiveTab(0)}
                        className={activeTab === 0 ? styles.activeLink : ''}
                    > Profile
                    </li>
                    <li
                        onClick={() => setActiveTab(1)}
                        className={activeTab === 1 ? styles.activeLink : ''}
                    > Details
                    </li>
                    <li
                        onClick={() => setActiveTab(2)}
                        className={activeTab === 2 ? styles.activeLink : ''}
                    > Skills
                    </li>
                </ul>
            </nav>
            <section className={styles.overviewUserContainer}>
                <div className={styles.userProfile}>
                    <div className={styles.profilePicContainer}>
                        {user.avatar ? (
                            <span><Image src={user.avatar} alt="userIcon"
                                         width={100} height={100} className={styles.userAvatar}/></span>
                        ) : (
                            <span><Image src={"/user/userIcon.svg"} alt="userIcon"
                                         width={100} height={100} className={styles.userAvatar}/></span>
                        )}
                    </div>
                    <div>
                        <strong>{user.userName}</strong>
                        <p>{user.selectedJob?.jobTitle}</p>
                    </div>
                </div>
                {activeTab === 0 && <div className={styles.userDetails}>
                    <p><Image src={"/user/email.svg"} alt="email"
                              className={styles.overviewIcons}
                              width={20} height={20}/>{user.email}</p>
                    <p><Image src={"/user/phone.svg"} alt="phone"
                              className={styles.overviewIcons}
                              width={20} height={20}/>{user.contact}</p>
                    <p><Image src={"/user/linkedin.svg"} alt="linkedin"
                              className={styles.overviewIcons}
                              width={20} height={20}/>{user.linkedIn}</p>
                    <p><Image src={"/user/github.svg"} alt="github"
                              className={styles.overviewIcons}
                              width={20} height={20}/>{user.gitHub}</p>
                </div>}
                {activeTab === 1 && <div className={styles.userDetails}>
                </div>}
                {activeTab === 2 && <div className={styles.userDetails}>
                    <p><Image src={"/user/email.svg"} alt="email"
                              className={styles.overviewIcons}
                              width={20} height={20}/>{user.email}</p>
                </div>}
            </section>
        </section>
    );
};

export default Overview;