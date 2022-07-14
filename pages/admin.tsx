import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import styles from "../styles/Home.module.css";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useMutation } from "react-query";
import axios from "axios";

const Home: NextPage = () => {
  const { mutate: removeAll } = useMutation(() =>
    axios.post(`/api/remove-all`)
  );

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
        <Button onClick={() => removeAll()}>remove all messages</Button>
      </main>
    </div>
  );
};

export default Home;
