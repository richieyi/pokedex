import { fireEvent, render, screen } from '@testing-library/react';
import { loadedPokemon } from '../utils/constants';
import PokemonList from '../components/PokemonList';

const clickHandler = jest.fn();

const setup = () => {
  render(
    <PokemonList
      pokemonList={loadedPokemon}
      setSelectedPokemon={clickHandler}
      filteredResultsLength={2}
    />
  );
};

describe('PokemonList', () => {
  test('renders component', () => {
    setup();
    const el = screen.getByTestId('pokemonList');
    expect(el).toBeInTheDocument();
  });

  test('renders images of pokemon', () => {
    setup();
    const el = screen.getByAltText('bulbasaur image');
    expect(el).toBeInTheDocument();
    const el2 = screen.getByAltText('pikachu image');
    expect(el2).toBeInTheDocument();
  });

  test('renders pokemon info', () => {
    setup();
    const el = screen.getByText('#1. bulbasaur');
    expect(el).toBeInTheDocument();
    const el2 = screen.getByText('#25. pikachu');
    expect(el2).toBeInTheDocument();
  });

  test('fires click handler', () => {
    setup();
    const el = screen.getByText('#1. bulbasaur');
    expect(el).toBeInTheDocument();
    expect(clickHandler).not.toHaveBeenCalled();

    fireEvent.click(el);
    expect(clickHandler).toHaveBeenCalled();
  });

  test('renders no results text when there are 0 filtered results', () => {
    render(
      <PokemonList
        pokemonList={[]}
        setSelectedPokemon={() => {}}
        filteredResultsLength={0}
      />
    );
    const el = screen.getByText('No results found...');
    expect(el).toBeInTheDocument();
  });
});
