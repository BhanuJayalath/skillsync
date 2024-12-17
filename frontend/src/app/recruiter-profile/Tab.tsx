import Image from "next/image";
export default function Tab() {
  return (
    <>
      <Image
        alt="profile-icon"
        width={30}
        height={30}
        src="/profile-icon.svg"
      />

      <h1>User </h1>
      <Image alt="tik-icon" width={20} height={20} src="/tik-icon.svg" />
    </>
  );
}
