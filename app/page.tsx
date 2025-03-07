import Heading from "@/components/Heading"
import Hero from "@/components/Hero"
import InputBox from "@/components/InputBox"
import { Container } from "@chakra-ui/react"

const Home = () => {
  return (
    <Container colorPalette="orange">
      <Heading/>
      <InputBox />
      <Hero/>
    </Container>
  )
}

export default Home
