import { fireEvent, render, screen } from '@testing-library/react';
import LoadMore from '../components/LoadMore';

const clickHandler = jest.fn();

const setup = (newProps: any) => {
  render(
    <LoadMore
      loadedPokemonCount={2}
      count={4}
      getMorePokemon={clickHandler}
      nextLink={'pokemon.com'}
      loading={false}
      {...newProps}
    />
  );
};

describe('LoadMore', () => {
  test('renders component', () => {
    setup({});
    const el = screen.getByTestId('loadMore');
    expect(el).toBeInTheDocument();
  });

  test('renders current count of total count loaded', () => {
    setup({});
    const el = screen.getByText('2 of 4 loaded');
    expect(el).toBeInTheDocument();
  });

  test('fires click handler', () => {
    setup({});
    const el = screen.getByText('Load more Pokemon');
    expect(clickHandler).not.toHaveBeenCalled();

    fireEvent.click(el);
    expect(clickHandler).toHaveBeenCalled();
  });

  test('load more button is disabled when loading or if next link is null', () => {
    const disabledClickHandler = jest.fn();
    setup({ nextLink: null, getMorePokemon: disabledClickHandler });
    const el = screen.getByText('All data loaded');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('disabled');
    fireEvent.click(el);
    expect(disabledClickHandler).not.toHaveBeenCalled();

    const disabledClickHandler2 = jest.fn();
    setup({ loading: true, getMorePokemon: disabledClickHandler2 });
    const el2 = screen.getByText('Loading...');
    expect(el2).toBeInTheDocument();
    expect(el2).toHaveAttribute('disabled');
    fireEvent.click(el);
    expect(disabledClickHandler2).not.toHaveBeenCalled();
  });
});
