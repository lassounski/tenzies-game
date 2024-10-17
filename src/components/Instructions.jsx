import React from "react"

export default function Instructions({props: tezies}) {
    return (
        <div className="instructions--container">
            {tezies ? (
                <h1 className="champion">🏆</h1>
            ):(
                <div>
                    <h1 className="instructions--title">Tenzies</h1>
                    <p >Roll until all dice are the same. 
                        Click each die to freeze it at its current value between the rolls.</p>
                </div>
            )}
        </div>
    )
}