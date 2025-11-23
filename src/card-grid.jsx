import { useEffect, useState } from "react";
import getRandomPokemon from "./pokemon-fetcher";
import './grid.css'

export default function Grid() {

    const [cards, setCards] = useState([])

    async function loadCards() {
        const newCards = []
        while (newCards.length < 12) {
            const imageUrl = await getRandomPokemon();
            if (newCards.some(card => card.pokeUrl === imageUrl)){continue}
            newCards.push({ id: newCards.length, pokeUrl: imageUrl, clicked: false })
        }
        setCards(newCards);
    }

    useEffect(() => { loadCards() }, [])

    return (
        <div className="grid">
            {cards.map(card => (
                    <div className="card" key={card.id}>
                        <div className="poke-img">
                            <img src={card.pokeUrl} />
                        </div>
                    </div>
                )
        )}
        </div>
    )
}