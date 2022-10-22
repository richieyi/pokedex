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

  function renderFiltered() {
    const filtered = results.filter((result) =>
      result?.pokemon?.name?.toLowerCase().includes(searchValue)
    );
    return filtered.map((result) => (
      <div
        key={result.pokemon.name}
        className="flex flex-col items-center"
      >
        <img src={result.pokemon.sprites.front_default} />
        <p className="text-sm">{result.pokemon.name}</p>
      </div>
    ));
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container flex flex-col items-center gap-4">
          <h1 className="text-2xl">Pokedex</h1>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Type a name..."
            className="border border-black rounded px-2 py-1"
          />
          <div className="border rounded border-black p-4 grid grid-cols-6 gap-8 max-h-[400px] overflow-y-auto">
            {renderFiltered()}
          </div>
        </div>
      </main>

      {/* <footer></footer> */}
    </div>
  );
}
