import React, { useState } from "react";
import styles from "./styles.module.scss";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";

import { createClient } from "@/prismicio";
import { GetStaticProps } from "next";
import * as prismicR from "@prismicio/richtext";

type Post = {
  slug: string;
  title: string;
  cover: string | null | undefined;
  description: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
  page: string;
  totalPages: string;
}

const Posts = ({ posts: postsBlog, page, totalPages }: PostsProps) => {
  const [posts, setPosts] = useState(postsBlog || []);
  const [currentPage, setCurrentPage] = useState(Number(page));

  const reqPost = async (pageNumber: number) => {
    const prismic = createClient();

    const response = await prismic.getByType("post", {
      orderings: [
        {
          field: "document.last_publication_date",
          direction: "desc",
        },
      ],
      fetch: ["post.title", "post.description", "post.cover", "post.uid"],
      pageSize: 3,
      page: pageNumber,
    });

    return response;
  };

  const navigatePage = async (pageNumber: number) => {
    const response = await reqPost(pageNumber);

    const getPosts = response.results.map((post) => {
      return {
        slug: post.uid,
        title: prismicR.asText(post.data.title),
        description: prismicR.asText(post.data.description),
        cover: post.data.cover.url,
        updatedAt: new Date(post.last_publication_date).toLocaleDateString(
          "pt-BR",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        ),
      };
    });

    setCurrentPage(pageNumber);
    setPosts(getPosts);
  };

  return (
    <>
      <Head>
        <title>Blog | sujeito programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <Image
                width={720}
                height={410}
                src={String(post.cover)}
                alt={post.title}
                quality={100}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0vQgAAWEBGHsgcxcAAAAASUVORK5CYII="
                className={styles.postsImg}
              />

              <strong>{post.title}</strong>
              <time>{post.updatedAt}</time>
              <p>{post.description}</p>
            </Link>
          ))}

          <div className={styles.buttonNavigate}>
            {Number(currentPage) >= 2 && (
              <div>
                <button onClick={() => navigatePage(1)}>
                  <FiChevronsLeft size={25} color="#fff" />
                </button>
                <button onClick={() => navigatePage(Number(currentPage) - 1)}>
                  <FiChevronLeft size={25} color="#fff" />
                </button>
              </div>
            )}

            {Number(currentPage) < Number(totalPages) && (
              <div>
                <button onClick={() => navigatePage(Number(currentPage) + 1)}>
                  <FiChevronRight size={25} color="#fff" />
                </button>
                <button onClick={() => navigatePage(Number(totalPages))}>
                  <FiChevronsRight size={25} color="#fff" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const prismic = createClient();

  const response = await prismic.getByType("post", {
    orderings: [
      {
        field: "document.last_publication_date",
        direction: "desc",
      },
    ],
    fetch: ["post.title", "post.description", "post.cover", "post.uid"],
    pageSize: 3,
  });

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: prismicR.asText(post.data.title),
      description: prismicR.asText(post.data.description),
      cover: post.data.cover.url,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: { posts, page: response.page, totalPages: response.total_pages },
    revalidate: 60 * 30, // a cada 30min
  };
};
