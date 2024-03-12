import React from "react";

import styles from "../styles/home.module.scss";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import techsImage from "../../public/images/techs.svg";
import { createClient } from "../prismicio";
import { GetStaticProps } from "next";
import * as prismicR from "@prismicio/richtext";

type Content = {
  title: string;
  titleContent: string;
  linkAction: string;
  mobileTitle: string;
  mobileContent: string;
  mobileBanner: string;
  webTitle: string;
  webContent: string;
  webBanner: string;
};

interface ContentProps {
  content: Content;
}

const Home = ({ content }: ContentProps) => {
  return (
    <>
      <Head>
        <title>Sujeito Programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1 className={styles.titleContent}>{content.title}</h1>
            <span className={styles.subtitleContent}>
              {content.titleContent}
            </span>
            <Link href={content.linkAction}>
              <button>COMEÇAR AGORA!</button>
            </Link>
          </section>

          <Image
            width={650}
            height={650}
            src="/images/banner-conteudos.png"
            alt="Conteúdos Sujeito Programador"
            className={styles.imgContent}
          />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <section>
            <h2 className={styles.titleSection}>{content.mobileTitle}</h2>
            <span className={styles.subtitleContent}>
              {content.mobileContent}
            </span>
          </section>

          <Image
            width={550}
            height={550}
            src={content.mobileBanner}
            alt="Conteúdos desenvolvimento de apps"
            className={styles.imgContent}
          />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <Image
            width={550}
            height={550}
            src={content.webBanner}
            alt="Conteúdos desenvolvimento de aplicacoes web"
            className={styles.imgContent}
          />

          <section>
            <h2 className={styles.titleSection}>{content.webTitle}</h2>
            <span className={styles.subtitleContent}>{content.webContent}</span>
          </section>
        </div>

        <div className={styles.nextLevelContent}>
          <Image src={techsImage} alt="tecnologias" />
          <h2 className={styles.titleSection}>
            Mais de <span className={styles.alunos}>15 mil</span> ja levaram sua
            carreira ao proximo nivel
          </h2>
          <span className={styles.subtitleContent}>
            E voce vai perder a chance de evoluir de uma vez por todas?
          </span>
          <Link type="button" href={"/"}>
            <button>ACESSAR TURMA</button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createClient();

  const response = await prismic.getSingle("home");

  const {
    title,
    subtitle,
    link_action,
    mobile,
    mobile_content,
    mobile_banner,
    title_web,
    web_content,
    web_banner,
  } = response.data;

  const content = {
    title: prismicR.asText(title),
    titleContent: prismicR.asText(subtitle),
    linkAction: link_action,
    mobileTitle: prismicR.asText(mobile),
    mobileContent: prismicR.asText(mobile_content),
    mobileBanner: mobile_banner.url,
    webTitle: prismicR.asText(title_web),
    webContent: prismicR.asText(web_content),
    webBanner: web_banner.url,
  };
  return {
    props: { content },
    revalidate: 60 * 2, //a cada 2 minutos
  };
};
