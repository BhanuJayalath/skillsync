import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile({
  recruiterDetails,
}: {
  recruiterDetails: any;
}) {
  const [update, setUpdate] = useState(false);
  const [recruiterId, setRecruiterId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState(
    "Micro Web Global is a leading software development company based in Sri Lanka, specializing in delivering innovative and customized digital solutions to clients across various industries. With a strong focus on cutting-edge technologies, they offer a wide range of services, including web and mobile app development, software integration, and cloud solutions. Their dedicated team of experts ensures high-quality products and services tailored to meet each client's unique business needs. Micro Web Global is committed to driving digital transformation and helping businesses succeed in an ever-evolving technological landscape."
  );
  const [services, setServices] = useState(
    "FullStack Development / Mobile development"
  );
  const companyInfo = {
    email: email,
    company: companyName,
  };

  useEffect(() => {
    setRecruiterId(recruiterDetails._id);
    setCompanyName(recruiterDetails.company);
    setEmail(recruiterDetails.email);
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
