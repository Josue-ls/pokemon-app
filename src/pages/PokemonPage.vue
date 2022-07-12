<template>
  <h1 v-if="!pokemon">Cargando...</h1>
  <div v-else>
    <h1>Who is this pokemon?</h1>
    <Image :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <Options :pokemons="pokemonArr" @selected-pokemon="checkAnswer($event)" />
    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">Nuevo Juego</button>
    </template>
  </div>
</template>

<script>
import Image from "@/components/PokemonImg.vue";
import Options from "@/components/PokemonOption.vue";
import getPokemonOptions from "@/helper/getPokemon";

export default {
  components: { Image, Options },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();
      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rndInt];
    },
    checkAnswer(id) {
      this.showAnswer = true;
      this.showPokemon = true;
      this.message = `Oops, era ${this.pokemon.name}`;
      if (!(id === this.pokemon.id)) return;
      this.message = `Correcto!!!`;
    },
    newGame() {
      this.pokemonArr = [];
      this.pokemon = null;
      this.showPokemon = false;
      this.showAnswer = false;
      this.message = "";
      this.mixPokemonArray();
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>

<style></style>
