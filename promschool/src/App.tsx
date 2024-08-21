import { ChakraProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "theme";
import AppRoutes from "components/AppRoutes"; // Make sure the path is correct

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Global
        styles={css`
          @font-face {
            font-family: "Aurora";
            src: url("/assets/fonts/AURORA-PRO.otf") format("opentype");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "Azonix";
            src: url("/assets/fonts/Azonix.otf") format("opentype");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "BadSignal";
            src: url("/assets/fonts/Bad Signal.otf") format("opentype");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "Threat";
            src: url("/assets/fonts/Threat.otf") format("opentype");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "Lovan";
            src: url("/assets/fonts/Lovan.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "ROMANTIC";
            src: url("/assets/fonts/ROMANTIC.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "Pretendard-Black";
            src: url("/assets/fonts/Pretendard-Black.otf") format("opentype");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "Pretendard-ExtraBold";
            src: url("/assets/fonts/Pretendard-ExtraBold.otf")
              format("opentype");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "Pretendard-SemiBold";
            src: url("/assets/fonts/Pretendard-SemiBold.otf") format("opentype");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "Pretendard-Light";
            src: url("/assets/fonts/Pretendard-Light.otf") format("opentype");
            font-weight: normal;
            font-style: normal;
          }
        `}
      />
      <Router>
        <AppRoutes />
      </Router>
    </ChakraProvider>
  );
};
