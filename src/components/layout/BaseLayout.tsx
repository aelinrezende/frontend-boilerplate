import { Box } from "@chakra-ui/react";
import Head from "next/head";

interface PageProps {
  tabTitle: string;
}

export const BaseLayout: React.FC<PageProps> = ({ tabTitle }) => (
  <>
    <Head>
      <title>{tabTitle}</title>
    </Head>
    <Box></Box>
  </>
);
