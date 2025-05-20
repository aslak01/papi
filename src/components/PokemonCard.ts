export function createPokemonCard(name: string, id: number, imageUrl: string): HTMLElement {
  const card = document.createElement('div');
  card.className = 'pokemon-card';

  card.innerHTML = `
    
<a href="/pokemon/${id}">
      <img height=96 width=96 src="${imageUrl}" />
      <div>
        #${id.toString().padStart(3, '0')} ${name}
      </div>
</a>
    
  `;

  return card;
}
