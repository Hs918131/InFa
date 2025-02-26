import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>InFa: Instant & Fast Invoice</title>
        <meta name="description" content="Create professional invoices in minutes" />
        <link rel="icon" href="/infa.png" />
      </Head>

      <nav className={styles.nav}>
        {/* <div className={styles.logo}>InFa</div> */}
        <Link href="/" className={styles.logo}>InFa</Link>
        <div className={styles.navLinks}>
         
          <Link href="/invoice" className={styles.ctaButton}>Get Started</Link>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.heroSection}>
          <p className={styles.trustBadge}>
            Trusted by 💙 1000+ freelancers
          </p>
          <h1 className={styles.title}>
            Create Instant & Fast Invoice
          </h1>
          <p className={styles.subtitle}>
            Streamline your billing process with our intuitive invoice generator.
            Perfect for freelancers and businesses of all sizes.
          </p>
          
          <div className={styles.ctaGroup}>
            <Link href="/invoice" className={styles.primaryButton}>
              Create Free Invoice
              <span className={styles.buttonIcon}>→</span>
            </Link>
          </div>

          <div className={styles.features}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Lightning Fast</h3>
              <p>Create invoices in under 1 minute</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎨</div>
              <h3>Professional Design</h3>
              <p>Beautiful templates that impress</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3>Works Everywhere</h3>
              <p>Access on any device</p>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
          <Link href="/" className={styles.logo}>InFa</Link>
            <p>Making invoicing simple and fast</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h4>Product</h4>
              <Link href="">Features</Link>
              <Link href="">Templates</Link>
            </div>
            <div className={styles.footerColumn}>
              <h4>Company</h4>
              <Link href="https://www.linkedin.com/in/hs918131/" target="_blank">LinkedIn</Link>
              <Link href="https://x.com/hs918131" target="_blank">Twitter</Link>
              <Link href="https://hs9181.vercel.app" target="_blank">Contact</Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2025 InFa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
