import Head from 'next/head';
import client from 'graphql/apollo-client';
import Pokedex from '@/components/Pokedex';
import { GET_POKEMON } from 'graphql/queries';
import ClientOnly from '@/components/ClientOnly';

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

export default function Home(props: any) {
  const {
    data: {
      getPokemon: { results, count, next },
    },
  } = props;

  return (
    <div>
      <Head>
        <title>Pokédex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ClientOnly>
          <Pokedex results={results} count={count} next={next} />
        </ClientOnly>
      </main>
    </div>
  );
}
