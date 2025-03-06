import Link from "next/link"
import Image from "next/image"
import styles from "./About.module.css"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const teamMembers = [
  { name: "Bhanu Jayalath", role: "Full Stack Developer", image: "/team/bhanu.png", linkedin: "https://www.linkedin.com/in/bhanu-jayalath", github: "https://github.com/BhanuJayalath" },
  { name: "Dishika Veruwantha", role: "Full Stack Developer", image: "/team/dishika.png", linkedin: "https://www.linkedin.com/in/dishika-veruwantha", github: "https://github.com/DishikaVeruwantha" },
  { name: "Linuka Arambawela", role: "Full Stack Developer", image: "/team/linuka.png", linkedin: "https://www.linkedin.com/in/linuka-arambawela", github: "https://github.com/LinukaAr" },
  { name: "Dulith Mayakaduwa", role: "Full Stack Developer", image: "/team/dulith.png", linkedin: "https://www.linkedin.com/in/dulith-mayakaduwa", github: "https://github.com/DulithM" },
  { name: "Ashmirah Bandaranaike", role: "Full Stack Developer", image: "/team/ashmira.png", linkedin: "https://www.linkedin.com/in/ashmirah-bandaranaike", github: "https://github.com/Ashmirah" },
  { name: "Pesandu De Alwis", role: "Full Stack Developer", image: "/team/pesadu.png", linkedin: "https://www.linkedin.com/in/pesandu-de-alwis", github: "https://github.com/Pesandu-De-Alwis" },
]

export default function AboutUs() {
  return (
    
    <>
        <Navbar />
        <div className={styles.container1}>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>About SkillSync</h1>
          <p className={styles.subtitle}>An SDGP project for the University of Westminster</p>
        </section>

        <section className={styles.content}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.text}>
            SkillSync aims to bridge the growing skills gap faced by university graduates in Sri Lanka. We're creating a
            comprehensive platform that empowers users to effectively prepare for job interviews by identifying skill
            gaps, enhancing technical and soft skills, and building confidence through personalized learning, community
            support, and AI-driven insights.
          </p>

          <h2 className={styles.sectionTitle}>The Problem We're Solving</h2>
          <p className={styles.text}>
            With 55% of employees worldwide needing significant re-skilling by 2022 (World Economic Forum), there's a
            clear need for practical skills over theoretical knowledge. Our platform addresses this by offering
            personalized study materials, interactive exercises, mock interviews, progress tracking, and expert
            mentorship to build confidence and readiness for job interviews.
          </p>

          <h2 className={styles.sectionTitle}>Our Solution</h2>
          <p className={styles.text}>
            SkillSync offers a range of features including personalized study materials, interactive exercises,
            realistic mock interview scenarios, progress tracking, and expert tips. Our AI mock interview feature
            enables peer-to-peer practice interviews, forums, and discussion groups. We also provide personalized
            performance analytics and recommend adaptive simulations for real-world scenarios.
          </p>

          <h2 className={styles.sectionTitle}>Meet Our Team</h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} className={styles.teamMember}>
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={200}
                  height={200}
                  className={styles.memberImage}
                />
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
                <div className={styles.memberLinks}>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <img src="https://img.icons8.com/ios-glyphs/25/linkedin.png" alt="LinkedIn" />
                    </a>
                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                      <img src="https://img.icons8.com/ios-glyphs/25/github.png" alt="GitHub" />
                    </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer/>
      </div>
    </>
  )
}

