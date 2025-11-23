export default async function getRandomPokemon() {
    const max = 1025;
    const randomId = Math.floor(Math.random() * max) + 1;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data  = await response.json()

    return data.sprites.front_default;
}