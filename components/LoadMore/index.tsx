import { Result } from 'pokemon-types';
import React from 'react';
import { getLoadButtonText } from 'utils';

interface LoadMoreProps {
  loadedPokemon: Result[];
  count: number;
  getMorePokemon: ({}) => {};
  nextLink: string | undefined;
  loading: boolean;
}

function LoadMore(props: LoadMoreProps) {
  const { loadedPokemon, count, getMorePokemon, nextLink, loading } =
    props;
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-center">
        {loadedPokemon.length} of {count} loaded
      </p>
      <button
        onClick={() =>
          getMorePokemon({ variables: { url: nextLink } })
        }
        disabled={
          loading || !nextLink || loadedPokemon.length === count
        }
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:bg-grey-500 disabled:hover:bg-grey-500 shadow-lg"
      >
        {getLoadButtonText(loading, nextLink)}
      </button>
    </div>
  );
}

export default LoadMore;
