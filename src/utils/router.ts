export interface Route {
  path: string | RegExp;
  view: () => Promise<void>;
}

export function pathToRegex(path: string): RegExp {
  // Convert path pattern like /pokemon/:id to regex
  return new RegExp(
    '^' +
    path
      .replace(/\//g, '\\/') // Escape forward slashes
      .replace(/\[(\w+)\]/g, '([^/]+)') + // Convert [param] to capturing group
    '$'
  );
}

export function getParams(match: RegExpMatchArray | null): Record<string, string> {
  const params: Record<string, string> = {};

  if (!match) return params;

  const keys = Array.from(match.input!.matchAll(/\[(\w+)\]/g)).map(result => result[1]);
  const values = match.slice(1);

  keys.forEach((key, i) => {
    params[key] = values[i];
  });

  return params;
}
