"use client";

import { Input, Box, Text, Image, Spinner, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { searchPokemon } from "@/actions";
import { useRouter } from "next/navigation";

export default function InputBox() {
  const [inputValue, setInputValue] = useState("");
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!inputValue) {
      setPokemon(null);
      setError("");
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const data = await searchPokemon(inputValue);
        setPokemon(data);
      } catch (err) {
        setPokemon(null);
        setError("Pokémon not found");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <Box position="relative" mt={3} textAlign="center">
      <Input
        placeholder="Search Pokémon..."
        size="md"
        value={inputValue}
        className="border-animated"
        onChange={(e) => setInputValue(e.target.value.trim())}
      />

      {loading && <Spinner mt={3} />}
      {error && <Text color="red.500">{error}</Text>}

      {pokemon && (
        <Box mt={3} >
          <Text fontSize="xl" fontWeight="bold">{pokemon.name.toUpperCase()}</Text>
          <Image src={pokemon.sprites.front_default} alt={pokemon.name} />
          <Text>Type: {pokemon.types.map((t: any) => t.type.name).join(", ")}</Text>
          
         
          <Button
            mt={3}
            colorScheme="blue"
            onClick={() => router.push(`/pokemon/${pokemon.id}`)}
          >
            View
          </Button>
        </Box>
      )}
    </Box>
  );
}
