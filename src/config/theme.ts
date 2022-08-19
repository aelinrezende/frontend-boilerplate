import type { ThemeConfig } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const fonts = {
  heading: "Poppins",
  body: "Poppins",
};

const theme = extendTheme({
  config,
  fonts,
});
export default theme;
