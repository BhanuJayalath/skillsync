import Image from "next/image";
export default function ResultTab({ userDetails }: { userDetails: any }) {
  return (
    <>
      <Image
        alt="profile-icon"
        width={20}
        height={20}
        src="/recruiter/profile-icon.svg"
      />

      <h1>User - {userDetails.userId} </h1>
      <h1>{userDetails.testResult} / 100</h1>
    </>
  );
}
