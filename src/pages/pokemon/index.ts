import { fetchPokemonList } from '../../utils/api';
import { createPokemonList } from '../../components/PokemonList';

export default async function PokemonListPage(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;

  // Get offset from URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const offset = parseInt(urlParams.get('offset') || '0');

  try {
    app.innerHTML = 'Loading Pokémon...';
    const data = await fetchPokemonList(20, offset);

    app.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'pokemon-page';

    const heading = document.createElement('h1');
    heading.textContent = 'Pokémon List';
    container.appendChild(heading);

    const info = document.createElement('p');
    info.textContent = `Showing ${offset + 1} - ${Math.min(offset + 20, data.count)} of ${data.count} Pokémon`;
    container.appendChild(info);

    const pokemonList = createPokemonList(data);
    container.appendChild(pokemonList);

    app.appendChild(container);
  } catch (error) {
    app.innerHTML = `
      
        Error
        ${error instanceof Error ? error.message : 'An unknown error occurred'}
        Try Again
      
    `;
  }
}

