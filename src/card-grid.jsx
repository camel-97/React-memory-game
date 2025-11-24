import { useEffect, useState } from "react";
import getRandomPokemon from "./pokemon-fetcher";
import shuffle from "./array-shuffle";
import Scoreboard from "./score-board";
import './grid.css'


export default function Grid() {

    const [cards, setCards] = useState([])
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    async function loadCards() {
        const newCards = []
        while (newCards.length < 12) {
            const imageUrl = await getRandomPokemon();
            if (newCards.some(card => card.pokeUrl === imageUrl)) { continue }
            newCards.push({ id: newCards.length, pokeUrl: imageUrl, clicked: false })
        }
        setCards(newCards);
    }

    function handleClick(cardId) {
            const clickedCard = cards.find(c => c.id === cardId)
            if (clickedCard.clicked) {
                setGameOver(true);
                setScore(prevScore => {
                    setHighScore(hs => Math.max(hs, prevScore))
                    return 0;
                });
                return;
            } 
            const updatedCards = cards.map(c => c.id === cardId ? { ...c, clicked: true } : c);

            const shuffled = shuffle([...updatedCards]);
            setCards(shuffled);
            setScore(prev => prev + 1);
        }

    useEffect(() => { loadCards() }, [])

    return (
        <>
            <Scoreboard
                score={score}
                highScore={highScore}
            ></Scoreboard>
            {gameOver ? (
                <div className="restart-div">
                    <button onClick={() => {
                        setGameOver(false);
                        loadCards()
                    }}>Ready to Play Again?</button>
                </div>
            ) : (
                <div className="grid">
                    {cards.map(card => (
                        <div className="card" key={card.id}>
                            <div className="poke-img">
                                <img src={card.pokeUrl} onClick={
                                    () => handleClick(card.id)
                                }
                                />
                            </div>
                        </div>
                    )
                    )}
                </div>
            )}
        </>
    )
}