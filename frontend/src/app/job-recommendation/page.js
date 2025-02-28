const JobRecommendations = () => {
    // Sample placeholder jobs
    const sampleJobs = [
        { id: 1, title: "Frontend Developer", company: "Google", description: "Build amazing UI components.", link: "#" },
        { id: 2, title: "Backend Engineer", company: "Amazon", description: "Develop scalable APIs.", link: "#" },
        { id: 3, title: "Full Stack Developer", company: "Microsoft", description: "Work on both frontend and backend.", link: "#" },
    ];

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h1>Job Recommendations</h1>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {sampleJobs.map((job) => (
                    <li key={job.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
                        <h2>{job.title}</h2>
                        <p><strong>Company:</strong> {job.company}</p>
                        <p>{job.description}</p>
                        <a href={job.link} style={{ color: "blue", textDecoration: "underline" }}>Apply Now</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobRecommendations;
