// import UserProfilePage from "../userProfile/[id]/page";
import { useEffect, useState } from "react";
import axios from "axios";
import Progress from "../userProfile/Progress";
interface UserDetails {
  selectedJob: {
    jobTitle: string;
    jobId: string;
  };
  tests: {
    testId: string;
    testLevel: string;
    mark: string;
    xAxis: string;
  }[];
}

export default function UserProfile({ userId }: { userId: string }) {
  const [userDetails, setUserDetails] = useState<UserDetails | undefined>(
    undefined
  );
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_GET_USER_DETAILS}`, {
        headers: {
          "user-id": userId,
        },
      })
      .then((response) => {
        // console.log(response.data.user.tests);
        setUserDetails(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {userDetails ? (
        <Progress
          user={{
            selectedJob: userDetails.selectedJob,
            tests: userDetails.tests,
          }}
        />
      ) : null}
    </>
  );
}
