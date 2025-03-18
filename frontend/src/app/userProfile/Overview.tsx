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
    gitHub: string;
}

interface SelectedJob{
    jobTitle:string;
    jobId:string;
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
                }


                {/*<div className={styles.userFooter}>go to settings to edit the user profile</div>*/}
            </section>
        </section>
    );
};

export default Overview;