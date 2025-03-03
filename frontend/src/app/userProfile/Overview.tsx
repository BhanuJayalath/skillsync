import styles from "@/app/userProfile/user.module.css";
import Image from "next/image";
import React from "react";

interface User {
    userName: string;
    avatar: string;
    email: string;
    jobRole: JobRole[];
    number: string;
    linkedIn: string;
    gitHub: string;
}

interface JobRole{
    jobName:string;
}

const Overview = ({ user }: { user: User }) => {
    return (
        <section className={styles.userInfo}>
            <div className={styles.welcomeMessage}>Welcome, {user.userName}</div>
            <div className={styles.userDetails}>
                <div className={styles.profilePic}>
                    {user.avatar ? (
                        <span className={styles.userAvatar}>{user.avatar}</span>
                    ) : (
                        <span><Image src={"/user/userIcon.svg"} alt="userIcon"
                                     width={100} height={0} className={styles.userAvatar}/></span>
                    )}
                </div>
                <div>
                    <strong>{user.userName}</strong>
                    <p>{user.email}</p>
                </div>
                <button className={styles.editButton}>Edit</button>
            </div>
            <div>
                <p>Job Role: {user.jobRole[0].jobName}</p>
                <p>Contact: {user.number}</p>
                <p>LinkedIn: {user.linkedIn}</p>
                <p>Github: {user.gitHub}</p>
            </div>
            <div className={styles.userFooter}>go to settings to edit the user profile</div>
        </section>
    );
};

export default Overview;