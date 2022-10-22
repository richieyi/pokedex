import Head from 'next/head';
import client from 'graphql/apollo-client';
import Pokedex from '@/components/Pokedex';
import { GET_ALL_POKEMON } from 'graphql/queries';

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_ALL_POKEMON,
  });

  return {
    props: {
      data,
    },
  };
}

export default function Home(props: any) {
  const {
    data: {
      allPokemon: { results },
    },
  } = props;

  return (
    <div>
      <Head>
        <title>Pokédex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Pokedex results={results} />
      </main>
    </div>
  );
}
