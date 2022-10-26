import Head from 'next/head';
import client from 'graphql/apollo-client';
import Pokedex from '@/components/Pokedex';
import { GET_POKEMON } from 'graphql/queries';
import ClientOnly from '@/components/ClientOnly';
import { Data } from 'pokemon-types';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pokédex</title>
        <link rel="icon" href="/pokedex.png" />
      </Head>

      <main>
        <ClientOnly>
          <Pokedex />
        </ClientOnly>
      </main>
    </div>
  );
}
