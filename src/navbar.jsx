
import './nav.css'

export default function Nav({ setDifficulty }) {
    return (
        <div className="nav-bar">
            <img src="https://fontmeme.com/permalink/251125/e1e5498b622b1fb5994a68ba0a44a64f.png" alt="pokemon-font" />
            <div className='difficulty-div'>
                <button onClick={() => setDifficulty(6)}>Easy</button>
                <button onClick={() => setDifficulty(9)}>Medium</button>
                <button onClick={() => setDifficulty(12)}>Hard</button>
            </div>
        </div>
    )
}