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
  const [showStats, setShowStats] = React.useState(false)
  const [isStopwatchActive, setIsStopwatchActive] = React.useState(false);
  const { width, height } = useWindowSize()

  React.useEffect(() => {
    setTenzies(
      dices.reduce((acc, current) => {
        //if all dice have same value and they're all held
        return acc && current.value === dices[0].value && current.isHeld === true
        // this is the initial value for the reduce method so the acc starts as true
      }, true))


    //controls stopwatch
    if(dices.some(dice => dice.isHeld) && !tenzies){
      console.log("Start count")
      setIsStopwatchActive(true)
      setShowStats(true)
    }
  }, [dices])

  React.useEffect(() => {
    if(tenzies){
      setIsStopwatchActive(false)
    }
  }, [tenzies])

  const diceElements = dices.map(dice =>
    <Dice
      key={dice.id}
      holdFunction={hold}
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

  function buttonPress() {
    // new game press
    if (tenzies) {
      setDices(allNewDices())
      setShowStats(false)
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
        <Button props={tenzies} rollDicesParent={buttonPress}/>
        {tenzies && <Credits />}
        <Stats rolls={rolls} isStopwatchActive={isStopwatchActive} showStats={showStats}/>
      </div>
    </main>
  )
}