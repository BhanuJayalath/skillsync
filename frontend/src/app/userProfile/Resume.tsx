import styles from "@/app/userProfile/user.module.css";

import React from "react";

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
            <div id="assessmentSection" className={styles.assessment}>
                <h2 className={styles.sectionTitle}>Assessments</h2>
                <ul className={styles.assessmentList}>
                    {user.tests.map((test, index) => (
                        <li key={index} className={styles.assessmentItem}>
                            <div id={`assessment${index}`} className={styles.degree}>
                                <p className={styles.assessmentDetails}>{test.testId}: {test.mark}%</p>
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
