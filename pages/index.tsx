import Head from 'next/head';
import Pokedex from '@/components/Pokedex';
import ClientOnly from '@/components/ClientOnly';

export default function Home() {
  return (
    <div className="max-w-[1600px] m-auto">
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
