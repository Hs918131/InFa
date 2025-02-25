
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Invoice Generator</title>
        <meta name="description" content="Create invoices in minutes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logo}>Keiser</div>
        <div className={styles.heroContent}>
          <h1>Create Invoices in <span className={styles.highlight}>minutes</span><br />not in hours.</h1>
          <p className={styles.subtitle}>A Simple Invoice Generator for freelancers and businesses enterprises.<br />Effortlessly create, manage, and store professional invoices.</p>
          
          <div className={styles.buttons}>
            <Link href="/invoice" className={styles.primaryButton}>Get Started</Link>
            <Link href="/invoice" className={styles.secondaryButton}>Try for free</Link>
          </div>

          <div className={styles.imageContainer}>
            <img src="/invoice-preview.png" alt="Invoice Preview" className={styles.previewImage} />
          </div>

          <div className={styles.currencySupport}>
            <p>Multi-Currency Support</p>
            <div className={styles.currencies}>
              <span>$</span>
              <span>€</span>
              <span>£</span>
              <span>¥</span>
            </div>
          </div>
        </div>
        
        <footer className={styles.footer}>
          <div className={styles.logo}>Keiser</div>
          <p>All rights reserved © 2025</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
