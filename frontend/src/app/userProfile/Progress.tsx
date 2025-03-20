import styles from "@/app/userProfile/user.module.css";
import React, {useEffect, useState, useRef} from "react";

interface User {
    selectedJob: selectedJob;
    tests: tests[];
}
interface selectedJob {
    jobTitle: string;
    jobId:string;
}
interface tests {
    testId: string;
    testLevel: string;
    mark: string;
}

const Progress = ({ user }: { user: User }) => {
    return (
        <section className={styles.progress}>
            <h4>Dashboard Progress</h4>
            <div className={styles.chart}>
                <svg viewBox="-15 -10 300 125">
                    <g transform="scale(1, -1) translate(0, -100)">
                        <polyline
                            fill="none"
                            stroke="black"
                            strokeWidth="0.4"
                            points="0,100 0,0 275,0"
                        />
                        <polyline
                            fill="none"
                            stroke="black"
                            strokeWidth="0.4"
                            points="-3,95 0,100 3,95"
                        />
                        <polyline
                            fill="none"
                            stroke="black"
                            strokeWidth="0.4"
                            points="270,-3 275,0 270,3"
                        />

                    </g>
                    <text x="-12" y="0" fontSize="7" fill="black">100</text>
                    <text x="-11" y="50" fontSize="7" fill="black">50</text>
                    <text x="-10" y="100" fontSize="7" fill="black">0</text>
                </svg>
            </div>
            <div className={styles.tests}>
                <h4 className={styles.testTitle}>{user.selectedJob.jobTitle}</h4>
                <ul className={styles.testsList}>
                    {user.tests.map((test, index) => (
                        <li key={index} className={styles.testItem}>
                            <span className={styles.testCode}>{test.testId}:</span>
                            <span className={styles.testName}> {test.testLevel} </span>
                            <span className={styles.testResult}> {test.mark}%</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Progress;
