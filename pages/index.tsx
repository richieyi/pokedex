import Head from 'next/head';
import client from 'graphql/apollo-client';
import Pokedex from '@/components/Pokedex';
import { GET_POKEMON } from 'graphql/queries';
import ClientOnly from '@/components/ClientOnly';
import { Data } from 'pokemon-types';

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_POKEMON,
  });

  return {
    props: {
      data,
    },
  };
}

interface HomeProps {
  data: Data;
}

export default function Home(props: HomeProps) {
  const {
    data: {
      getPokemon: { results, count, next },
    },
  } = props;

  return (
    <div>
      <Head>
        <title>Pokédex</title>
        <link rel="icon" href="/pokedex.png" />
      </Head>

      <main>
        <ClientOnly>
          <Pokedex results={results} count={count} next={next} />
        </ClientOnly>
      </main>
    </div>
  );
}
