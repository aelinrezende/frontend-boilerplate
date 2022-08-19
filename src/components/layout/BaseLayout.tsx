import Head from "next/head";

import { Box } from "@chakra-ui/react";

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
