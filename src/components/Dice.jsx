import React from "react"

import '../dice.css';

export default function ({ props, holdFunction } ) {
    const matrix = Array(3).fill().map(() => Array(3).fill(false));

    // Define the positions for each die number
    const positions = {
        1: [[1, 1]],                       // Center
        2: [[0, 0], [2, 2]],               // Top-left, Bottom-right
        3: [[0, 0], [1, 1], [2, 2]],       // Top-left, Center, Bottom-right
        4: [[0, 0], [0, 2], [2, 0], [2, 2]], // Four corners
        5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]], // Four corners + Center
        6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]] // Top & Bottom rows + middle columns
    };

    // Set true in the matrix for the positions that correspond to the die value from props
    positions[props.value].forEach(([row, col]) => {
        matrix[row][col] = true;
    });

    const handleClick = () => {
        holdFunction(props.id)
    }

    return (
        <div
            key={props.key}
            className={`dice ${props.isHeld && 'dice--selected'}`}
            onClick={handleClick}
        >
            {matrix.map(row => (
                row.map((isSelected, column) => (
                    <div key={column} className={isSelected ? "dot" : ""}/>
                ))
            ))}
        </div>
    )
}