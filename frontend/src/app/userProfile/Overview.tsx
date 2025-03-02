import styles from "@/app/userProfile/user.module.css";
import Image from "next/image";
import React from "react";

interface User {
    userName: string;
    avatar: string;
    email: string;
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
            <div className={styles.userFooter}>go to settings to edit the user profile</div>
        </section>
    );
};

export default Overview;