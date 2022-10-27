import { BASE_URL } from '../graphql/resolvers';
import {
  getFilteredResults,
  getLoadButtonText,
  getSortedResults,
  getSpecies,
  getTypes,
  nameHasSearchValue,
  speciesHasSpeciesFilterValue,
  typesHasTypeFilterValue,
} from '../utils';
import { loadedPokemon } from '../utils/constants';
import { options } from '../components/SortByDropdown';

describe('getLoadButtonText()', () => {
  it('should return loading text when loading', () => {
    const loadButtonText = getLoadButtonText(true, BASE_URL);
    expect(loadButtonText).toEqual('Loading...');
  });

  it('should return loaded text when next link is undefined', () => {
    const loadButtonText = getLoadButtonText(false, undefined);
    expect(loadButtonText).toEqual('All data loaded');
  });

  it('should return load more text by default', () => {
    const loadButtonText = getLoadButtonText(false, BASE_URL);
    expect(loadButtonText).toEqual('Load more Pokemon');
  });
});

describe('nameHasSearchValue()', () => {
  it('should return true if pokemon name partially has search value', () => {
    const bool = nameHasSearchValue('Pikachu', 'pi');
    expect(bool).toBeTruthy();
  });

  it('should return true if pokemon name fully has search value', () => {
    const bool = nameHasSearchValue('Pikachu', 'pikachu');
    expect(bool).toBeTruthy();
  });

  it('should return false if pokemon name does not have search value', () => {
    const bool = nameHasSearchValue('Pikachu', 'raichu');
    expect(bool).toBeFalsy();
  });
});

describe('typesHasTypeFilterValue()', () => {
  it('should return true if pokemon types has type filter', () => {
    const types = [
      {
        type: { name: 'fire' },
      },
      {
        type: { name: 'flying' },
      },
    ];
    const bool = typesHasTypeFilterValue(types, 'fire');
    expect(bool).toBeTruthy();
  });

  it('should return false if pokemon types does not have type filter', () => {
    const types = [
      {
        type: { name: 'fire' },
      },
      {
        type: { name: 'flying' },
      },
    ];
    const bool = typesHasTypeFilterValue(types, 'ghost');
    expect(bool).toBeFalsy();
  });
});

describe('speciesHasSpeciesFilterValue()', () => {
  it('should return true if pokemon species has species filter', () => {
    const species = [
      {
        genus: 'rat pokemon',
        language: { name: 'en ' },
      },
    ];
    const bool = speciesHasSpeciesFilterValue(species, 'rat pokemon');
    expect(bool).toBeTruthy();
  });

  it('should return false if pokemon species does not have species filter', () => {
    const species = [
      {
        genus: 'rat pokemon',
        language: { name: 'en ' },
      },
    ];
    const bool = speciesHasSpeciesFilterValue(
      species,
      'mouse pokemon'
    );
    expect(bool).toBeFalsy();
  });
});

describe('getTypes()', () => {
  it('should get types hash of pokemon list', () => {
    const types = getTypes(loadedPokemon);
    const expected = { grass: 1, electric: 1 };
    expect(types).toEqual(expected);
  });
});

describe('getSpecies()', () => {
  it('should get species hash of pokemon list', () => {
    const types = getSpecies(loadedPokemon);
    const expected = { 'seed pokemon': 1, 'mouse pokemon': 1 };
    expect(types).toEqual(expected);
  });
});

describe('getFilteredResults()', () => {
  it('should get filtered results based on search and filter values', () => {
    const filteredResults = getFilteredResults(
      loadedPokemon,
      'pikachu',
      'electric',
      'mouse pokemon'
    );
    expect(filteredResults).toEqual([loadedPokemon[1]]);
  });
});

describe('getSortedResults()', () => {
  it('should get sorted results by id ascending', () => {
    const sortedResults = getSortedResults(options[0], loadedPokemon);
    expect(sortedResults).toEqual([
      loadedPokemon[0],
      loadedPokemon[1],
    ]);
  });

  it('should get sorted results by name descending', () => {
    const sortedResults = getSortedResults(options[3], loadedPokemon);
    expect(sortedResults).toEqual([
      loadedPokemon[1],
      loadedPokemon[0],
    ]);
  });
});
