import Head from 'next/head';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '../apollo-client';

import styles from '@/pages/index.module.css';

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      # query pokemon {
      #   pokemon {
      #     id
      #     name
      #     sprites {
      #       front_default
      #     }
      #   }
      # }
      # query allPokemon {
      #   allPokemon {
      #     results {
      #       name
      #       url
      #     }
      #   }
      # }
      query allPokemonWithData {
        allPokemonWithData {
          id
          name
          sprites {
            front_default
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
  const { allPokemonWithData } = props.pokemon;
  console.log('p', props.pokemon);

  function renderPokemon() {
    return allPokemonWithData?.map((pokemon) => {
      return (
        <div key={pokemon.id}>
          <p>{pokemon.name}</p>
          <img src={pokemon.sprites.front_default} />
        </div>
      );
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Pokedex</h1>
        {renderPokemon()}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}
