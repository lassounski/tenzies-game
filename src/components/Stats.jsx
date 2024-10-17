import React from "react"

export default function Stats({props}) {
    console.log(props)
    const showContent = props > 0
    return(
        <div className="stats--container">
            {showContent && (<span>Rolls: {props}</span>)}
        </div>
    )
}