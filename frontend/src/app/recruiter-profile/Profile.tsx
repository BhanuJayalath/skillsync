import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";
import { useState } from "react";

export default function Profile() {
  const [update, setUpdate] = useState(false);
  const [companyName, setCompanyName] = useState("WS02");
  const [email, setEmail] = useState("company@gmail.com");
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  );
  const [services, SetServices] = useState(
    "FullStack Development / Mobile development"
  );
  return (
    <section id={styles.companyProfile}>
      <button
        onClick={() => {
          setUpdate(!update);
        }}
      >
        <Image
          alt="menu-icon"
          width={23}
          height={23}
          src="/recruiter/menu.svg"
        />
      </button>
      {update ? (
        <div id={styles.updateProfileCard}>
          <header>Update Your Company Info</header>
          <form id={styles.profileForm}>
            <div>
              <label>Company</label>
              <input type="text"></input>
            </div>
            <div>
              <label>About Your Company</label>
              <input type="text"></input>
            </div>
            <div>
              <label>Company Email</label>
              <input type="text"></input>
            </div>
            <div>
              <label>Services</label>
              <input type="text"></input>
            </div>
          </form>
        </div>
      ) : (
        <div id={styles.profileCard}>
          <h1>{companyName}</h1>
          <h2>{description}</h2>
          <h3>Email - {email}</h3>
          <h4>Services - {services}</h4>
        </div>
      )}
    </section>
  );
}
