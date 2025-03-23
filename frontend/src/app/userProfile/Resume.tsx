import styles from "@/app/userProfile/user.module.css";
import React, { useEffect } from "react";

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
    tests: Tests[];

}

interface Education {
    courseName: string;
    schoolName: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface Tests {
    testId: string;
    mark: string;
}

interface selectedJob {
    jobTitle: string;
    jobId: string;
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
}

const Resume = ({user}: ResumeProps) => {

    // Hide sections if they are empty
    useEffect(() => {
        if (!user) return; // Prevent running if user is not defined

        // Check if all job names and course names are empty
        const allJobNamesAreEmpty = user.experience?.every((job) => job.jobName === "") ?? true;
        const allCourseNamesAreEmpty = user.education?.every((course) => course.courseName === "") ?? true;

        // Get elements
        const educationElement = document.getElementById('educationSection');
        const skillElement = document.getElementById('skillSection');
        const experienceElement = document.getElementById('experienceSection');
        const summaryElement = document.getElementById('summarySection');

        // Hide elements if they are empty
        if (allJobNamesAreEmpty && experienceElement) {
            experienceElement.style.display = 'none';
        }

        if (allCourseNamesAreEmpty && educationElement) {
            educationElement.style.display = 'none';
        }

        if (!user.skills?.length && skillElement) {
            skillElement.style.display = 'none';
        }

        if (!user.cvSummary?.length && summaryElement) {
            summaryElement.style.display = 'none';
        }

    }, [user?.cvSummary?.length, user?.skills?.length, user?.education?.length, user?.experience?.length]);
    return (
        <section className={styles.cvSection} onClick={() => {
            // Print the resume when the section is clicked
            if (typeof window !== "undefined") {
                window.print();
            }
        }}>
            {/* Contact information */}
            <div className={styles.contactInfo}>
                <h1 className={styles.name}>{user.fullName}</h1>
                <p className={styles.jobTitle1}>{user.selectedJob.jobTitle}</p>
                <div className={styles.contactDetails}>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.contact}</p>
                    <p>Location: {user.city}, {user.country?.split(' (')[0]}</p>
                </div>
            </div>
            {/* Summary */}
            <div id="summarySection" className={styles.summary}>
                <h2 className={styles.sectionTitle}>Summary</h2>
                <div className={styles.job}>
                    <p className={styles.jobResponsibilities}>{user.cvSummary}</p>
                </div>
            </div>
            {/* Experience */}
            <div id="experienceSection" className={styles.experience}>
                <h2 className={styles.sectionTitle}>Experience</h2>
                <ul className={styles.jobList}>
                    {user.experience.map((experience, index) => (
                        <li key={index} className={styles.expItem}>
                            <div id={`experience${index}`} className={styles.job}>
                                <h3 className={styles.jobTitle}>{experience.jobName}</h3>
                                <p className={styles.companyName}>{experience.companyName}</p>
                                <p className={styles.jobDates}>{experience.startDate} {experience.endDate && `-${experience.endDate}`}</p>
                                <p className={styles.jobResponsibilities}>{experience.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Education */}
            <div id="educationSection" className={styles.education}>
                <h2 className={styles.sectionTitle}>Education</h2>
                <ul className={styles.educationList}>
                    {user.education.map((education, index) => (
                        <li key={index} className={styles.eduItem}>
                            <div id={`courses${index}`} className={styles.degree}>
                                <h3 className={styles.degreeTitle}>{education.courseName}</h3>
                                <p className={styles.schoolName}>{education.schoolName}</p>
                                <p className={styles.graduationYear}>{education.startDate} {education.endDate && `-${education.endDate}`}</p>
                                <p className={styles.jobResponsibilities}>{education.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Assessments */}
            <div id="assessmentSection" className={styles.assessment}>
                <h2 className={styles.sectionTitle}>Assessments</h2>
                <ul className={styles.assessmentList}>
                    {user.tests.map((test, index) => (
                        <li key={index} className={styles.assessmentItem}>
                            <div id={`assessment${index}`} className={styles.assessment} >
                                <p className={styles.assessmentDetails}>{test.testId}: {test.mark}%</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Skills */}
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
