import React from "react"

import Instructions from "./components/Instructions"
import Dice from "./components/Dice"
import Credits from "./components/Credits"

import Confetti from "react-confetti"
import useWindowSize from "react-use/lib/useWindowSize"

export default function App() {
  const [dices, setDices] = React.useState(allNewDices())
  const [tenzies, setTenzies] = React.useState(false)
  const { width, height } = useWindowSize()

  React.useEffect(() => {
    setTenzies(
      dices.reduce((acc, current) => {
        return acc && current.value === dices[0].value && current.isHeld === true
      }, true)
    )
  }, [dices])

  const diceElements = dices.map(dice =>
    <Dice
      holdFunction={hold}
      key={dice.id}
      props={dice}
    />)

  function allNewDices() {
    const newDices = []
    for (let i = 0; i < 10; i++) {
      newDices.push(
        {
          id: i,
          value: Math.floor(Math.random() * 6) + 1,
          isHeld: false
        }
      )
    }
    return newDices
  }

  function rollDices() {
    if (tenzies) {
      setDices(allNewDices())
    } else {
      setDices(prev => prev.map(dice =>
        dice.isHeld ? dice :
          {
            ...dice,
            value: Math.floor(Math.random() * 6) + 1
          }
      ))
    }
  }

  function hold(id) {
    setDices(prev => prev.map(dice =>
      dice.id === id ?
        {
          ...dice,
          isHeld: !dice.isHeld
        }
        : dice
    ))
  }

  return (
    <main>
      <div className="game--container">
        <Instructions />
        {tenzies && <Confetti width={width} height={height}/>}
        <div className="dies--container">
          {diceElements}
        </div>
        <div className="button--container">
          <button className="roll--button" onClick={rollDices}>
            {tenzies ? "New Game" : "Roll"}
          </button>
        </div>
        {tenzies && <Credits />}
      </div>
    </main>
  )
}