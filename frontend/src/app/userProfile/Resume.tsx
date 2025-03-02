import styles from "@/app/userProfile/user.module.css";
import React from "react";

interface User {
    fullName: string;
    email: string;
    number: string;
    city: string;
    country: string;
    jobRole: jobRole[];
    skills: string[];
    education: Education[];
    experience: Experience[];
}
interface Education {
    courseName: string;
    schoolName: string;
    startDate: string;
    endDate: string;
    description: string;
}
interface jobRole {
    jobName: string;
}
interface Experience {
    jobName: string;
    companyName: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface ResumeProps {
    user: User;
    removeEducation: (index: number) => void;
    removeExperience: (index: number) => void;
}

const Resume = ({ user, removeEducation, removeExperience }: ResumeProps) => {
    return (
        <section  className={styles.cvSection}>
            <div className={styles.contactInfo}>
                <h1 className={styles.name}>{user.fullName}</h1>
                <p className={styles.jobTitle}>{user.jobRole[0].jobName}</p>
                <div className={styles.contactDetails}>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.number}</p>
                    <p>Location: {user.city}, {user.country}</p>
                </div>
            </div>
            <div id="experienceSection" className={styles.experience}>
                <h2 className={styles.sectionTitle}>Experience</h2>
                <ul className={styles.jobList}>
                    {user.experience.map((experience, index) => (
                        <li key={index} className={styles.expItem}>
                            <div className={styles.job} onClick={() => removeExperience(index)}>
                                <h3 className={styles.jobTitle}>{experience.jobName}</h3>
                                <p className={styles.companyName}>{experience.companyName}</p>
                                <p className={styles.jobDates}>{experience.startDate} - {experience.endDate}</p>
                                <p className={styles.jobResponsibilities}>{experience.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div id="educationSection" className={styles.education}>
                <h2 className={styles.sectionTitle}>Education</h2>
                <ul className={styles.educationList}>
                    {user.education.map((education, index) => (
                        <li key={index} className={styles.eduItem}>
                            <div className={styles.degree} onClick={() => removeEducation(index)}>
                                <h3 className={styles.degreeTitle}>{education.courseName}</h3>
                                <p className={styles.schoolName}>{education.schoolName}</p>
                                <p className={styles.graduationYear}>{education.startDate} - {education.endDate}</p>
                                <p className={styles.jobResponsibilities}>{education.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div id="skillSection" className={styles.skills}>
                <h2 className={styles.sectionTitle}>Skills</h2>
                <ul className={styles.skillList}>
                    {user.skills.map((skill, index) => (
                        <li key={index} className={styles.skill}>{skill}</li>
                    ))}
                </ul>
            </div>
            <button onClick={() => {
                if (typeof window !== 'undefined') {
                    window.print();
                }
            }}>Print Preview / Save as PDF
            </button>
        </section>
    );
};

export default Resume;