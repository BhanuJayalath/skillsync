import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react'
import Link from "next/link"
import styles from './Contact.module.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ContactPage() {
  return (
    <>
    <Navbar />
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Contact Us</h1>
            <p className={styles.subtitle}>
              Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className={styles.contactGrid}>
            {/* Contact Form */}
            <div className={styles.formCard}>
              <form className={styles.form} action="https://formsubmit.co/skillsyncofc@gmail.com" method="POST">
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="first-name" className={styles.label}>First name</label>
                    <input id="first-name" type="text" name="first-name" placeholder="Enter your first name" className={styles.input} />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="last-name" className={styles.label}>Last name</label>
                    <input id="last-name" type="text" name="last-name" placeholder="Enter your last name" className={styles.input} />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <input id="email" type="email" name="email" placeholder="Enter your email" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                  <textarea id="message"name="message" placeholder="Enter your message" className={styles.textarea}></textarea>
                </div>
                <button type="submit" className={styles.submitButton}>Send Message</button>
              </form>
            </div>

            {/* Contact Information */}
            <div className={styles.infoSection}>
              <div className={styles.infoCard}>
                <h2 className={styles.infoTitle}>Get in Touch</h2>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <MapPin className={styles.infoIcon} />
                    <div>
                      <p className={styles.infoLabel}>Our Location</p>
                      <p className={styles.infoText}>CS123, Skillsync, Colombo 4</p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <Phone className={styles.infoIcon} />
                    <div>
                      <p className={styles.infoLabel}>Phone Number</p>
                      <p className={styles.infoText}>+94 11 234 5678</p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <Mail className={styles.infoIcon} />
                    <div>
                      <p className={styles.infoLabel}>Email Address</p>
                      <p className={styles.infoText}>contact@skillsync.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.socialCard}>
                <h2 className={styles.infoTitle}>Follow Us</h2>
                <div className={styles.socialLinks}>
                  <Link href="https://www.facebook.com/share/1699G8Mvin/" className={styles.socialLink}><Facebook /></Link>
                  <Link href="https://www.instagram.com/skillsync_ofc?igsh=cWZ1M2l5aTZwdWVz" className={styles.socialLink}><Instagram /></Link>
                  <Link href="https://www.linkedin.com/company/105059551" className={styles.socialLink}><Linkedin /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
        <Footer />
    </div>
    </>
  )
}
