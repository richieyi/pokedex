import { BASE_URL } from '../graphql/resolvers';

export const loadedPokemon = [
  {
    url: BASE_URL,
    pokemon: {
      id: '1',
      name: 'bulbasaur',
      species: {
        genera: [
          {
            genus: 'seed pokemon',
            language: {
              name: 'en',
            },
          },
        ],
      },
      sprites: {
        front_default: BASE_URL,
      },
      stats: [
        {
          base_stat: 45,
          stat: {
            name: 'hp',
          },
        },
      ],
      types: [
        {
          type: {
            name: 'grass',
          },
        },
      ],
    },
  },
  {
    url: BASE_URL,
    pokemon: {
      id: '25',
      name: 'pikachu',
      species: {
        genera: [
          {
            genus: 'mouse pokemon',
            language: {
              name: 'en',
            },
          },
        ],
      },
      sprites: {
        front_default: BASE_URL,
      },
      stats: [
        {
          base_stat: 45,
          stat: {
            name: 'hp',
          },
        },
      ],
      types: [
        {
          type: {
            name: 'electric',
          },
        },
      ],
    },
  },
];
