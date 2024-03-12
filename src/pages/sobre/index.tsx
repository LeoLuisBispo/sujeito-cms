import { createClient } from "@/prismicio";
import * as prismicR from "@prismicio/richtext";
import * as prismicH from "@prismicio/helpers";

import styles from "./styles.module.scss";

import Head from "next/head";
import Image from "next/image";
import { FaYoutube, FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";

type Content = {
  title: string;
  description: string;
  banner: string;
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
};

interface ContentProps {
  content: Content;
}

const Sobre = ({ content }: ContentProps) => {
  return (
    <>
      <Head>
        <title>Quem somos? | Sujeito Programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <p>{content.description}</p>

            <a href={content.youtube}>
              <FaYoutube size={40} />
            </a>

            <a href={content.instagram}>
              <FaInstagram size={40} />
            </a>

            <a href={content.facebook}>
              <FaFacebook size={40} />
            </a>

            <a href={content.linkedin}>
              <FaLinkedin size={40} />
            </a>
          </section>

          <Image
            width={490}
            height={490}
            src={content.banner}
            alt="Sobre Sujeito Programador"
          />
        </div>
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const prismic = createClient();
  const response = await prismic.getSingle("about");

  const { title, description, banner, facebook, instagram, youtube } =
    response.data;

  const content = {
    title: prismicR.asText(title),
    description: prismicR.asText(description),
    banner: banner.url,
    facebook: facebook,
    instagram: instagram,
    youtube: youtube,
  };

  return {
    props: { content },
    revalidate: 60 * 30, // a cada 30min
  };
};

export default Sobre;
