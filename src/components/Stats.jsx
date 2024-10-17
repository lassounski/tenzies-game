import React from "react"

import Stopwatch from "./Stopwatch"

export default function Stats(props) {
    const showContent = props.showStats
    return showContent ?
        (
            <div className="stats--container">
                <span>Rolls: {props.rolls}</span>
                <Stopwatch isActive={props.isStopwatchActive} />
            </div>
        )
        : null
}