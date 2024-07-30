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
            font-family: "BadComa";
            src: url("/assets/fonts/BadComa.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "ExtraBlur";
            src: url("/assets/fonts/ExtraBlur.ttf") format("truetype");
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
            font-family: "Corrupted File";
            src: url("/assets/fonts/Corrupted File.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "Protest Demo";
            src: url("/assets/fonts/Protest Demo.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "ROMANTIC";
            src: url("/assets/fonts/ROMANTIC.ttf") format("truetype");
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
