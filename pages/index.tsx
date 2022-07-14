import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import styles from "../styles/Home.module.css";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Wedding board" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          display: `flex`,
          justifyContent: `center`,
          alignContent: `center`,
          minHeight: `100vh`,
          alignItems: `center`,
          flexDirection: `column`,
          gap: 8 * 2,
        }}
      >
        <NextLink href="/board" passHref>
          <Button leftIcon={<ExternalLinkIcon />} as={"a"}>
            Board
          </Button>
        </NextLink>
        <NextLink href="/send" passHref>
          <Button leftIcon={<ExternalLinkIcon />} as={"a"}>
            Envoi
          </Button>
        </NextLink>
      </main>
    </div>
  );
};

export default Home;
