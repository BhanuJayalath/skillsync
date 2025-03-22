
import styles from "../assets/styles/recruiter.module.css";
export default function ResultTab({ userDetails }: { userDetails: any }) {
  return (
    <>
      {userDetails.avatar ? (
        <img
          className={styles.profileImage}
          alt="profile-icon"
          width={20}
          height={20}
          src={userDetails.avatar}
        />
      ) : (
        <img
          className={styles.profileImage}
          alt="profile-icon"
          src="/recruiter/profile-icon.svg"
        />
      )}

      <h1>{userDetails.userName}</h1>
      <h1>{userDetails.mark} / 100</h1>
    </>
  );
}
