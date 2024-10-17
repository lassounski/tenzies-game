import React from "react"

import Instructions from "./components/Instructions"
import Die from "./components/Die"

export default function App() {
  const [dices, setDices] = React.useState(initializeRandomDices())

  console.log(dices)

  function initializeRandomDices() {
    const randomDices = []

    for (let i = 0; i < 10; i++) {
      randomDices.push(
        <Die key={i} value={Math.floor(Math.random() * 6) + 1}/>
      )
    }

    return randomDices
  }

  return (
    <main>
      <div className="game--container">
        <Instructions />
        <div className="dies--container">
            {dices}
        </div>
      </div>
    </main>
  )
}