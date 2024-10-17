import React from 'react'

export default function Button({props, rollDicesParent}) {

    function rollDices(){
        rollDicesParent()
    }

    return (
        <div className="button--container">
          <button className="roll--button" onClick={rollDices}>
            {props.tenzies ? "New Game" : "Roll"}
          </button>
        </div>
    )
}