import styles from "@/app/userProfile/user.module.css";
import React, {useEffect} from "react";

interface User {
    fullName: string;
    email: string;
    contact: string;
    city: string;
    country: string;
    cvSummary: string;
    selectedJob: selectedJob;
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

interface selectedJob {
    jobTitle: string;
    jobId:string;
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
    updateNestedChanges : (
        index: number,
        section: "experience" | "education"
    ) => void;
}

const Resume = ({user, removeEducation, removeExperience, updateNestedChanges}: ResumeProps) => {
    useEffect(() => {
        if (!user) return; // Prevent running if user is not defined

        const allJobNamesAreEmpty = user.experience?.every((job) => job.jobName === "") ?? true;
        const allCourseNamesAreEmpty = user.education?.every((course) => course.courseName === "") ?? true;

        if (typeof window !== 'undefined') {
            const educationElement = document.getElementById('educationSection');
            const skillElement = document.getElementById('skillSection');
            const experienceElement = document.getElementById('experienceSection');
            const summaryElement = document.getElementById('summarySection');

            user.experience?.forEach((job, index) => {
                if (!job.jobName) {
                    updateNestedChanges(index, "experience");
                }
            });

            if (allJobNamesAreEmpty && experienceElement) {
                experienceElement.style.display = 'none';
            }

            user.education?.forEach((course, index) => {
                if (!course.courseName) {
                    updateNestedChanges(index, "education");
                }
            });

            if (allCourseNamesAreEmpty && educationElement) {
                educationElement.style.display = 'none';
            }

            if (!user.skills?.length && skillElement) {
                skillElement.style.display = 'none';
            }

            if (!user.cvSummary?.length && summaryElement) {
                summaryElement.style.display = 'none';
            }

            console.log(user.experience);
        }
    }, [user?.cvSummary?.length, user?.skills?.length, user?.education?.length, user?.experience?.length]);

    return (
        <section className={styles.cvSection} onClick={() => {
            if (typeof window !== 'undefined') {
                window.print();
            }
        }}>
            <div className={styles.contactInfo}>
                <h1 className={styles.name}>{user.fullName}</h1>
                <p className={styles.jobTitle}>{user.selectedJob.jobTitle}</p>
                <div className={styles.contactDetails}>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.contact}</p>
                    <p>Location: {user.city}, {user.country?.split(' (')[0]}</p>
                </div>
            </div>
            <div id="summarySection" className={styles.experience}>
                <h2 className={styles.sectionTitle}>Summary</h2>
                <div className={styles.job}>
                    <p className={styles.jobResponsibilities}>{user.cvSummary}</p>
                </div>
            </div>
            <div id="experienceSection" className={styles.experience}>
                <h2 className={styles.sectionTitle}>Experience</h2>
                <ul className={styles.jobList}>
                    {user.experience.map((experience, index) => (
                        <li key={index} className={styles.expItem}>
                            <div id={`experience${index}`} className={styles.job}
                                 onClick={() => removeExperience(index)}>
                                <h3 className={styles.jobTitle}>{experience.jobName}</h3>
                                <p className={styles.companyName}>{experience.companyName}</p>
                                <p className={styles.jobDates}>{experience.startDate} {experience.endDate && `-${experience.endDate}`}</p>
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
                            <div id={`courses${index}`} className={styles.degree}
                                 onClick={() => removeEducation(index)}>
                                <h3 className={styles.degreeTitle}>{education.courseName}</h3>
                                <p className={styles.schoolName}>{education.schoolName}</p>
                                <p className={styles.graduationYear}>{education.startDate} {education.endDate && `-${education.endDate}`}</p>
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
        </section>
    );
};

export default Resume;
