import styles from "@/app/userProfile/user.module.css";
import Image from "next/image";
import React from "react";

interface User {
    userName: string;
    avatar: string;
    email: string;
    selectedJob: selectedJob;
    contact: string;
    linkedIn: string;
    gitHub: string;
}

interface selectedJob{
    jobTitle:string;
    jobId:string;
}

const Overview = ({ user }: { user: User }) => {
    return (
        <section className={styles.userInfo}>
            <div className={styles.welcomeMessage}>Welcome, {user.userName}</div>
            <div className={styles.userDetails}>
                <div className={styles.profilePic}>
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
                    <p>{user.email}</p>
                </div>
            </div>
            <div>
                <p>Job Role: {user.selectedJob?.jobTitle}</p>
                <p>Contact: {user.contact}</p>
                <p>LinkedIn: {user.linkedIn}</p>
                <p>Github: {user.gitHub}</p>
            </div>
            <div className={styles.userFooter}>go to settings to edit the user profile</div>
        </section>
    );
};

export default Overview;