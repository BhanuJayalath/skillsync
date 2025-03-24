import styles from "@/app/userProfile/user.module.css";
import React, {useEffect, useState} from "react";

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
    const [points, setPoints] = useState<string[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const totalWidth = 200;
    const minGap = 20;
    // Calculate the gap between each test
    const gap = Math.max(minGap, totalWidth / user.tests.length);
    // Update the points state when the gap changes
    useEffect(() => {
        // Calculate points for each test
        const pointsArray = user.tests.map((test, index) => {
            // Calculate the point for the current test
            return `${20 + index * gap},${test.mark}`;
        });

        // Update the points state
        setPoints(pointsArray);
    }, [gap]);
    return (
        <section className={styles.progress}>
            {/* Display the progress chart */}
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
                        {/* Display the progress line */}
                        <polyline
                            fill="none"
                            stroke="black"
                            strokeWidth="0.5"
                            points={points.join(' ')}
                        />
                        {/* Display the points on the chart */}
                        {user.tests.map((test, index) => (
                                <circle
                                    key={index}
                                    cx={20 + index * gap}
                                    cy={test.mark}
                                    r={2}
                                    fill={hoveredIndex === index ? 'red' : 'blue'}
                                />
                            )
                        )}
                    </g>
                    {/* Display the axis labels */}
                    <text x="-12" y="0" fontSize="7" fill="black">100</text>
                    <text x="-11" y="50" fontSize="7" fill="black">50</text>
                    <text x="-10" y="100" fontSize="7" fill="black">0</text>
                </svg>
            </div>
            {/* Display the test results */}
            <div className={styles.tests}>
                <h4 className={styles.testTitle}>{user?.selectedJob?.jobTitle || ''}</h4>
                <ul className={styles.testsList}>
                    {/* Display the test results */}
                    {user?.tests.map((test, index) => (
                        <li key={index} className={styles.testItem}
                            onMouseEnter={() => setHoveredIndex(index)} // Track hovered item
                            onMouseLeave={() => setHoveredIndex(null)}   // Reset on mouse leave
                        >
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
