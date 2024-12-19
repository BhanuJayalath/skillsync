import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import styles from "../assets/styles/landing.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer} mt-5 py-5`}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Image src="/logo.png" alt="SkillSync" width={120} height={40} />
            <p className="mt-3">
              We provide the Perfect Solutions
              <br />
              to Improve Your Skill-Set
            </p>
            <div className={styles.socialIcons}>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter}  />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram}  />
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#">Services</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Address</h5>
            <p>
              CS123,
              <br />
              SkillSync,
              <br />
              Colombo 4.
            </p>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>©Copyright Design SkillSync 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;