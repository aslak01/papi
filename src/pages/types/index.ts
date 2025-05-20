import { fetchTypeList } from '../../utils/api';
import { typeColors } from '../../types/pokemon';

export default async function TypesPage(): Promise<void | undefined> {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = 'Loading Pokémon types...';

  try {
    const data = await fetchTypeList();

    const container = document.createElement('div');
    container.className = 'types-page';

    const heading = document.createElement('h1');
    heading.textContent = 'Pokémon Types';
    container.appendChild(heading);

    const typesGrid = document.createElement('div');
    typesGrid.className = 'types-grid';

    data.results.forEach(type => {
      // Skip unknown and shadow types
      if (type.name === 'unknown' || type.name === 'shadow') return;

      const typeCard = document.createElement('div');
      typeCard.className = 'type-card';
      typeCard.textContent = type.name;
      typeCard.style.backgroundColor = typeColors[type.name] || '#888';

      typesGrid.appendChild(typeCard);
    });

    container.appendChild(typesGrid);

    app.innerHTML = '';
    app.appendChild(container);
  } catch (error) {
    app.innerHTML = `
      
        Error
        ${error instanceof Error ? error.message : 'An unknown error occurred'}
        Go Home
      
    `;
  }
}

