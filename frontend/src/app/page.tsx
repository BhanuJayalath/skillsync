"use client";

import Image from "next/image";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./assets/css/landing.module.css";

interface Testimonial {
  id: number;
  text: string;
  name: string;
}

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "Thank You for your service. I am very pleased with the result. I have seen exponential growth in my business and it's all thanks to your amazing service.",
      name: "Customer 1",
    },
    {
      id: 2,
      text: "Thank You for your service. I am very pleased with the result. I have seen exponential growth in my business and it's all thanks to your amazing service.",
      name: "Customer 2",
    },
    {
      id: 3,
      text: "Thank You for your service. I am very pleased with the result. I have seen exponential growth in my business and it's all thanks to your amazing service.",
      name: "Customer 3",
    },
  ];

  return (
    <div className={styles.container1}>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar px-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <Image
              src="/logo.png"
              alt="SkillSync"
              width={120}
              height={40}
              className="logo"
            />
          </a>
          <div className="d-flex align-items-center">
            <ul className="navbar-nav me-3">
              <li className="nav-item dropdown">
                <a className="nav-link" href="#">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
            <button className="btn btn-outline-primary me-2">Login</button>
            <button className="btn btn-dark">Register</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`${styles.hero} container mt-5`}>
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-4 fw-bold mb-4">
              Increase Your Skills
              <br />
              And Be Updated on
              <br />
              Industry Standards
            </h1>
            <button className="btn btn-dark btn-lg">Get Started</button>
          </div>
          <div className="col-md-6">
            <Image
              src="/HomePageImg.png"
              alt="Professional"
              width={500}
              height={400}
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <div className={`${styles.partners} container3 my-5`}>
        <div className="row justify-content-center align-items-center">
          {["Google", "Trello", "Monday", "LinkedIn", "TopJobs"].map(
            (partner) => (
              <div key={partner} className="col">
                <Image
                  src={`/${partner.toLowerCase()}.jpg`}
                  alt={partner}
                  width={100}
                  height={40}
                  className={styles.partnerLogo}
                />
              </div>
            )
          )}
        </div>
      </div>

      <div className={styles.container2}>
        {/* What We Do Section */}
        <section className="container my-5 whatwedo">
          <h2 className="mb-4">WHAT WE DO</h2>
          <h3 className="h2 mb-5">
            We provide the Perfect Solutions
            <br />
            to Improve Your Skill-Set
          </h3>

          <div className="row">
            {["Grow Your Skills", "Improve Resume", "AI-Driven Interviews"].map(
              (service) => (
                <div key={service} className="col-md-4 mb-4">
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceIcon}></div>
                    <h4>{service}</h4>
                    <a href="#" className={styles.learnMore}>
                      Learn More →
                    </a>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={`${styles.testimonials} container my-5`}>
          <h2>TESTIMONIALS</h2>
          <h3 className="h2 mb-5">
            See What Our Customers
            <br />
            Say About Us
          </h3>

          <div className="row">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="col-md-4 mb-4">
                <div className={styles.testimonialCard}>
                  <p>{testimonial.text}</p>
                  <div className={styles.testimonialAuthor}>
                    <Image
                      src={`/avatar-${testimonial.id}.jpg`}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className={styles.avatar}
                    />
                    <span>{testimonial.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Subscribe Section */}
        <section className={`${styles.subscribe} container my-5 text-center`}>
          <h2>SUBSCRIBE</h2>
          <h3 className="h2 mb-3">
            Subscribe To Get The Latest
            <br />
            News About Us
          </h3>
          <p className="text-muted">
            Please Drop Your Email Below To Get Daily Updates About What We Do
          </p>

          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-dark">Subscribe</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
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
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
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
    </div>
  );
};

export default LandingPage;