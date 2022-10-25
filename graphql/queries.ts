import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
  query GetPokemon($url: String) {
    getPokemon(url: $url) {
      count
      next
      previous
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
