import styles from "@/app/userProfile/user.module.css";
import Image from "next/image";
import React from "react";

interface User {
    courses: Courses[];
}
interface Courses {
    code: string;
    name: string;
    result: string;
    mark: string;
}

const Courses = ({ user }: { user: User }) => {
    return (
        <section id="tab-2" className={styles.courses}>
            <ul className={styles.courseList}>
                {user.courses.map((course, index) => (
                    <li key={index} className={styles.courseItem}>
                        <div className={styles.courseCard}>
                            <Image src={"/user/courses.png"}
                                   alt="course1"
                                   width={100}
                                   height={100}/>{course.code} <br/> {course.name}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Courses;