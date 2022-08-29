import Head from "next/head";
import type { PropsWithChildren } from "react";

import { Box } from "@chakra-ui/react";

interface PageProps {
  tabTitle: string;
}

export const BaseLayout = ({
  tabTitle,
  children,
}: PropsWithChildren<PageProps>) => (
  <>
    <Head>
      <title>{tabTitle}</title>
    </Head>
    <Box p={"2rem"} h="100%">
      {children}
    </Box>
  </>
);
