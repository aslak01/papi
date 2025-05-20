import { Route, pathToRegex, getParams } from '../utils/router';
import HomePage from '../pages/index';
import PokemonListPage from '../pages/pokemon/index';
import PokemonDetailPage from '../pages/pokemon/[id]';
import TypesPage from '../pages/types/index';

export class Router {
  private routes: Route[];
  private app: HTMLElement;

  constructor() {
    this.app = document.getElementById('app') as HTMLElement;
    this.routes = [
      { path: '/', view: HomePage },
      { path: '/pokemon', view: PokemonListPage },
      { path: '/pokemon/[id]', view: PokemonDetailPage },
      { path: '/types', view: TypesPage }
    ];

    this.handleNavigation = this.handleNavigation.bind(this);
  }

  init(): void {
    // Add event listeners
    document.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      if (target.matches('[data-link]')) {
        e.preventDefault();
        history.pushState(null, '', (target as HTMLAnchorElement).href);
        this.handleNavigation();
      }
    });

    // Handle popstate events (browser back/forward)
    window.addEventListener('popstate', this.handleNavigation);

    // Initial navigation
    this.handleNavigation();
  }

  async handleNavigation(): Promise<void> {
    // Find the matching route
    const potentialMatches = this.routes.map(route => {
      const isRegExp = route.path instanceof RegExp;
      const regex = isRegExp ? route.path : pathToRegex(route.path as string);
      const match = location.pathname.match(regex);

      return {
        route,
        match
      };
    });

    let match = potentialMatches.find(m => m.match !== null);

    // If no match, default to home page
    if (!match) {
      match = {
        route: this.routes[0],
        match: [location.pathname]
      };
    }

    // Get the params from the URL
    const params = getParams(match.match);

    // Store params on window for the view to access
    (window as any).routeParams = params;

    // Clear the app element
    this.app.innerHTML = 'Loading...';

    // Initialize the view
    await match.route.view();
  }
}

