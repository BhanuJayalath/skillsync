import React from 'react';
import MCQTest from './page';

type MCQTestProps = {
  user: {
    _id: string;
    selectedJob: { jobTitle: string; jobId: string };
  };
};

const Assessment: React.FC<MCQTestProps> = ({ user }) => {
//   const userId = user._id;
//   const jobId = user.selectedJob.jobId;

  return <MCQTest user={user}/>;
};

export default Assessment;