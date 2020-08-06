import { useState, useEffect } from 'react'
import tinykeys from 'tinykeys'

const useKeyListener = (toggleWithKeys) => {
  const [isPrompted, setIsPrompted] = useState(false)
  const [summonInput, setSummonInput] = useState('')

  useEffect(() => {
    // use the user-defined key combo if available, otherwise default
    const keysCombo = toggleWithKeys ? toggleWithKeys : 'Control+Space'

    let unsubscribe = tinykeys(window, {
      [keysCombo]: (e) => {
        e.preventDefault()
        // user is toggling Summon
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
