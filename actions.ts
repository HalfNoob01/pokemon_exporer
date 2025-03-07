export interface Pokemon {
    name: string;
    url: string;
  }
  
  export interface PokemonResponse {
    results: Pokemon[];
  }
  
  export async function getPokimons(offset: number = 0, limit: number = 10): Promise<PokemonResponse> {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch Pokémon");
      return await res.json();
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      return { results: [] }; 
    }
  }
  

export const searchPokemon = async (name: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokémon not found");
      return await response.json();
    } catch (error) {
      throw new Error("Pokémon not found");
    }
  };
  