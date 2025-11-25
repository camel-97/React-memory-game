import './nav.css'

export default function Nav() {
    return (
        <div className="nav-bar">
            <img src="https://fontmeme.com/permalink/251125/e1e5498b622b1fb5994a68ba0a44a64f.png" alt="pokemon-font"/>
            <div className='difficulty-div'>
                <button>Easy</button>
                <button>Medium</button>
                <button>Hard</button>
            </div>
        </div>
    )
}