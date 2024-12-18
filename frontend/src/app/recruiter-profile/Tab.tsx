import Image from "next/image";
export default function Tab() {
  return (
    <>
      <Image
        alt="profile-icon"
        width={20}
        height={20}
        src="/recruiter/profile-icon.svg"
      />

      <h1>User </h1>
      <Image
        alt="tik-icon"
        width={15}
        height={15}
        src="/recruiter/tik-icon.svg"
      />
    </>
  );
}
