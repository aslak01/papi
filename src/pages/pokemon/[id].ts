import { fetchPokemonById } from '../../utils/api';
import { typeColors } from '../../types/pokemon';

export default async function PokemonDetailPage(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = 'Loading Pokémon details...';

  try {
    // Get the pokemon ID from the route params
    const href = window.location.href;
    const id = href.split("/").at(-1)

    if (!id) {
      throw new Error('Pokemon ID is required');
    }

    const pokemon = await fetchPokemonById(id);

    const container = document.createElement('div');
    container.className = 'pokemon-detail';

    // Navigation
    const nav = document.createElement('div');
    nav.className = 'detail-nav';
    const pokemonId = parseInt(id);

    if (pokemonId > 1) {
      const prevLink = document.createElement('a');
      prevLink.href = `/pokemon/${pokemonId - 1}`;
      prevLink.classList.add('nav-link');
      prevLink.setAttribute('data-link', '');
      prevLink.textContent = '← Previous';
      nav.appendChild(prevLink);
    }

    const backLink = document.createElement('a');
    backLink.href = '/pokemon';
    backLink.classList.add('nav-link');
    backLink.setAttribute('data-link', '');
    backLink.textContent = 'Back to List';
    nav.appendChild(backLink);

    const nextLink = document.createElement('a');
    nextLink.href = `/pokemon/${pokemonId + 1}`;
    nextLink.classList.add('nav-link');
    nextLink.setAttribute('data-link', '');
    nextLink.textContent = 'Next →';
    nav.appendChild(nextLink);

    container.appendChild(nav);

    // Pokemon info
    const title = document.createElement('h1');
    title.textContent = `#${pokemon.id.toString().padStart(3, '0')} ${pokemon.name}`;
    container.appendChild(title);

    // Pokemon image
    const image = document.createElement('img');
    image.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    image.alt = pokemon.name;
    image.height = 300
    image.width = 300
    container.appendChild(image);

    // Types
    const typesContainer = document.createElement('div');
    typesContainer.className = 'types-container';
    typesContainer.innerHTML = 'Types';

    const typesList = document.createElement('div');
    typesList.className = 'types-list';

    pokemon.types.forEach(typeInfo => {
      const typeName = typeInfo.type.name;
      const typeEl = document.createElement('span');
      typeEl.className = 'type-badge';
      typeEl.textContent = typeName;
      typeEl.style.backgroundColor = typeColors[typeName] || '#888';
      typesList.appendChild(typeEl);
    });

    typesContainer.appendChild(typesList);
    container.appendChild(typesContainer);

    // Stats
    const statsContainer = document.createElement('div');
    statsContainer.className = 'stats';
    statsContainer.innerHTML = 'Base Stats';

    const statsList = document.createElement('div');
    statsList.className = 'stats-list';

    pokemon.stats.forEach(statInfo => {
      const statName = statInfo.stat.name;
      const baseStat = statInfo.base_stat;

      const statItem = document.createElement('div');
      statItem.className = 'stat-item';

      const statLabel = document.createElement('div');
      statLabel.className = 'stat-label';
      statLabel.textContent = `${statName}: ${baseStat}`;

      const statBar = document.createElement('div');
      statBar.className = 'stats-bar';

      const statFill = document.createElement('div');
      statFill.className = 'stats-fill';
      statFill.style.width = `${Math.min(baseStat / 2, 100)}%`;

      statBar.appendChild(statFill);
      statItem.appendChild(statLabel);
      statItem.appendChild(statBar);
      statsList.appendChild(statItem);
    });

    statsContainer.appendChild(statsList);
    container.appendChild(statsContainer);

    // Abilities
    const abilitiesContainer = document.createElement('div');
    abilitiesContainer.className = 'abilities';
    abilitiesContainer.innerHTML = 'Abilities';

    const abilitiesList = document.createElement('ul');
    abilitiesList.className = 'abilities-list';

    pokemon.abilities.forEach(abilityInfo => {
      const abilityName = abilityInfo.ability.name;
      const isHidden = abilityInfo.is_hidden;

      const abilityItem = document.createElement('li');
      abilityItem.textContent = abilityName;
      if (isHidden) {
        abilityItem.textContent += ' (Hidden)';
      }

      abilitiesList.appendChild(abilityItem);
    });

    abilitiesContainer.appendChild(abilitiesList);
    container.appendChild(abilitiesContainer);

    // Measurements
    const measurementsContainer = document.createElement('div');
    measurementsContainer.className = 'measurements';

    const height = document.createElement('p');
    height.textContent = `Height: ${pokemon.height / 10} m`;

    const weight = document.createElement('p');
    weight.textContent = `Weight: ${pokemon.weight / 10} kg`;

    measurementsContainer.appendChild(height);
    measurementsContainer.appendChild(weight);
    container.appendChild(measurementsContainer);

    app.innerHTML = '';
    app.appendChild(container);
  } catch (error) {
    app.innerHTML = `
      
        Error
        ${error instanceof Error ? error.message : 'An unknown error occurred'}
        <div>
        <a href="../pokemon">Back to List</a>
        </div>
      
    `;
  }
}

