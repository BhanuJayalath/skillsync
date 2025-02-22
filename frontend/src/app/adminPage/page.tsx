"use client"
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import styles from './adminPage.module.css';   // Importing custom styles
import Image from 'next/image';     // Importing images
import "bootstrap/dist/css/bootstrap.min.css";  // Importing Bootstrap CSS to styles

export default function page(){
    return(
        <div className={styles.outerContainer}>
            <Navbar/>
            
            <div className={styles.innerContainer}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <Image src={"/logo.png"} alt="Logo" width={200} height={0} />
                    <nav className={styles.nav}>
                        <ul>
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <li><a href="/">🏠 Home</a></li>
                            <li><a href="#">💬 Messages</a></li>
                            <li><a href="#">⭐ Favorites</a></li>
                            <li><a href="#">📈 Analytics</a></li>
                            <li><a href="#">⚙️ Settings</a></li>
                        </ul>
                    </nav>
                </aside>
            </div>

            <Footer/>
        </div>
    );
}