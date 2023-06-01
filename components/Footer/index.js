import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <Link href="/">
         Guindo 2023  
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
