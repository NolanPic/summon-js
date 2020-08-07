import React, { useState, useEffect, useRef } from 'react'
import Suggestions from './components/Suggestions'
import useKeyListener from './hooks/useKeyListener'
import testCommands from './test-data/commands'

const Summon = ({ config }) => {
  // argument will be undefined if config isn't passed
  const [isPrompted] = useKeyListener(config?.toggleWith)

  const [summonInput, setSummonInput] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const summonTxtInput = useRef(null)

  // focus the input
  useEffect(() => {
    if (isPrompted) {
      summonTxtInput.current.focus()
    }
  }, [isPrompted])

  // set suggestions when input changes
  useEffect(() => {
    // if Summon is open, start matching suggestions
    // as the user is typing
    if (isPrompted && summonInput.length) {
      setSuggestions(
        testCommands.filter(
          (cmd) =>
            cmd.name.toLowerCase().indexOf(summonInput.toLowerCase()) !== -1
        )
      )
    } else {
      setSuggestions([])
    }
  }, [summonInput])

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
