import styles from "@/app/userProfile/user.module.css";
import Image from "next/image";
import React from "react";

interface User {
    fullName: string;
    userName: string;
    avatar: string;
    gitHub: string;
    linkedIn: string;
    email: string;
    number: string;
    city: string;
    language: string;
    gender: string;
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

interface SettingsProps {
    user: User;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
    handleNestedChange: (index: number, field: string, value: string, section: "experience" | "education") => void;
    handleSubmit: () => Promise<void>;
}

const Settings = ({ user, handleSubmit, handleChange, handleNestedChange }: SettingsProps) => {
    return (
        <section className={styles.userInfo}>
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
                <button className={styles.editButton} onClick={handleSubmit}>Edit</button>
            </div>
            {/*form section*/}
            <form className={styles.form}>
                <div>
                    <label>User Name</label>
                    <input type="text" name="fullName" value={user.fullName}
                           onChange={(e) => handleChange(e, "fullName")}
                           placeholder={user.fullName}/>
                </div>
                <div>
                    <label>Full Name</label>
                    <input type="text" name="userName" value={user.userName}
                           onChange={(e) => handleChange(e, "userName")}
                           placeholder={user.userName}/>
                </div>
                <div>
                    <label>Github</label>
                    <input type="text" name="gitHub" value={user.gitHub}
                           onChange={(e) => handleChange(e, "gitHub")}
                           placeholder={user.gitHub}/>
                </div>
                <div>
                    <label>LinkedIn</label>
                    <input type="text" name="linkedIn" value={user.linkedIn}
                           onChange={(e) => handleChange(e, "linkedIn")}
                           placeholder={user.linkedIn}/>
                </div>
                <div>
                    <label>Gender</label>
                    <select>
                        <option>Male</option>
                        <option>Female</option>
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
            <form className={styles.form2}>
                <div className={styles.formSection}>
                    <h3>Experience</h3>
                    {user.experience.map((exp, index) => (
                        <div key={index} className={styles.formGroup}>
                            <div className={styles.formGroup}>
                                <label htmlFor={`jobName-${index}`}>Job Title</label>
                                <input
                                    type="text"
                                    id={`jobName-${index}`}
                                    value={exp.jobName}
                                    onChange={(e) => handleNestedChange(index, "jobName", e.target.value, "experience")}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor={`companyName-${index}`}>Company Name</label>
                                <input
                                    type="text"
                                    id={`companyName-${index}`}
                                    value={exp.companyName}
                                    onChange={(e) => handleNestedChange(index, "companyName", e.target.value, "experience")}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor={`startDate-${index}`}>Start Date</label>
                                <input
                                    type="date" // Use type="date"
                                    id={`startDate-${index}`}
                                    value={exp.startDate}
                                    onChange={(e) => handleNestedChange(index, "startDate", e.target.value, "experience")}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor={`endDate-${index}`}>End Date</label>
                                <input
                                    type="date" // Use type="date"
                                    id={`endDate-${index}`}
                                    value={exp.endDate}
                                    onChange={(e) => handleNestedChange(index, "endDate", e.target.value, "experience")}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor={`description-${index}`}>Description</label>
                                <textarea
                                    id={`description-${index}`}
                                    value={exp.description}
                                    onChange={(e) => handleNestedChange(index, "description", e.target.value, "experience")}
                                />
                            </div>
                        </div>
                    ))}
                    <button>Save</button>
                </div>

                {/* Education Section - Similar Structure */}
                <div className={styles.formSection}>
                    <h3>Education</h3>
                    {user.education.map((edu, index) => (
                        <div key={index} className={styles.formGroup}>
                            {/* Input fields with appropriate labels and IDs */}
                            <label htmlFor={`courseName-${index}`}>Course Name</label>
                            <input
                                type="text"
                                id={`courseName-${index}`}
                                value={edu.courseName}
                                onChange={(e) => handleNestedChange(index, "courseName", e.target.value, "education")}
                            />
                            <label htmlFor={`schoolName-${index}`}>School Name</label>
                            <input
                                type="text"
                                id={`schoolName-${index}`}
                                value={edu.schoolName}
                                onChange={(e) => handleNestedChange(index, "schoolName", e.target.value, "education")}
                            />
                            <label htmlFor={`startDate-${index}`}>Start Date</label>
                            <input
                                type="date"
                                id={`startDate-${index}`}
                                value={edu.startDate}
                                onChange={(e) => handleNestedChange(index, "startDate", e.target.value, "education")}
                            />
                            <label htmlFor={`endDate-${index}`}>End Date</label>
                            <input
                                type="date"
                                id={`endDate-${index}`}
                                value={edu.endDate}
                                onChange={(e) => handleNestedChange(index, "endDate", e.target.value, "education")}
                            />
                            <label htmlFor={`description-${index}`}>Description</label>
                            <textarea
                                id={`description-${index}`}
                                value={edu.description}
                                onChange={(e) => handleNestedChange(index, "description", e.target.value, "education")}
                            />
                        </div>
                    ))}
                    <button>Save</button>
                </div>
                {/* Skills Section */}
                {/*<div className={styles.formSection}>*/}
                {/*    <h3>Skills</h3>*/}
                {/*    {user.skills.map((skill, index) => (*/}
                {/*        <div key={index} className={styles.formGroup}>*/}
                {/*            <label htmlFor={`skill-${index}`}>Skill {index + 1}</label>*/}
                {/*            <input*/}
                {/*                type="text"*/}
                {/*                id={`skill-${index}`}*/}
                {/*                value={skill}*/}
                {/*                onChange={(e) => handleSkillsChange(index, e.target.value)}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}
            </form>
        </section>
    );
};

export default Settings;