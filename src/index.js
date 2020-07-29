import React, { useState, useEffect, useRef } from 'react'
import Suggestions from './components/Suggestions'
import testCommands from './test-data/commands'

const COMMAND_KEY = 91

const Summon = (props) => {
  const [isPrompted, setIsPrompted] = useState(false)
  const [summonInput, setSummonInput] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const summonInput = useRef(null)

  useEffect(() => {
    const keyListener = (e) => {
      // if Summon is already open, start matching suggestions
      // as the user is typing
      if (isPrompted && summonInput.length) {
        setSuggestions(
          testCommands.filter((cmd) =>
            cmd.toLowerCase().contains(summonInput.toLowerCase())
          )
        )
      }

      if (e.keyCode === COMMAND_KEY && e.shiftKey) {
        // user is pressing both keys, toggle Summon
        setIsPrompted(!isPrompted)
      }
    }

    document.body.addEventListener('keydown', keyListener)
    document.body.addEventListener('keyup', keyListener)

    // cleanup
    return () => {
      document.body.removeEventListener('keydown', keyListener)
      document.body.removeEventListener('keyup', keyListener)
    }
  }, [isPrompted])

  // focus the input
  useEffect(() => {
    if (isPrompted) {
      summonInput.current.focus()
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
              ref={summonInput}
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
