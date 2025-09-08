// import {
//   Box,
//   Image,
//   VStack,
//   Center,
//   Text,
//   AspectRatio,
//   Stack,
//   Button,
// } from "@chakra-ui/react";
// import { ArrowForwardIcon } from "@chakra-ui/icons";
// import { useNavigate } from "react-router-dom";

// export const Landing = () => {
//   const navigate = useNavigate();

//   return (
//     <Center height="100vh" width="100vw">
//       <Stack
//         width="80vw"
//         maxWidth={"1700px"}
//         alignItems="stretch"
//         borderRadius="xl"
//         overflow="hidden"
//         boxShadow="lg"
//         dropShadow={"2xl"}
//         gap={"0"}
//         direction={{ base: "column-reverse", xl: "row" }}
//       >
//         <Box
//           bg="white"
//           padding={{ base: "3", xl: "4" }}
//           boxShadow="xl"
//           flex="1"
//         >
//           <VStack height="100%">
//             <VStack
//               spacing={{ base: "2", xl: "4" }}
//               flex="1"
//               justifyContent="center"
//             >
//               <Image
//                 src="/assets/sprites/dead_harrington.png"
//                 height="30%"
//                 width="30%"
//                 margin="2vw"
//               />
//               <Text
//                 fontFamily="aurora"
//                 fontSize="6xl"
//                 align={"center"}
//                 margin="0 1vw 0 1vw"
//               >
//                 Detective
//                 <br />
//                 Prometheus
//               </Text>
//             </VStack>

//             <VStack
//               spacing={{ base: "1", xl: "3" }}
//               flex="1"
//               justifyContent="center"
//               maxWidth="100%"
//               marginTop="3vh"
//             >
//               <Box
//                 padding={{ base: "2", xl: "5" }}
//                 bgColor="black"
//                 borderRadius="md"
//                 boxShadow="md"
//                 marginBottom={{ base: "1", xl: "3" }}
//                 maxWidth="100%"
//                 minWidth={"250px"}
//                 width="85%"
//                 flexDirection="column"
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="flex-start"
//               >
//                 <Text
//                   fontSize="4xl"
//                   color={"white"}
//                   marginBottom={6}
//                   fontFamily="threat"
//                 >
//                   Play
//                 </Text>
//                 <VStack
//                   spacing={{ base: "3", xl: "6" }}
//                   fontFamily={"azonix"}
//                   marginBottom={3}
//                 >
//                   <Button
//                     width="100%"
//                     size="lg"
//                     colorScheme="red"
//                     rightIcon={<ArrowForwardIcon />}
//                     onClick={() => navigate("/game")}
//                   >
//                     Start
//                   </Button>
//                 </VStack>
//               </Box>
//             </VStack>
//             <Center>
//               <Button
//                 as="a"
//                 href="https://www.github.com/mluogh/grontown"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 leftIcon={
//                   <Image
//                     src="/assets/web/github-mark.png"
//                     height={{ base: "20px", xl: "30px" }}
//                   />
//                 }
//                 size={{ base: "xs", xl: "sm" }}
//                 bg={"white"}
//                 textColor={"black"}
//               >
//                 GitHub
//               </Button>
//             </Center>
//           </VStack>
//         </Box>
//         <AspectRatio flex="4" ratio={1350 / 1150}>
//           <img
//             src="/assets/web/Newspaper.png"
//             alt="Newspaper"
//             style={{ width: "100%", height: "100%" }}
//           />
//         </AspectRatio>
//       </Stack>
//     </Center>
//   );
// };

// export default Landing;

import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    // 화면 전체를 덮는 컨테이너 Box입니다.
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      // 여기에 배경 이미지 스타일을 적용합니다.
      bgImage="url('/assets/sprites/prologue_main.jpeg')" // <-- 사용할 이미지 경로로 변경해주세요.
      bgSize="cover"
      bgPosition="center"
    >
      {/* 중앙에 위치할 게임 시작 버튼입니다. */}
      <Button
        size="lg"
        colorScheme="red" // 버튼 색상은 원하는 테마로 변경 가능합니다.
        fontSize="2xl"
        paddingX="12"
        paddingY="8"
        onClick={() => navigate("/prologue")} // 클릭 시 '/game' 경로로 이동합니다.
      >
        게임 시작
      </Button>
    </Box>
  );
};

export default Landing;