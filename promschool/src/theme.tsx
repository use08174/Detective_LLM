import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    aurora: "Aurora, sanserif",
    azonix: "Azonix, sanserif",
    badsignal: "BadSignal, sanserif",
    threat: "Threat, sanserif",
    romantic: "ROMANTIC, sanserif",
    lovan: "Lovan, sanserif",
    pretendardBlack: "Pretendard-Black, sanserif",
    pretendardExtraBold: "Pretendard-ExtraBold, sanserif",
    pretendardSemiBold: "Pretendard-SemiBold, sanserif",
    pretendardLight: "Pretendard-Light, sanserif",
  },

  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

export default theme;
