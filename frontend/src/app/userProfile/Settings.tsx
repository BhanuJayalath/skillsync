import styles from "@/app/userProfile/user.module.css";
import Image from "next/image";
import React, {useEffect, useState, useRef} from "react";
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';

interface User {
    fullName: string;
    userName: string;
    contact: string;
    avatar: string;
    gitHub: string;
    linkedIn: string;
    email: string;
    city: string;
    language: string;
    gender: string;
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

interface SettingsProps {
    user: User;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, field: string) => void;
    handleNestedChange: (index: number, field: string, value: string, section: "experience" | "education") => void;
    handleSubmit: () => Promise<void>;
    addEducation: (e: React.MouseEvent<HTMLButtonElement>) => void;
    addExperience: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleFields: (value: string, field:string) => void;
}

const Settings = ({ user, handleSubmit, handleChange, handleNestedChange, addEducation, addExperience, handleFields }: SettingsProps) => {
    const [countries, setCountries] = useState<{ name: string; code: string }[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [summary, setSummary] = useState("");
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);

    // Fetch countries and languages
    useEffect(() => {
        const fetchCountries = async ()=>{
            const countriesUrl = process.env.NEXT_PUBLIC_COUNTRIES_URL;
            fetch(`${countriesUrl}`)
                .then(response => response.json())
                .then(data => {
                    const countryList = data.map((country: any) => ({
                        name: country.name.common,
                        code: country.idd?.root + (country.idd?.suffixes ? country.idd.suffixes[0] : '')
                    }));

                    const languageSet = new Set<string>();
                    data.forEach((country: any) => {
                        if (country.languages) {
                            Object.values(country.languages).forEach((lang: any) =>
                                languageSet.add(lang)
                            );
                        }
                    });
                    console.log(countryList);
                    setCountries(countryList);
                    setLanguages(Array.from(languageSet));
                })
                .catch(error => console.error('Error fetching countries:', error));
        }
        fetchCountries();
        setSummary(user.cvSummary);
    }, []);

    const handleGenerate = async (e:React.FormEvent) =>{
        e.preventDefault();

        const apiUrl = process.env.NEXT_PUBLIC_CV_SUMMARY_API_URL;
        const apiKey = process.env.NEXT_PUBLIC_CV_SUMMARY_API_KEY;
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

        const fetchSummary = async (retries = 3) => {
            try {
                const response = await fetch(`${apiUrl}`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${apiKey}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "model": "deepseek/deepseek-r1-distill-llama-70b:free",
                        "messages": [{ "role": "user", "content": prompt }]
                    })
                });

                console.log("Response Status:", response.status);

                const data = await response.json();
                const summary = data.choices?.[0]?.message?.content.match(/{[\s\S]*}/) || "No response";
                console.log("AI Response:", summary);

                const jsonSummary = summary
                    ? JSON.parse(summary[0])  // Retry happens here if JSON fails
                    : { summary: "Error occurred" };

                const filteredSummary = jsonSummary.summary.replace(/\*\*(.*?)\*\*/g, '$1');
                setSummary(filteredSummary);
                handleFields(filteredSummary, "cvSummary");
            } catch (error) {
                if (error instanceof SyntaxError && retries > 0) {
                    console.warn(`Retrying... Attempts left: ${retries}`);
                    await fetchSummary(retries - 1); // Retry if JSON parsing fails
                } else {
                    console.error("Failed to generate summary:", error);
                    setSummary("An error occurred while generating the CV summary.");
                }
            }
        };

        await fetchSummary();
    }

    // Fetch cities when a country is selected
    useEffect(() => {
        if (!countries) return;
        const citiesUrl = process.env.NEXT_PUBLIC_CITIES_URL;
        const countryName = user.country.split(' (')[0];
        fetch(`${citiesUrl}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: countryName }),
        })
            .then(response => response.json())
            .then(data => {
                setCities(data.data || []);
            })
            .catch(error => console.error('Error fetching cities:', error));
    }, [user.country]);
    const handleUpload = async (e:React.FormEvent) =>{
        e.preventDefault();
        const blobUrl = process.env.NEXT_PUBLIC_BLOB_UPLOAD_PATH;
        if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
        }

        const file = inputFileRef.current.files[0];

        const newBlob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: `${blobUrl}`,
        });
        setBlob(newBlob);
    }
    useEffect(() => {
        handleFields(blob?.url || user.avatar,"avatar");
    }, [blob?.url]);
    console.log(user.avatar);
    return (
        <section className={styles.userSettings}>
            <div className={styles.userDetails}>
                <div className={styles.profileHeader}>
                    <div className={styles.profilePic}>
                        {user.avatar ? (
                            <span><Image src={user.avatar} alt="userIcon"
                                         width={100} height={100} className={styles.profilePic}/></span>
                        ) : (
                            <span><Image src={"/user/userIcon.svg"}
                                         alt="userIcon"
                                         width={100} height={100}
                                         className={styles.profilePic}/></span>
                        )}
                    </div>
                    <div className={styles.uploadContainer}>
                        <input name="file" ref={inputFileRef} type="file" accept="image/*"
                               onChange={(e) => handleUpload(e)}
                               className={styles.hiddenInput}/>
                        <button className={styles.customUploadButton}>Upload</button>
                    </div>
                </div>
                <div>
                    <strong>{user.userName}</strong>
                    <p>{user.email}</p>
                </div>
                <button className={styles.editButton} onClick={handleSubmit}>Save</button>
            </div>
            {/*form section*/}
            <form className={styles.form}>
                <div>
                    <label>Full Name</label>
                    <input type="text" name="fullName" value={user.fullName || ''}
                           onChange={(e) => handleChange(e, "fullName")}
                           placeholder={user.fullName || ''}/>
                </div>
                <div>
                    <label>Contact</label>
                    <input type="text" name="contact" value={user.contact || ''}
                           onChange={(e) => handleChange(e, "contact")}
                           placeholder={user.contact || ''}/>
                </div>
                <div>
                    <label>Github</label>
                    <input type="text" name="gitHub" value={user.gitHub || ''}
                           onChange={(e) => handleChange(e, "gitHub")}
                           placeholder={user.gitHub || ''}/>
                </div>
                <div>
                    <label>LinkedIn</label>
                    <input type="text" name="linkedIn" value={user.linkedIn || ''}
                           onChange={(e) => handleChange(e, "linkedIn")}
                           placeholder={user.linkedIn || ''}/>
                </div>
                <div>
                    <label>Gender</label>
                    <select>
                        <option value="">Select Gender</option>
                        <option value={user.gender || ''}>Male</option>
                        <option value={user.gender || ''}>Female</option>
                    </select>
                </div>
                <div>
                    <label>Country</label>
                    <select id="country" onChange={(e) => handleChange(e, "country")}>
                        <option value="">Select Country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={`${country.name} (${country.code})`}>
                                {country.name} ({country.code})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Language</label>
                    <select id="language" onChange={(e) => handleChange(e, "language")}>
                        <option value="">Select Language</option>
                        {languages.map((language, index) => (
                            <option key={index} value={language}>
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
                        <label>CV Summary</label>
                        <textarea
                            value={summary}
                            onChange={(e) => {
                                setSummary(e.target.value);
                                handleChange(e, "cvSummary");
                            }}
                        />
                        <button onClick={(e) =>handleGenerate(e)}>Generate</button>
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
                                    value={exp.jobName || ''}
                                    onChange={(e) => handleNestedChange(index, "jobName", e.target.value, "experience")}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor={`companyName-${index}`}>Company Name</label>
                                <input
                                    type="text"
                                    id={`companyName-${index}`}
                                    value={exp.companyName || ''}
                                    onChange={(e) => handleNestedChange(index, "companyName", e.target.value, "experience")}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor={`startDate-${index}`}>Start Date</label>
                                <input
                                    type="date" // Use type="date"
                                    id={`startDate-${index}`}
                                    value={exp.startDate || ''}
                                    onChange={(e) => handleNestedChange(index, "startDate", e.target.value, "experience")}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor={`endDate-${index}`}>End Date</label>
                                <input
                                    type="date" // Use type="date"
                                    id={`endDate-${index}`}
                                    value={exp.endDate || ''}
                                    onChange={(e) => handleNestedChange(index, "endDate", e.target.value, "experience")}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor={`description-${index}`}>Description</label>
                                <textarea
                                    id={`description-${index}`}
                                    value={exp.description || ''}
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
                                value={edu.courseName || ''}
                                onChange={(e) => handleNestedChange(index, "courseName", e.target.value, "education")}
                            />
                            <label htmlFor={`schoolName-${index}`}>School Name</label>
                            <input
                                type="text"
                                id={`schoolName-${index}`}
                                value={edu.schoolName || ''}
                                onChange={(e) => handleNestedChange(index, "schoolName", e.target.value, "education")}
                            />
                            <label htmlFor={`startDate-${index}`}>Start Date</label>
                            <input
                                type="date"
                                id={`startDate-${index}`}
                                value={edu.startDate || ''}
                                onChange={(e) => handleNestedChange(index, "startDate", e.target.value, "education")}
                            />
                            <label htmlFor={`endDate-${index}`}>End Date</label>
                            <input
                                type="date"
                                id={`endDate-${index}`}
                                value={edu.endDate || ''}
                                onChange={(e) => handleNestedChange(index, "endDate", e.target.value, "education")}
                            />
                            <label htmlFor={`description-${index}`}>Description</label>
                            <textarea
                                id={`description-${index}`}
                                value={edu.description || ''}
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