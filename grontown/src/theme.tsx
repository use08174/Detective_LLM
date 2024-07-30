import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    aurora: "Aurora, sanserif",
    badcoma: "BadComa, sanserif",
    extrablur: "ExtraBlur, sanserif",
    romantic: "ROMANTIC, sanserif",
    corrupted: "Corrupted File, sanserif",
    protest: "Protest Demo, sanserif",
    lovan: "Lovan, sanserif",
    ptserif: "PT Serif, serif",
    cursive: "Pinyon Script, handwriting",
    vt323: "VT323, monospace",
  },

  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

export default theme;
