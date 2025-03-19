import React from 'react';
import MCQTest from './page';

type MCQTestProps = {
  user: {
    _id: string;
    selectedJob: { jobTitle: string; jobId: string };
  };
};

const Assessment: React.FC<MCQTestProps> = ({ user }) => {;
  return <MCQTest user={user} />;
};

export default Assessment;