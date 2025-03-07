import { Text, Flex } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";

export default function Heading() {
  return (
    <Flex justify="space-around" p={5} bg="yellow.300" align="center" borderRadius="md">
    <Flex width="80vw" >
    <Text
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} 
        fontWeight="bold"
        fontFamily="cursive"
        color="black"
    >
        POKÉMON
    </Text>
    <Text
        fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} 
        fontWeight="bold"
        fontFamily="fantasy"
        color="black"
    >
        EXPLORER
    </Text>
    </Flex>

      <ColorModeButton borderRadius="full" />
    </Flex>
  );
}
