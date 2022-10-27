import React from 'react';
import { getLoadButtonText } from '../../utils';

interface LoadMoreProps {
  loadedPokemonCount: number;
  count: number;
  getMorePokemon: ({}) => {};
  nextLink: string | undefined;
  loading: boolean;
}

function LoadMore(props: LoadMoreProps) {
  const {
    loadedPokemonCount,
    count,
    getMorePokemon,
    nextLink,
    loading,
  } = props;
  const isDisabled =
    loading || !nextLink || loadedPokemonCount === count;

  return (
    <div data-testid="loadMore" className="flex items-center gap-2">
      <p className="text-sm text-center">
        {loadedPokemonCount} of {count} loaded
      </p>
      <button
        onClick={() =>
          getMorePokemon({ variables: { url: nextLink } })
        }
        disabled={isDisabled}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-grey-500 disabled:hover:bg-grey-500 shadow-lg"
      >
        {getLoadButtonText(loading, nextLink)}
      </button>
    </div>
  );
}

export default LoadMore;
