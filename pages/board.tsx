import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useMessages } from "../lib/web/board/useMessages";
import { Grid } from "../lib/web/board/Grid";
import dynamic from 'next/dynamic'

const GridNoSSr = dynamic(
  () => import('../lib/web/board/Grid'),
  { ssr: false }
)

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GridNoSSr />
    </>
  );
};

export default Home;