import Image from "next/image";
export default function TestTab({ testId,index }: { testId: any,index:any }) {
  return (
    <>
      <Image
        alt="profile-icon"
        width={20}
        height={20}
        src="/recruiter/profile-icon.svg"
      />

      <h1> Test {index} - {testId}</h1>
      <Image
        alt="tik-icon"
        width={15}
        height={15}
        src="/recruiter/tik-icon.svg"
      />
    </>
  );
}
