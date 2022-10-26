interface Data {
  getPokemon: {
    results: Result[];
    count: number;
    next: string;
  };
}

export interface Result {
  url: string;
  pokemon: Pokemon;
}

interface Pokemon {
  id: string;
  name: string;
  species: Species;
  sprites: Sprite;
  stats: Stat[];
  types: Type[];
}

interface Species {
  genera: Genera[];
}

export interface Genera {
  genus: string;
  language: Language;
}

interface Language {
  name: string;
}

interface Stat {
  base_stat: number;
  stat: StatType;
}

interface StatType {
  name: string;
}

export interface Type {
  type: ElementType;
}

interface ElementType {
  name: string;
}

interface Sprite {
  front_default: string;
}

export type TypesHash = Record<string, number>;
export type SpeciesHash = Record<string, number>;
