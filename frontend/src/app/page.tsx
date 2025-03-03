"use client"

import Image from "next/image"
import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./assets/styles/landing.module.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ServiceModal from "./components/ServiceModal"

interface Testimonial {
  id: number
  text: string
  name: string
}

interface Service {
  name: string
  icon: string
  description: string
}

const LandingPage = () => {
  const [email, setEmail] = useState("")
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const services: Service[] = [
    {
      name: "Grow Your Skills",
      icon: "https://img.icons8.com/ios/50/persuasion-skills.png",
      description:
        "Enhance your professional capabilities with our curated courses and tests. Our skill development program is designed to keep you updated with the latest industry trends and technologies. Learn at your own pace with expert-led sessions and practical exercises that will help you stand out in today's competitive job market.",
    },
    {
      name: "Improve Resume",
      icon: "https://img.icons8.com/ios/50/parse-from-clipboard.png",
      description:
        "Transform your resume into a powerful marketing tool with our resume enhancement service. Our experts will help you highlight your strengths, achievements, and skills in a way that catches recruiters' attention. Get personalized feedback, industry-specific tips, and ATS-friendly formatting to ensure your resume passes through automated screening systems.",
    },
    {
      name: "AI-Driven Interviews",
      icon: "https://img.icons8.com/ios/50/interview.png",
      description:
        "Practice makes perfect! Our AI-driven mock interview platform simulates real interview scenarios to help you prepare effectively. Get instant feedback on your responses, body language, and communication skills. Choose from industry-specific questions and difficulty levels to tailor your practice sessions to your needs.",
    },
  ]

  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "Thank You for your service. I am very pleased with the result. I have seen exponential growth in my business and it's all thanks to your amazing service.",
      name: "User",
    },
    {
      id: 2,
      text: "Thank You for your service. I am very pleased with the result. I have seen exponential growth in my business and it's all thanks to your amazing service.",
      name: "User",
    },
    {
      id: 3,
      text: "Thank You for your service. I am very pleased with the result. I have seen exponential growth in my business and it's all thanks to your amazing service.",
      name: "User",
    },
  ]

  const openModal = (serviceName: string) => {
    setActiveModal(serviceName)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  return (
    <div className={styles.container1}>
      <Navbar />

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
            <Image src="/girl.png" alt="Professional" width={500} height={400} className={styles.heroImage} />
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className={styles.partners}>
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            {["Google", "Trello", "Monday", "LinkedIn", "TopJobs"].map((partner) => (
              <div key={partner} className="col-6 col-md-2 text-center mb-3">
                <Image
                  src={`/${partner.toLowerCase()}.jpg`}
                  alt={partner}
                  width={100}
                  height={40}
                  className={styles.partnerLogo}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}

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
            {services.map((service) => (
              <div key={service.name} className="col-md-4 mb-4">
                <div className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>
                    <img src={service.icon || "/placeholder.svg"} alt={service.name} width={50} height={50} />
                  </div>
                  <h4>{service.name}</h4>
                  <a
                    href="#"
                    className={styles.learnMore}
                    onClick={(e) => {
                      e.preventDefault()
                      openModal(service.name)
                    }}
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            ))}
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
                      src="https://img.icons8.com/dotty/80/user.png"
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
          <p className="text-muted">Please Drop Your Email Below To Get Daily Updates About What We Do</p>

          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className={`${styles.subscribeInputGroup} input-group mb-3`}>
                  <input
                    type="email"
                    className={`${styles.emailInput} form-control`}
                    placeholder="Enter Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button className="btn btn-dark">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Service Modals */}
      {services.map((service) => (
        <ServiceModal
          key={service.name}
          isOpen={activeModal === service.name}
          onClose={closeModal}
          title={service.name}
          description={service.description}
          icon={service.icon}
        />
      ))}

      <Footer />
    </div>
  )
}

export default LandingPage

