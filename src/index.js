import React, { useState, useEffect, useRef } from 'react'

const COMMAND_KEY = 91

const Summon = (props) => {
  const [isPrompted, setIsPrompted] = useState(false)

  const summonInput = useRef(null)

  useEffect(() => {
    const keyListener = (e) => {
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
            <input type='text' placeholder='&rarr;' ref={summonInput} />
          </div>
        </div>
      ) : null}
    </React.Fragment>
  )
}

export default Summon
