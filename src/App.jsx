import { useState } from 'react'
import getRandomPokemon from './pokemon-fetcher'
import './App.css'

function App() {
    getRandomPokemon();
}

export default App
