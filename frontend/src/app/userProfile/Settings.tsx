import styles from "@/app/userProfile/user.module.css";
import Image from "next/image";
import React, {useEffect, useState, useRef} from "react";
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';

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
    cvSummary: string;
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
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, field: string) => void;
    handleNestedChange: (index: number, field: string, value: string, section: "experience" | "education") => void;
    handleSubmit: () => Promise<void>;
    addEducation: (e: React.MouseEvent<HTMLButtonElement>) => void;
    addExperience: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleSummary: (value: string) => void;
    handleAvatar: (value: string) => void;
}

const Settings = ({ user, handleSubmit, handleChange, handleNestedChange, addEducation, addExperience, handleSummary, handleAvatar }: SettingsProps) => {
    const [countries, setCountries] = useState<{ name: string }[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [summary, setSummary] = useState("");
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);

    // Fetch countries and languages
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const countryList = data.map((country: any) => ({
                    name: country.name.common,
                }));

                const languageSet = new Set<string>();
                data.forEach((country: any) => {
                    if (country.languages) {
                        Object.values(country.languages).forEach((lang: any) =>
                            languageSet.add(lang)
                        );
                    }
                });

                setCountries(countryList);
                setLanguages(Array.from(languageSet));
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_CV_DESCRIPTION_API_URL;
        const apiKey = process.env.NEXT_PUBLIC_CV_DESCRIPTION_API_KEY;
        const prompt = `Generate a professional CV summary using only the provided details. 
        Strictly return a JSON object with a brief explanation, comments, or additional text.

        Details:
        ${user.experience.length > 0 ? `Experience: ${user.experience.map(exp => 
            `${exp.jobName} at ${exp.companyName} (${exp.startDate} - ${exp.endDate})`).join('. ')}.` : ''}
        ${user.education.length > 0 ? `Education: ${user.education.map(edu => 
            `${edu.courseName} from ${edu.schoolName} (${edu.startDate} - ${edu.endDate})`).join('. ')}.` : ''}
        ${user.skills.length > 0 ? `Skills: ${user.skills.join(', ')}.` : ''}

        Ensure the summary is concise, professional, and natural. 
        No placeholders or missing information should be mentioned.

        Return only this JSON object with no additional text:
        {
          "summary": "Your generated summary here"
        }`;

        fetch(`${apiUrl}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "deepseek/deepseek-r1-distill-llama-70b:free",
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            })
        })
            .then(response => {
                console.log("Response Status:", response.status);
                return response.json();
            }) // Convert response to JSON
            .then(data => {
                // Extract and log the AI's response
                const summary = data.choices?.[0]?.message?.content.match(/{[\s\S]*}/) || "No response";
                console.log("AI Response:", summary);
                const jsonSummary = summary
                    ? JSON.parse(summary[0])
                    : { summary: "error occurred" };
                const filteredSummary = jsonSummary.summary.replace(/\*\*(.*?)\*\*/g, '$1');
                setSummary(filteredSummary);
                handleSummary(filteredSummary);
            })
            .catch(error => console.error("Error:", error));

    }, []);

    // Fetch cities when a country is selected
    useEffect(() => {
        if (!user.country) return;

        fetch('https://countriesnow.space/api/v0.1/countries/cities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: user.country }),
        })
            .then(response => response.json())
            .then(data => {
                setCities(data.data || []);
            })
            .catch(error => console.error('Error fetching cities:', error));
    }, [user.country]);


    return (
        <section className={styles.userInfo}>
            <div className={styles.userDetails}>
                <div className={styles.profilePic}>
                    {user.avatar ? (
                        <span><Image src={user.avatar} alt="userIcon"
                                     width={100} height={0} className={styles.userAvatar}/></span>
                    ) : (
                        <span><Image src={"/user/userIcon.svg"} alt="userIcon"
                                     width={100} height={0} className={styles.userAvatar}/></span>
                    )}
                </div>

                {/*{blob && (*/}
                {/*    <div>*/}
                {/*        Blob url: <a href={blob.url}>{blob.url}</a>*/}
                {/*        <span><Image src={blob.url} alt="userIcon"*/}
                {/*                     width={100} height={0} className={styles.userAvatar}/></span>*/}
                {/*    </div>*/}
                {/*)}*/}
                <div>
                    <strong>{user.userName}</strong>
                    <p>{user.email}</p>
                </div>
                <button className={styles.editButton} onClick={handleSubmit}>Save</button>
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
                        <option value="">Select Gender</option>
                        <option value={user.gender}>Male</option>
                        <option value={user.gender}>Female</option>
                    </select>
                </div>
                <div>
                    <label>Country</label>
                    <select id="country" onChange={(e) => handleChange(e, "country")}>
                        <option value="">Select Country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Language</label>
                    <select id="language" onChange={(e) => handleChange(e, "language")}>
                        <option value="">Select Language</option>
                        {languages.map((language, index) => (
                            <option key={index} value={user.language}>
                                {language}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>City</label>
                    <select id="city" onChange={(e) => handleChange(e, "city")}>
                        <option value="">Select City</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
            <form className={styles.form2}>
                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label>CV Description</label>
                        <textarea
                            value={summary}
                            onChange={(e) => {
                                setSummary(e.target.value);
                                handleChange(e, "cvSummary");
                            }}
                        />
                    </div>
                </div>
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
                    <button onClick={addExperience}>New</button>
                </div>

                {/* Education Section */}
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
                    <button onClick={addEducation}>New</button>
                </div>
            </form>
        </section>
    );
};

export default Settings;