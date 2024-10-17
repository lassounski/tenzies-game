import React from 'react'

export default function Button({props: tenzies, rollDicesParent}) {

    function rollDices(){
        rollDicesParent()
    }

    return (
        <div className="button--container">
          <button className="roll--button" onClick={rollDices}>
            {tenzies ? "New Game" : "Roll"}
          </button>
        </div>
    )
}