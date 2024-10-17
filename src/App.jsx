import React from "react"

import Instructions from "./components/Instructions"
import Die from "./components/Die"

export default function App() {
  return (
      <main>
        <div className="game--container">
          <Instructions />
          <div className="dies--container">
            <Die value="1"/>
            <Die value="3"/>
            <Die value="1"/>
            <Die value="3"/>
            <Die value="1"/>

            <Die value="5"/>
            <Die value="1"/>
            <Die value="2"/>
            <Die value="4"/>
            <Die value="6"/>
          </div>
        </div>
      </main>
  )
}