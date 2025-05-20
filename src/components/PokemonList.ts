import { createPokemonCard } from './PokemonCard';
import { PokemonListResponse } from '../types/pokemon';

export function createPokemonList(data: PokemonListResponse): HTMLElement {
  const container = document.createElement('div');
  container.className = 'pokemon-list-container';

  // Create pagination controls
  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'pagination';

  if (data.previous) {
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.addEventListener('click', () => {
      const url = new URL(data.previous!);
      const offset = url.searchParams.get('offset') || '0';
      history.pushState(null, '', `/pokemon?offset=${offset}`);

      // Trigger a navigation event
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    paginationDiv.appendChild(prevButton);
  }

  if (data.next) {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
      const url = new URL(data.next!);
      const offset = url.searchParams.get('offset') || '0';
      history.pushState(null, '', `/pokemon?offset=${offset}`);

      // Trigger a navigation event
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    paginationDiv.appendChild(nextButton);
  }

  container.appendChild(paginationDiv);

  // Create list container
  const listDiv = document.createElement('div');
  listDiv.className = 'pokemon-list';

  // Add Pokemon items
  data.results.forEach((pokemon) => {
    // Extract ID from the URL
    const id = parseInt(pokemon.url.split('/').filter(Boolean).pop() || '0');
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    const card = createPokemonCard(pokemon.name, id, imageUrl);
    listDiv.appendChild(card);
  });

  container.appendChild(listDiv);
  container.appendChild(paginationDiv.cloneNode(true));

  return container;
}

