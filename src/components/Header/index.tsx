import React from "react";
import Image from "next/image";
import logo from "../../../public/images/logo.svg";

import styles from "./styles.module.scss";
import Link from "next/link";
import ActiveLink from "../ActiveLink";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <ActiveLink href={"/"} activeClassName={styles.active}>
          <Image src={logo} alt="sujeito-programador" />
        </ActiveLink>

        <nav>
          <ActiveLink href={"/"} activeClassName={styles.active}>
            <p>Home</p>
          </ActiveLink>
          <ActiveLink href={"/posts"} activeClassName={styles.active}>
            <p>Conteudo</p>
          </ActiveLink>
          <ActiveLink href={"/sobre"} activeClassName={styles.active}>
            <p>Quem somos?</p>
          </ActiveLink>
        </nav>

        <Link
          className={styles.readyButton}
          type="button"
          href={"https://www.instagram.com/"}
        >
          COMECAR
        </Link>
      </div>
    </header>
  );
};

export default Header;
