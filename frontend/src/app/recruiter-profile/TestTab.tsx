import Image from "next/image";
export default function TestTab({ testLevel}: { testLevel: any}) {
  return (
    <>
      <h1>{testLevel}</h1>
      <Image
        alt="tik-icon"
        width={15}
        height={15}
        src="/recruiter/tik-icon.svg"
      />
    </>
  );
}
