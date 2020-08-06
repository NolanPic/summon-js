import { useState, useEffect } from 'react'
import tinykeys from 'tinykeys'

const useKeyListener = () => {
  const [isPrompted, setIsPrompted] = useState(false)
  const [summonInput, setSummonInput] = useState('')

  useEffect(() => {
    let unsubscribe = tinykeys(window, {
      'Control+Space': (e) => {
        e.preventDefault()
        // user is pressing both keys, toggle Summon
        setIsPrompted(!isPrompted)
      }
    })

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
    }

    document.body.addEventListener('keydown', keyListener)
    document.body.addEventListener('keyup', keyListener)

    // cleanup
    return () => {
      unsubscribe()
      document.body.removeEventListener('keydown', keyListener)
      document.body.removeEventListener('keyup', keyListener)
    }
  }, [isPrompted])

  return [isPrompted, summonInput, setSummonInput]
}

export default useKeyListener
