import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>Página em desenvolvimento.</Box>
    </Flex>
  );
};

export default Home;
