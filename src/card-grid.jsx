import { useEffect, useState } from "react";
import getRandomPokemon from "./pokemon-fetcher";
import shuffle from "./array-shuffle";
import { v4 as uuidv4 } from 'uuid';
import Scoreboard from "./score-board";
import './index.css'
import './grid.css'


export default function Grid({ difficulty }) {

    const [cards, setCards] = useState([])
    const [score, setScore] = useState(0)
    const [roundScore, setRoundScore] = useState(0)
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    async function loadCards() {
        const newCards = []
        while (newCards.length < difficulty) {
            const imageUrl = await getRandomPokemon();
            if (newCards.some(card => card.pokeUrl === imageUrl)) { continue }
            newCards.push({ id: uuidv4(), pokeUrl: imageUrl, clicked: false })
        }
        setCards(newCards);
    }

    function handleEndGame(finalScore) {
        setRoundScore(finalScore);
        setHighScore(hs => Math.max(hs, score));
        setScore(0);
        setGameOver(true);
        return;
        };

    function handleClick(cardId) {
        const clickedCard = cards.find(c => c.id === cardId)
        if (clickedCard.clicked) {
            handleEndGame(score);
            return 0;
        };

        setTimeout(() => {
            const updatedCards = cards.map(c =>
                c.id === cardId ? { ...c, clicked: true } : c);

            const allClicked = updatedCards.every(card => card.clicked)
            if (allClicked) {
                handleEndGame(difficulty);
                return;
            }

            const shuffled = shuffle([...updatedCards]);
            setCards(shuffled);
            setScore(prev => prev + 1);

        }, 300)
    }


    useEffect(() => { loadCards() }, [difficulty])

    return (
        <>
            <Scoreboard
                score={score}
                highScore={highScore}
            ></Scoreboard>
            
            <div className="game-container">
                <div className="instructions">
                    <h2>Rules:</h2>
                    <p>Click every pokémon in the grid just once... but the cards will shuffle on every click.</p>
                    <p>Set the difficulty to change how many pokémon there are!</p>
                    <p>Hope you're paying attention...</p>
                </div>
                {gameOver ? (
                    <div className="restart-div">
                        <div className="result-div">
                            {roundScore === difficulty ? (
                                <div>You did it! You clicked all {difficulty}</div>
                            ) : (
                                <>
                                    <div>Game Over!</div>
                                    <p>You scored: {roundScore}</p>
                                </>
                            )}

                        </div>
                        <button onClick={() => {
                            setGameOver(false);
                            loadCards()
                        }}>Ready to Play Again?</button>
                    </div>
                ) : (
                    <div className="grid">
                        {cards.map(card => (
                            <div
                                className="card"
                                key={card.id}
                            >
                                <div className="poke-img">
                                    <img src={card.pokeUrl} onClick={() => handleClick(card.id)}
                                    />
                                </div>
                            </div>
                        )
                        )}
                    </div>
                )}
                
            </div>
        </>
    )
}