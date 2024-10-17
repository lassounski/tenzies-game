import React from "react"

import Instructions from "./components/Instructions"
import Dice from "./components/Dice"
import Credits from "./components/Credits"
import Button from "./components/Button"
import Stats from "./components/Stats"

import Confetti from "react-confetti"
import useWindowSize from "react-use/lib/useWindowSize"

export default function App() {
  const [dices, setDices] = React.useState(allNewDices())
  const [rolls, setRolls] = React.useState(0)
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
      setRolls(0)
    } else {
      //sets new values for the dices randomly
      setDices(prev => prev.map(dice =>
        dice.isHeld ? dice :
          {
            ...dice,
            value: Math.floor(Math.random() * 6) + 1
          }
      ))
      //counts number of rolls
      setRolls(prev => {
        if(dices.some(dice => dice.isHeld === true)){
          return (prev + 1)
        } else{
          return 0;
        }
      })
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
        <Instructions props={tenzies}/>
        {tenzies && <Confetti width={width} height={height}/>}
        <div className="dies--container">
          {diceElements}
        </div>
        <Button props={tenzies} rollDicesParent={rollDices}/>
        {tenzies && <Credits />}
        <Stats props={rolls}/>
      </div>
    </main>
  )
}