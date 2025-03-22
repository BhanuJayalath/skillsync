import Image from "next/image";
export default function Tab({jobTitle}:{jobTitle:string}) {
  return (
    <>
      <h1>{jobTitle}</h1>
      <Image
        alt="tik-icon"
        width={15}
        height={15}
        src="/recruiter/tik-icon.svg"
      />
    </>
  );
}
