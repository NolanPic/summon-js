import React, { useState, useEffect, useRef } from 'react'
import Suggestions from './components/Suggestions'
import useKeyListener from './hooks/useKeyListener'
import testCommands from './test-data/commands'

const Summon = ({ config }) => {
  const [isPrompted, summonInput, setSummonInput] = useKeyListener(
    config?.toggleWith // will be undefined if config isn't passed
  )
  const [suggestions, setSuggestions] = useState([])

  const summonTxtInput = useRef(null)

  // focus the input
  useEffect(() => {
    if (isPrompted) {
      summonTxtInput.current.focus()
    }
  }, [isPrompted])

  return (
    <React.Fragment>
      {isPrompted ? (
        <div className='summon-wrap'>
          <div className='summon'>
            <input
              type='text'
              placeholder='&rarr;'
              ref={summonTxtInput}
              value={summonInput}
              onChange={(e) => setSummonInput(e.target.value)}
            />
            <Suggestions items={suggestions} />
          </div>
        </div>
      ) : null}
    </React.Fragment>
  )
}

export default Summon
