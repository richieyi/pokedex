import Head from 'next/head';
// import Image from 'next/image';
import { gql } from '@apollo/client';
import client from 'graphql/apollo-client';

// import styles from '@/pages/index.module.css';
import { useState } from 'react';

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query allPokemon {
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
              sprites {
                front_default
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      pokemon: data,
    },
  };
}

export default function Home(props: any) {
  const {
    pokemon: {
      allPokemon: { results },
    },
  } = props;
  console.log('res', results);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);

  function renderFiltered() {
    const filteredByName = results?.filter((result) =>
      result?.pokemon?.name?.toLowerCase().includes(searchValue)
    );

    return filteredByName?.map((result) => (
      <div
        key={result.pokemon.name}
        className="flex flex-col items-center hover:cursor-pointer"
        onClick={() => setSelectedPokemon(result.pokemon)}
      >
        <img src={result.pokemon.sprites.front_default} />
        <p className="text-sm">{result.pokemon.name}</p>
      </div>
    ));
  }

  function renderSelectedPokemon() {
    const { id, name, sprites, stats, types } = selectedPokemon;

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center">
          <p>{`#${id}. ${name}`}</p>
          <img src={sprites.front_default} />
        </div>
        <div>
          <p>Stats</p>
          <p>{`${stats?.[0]?.base_stat} ${stats?.[0]?.stat.name}`}</p>
        </div>
        <div>
          <p>Types</p>
          {types.map(({ type }) => (
            <p key={type.name}>{type.name}</p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Pokédex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container flex justify-center gap-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl text-center">Pokédex</h1>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by name..."
              className="border border-black rounded px-2 py-1"
            />
            <div>{selectedPokemon && renderSelectedPokemon()}</div>
          </div>
          <div className="border rounded border-black p-4 grid grid-cols-3 gap-8 h-[400px] overflow-y-auto">
            {renderFiltered()}
          </div>
        </div>
      </main>

      {/* <footer></footer> */}
    </div>
  );
}
