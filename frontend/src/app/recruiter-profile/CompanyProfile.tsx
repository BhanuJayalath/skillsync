import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CompanyProfile({
  recruiterDetails,
  setNotification,
}: {
  recruiterDetails: any;
  setNotification: any;
}) {
  const [update, setUpdate] = useState(false);
  const [recruiterId, setRecruiterId] = useState();
  const [companyName, setCompanyName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [services, setServices] = useState<string>();
  const companyInfo = {
    email: email,
    company: companyName,
    description: description,
    services: services,
  };

  useEffect(() => {
    setRecruiterId(recruiterDetails._id);
    setCompanyName(recruiterDetails.company);
    setEmail(recruiterDetails.email);
    setDescription(recruiterDetails.description);
    setServices(recruiterDetails.services);
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
    setNotification({
      show: true,
      message: "Company Profile Updated Sucessfully",
      status: false,
    });
    setUpdate(!update);
  }
  return (
    <section id={styles.companyProfile}>
      {update ? (
        <header>
          <h1>Update Your Company Info</h1>
          <button onClick={updateRecruiterInfo}>
            <Image
              alt="save-icon"
              width={20}
              height={20}
              src="/recruiter/save-icon.svg"
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
          {companyName ? <h1>{companyName}</h1> : null}
          {description ? <h2>{description}</h2> : null}
          {email ? <h3>{email}</h3> : null}
          {services ? <h4>{services}</h4> : null}
        </div>
      )}
    </section>
  );
}
