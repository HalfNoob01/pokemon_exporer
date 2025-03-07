"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Box, Grid, Heading, Text, Button, Flex, Spinner, Center } from "@chakra-ui/react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getPokimons, Pokemon } from "@/actions";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const router = useRouter();

  const searchQuery = useSelector((state: RootState) => state.search.query.trim().toLowerCase());

  const fetchPokemons = async (currentOffset: number) => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await getPokimons(currentOffset, 10);
      setPokemons((prev) => [...prev, ...data.results]);
      setOffset(currentOffset + 10);
    } catch (error) {
      console.error("Failed to fetch Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons(0);
  }, []);

  const lastPokemonRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || searchQuery) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchPokemons(offset);
        }
      });

      if (node) observer.current.observe(node);
    },
    [offset, loading, searchQuery]
  );

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery)
  );

  const displayPokemons = searchQuery ? filteredPokemons : pokemons;

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6} p={4}>
      {displayPokemons.length > 0 ? (
        displayPokemons.map((pokemon, index) => {
          const isLast = index === displayPokemons.length - 1;
          const pokemonId = pokemons.findIndex((p) => p.name === pokemon.name) + 1;

          return (
            <Box
              key={index}
              ref={isLast && !searchQuery ? lastPokemonRef : null}
              p={4}
              boxShadow="md"
              borderRadius="lg"
              borderWidth="1px"
              textAlign="center"
            
              transition="transform 0.3s ease, box-shadow 0.3s ease"
              _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
            >
              <Flex justify="center">
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                  alt={pokemon.name}
                  height={80}
                  width={80}
                  style={{ opacity: 0, transition: "opacity 0.5s ease-in" }}
                  onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                />
              </Flex>
              <Heading size="md" mt={2}>{pokemon.name}</Heading>
              <Text fontSize="sm" color="gray.500">#{pokemonId}</Text>
              <Button
                mt={3}
                colorScheme="blue"
                size="sm"
                transition="background 0.3s ease, transform 0.2s ease"
                _hover={{ bg: "blue.600", transform: "scale(1.1)" }}
                onClick={() => router.push(`/pokemon/${pokemonId}`)}
              >
                View
              </Button>
            </Box>
          );
        })
      ) : (
        <Center w="100%" py={6}>
          <Heading size="md" color="red.500">Pokémon is not available</Heading>
        </Center>
      )}

      {loading && !searchQuery && (
        <Center w="100%" py={4}>
          <Spinner size="lg" color="blue.500" />
        </Center>
      )}
    </Grid>
  );
}
