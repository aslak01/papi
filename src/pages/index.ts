export default async function HomePage(): Promise<void> {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
    
      Welcome to the Pokémon API Browser
      This application allows you to browse Pokémon data using the PokéAPI.
      
        
          Browse Pokémon
          View a list of all Pokémon and their details.
          View Pokémon
        
        
          Explore Types
          Learn about different Pokémon types and which Pokémon belong to each type.
          View Types
        
      
    
  `;
}
