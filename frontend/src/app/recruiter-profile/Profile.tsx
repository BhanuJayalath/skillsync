import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [update, setUpdate] = useState(false);
  const [recruiterId, setRecruiterId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState(
    "WSO2 is a leading open-source technology company that provides enterprise-grade solutions for API management, integration, and identity and access management (IAM). Its flagship products, such as WSO2 API Manager and WSO2 Identity Server, enable businesses to build, deploy, and secure digital services efficiently. With a strong focus on cloud-native and microservices architectures, WSO2 helps organizations streamline their digital transformation by offering scalable and customizable platforms. It supports various industry standards and offers both on-premise and cloud deployment options, making it a preferred choice for enterprises seeking robust and flexible integration solutions."
  );
  const [services, setServices] = useState(
    "FullStack Development / Mobile development"
  );
  const companyInfo = {
    _id: recruiterId,
    email: email,
    company: companyName,
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_GET_RECRUITER_DETAILS}`)
      .then((response) => {
        setRecruiterId(response.data.recruiter._id);
        setCompanyName(response.data.recruiter.company);
        setEmail(response.data.recruiter.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {}, [companyName, email, description, services]);

  function updateRecruiterInfo() {
    axios.patch(
      `${process.env.NEXT_PUBLIC_UPDATE_RECRUITER_INFO}`,
      companyInfo,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    setUpdate(!update);
  }
  return (
    <section id={styles.companyProfile}>
      {update ? (
        <header>
          <h1>Update Your Company Info</h1>
          <button onClick={updateRecruiterInfo}>
            <Image
              alt="update-icon2"
              width={20}
              height={20}
              src="/recruiter/update-icon2.svg"
            />
            Save Company Info
          </button>
        </header>
      ) : (
        <header>
          <button
            onClick={() => {
              setUpdate(!update);
            }}
          >
            <Image
              alt="update-icon2"
              width={20}
              height={20}
              src="/recruiter/update-icon2.svg"
            />
            Update Company Info
          </button>
        </header>
      )}
      {update ? (
        <div id={styles.updateProfileCard}>
          <form id={styles.profileForm}>
            <div>
              <label>Company</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              ></input>
            </div>
            <div id={styles.companyProfileAbout}>
              <label>About Your Company</label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                rows={4}
                cols={50}
                id={styles.companyProfileAbout}
              ></textarea>
            </div>
            <div>
              <label>Company Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label>Services</label>
              <input
                type="text"
                value={services}
                onChange={(e) => {
                  setServices(e.target.value);
                }}
              ></input>
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
