import { PokemonListResponse, PokemonDetail, TypeListResponse, TypeDetail } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon list: ${response.status}`);
  }
  return response.json();
}

export async function fetchPokemonById(id: string): Promise<PokemonDetail> {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon with ID ${id}: ${response.status}`);
  }
  return response.json();
}

export async function fetchTypeList(): Promise<TypeListResponse> {
  const response = await fetch(`${BASE_URL}/type`);
  if (!response.ok) {
    throw new Error(`Failed to fetch type list: ${response.status}`);
  }
  return response.json();
}

export async function fetchTypeDetail(name: string): Promise<TypeDetail> {
  const response = await fetch(`${BASE_URL}/type/${name}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch type detail for ${name}: ${response.status}`);
  }
  return response.json();
}

