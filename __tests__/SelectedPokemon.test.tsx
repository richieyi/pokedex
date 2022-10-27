import { render, screen } from '@testing-library/react';
import SelectedPokemon from '../components/SelectedPokemon';

const setup = () => {
  render(
    <SelectedPokemon
      selectedPokemon={{
        id: '1',
        name: 'bulbasaur',
        sprites: {
          front_default: '',
        },
        stats: [
          {
            base_stat: 45,
            stat: {
              name: 'hp',
            },
          },
        ],
        types: [
          {
            type: {
              name: 'grass',
            },
          },
          {
            type: {
              name: 'poison',
            },
          },
        ],
        species: {
          genera: [
            {
              genus: 'seed pokemon',
              language: {
                name: 'en',
              },
            },
          ],
        },
      }}
    />
  );
};

describe('SelectedPokemon', () => {
  test('renders component', () => {
    setup();
    const el = screen.getByTestId('selectedPokemon');
    expect(el).toBeInTheDocument();
  });

  test('renders pokemon name with id', () => {
    setup();
    const el = screen.getByText('#1. bulbasaur');
    expect(el).toBeInTheDocument();
  });

  test('renders image', () => {
    setup();
    const el = screen.getByAltText('bulbasaur image');
    expect(el).toBeInTheDocument();
  });

  test('renders stat info', () => {
    setup();
    const el = screen.getByText('45 hp');
    expect(el).toBeInTheDocument();
  });

  test('renders type info', () => {
    setup();
    const el = screen.getByText('grass,');
    expect(el).toBeInTheDocument();
    const el2 = screen.getByText('poison');
    expect(el2).toBeInTheDocument();
  });
});
