import styles from "../assets/styles/recruiter.module.css";
import Image from "next/image";
export default function Notification({ notification }: { notification: any }) {
  return (
    <section className={styles.Notification}>
      {notification.status ? (
        <Image
          alt="wrong-icon"
          width={20}
          height={20}
          src="/recruiter/wrong-icon.svg"
        />
      ) : (
        <Image
          alt="tik-icon"
          width={20}
          height={20}
          src="/recruiter/tik-icon.svg"
        />
      )}
      <h1>{notification.message}</h1>
    </section>
  );
}
