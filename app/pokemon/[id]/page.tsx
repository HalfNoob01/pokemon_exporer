"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box, Text, Image, Spinner, VStack, Badge, SimpleGrid, Button, Icon, 
} from "@chakra-ui/react";
import { 
  MdHome, MdCategory, MdBarChart, MdSportsMartialArts, MdFavorite, 
  MdShield, MdFlashOn, MdTrendingUp, MdAutoAwesome 
} from "react-icons/md";

export default function PokemonDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error("Pokémon not found");

        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        setError("Pokémon not found");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) return <Spinner size="xl" mt={5} />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!pokemon) return null;

  return (
    <Box position="relative">
      <Button 
        position="absolute"
        top={2} left={2}
        colorScheme="blue"
        onClick={() => router.push("/")}
        leftIcon={<MdHome />}
        zIndex={10}
      >
        Home
      </Button>

      <Box 
        textAlign="center" 
        mt={12} 
        px={4} 
        maxW="500px" 
        mx="auto" 
        borderWidth="1px" 
        borderRadius="lg" 
        boxShadow="lg" 
        p={5}
        _hover={{ transform: "scale(1.02)", transition: "0.3s ease-in-out" }} // Animation
      >
        <Text fontSize="3xl" fontWeight="bold" color="blue.600">{pokemon.name.toUpperCase()}</Text>

        <Image 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name} 
          mx="auto" 
          boxSize="150px" 
          borderRadius="full"
          boxShadow="md"
          border="2px solid #4A90E2"
          p={2}
          _hover={{ transform: "rotate(10deg)", transition: "0.3s ease-in-out" }} // Animation
        />

        <VStack spacing={4} mt={4}>
          {/* Types */}
          <Box>
            <Text fontSize="lg" fontWeight="semibold">
              <Icon as={MdCategory} mr={2} /> Type
            </Text>
            <SimpleGrid columns={pokemon.types.length} spacing={2}>
              {pokemon.types.map((t: any) => (
                <Badge key={t.type.name} colorScheme="purple" fontSize="md" p={1}>
                  {t.type.name}
                </Badge>
              ))}
            </SimpleGrid>
          </Box>

          {/* Stats with Icons */}
          <Box>
            <Text fontSize="lg" fontWeight="semibold">
              <Icon as={MdBarChart} mr={2} /> Stats
            </Text>
            <SimpleGrid columns={2} spacing={2}>
              {pokemon.stats.map((s: any) => {
                const statIcons: Record<string, any> = {
                  "hp": MdFavorite,
                  "attack": MdFlashOn,
                  "defense": MdShield,
                  "special-attack": MdTrendingUp,
                  "special-defense": MdShield,
                  "speed": MdFlashOn,
                };
                return (
                  <Badge key={s.stat.name} colorScheme="blue" fontSize="md" p={1}>
                    <Icon as={statIcons[s.stat.name] || MdBarChart} mr={1} />
                    {s.stat.name}: {s.base_stat}
                  </Badge>
                );
              })}
            </SimpleGrid>
          </Box>

          {/* Abilities */}
          <Box>
            <Text fontSize="lg" fontWeight="semibold">
              <Icon as={MdAutoAwesome} mr={2} /> Abilities
            </Text>
            <SimpleGrid columns={pokemon.abilities.length} spacing={2}>
              {pokemon.abilities.map((a: any) => (
                <Badge key={a.ability.name} colorScheme="orange" fontSize="md" p={1}>
                  {a.ability.name}
                </Badge>
              ))}
            </SimpleGrid>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="semibold">
              <Icon as={MdSportsMartialArts} mr={2} /> Moves
            </Text>
            <SimpleGrid columns={3} spacing={2}>
              {pokemon.moves.slice(0, 6).map((m: any) => (
                <Badge key={m.move.name} colorScheme="green" fontSize="md" p={1}>
                  {m.move.name}
                </Badge>
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
