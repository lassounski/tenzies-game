import React from "react"

export default function ({ props, holdFunction } ) {
    
    const handleClick = () => {
        holdFunction(props.id)
    }

    return (
        <div
            className={`dice--container ${props.isHeld && 'dice--selected'}`}
            onClick={handleClick}
        >
            <span>{props.value}</span>
        </div>
    )
}