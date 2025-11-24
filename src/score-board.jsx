export default function Scoreboard({score, highScore}) {
    return (
        <div className="score-board">
            <div className="score">Score: {score}</div>
            <div className="high-score">High Score: {highScore}</div>
        </div>
    )

}