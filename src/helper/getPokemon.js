import pokemonApi from "../api/pokemonApi";

const getPokemon = () => {
  return Array.from(Array(650)).map((_, i) => i + 1);
};

const getPokemonOptions = async () => {
  const mixed = getPokemon().sort(() => Math.random() - 0.5);
  const pokemons = await getPokemonName(mixed.splice(0, 4));
  return pokemons;
};

const getPokemonName = async ([p1, p2, p3, p4]) => {
  const [a1, a2, a3, a4] = await Promise.all([
    pokemonApi.get(`/${p1}`),
    pokemonApi.get(`/${p2}`),
    pokemonApi.get(`/${p3}`),
    pokemonApi.get(`/${p4}`),
  ]);

  return [
    { name: a1.data.name, id: a1.data.id },
    { name: a2.data.name, id: a2.data.id },
    { name: a3.data.name, id: a3.data.id },
    { name: a4.data.name, id: a4.data.id },
  ];
};

export default getPokemonOptions;
