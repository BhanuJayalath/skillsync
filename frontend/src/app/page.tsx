"use client"

import React from "react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./assets/styles/landing.module.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ServiceModal from "./components/ServiceModal"
import { ChevronRight, ArrowRight, Star, CheckCircle, Mail, BarChart2, BookOpen, MessageSquare, Briefcase } from 'lucide-react'

interface Testimonial {
  id: number
  text: string
  name: string
  role: string
  image: string
}

interface Service {
  name: string
  icon: string
  description: string
  color: string
}

const LandingPage = () => {
  const [email, setEmail] = useState("")
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const services: Service[] = [
    {
      name: "Grow Your Skills",
      icon: "https://img.icons8.com/ios/50/persuasion-skills.png",
      description:
        "Enhance your professional capabilities with our curated courses and tests. Our skill development program is designed to keep you updated with the latest industry trends and technologies. Learn at your own pace with expert-led sessions and practical exercises that will help you stand out in today's competitive job market.",
      color: "#e7f1ff",
    },
    {
      name: "Improve Resume",
      icon: "https://img.icons8.com/ios/50/parse-from-clipboard.png",
      description:
        "Transform your resume into a powerful marketing tool with our resume enhancement service. Our experts will help you highlight your strengths, achievements, and skills in a way that catches recruiters' attention. Get personalized feedback, industry-specific tips, and ATS-friendly formatting to ensure your resume passes through automated screening systems.",
      color: "#fff4e6",
    },
    {
      name: "AI-Driven Interviews",
      icon: "https://img.icons8.com/ios/50/interview.png",
      description:
        "Practice makes perfect! Our AI-driven mock interview platform simulates real interview scenarios to help you prepare effectively. Get instant feedback on your responses, body language, and communication skills. Choose from industry-specific questions and difficulty levels to tailor your practice sessions to your needs.",
      color: "#e6f7ff",
    },
  ]

  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "The platform provides a well-rounded approach to skill development, offering AI-driven course suggestions, practice tests, and realistic interview simulations to enhance confidence and preparedness.",
      name: "Inuka Mayakaduwa",
      role: "Software Engineer",
      image: "/feedback/inuka.jpg",
    },
    {
      id: 2,
      text: "SkillSync helps users bridge skill gaps through targeted course recommendations, interactive practice tests, and AI-powered mock interviews, creating a comprehensive learning experience that prepares them for the job market.",
      name: "Sasindri Siriwardene",
      role: "CO-CEO of Mishrawarna",
      image: "/feedback/sasindri.jpg",
    },
    {
      id: 3,
      text: "My experience with SkillSync was great! The AI-driven mock interviews provided useful feedback. It's a helpful tool for skill development, though more customization for resumes would be a nice improvement.",
      name: "Anton Luckshman",
      role: "Undergraduate Student",
      image: "/feedback/anton.png",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const openModal = (serviceName: string) => {
    setActiveModal(serviceName)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription logic here
    alert(`Thank you for subscribing with ${email}!`)
    setEmail("")
  }

  return (
    <div className={styles.container1}>
      <Navbar />

      {/* Hero Section */}
      <section className={`${styles.hero}`}>
        <div className="container">
          <div className="row align-items-center">
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={`display-4 fw-bold mb-4 ${styles.heroTitle}`}>
                Elevate Your <span className={styles.accentText}>Skills</span>
                <br />
                Stay Ahead with
                <br />
                Industry Standards
              </h1>
              <p className="lead mb-4">
                Join thousands of professionals who have transformed their careers with our cutting-edge skill
                development platform.
              </p>
              <div className="d-flex gap-3">
                <motion.a href="login" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button className={`btn ${styles.btnDark} btn-lg px-4 py-2`}>
                    Get Started 
                  </button>
                </motion.a>
                <motion.a
                  href="#services"
                  className={`btn btn-outline-dark btn-lg px-4 py-2 ${styles.btnOutline}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.a>
              </div>
            </motion.div>
            <motion.div
              className="col-lg-6 mt-5 mt-lg-0 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className={styles.heroImageWrapper}>
                <div className={`${styles.bgCircle} ${styles.bgCircleTop}`}></div>
                <Image
                  src="/girl.png"
                  alt="Professional"
                  width={550}
                  height={450}
                  className={`${styles.heroImage} shadow-lg`}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className="row g-4 text-center">
            {[
              { number: "5+", label: "Active Resources" },
              { number: "10+", label: "Courses Available" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="col-6 col-md-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className={`display-5 fw-bold mb-1 ${styles.statNumber}`}>{stat.number}</h2>
                <p className="text-muted mb-0">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.container2}>
        {/* What We Do Section */}
        <section id="services" className="container py-5">
          <div className="text-center mb-5">
            <motion.span
              className={styles.badge}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              WHAT WE DO
            </motion.span>
            <motion.h2
              className="display-5 fw-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              Perfect Solutions to Improve Your Skill-Set
            </motion.h2>
            <motion.p
              className="lead text-muted mx-auto"
              style={{ maxWidth: "700px" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our comprehensive platform offers everything you need to advance your career and stay competitive in
              today's fast-paced job market.
            </motion.p>
          </div>

          <div className="row g-4">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                className="col-md-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`${styles.serviceCard} h-100`}
                  whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={styles.serviceIcon} style={{ backgroundColor: service.color }}>
                    <img src={service.icon || "/placeholder.svg"} alt={service.name} width={30} height={30} />
                  </div>
                  <h3 className="h4 mb-3">{service.name}</h3>
                  <p className="text-muted mb-4">{service.description.substring(0, 120)}...</p>
                  <motion.a
                    href="#"
                    className={`${styles.learnMore} d-inline-flex align-items-center mt-auto`}
                    onClick={(e) => {
                      e.preventDefault()
                      openModal(service.name)
                    }}
                    whileHover={{ x: 5 }}
                  >
                    Learn More <ArrowRight size={16} className="ms-2" />
                  </motion.a>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-5">
          <div className="row align-items-center g-5">
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className={styles.featureVisual}>
              <div className={styles.featureVisualBg}></div>
              <div className={styles.featureGrid}>
              {[
                { icon: BarChart2, label: "Analytics" },
                { icon: BookOpen, label: "Courses" },
                { icon: MessageSquare, label: "Feedback" },
                { icon: Briefcase, label: "Jobs" },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className={styles.featureGridItem}>
                    <div className={styles.featureGridIcon}>
                      <IconComponent size={24} />
                    </div>
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
            </div>

            </motion.div>
            <div className="col-lg-6">
              <motion.span
                className={styles.badge}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                WHY CHOOSE US
              </motion.span>
              <motion.h2
                className="display-5 fw-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                Accelerate Your Career Growth
              </motion.h2>
              <motion.p
                className="lead mb-4 text-muted"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Our platform combines cutting-edge technology with expert guidance to help you achieve your professional
                goals faster.
              </motion.p>

              <div className="mt-4">
                {[
                  "Personalized learning paths based on your goals",
                  "AI-powered feedback on your progress",
                  "Industry-recognized certifications",
                  "Direct connection with top employers",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`d-flex align-items-center mb-3 ${styles.featureItem}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className={styles.featureIcon} />
                    <p className="mb-0">{feature}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className={`btn ${styles.btnDark} btn-lg px-4 py-2 mt-4`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Features
              </motion.button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container py-5">
          <div className="text-center mb-5">
            <motion.span
              className={styles.badge}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              TESTIMONIALS
            </motion.span>
            <motion.h2
              className="display-5 fw-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              What Our Users Say About Us
            </motion.h2>
          </div>

          <div className={styles.testimonialWrapper}>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="position-relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className={styles.testimonialCard}
                    >
                     
                      <p className="lead mb-4">{testimonials[activeTestimonial].text}</p>
                      <div className={styles.testimonialAuthor}>
                        <Image
                          src={testimonials[activeTestimonial].image || "/placeholder.svg"}
                          alt={testimonials[activeTestimonial].name}
                          width={60}
                          height={60}
                          className={styles.avatar}
                        />
                        <div className={styles.testimonialInfo}>
                          <h5 className="mb-0">{testimonials[activeTestimonial].name}</h5>
                          <p className={styles.testimonialRole}>{testimonials[activeTestimonial].role}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className={styles.testimonialDots}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${activeTestimonial === index ? styles.activeDot : ""}`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="container py-5 mb-5">
          <motion.div
            className={styles.subscribeWrapper}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <motion.span
                  className={styles.badge}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  SUBSCRIBE
                </motion.span>
                <motion.h2
                  className="display-5 fw-bold mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Get The Latest News About Us
                </motion.h2>
                <motion.p
                  className="lead text-muted mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Stay updated with new features, courses, and special offers
                </motion.p>

                <form onSubmit={handleSubmit}>
                  <div className="row justify-content-center">
                    <div className="col-md-8">
                      <div className={styles.subscribeInputGroup}>
                        <span className={styles.inputIcon}>
                          <Mail size={20} />
                        </span>
                        <input
                          type="email"
                          className={styles.emailInput}
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <motion.button
                          type="submit"
                          className={`btn ${styles.btnDark} px-4`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Subscribe
                        </motion.button>
                      </div>
                      <p className="small text-muted mt-2">We respect your privacy. Unsubscribe at any time.</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
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

