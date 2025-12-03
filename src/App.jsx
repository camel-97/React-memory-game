import { useState } from 'react'
import Grid from './card-grid'
import Nav from './navbar'



function App() {
  
  const [difficulty, setDifficulty] = useState(12);

  return (
    <>
      <Nav
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      ></Nav>
      <Grid
      difficulty={difficulty}
      ></Grid>
    </>
  )
}

export default App
