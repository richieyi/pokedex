import { gql } from '@apollo/client';

export const GET_ALL_POKEMON = gql`
  query GetAllPokemon {
    allPokemon {
      count
      results {
        url
        pokemon {
          id
          name
          stats {
            base_stat
            stat {
              name
            }
          }
          types {
            type {
              name
            }
          }
          species {
            genera {
              genus
              language {
                name
              }
            }
          }
          sprites {
            front_default
          }
        }
      }
    }
  }
`;
