import Image from "next/image";
export default function ResultTab({ userDetails }: { userDetails: any }) {
  return (
    <>
      {userDetails.avatar ? (
        <Image
          alt="profile-icon"
          width={20}
          height={20}
          src={userDetails.avatar}
        />
      ) : (
        <Image
          alt="profile-icon"
          width={20}
          height={20}
          src="/recruiter/profile-icon.svg"
        />
      )}

      <h1>{userDetails.userName} </h1>
      <h1>{userDetails.mark} / 100</h1>
    </>
  );
}
