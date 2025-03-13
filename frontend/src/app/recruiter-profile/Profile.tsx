import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";
import { useState } from "react";

export default function Profile() {
  const [update, setUpdate] = useState(false);
  const [companyName, setCompanyName] = useState("WS02");
  const [email, setEmail] = useState("company@gmail.com");
  const [description, setDescription] = useState(
    "WSO2 is a leading open-source technology company that provides enterprise-grade solutions for API management, integration, and identity and access management (IAM). Its flagship products, such as WSO2 API Manager and WSO2 Identity Server, enable businesses to build, deploy, and secure digital services efficiently. With a strong focus on cloud-native and microservices architectures, WSO2 helps organizations streamline their digital transformation by offering scalable and customizable platforms. It supports various industry standards and offers both on-premise and cloud deployment options, making it a preferred choice for enterprises seeking robust and flexible integration solutions."
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
          <h3>{email}</h3>
          <h4>{services}</h4>
        </div>
      )}
    </section>
  );
}
