import React, { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Logo from "../../assets/Logo.svg";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useIsMounted } from "../../hooks/useIsMounted";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Header = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <header className={styles.header}>
      {/* <CircularProgress color="inherit" /> */}
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src={Logo} alt="Gu Indo" />
          </Link>
        </div>
        <nav className={showNav ? styles.show : ""}>
          <CloseIcon
            className={styles.close}
            onClick={() => setShowNav(!showNav)}
          />

          <Link href="/">
            <p>Home</p>
          </Link>

          <Link href="/#faq">
            <p>FAQ</p>
          </Link>

          <Link href="/checkout">
            <IconButton
              aria-label="add to shopping cart"
              size="large"
              className={styles["cart-icon"]}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </Link>

          
        </nav>
        <div className={styles["nav-mobile"]}>
          <MenuIcon
            className={styles.hamburger}
            onClick={() => setShowNav(!showNav)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
